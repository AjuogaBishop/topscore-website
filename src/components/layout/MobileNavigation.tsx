import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { mainNavigation } from '../../content/navigation'

type MobileNavigationProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyboard)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyboard)
      document.body.style.overflow = ''
      document.getElementById('mobile-menu-trigger')?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div id="mobile-navigation-dialog" ref={dialogRef} className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button className="absolute inset-0 bg-ink/30" aria-label="Close navigation" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <span className="font-display text-lg font-bold text-ink">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-md text-2xl text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="mt-5 flex flex-col">
          {mainNavigation.map((item) => (
            <div key={item.href} className="border-b border-slate-100 py-1">
              <NavLink
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-3 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 ${
                    isActive ? 'bg-brand-50 text-brand-900' : 'text-ink hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
              {item.children?.map((child) => (
                <NavLink
                  key={child.href}
                  to={child.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `ml-4 block rounded-md px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 ${
                      isActive ? 'bg-brand-50 font-semibold text-brand-900' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <NavLink
          to="/peer"
          onClick={onClose}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Explore PEER
        </NavLink>
      </div>
    </div>
  )
}
