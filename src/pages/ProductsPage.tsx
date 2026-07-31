import { CallToAction } from '../components/sections/CallToAction'
import { PageHero } from '../components/sections/PageHero'
import { PeerFramework } from '../components/sections/PeerFramework'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'

const principles = [
  ['Learning first', 'Products begin with a meaningful learning problem, not a technology trend.'],
  ['Human agency', 'Tools support judgement, reflection and action rather than replace them.'],
  ['Evidence informed', 'Research questions and implementation evidence shape development.'],
  ['Institution ready', 'Products are considered in relation to educators, cohorts and implementation.'],
  ['Designed to improve', 'Features must contribute to learning, autonomy, evidence or scale.'],
] as const

export function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="Tools designed around meaningful improvement." description="Topscore Learning develops focused educational products that connect assessment, feedback, reflection and action." primary={{ label: 'Discover PEER', href: '/peer' }} aside={{ label: 'Product standard', items: ['Purpose before novelty', 'Responsible use of AI', 'Clear learner action', 'Evidence for educators', 'Institutional scalability'] }} />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="overflow-hidden rounded-2xl bg-brand-900 text-white shadow-soft">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[.75fr_1.25fr] lg:p-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">Flagship product</p>
                <p className="mt-5 font-display text-7xl font-bold tracking-[-0.06em] sm:text-8xl">PEER</p>
                <p className="mt-3 font-semibold text-brand-100">Guided writing assessment and feedback</p>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold sm:text-4xl">Feedback that leads to revision.</h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">PEER helps learners understand feedback, assess writing, make purposeful revisions and observe improvement. It supports self-assessment, peer review and teacher review without becoming an AI essay writer.</p>
                <div className="mt-8"><ArrowLink to="/peer" inverse>Explore the PEER platform</ArrowLink></div>
              </div>
            </div>
            <div className="border-t border-white/10 bg-white/[0.04] p-8 sm:p-12"><PeerFramework /></div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Development principles" title="A clear test for every product decision." description="A feature earns priority when it improves learning, supports the PEER framework, increases learner autonomy, provides actionable evidence or enables responsible institutional scale." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {principles.map(([title, description], index) => <article key={title} className="border-t-2 border-brand-700 p-5"><span className="text-xs font-bold text-slate-400">0{index + 1}</span><h3 className="mt-6 font-display text-lg font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="What comes next" title="A focused portfolio, built deliberately." description="Version 1 presents PEER as Topscore Learning’s only public product. Additional learning and assessment tools are in development; they will be introduced only when their purpose and evidence base are ready to communicate clearly." />
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Future portfolio</p><p className="mt-5 font-display text-2xl font-bold text-ink">Independent tools. A shared learning philosophy.</p><p className="mt-4 leading-7 text-slate-600">Future products can share a design system, authentication and analytics foundation while remaining independently deployable.</p></div>
        </Container>
      </section>

      <CallToAction eyebrow="Product partnerships" title="Help shape learning technology with purpose." description="Request a PEER demonstration or talk with us about an institutional pilot, implementation partnership or future product collaboration." primary={{ label: 'Request a PEER demo', href: '/contact' }} secondary={{ label: 'Talk about a partnership', href: '/contact' }} />
    </>
  )
}
