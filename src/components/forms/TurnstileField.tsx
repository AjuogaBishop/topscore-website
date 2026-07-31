import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render(container: HTMLElement, options: Record<string, unknown>): string
      remove(widgetId: string): void
    }
  }
}

export function TurnstileField({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (!siteKey) return
    let widgetId: string | undefined
    let cancelled = false
    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetId) return
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
        theme: 'light',
      })
    }
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-topscore-turnstile]')
    if (window.turnstile) renderWidget()
    else if (existingScript) existingScript.addEventListener('load', renderWidget)
    else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.topscoreTurnstile = 'true'
      script.addEventListener('load', renderWidget)
      document.head.appendChild(script)
    }
    return () => {
      cancelled = true
      existingScript?.removeEventListener('load', renderWidget)
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [onToken, siteKey])

  if (!siteKey) return null
  return <div className="mt-6"><div ref={containerRef} aria-label="Anti-spam verification" /></div>
}
