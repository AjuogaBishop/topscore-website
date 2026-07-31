import { useCallback, useState } from 'react'
import { BrandLockup } from './BrandLockup'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobileMenu = useCallback(() => setMobileOpen(false), [])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex min-h-18 items-center justify-between gap-6 py-3">
        <BrandLockup />
        <DesktopNavigation />
        <div className="hidden lg:block">
          <ButtonLink to="/peer">Explore PEER</ButtonLink>
        </div>
        <button
          id="mobile-menu-trigger"
          type="button"
          onClick={() => setMobileOpen(true)}
          className="grid size-11 place-items-center rounded-md border border-slate-300 text-xl text-ink hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-dialog"
        >
          <span aria-hidden="true">☰</span>
        </button>
      </Container>
      <MobileNavigation isOpen={mobileOpen} onClose={closeMobileMenu} />
    </header>
  )
}
