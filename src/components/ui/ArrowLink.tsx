import { Link } from 'react-router-dom'

type ArrowLinkProps = {
  to: string
  children: string
  inverse?: boolean
}

export function ArrowLink({ to, children, inverse = false }: ArrowLinkProps) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 rounded-sm text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 ${
        inverse ? 'text-white' : 'text-brand-700'
      }`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  )
}
