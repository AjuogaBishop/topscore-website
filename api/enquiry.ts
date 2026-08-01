import { z } from 'zod'
import { enquirySchema } from '../src/components/forms/formSchemas'
import { deliverEnquiry } from './_lib/delivery'
import { checkRateLimit } from './_lib/rateLimit'
import { verifyTurnstile } from './_lib/turnstile'

const serverEnquirySchema = enquirySchema.extend({ submittedAt: z.string().datetime() })

function json(data: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...headers } })
}

function getRemoteIp(request: Request) {
  return request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown'
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') return json({ ok: false, message: 'Method not allowed.' }, 405, { Allow: 'POST' })

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 20_000) return json({ ok: false, message: 'The enquiry is too large.' }, 413)

  const remoteIp = getRemoteIp(request)
  const rateLimit = checkRateLimit(remoteIp)
  if (!rateLimit.allowed) return json({ ok: false, message: 'Too many enquiries have been submitted. Please try again later.' }, 429, { 'Retry-After': String(rateLimit.retryAfter) })

  let input: unknown
  try {
    input = await request.json()
  } catch {
    return json({ ok: false, message: 'Invalid request.' }, 400)
  }

  if (input && typeof input === 'object' && 'website' in input && typeof input.website === 'string' && input.website.length > 0) {
    return json({ ok: true })
  }

  const parsed = serverEnquirySchema.safeParse(input)
  if (!parsed.success) {
    return json({ ok: false, message: 'Please review the highlighted fields.', fieldErrors: parsed.error.flatten().fieldErrors }, 400)
  }

  const turnstileValid = await verifyTurnstile(parsed.data.turnstileToken, remoteIp)
  if (!turnstileValid) return json({ ok: false, message: 'The anti-spam check could not be verified. Please try again.' }, 400)

  const delivery = await deliverEnquiry({ ...parsed.data, receivedAt: new Date().toISOString() })
  if (!delivery.ok) return json({ ok: false, message: 'The enquiry could not be delivered. Please try again or contact us by email.' }, 503)

  return json({ ok: true })
}
