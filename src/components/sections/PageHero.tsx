import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  aside?: { label: string; items: readonly string[] }
}

export function PageHero({ eyebrow, title, description, primary, secondary, aside }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_84%_18%,rgb(215_239_236/.85),transparent_30%),linear-gradient(180deg,rgb(255_255_255/.45),transparent)]" />
      <Container className={`grid gap-12 ${aside ? 'lg:grid-cols-[1.15fr_.85fr] lg:items-end' : ''}`}>
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</p>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{description}</p>
          {(primary || secondary) && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primary && <ButtonLink to={primary.href}>{primary.label}</ButtonLink>}
              {secondary && <ButtonLink to={secondary.href} variant="secondary">{secondary.label}</ButtonLink>}
            </div>
          )}
        </div>
        {aside && (
          <aside className="rounded-xl border border-brand-100 bg-white p-7 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{aside.label}</p>
            <ul className="mt-5 space-y-3">
              {aside.items.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold text-slate-700"><span aria-hidden="true" className="text-accent">●</span>{item}</li>)}
            </ul>
          </aside>
        )}
      </Container>
    </section>
  )
}
