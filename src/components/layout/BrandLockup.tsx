import { Link } from 'react-router-dom'
import { company } from '../../content/company'

export function BrandLockup() {
  return (
    <Link
      to="/"
      aria-label={`${company.name} home`}
      className="inline-flex items-center gap-3 rounded-sm font-display text-lg font-bold tracking-tight text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <span aria-hidden="true" className="grid size-9 place-items-center rounded-md bg-brand-700 text-sm text-white">
        T
      </span>
      <span>{company.name}</span>
    </Link>
  )
}
