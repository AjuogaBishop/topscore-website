import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type ButtonLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string
    variant?: 'primary' | 'secondary'
  }
>

export function ButtonLink({ children, to, variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  const styles =
    variant === 'primary'
      ? 'bg-brand-700 text-white hover:bg-brand-900'
      : 'border border-slate-300 bg-white text-ink hover:border-brand-600 hover:text-brand-700'

  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${styles} ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}
