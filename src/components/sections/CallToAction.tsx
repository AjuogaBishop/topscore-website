import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

type CallToActionProps = {
  eyebrow?: string
  title: string
  description: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export function CallToAction({ eyebrow, title, description, primary, secondary }: CallToActionProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl bg-brand-900 px-6 py-12 text-white shadow-soft sm:px-10 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="absolute -right-24 -top-32 -z-10 size-80 rounded-full border-[60px] border-white/5" />
          <div className="max-w-3xl">
            {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-100">{eyebrow}</p>}
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to={primary.href} className="bg-white text-brand-900 hover:bg-brand-50">{primary.label}</ButtonLink>
              {secondary && <ButtonLink to={secondary.href} variant="secondary" className="border-white/30 bg-transparent text-white hover:border-white hover:text-white">{secondary.label}</ButtonLink>}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
