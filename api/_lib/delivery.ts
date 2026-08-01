import type { EnquiryFormValues } from '../../src/components/forms/formSchemas'

export type DeliveryPayload = EnquiryFormValues & {
  submittedAt: string
  receivedAt: string
}

const recipientEnvironmentKeys = {
  'general-contact': 'FORM_RECIPIENT_GENERAL',
  'peer-demo': 'FORM_RECIPIENT_PEER',
  'academy-interest': 'FORM_RECIPIENT_ACADEMY',
  'consulting-enquiry': 'FORM_RECIPIENT_CONSULTING',
} as const

function getRecipient(payload: DeliveryPayload) {
  return process.env[recipientEnvironmentKeys[payload.formType]] || process.env.FORM_RECIPIENT_GENERAL
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

async function deliverWithResend(payload: DeliveryPayload, recipient: string) {
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

  return response.ok
    ? { ok: true as const }
    : { ok: false as const, reason: 'provider-rejected' as const, status: response.status }
}

async function deliverWithWebhook(payload: DeliveryPayload, recipient: string) {
  const endpoint = process.env.FORM_DELIVERY_ENDPOINT
  if (!endpoint) return { ok: false as const, reason: 'webhook-not-configured' as const }
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (process.env.FORM_DELIVERY_TOKEN) headers.Authorization = `Bearer ${process.env.FORM_DELIVERY_TOKEN}`
  const response = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({ recipient, ...payload }) })
  return response.ok
    ? { ok: true as const }
    : { ok: false as const, reason: 'provider-rejected' as const, status: response.status }
}

export async function deliverEnquiry(payload: DeliveryPayload) {
  const recipient = getRecipient(payload)
  if (!recipient) return { ok: false as const, reason: 'recipient-not-configured' as const }
  return process.env.FORM_DELIVERY_PROVIDER === 'resend'
    ? deliverWithResend(payload, recipient)
    : deliverWithWebhook(payload, recipient)
}
