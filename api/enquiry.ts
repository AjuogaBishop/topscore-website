import { z } from 'zod'
import type { IncomingMessage, ServerResponse } from 'node:http'

const serverEnquirySchema = z.object({
  formType: z.enum(['general-contact', 'peer-demo', 'academy-interest', 'consulting-enquiry']),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  organisation: z.string().trim().min(2).max(160),
  role: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(120),
  enquiryType: z.enum([
    'General enquiry',
    'PEER demo',
    'PEER institutional pilot',
    'Academy programme',
    'Consulting',
    'Research collaboration',
    'Media or speaking request',
    'Privacy request',
  ]),
  message: z.string().trim().min(20).max(5000),
  consent: z.literal(true),
  phone: z.string().trim().max(120).optional().or(z.literal('')),
  preferredContactMethod: z.enum(['Email', 'Phone']).optional().or(z.literal('')),
  pageSource: z.string().trim().max(500),
  website: z.string().max(0),
  turnstileToken: z.string().optional(),
  submittedAt: z.string().datetime(),
})

type DeliveryPayload = z.infer<typeof serverEnquirySchema> & { receivedAt: string }
type RateRecord = { count: number; resetAt: number }

const requestBuckets = new Map<string, RateRecord>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5
const recipientEnvironmentKeys = {
  'general-contact': 'FORM_RECIPIENT_GENERAL',
  'peer-demo': 'FORM_RECIPIENT_PEER',
  'academy-interest': 'FORM_RECIPIENT_ACADEMY',
  'consulting-enquiry': 'FORM_RECIPIENT_CONSULTING',
} as const

function checkRateLimit(key: string) {
  const now = Date.now()
  const current = requestBuckets.get(key)
  if (!current || current.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }
  if (current.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) }
  }
  current.count += 1
  return { allowed: true, retryAfter: 0 }
}

async function verifyTurnstile(token: string | undefined, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false

  const body = new URLSearchParams({ secret, response: token, remoteip: remoteIp })
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  if (!response.ok) return false
  const result = await response.json() as { success?: boolean }
  return result.success === true
}

function formatPlainText(payload: DeliveryPayload) {
  return [
    `Form: ${payload.formType}`,
    `Enquiry type: ${payload.enquiryType}`,
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Organisation: ${payload.organisation}`,
    `Role: ${payload.role}`,
    `Country: ${payload.country}`,
    payload.phone ? `Phone: ${payload.phone}` : '',
    payload.preferredContactMethod ? `Preferred contact: ${payload.preferredContactMethod}` : '',
    `Page source: ${payload.pageSource}`,
    `Submitted: ${payload.submittedAt}`,
    '',
    'Message:',
    payload.message,
  ].filter((line) => line !== '').join('\n')
}

async function createIdempotencyKey(payload: DeliveryPayload) {
  const bytes = new TextEncoder().encode(`${payload.formType}:${payload.email}:${payload.submittedAt}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return `enquiry-${Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('')}`
}

async function deliverEnquiry(payload: DeliveryPayload) {
  const recipient = process.env[recipientEnvironmentKeys[payload.formType]] || process.env.FORM_RECIPIENT_GENERAL
  if (!recipient) return { ok: false as const, reason: 'recipient-not-configured' as const }

  if (process.env.FORM_DELIVERY_PROVIDER !== 'resend') {
    const endpoint = process.env.FORM_DELIVERY_ENDPOINT
    if (!endpoint) return { ok: false as const, reason: 'webhook-not-configured' as const }
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (process.env.FORM_DELIVERY_TOKEN) headers.Authorization = `Bearer ${process.env.FORM_DELIVERY_TOKEN}`
    const response = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({ recipient, ...payload }) })
    return response.ok ? { ok: true as const } : { ok: false as const, reason: 'provider-rejected' as const, status: response.status }
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.FORM_FROM_EMAIL
  if (!apiKey || !from) return { ok: false as const, reason: 'resend-not-configured' as const }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': await createIdempotencyKey(payload),
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: payload.email,
      subject: `[Topscore website] ${payload.enquiryType} — ${payload.fullName}`,
      text: formatPlainText(payload),
      tags: [{ name: 'form_type', value: payload.formType.replaceAll('-', '_') }],
    }),
  })
  return response.ok ? { ok: true as const } : { ok: false as const, reason: 'provider-rejected' as const, status: response.status }
}

type ApiRequest = IncomingMessage & { body?: unknown }

function json(response: ServerResponse, data: unknown, status = 200, headers: Record<string, string> = {}) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  for (const [name, value] of Object.entries(headers)) response.setHeader(name, value)
  response.end(JSON.stringify(data))
}

function firstHeaderValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function getRemoteIp(request: ApiRequest) {
  return firstHeaderValue(request.headers['x-vercel-forwarded-for'])?.split(',')[0]?.trim()
    || firstHeaderValue(request.headers['x-forwarded-for'])?.split(',')[0]?.trim()
    || 'unknown'
}

async function readRequestBody(request: ApiRequest) {
  if (request.body !== undefined) {
    return typeof request.body === 'string' ? JSON.parse(request.body) : request.body
  }
  const chunks: Uint8Array[] = []
  for await (const chunk of request) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

export default async function handler(request: ApiRequest, response: ServerResponse) {
  if (request.method !== 'POST') return json(response, { ok: false, message: 'Method not allowed.' }, 405, { Allow: 'POST' })

  const contentLength = Number(firstHeaderValue(request.headers['content-length']) || 0)
  if (contentLength > 20_000) return json(response, { ok: false, message: 'The enquiry is too large.' }, 413)

  const remoteIp = getRemoteIp(request)
  const rateLimit = checkRateLimit(remoteIp)
  if (!rateLimit.allowed) return json(response, { ok: false, message: 'Too many enquiries have been submitted. Please try again later.' }, 429, { 'Retry-After': String(rateLimit.retryAfter) })

  let input: unknown
  try {
    input = await readRequestBody(request)
  } catch {
    return json(response, { ok: false, message: 'Invalid request.' }, 400)
  }

  if (input && typeof input === 'object' && 'website' in input && typeof input.website === 'string' && input.website.length > 0) {
    return json(response, { ok: true })
  }

  const parsed = serverEnquirySchema.safeParse(input)
  if (!parsed.success) {
    return json(response, { ok: false, message: 'Please review the highlighted fields.', fieldErrors: parsed.error.flatten().fieldErrors }, 400)
  }

  const turnstileValid = await verifyTurnstile(parsed.data.turnstileToken, remoteIp)
  if (!turnstileValid) return json(response, { ok: false, message: 'The anti-spam check could not be verified. Please try again.' }, 400)

  const delivery = await deliverEnquiry({ ...parsed.data, receivedAt: new Date().toISOString() })
  if (!delivery.ok) return json(response, { ok: false, message: 'The enquiry could not be delivered. Please try again or contact us by email.' }, 503)

  return json(response, { ok: true })
}
