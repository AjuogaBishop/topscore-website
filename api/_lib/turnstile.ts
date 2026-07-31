export async function verifyTurnstile(token: string | undefined, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false

  const body = new URLSearchParams({ secret, response: token, remoteip: remoteIp })
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  if (!response.ok) return false
  const result = await response.json() as { success?: boolean }
  return result.success === true
}
