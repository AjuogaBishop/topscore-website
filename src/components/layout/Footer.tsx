import { Link } from 'react-router-dom'
import { company } from '../../content/company'
import { footerNavigation } from '../../content/navigation'
import { BrandLockup } from './BrandLockup'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.3fr_2fr]">
        <div>
          <div className="[&_a]:text-white [&_span:first-child]:bg-white [&_span:first-child]:text-brand-900">
            <BrandLockup />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">{company.description}</p>
          <a className="mt-5 inline-block text-sm text-slate-200 underline-offset-4 hover:underline" href={`mailto:${company.email}`}>
            {company.email}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNavigation.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link className="text-sm text-slate-300 hover:text-white hover:underline" to={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="border-t border-slate-800">
        <Container className="py-5 text-xs text-slate-400">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}
