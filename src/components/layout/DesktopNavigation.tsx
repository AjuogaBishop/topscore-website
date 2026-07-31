import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { mainNavigation } from '../../content/navigation'

export function DesktopNavigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
      {mainNavigation.map((item) =>
        item.children ? (
          <div
            key={item.label}
            data-product-menu
            className="relative"
          >
            <div className="flex items-center">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `rounded-l-md px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 ${
                    isActive ? 'bg-brand-50 text-brand-900' : 'text-slate-700 hover:bg-slate-50 hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
              <button
                type="button"
                aria-label={`Show ${item.label} submenu`}
                aria-expanded={openMenu === item.label}
                onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setOpenMenu(null)
                }}
                className="rounded-r-md px-2 py-2 text-slate-600 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                <span aria-hidden="true">⌄</span>
              </button>
            </div>
            {openMenu === item.label && (
              <div className="absolute left-0 top-full z-50 w-72 pt-2">
                <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-soft">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      onClick={() => setOpenMenu(null)}
                      onBlur={() => setOpenMenu(null)}
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                          setOpenMenu(null)
                          event.currentTarget.closest('[data-product-menu]')?.querySelector<HTMLElement>('button')?.focus()
                        }
                      }}
                      className="block rounded-md px-4 py-3 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                    >
                      <span className="block text-sm font-semibold text-ink">{child.label}</span>
                      {child.description && <span className="mt-1 block text-xs text-slate-600">{child.description}</span>}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 ${
                isActive ? 'bg-brand-50 text-brand-900' : 'text-slate-700 hover:bg-slate-50 hover:text-ink'
              }`
            }
          >
            {item.label}
          </NavLink>
        ),
      )}
    </nav>
  )
}
