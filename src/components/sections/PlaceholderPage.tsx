import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

type PlaceholderPageProps = {
  eyebrow?: string
  title: string
  description: string
  action?: { label: string; href: string }
}

export function PlaceholderPage({ eyebrow = 'Topscore Learning', title, description, action }: PlaceholderPageProps) {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-brand-50 to-transparent" />
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-700">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
          {action && (
            <div className="mt-8">
              <ButtonLink to={action.href}>{action.label}</ButtonLink>
            </div>
          )}
        </div>
        <div className="mt-16 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
          Page content will be implemented in the next phase.
        </div>
      </Container>
    </section>
  )
}
