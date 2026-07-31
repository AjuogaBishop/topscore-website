const required = [
  'VITE_SITE_URL',
  'FORM_DELIVERY_PROVIDER',
  'FORM_RECIPIENT_GENERAL',
  'FORM_RECIPIENT_PEER',
  'FORM_RECIPIENT_ACADEMY',
  'FORM_RECIPIENT_CONSULTING',
]

if (process.env.FORM_DELIVERY_PROVIDER === 'resend') required.push('RESEND_API_KEY', 'FORM_FROM_EMAIL')
if (process.env.FORM_DELIVERY_PROVIDER === 'webhook') required.push('FORM_DELIVERY_ENDPOINT')

const hasTurnstileSiteKey = Boolean(process.env.VITE_TURNSTILE_SITE_KEY)
const hasTurnstileSecret = Boolean(process.env.TURNSTILE_SECRET_KEY)
const missing = required.filter((name) => !process.env[name])

if (process.env.VITE_SITE_URL && process.env.VITE_SITE_URL !== 'https://topscorelearning.com') {
  console.error('VITE_SITE_URL must be https://topscorelearning.com for production.')
  process.exitCode = 1
}
if (hasTurnstileSiteKey !== hasTurnstileSecret) {
  console.error('Configure both VITE_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY, or neither.')
  process.exitCode = 1
}
if (missing.length) {
  console.error(`Missing deployment variables: ${missing.join(', ')}`)
  process.exitCode = 1
}
if (!process.exitCode) console.log('Deployment environment configuration is complete.')
