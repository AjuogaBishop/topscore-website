type RateRecord = { count: number; resetAt: number }

const requestBuckets = new Map<string, RateRecord>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

export function checkRateLimit(key: string) {
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
