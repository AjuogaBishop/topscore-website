import { CallToAction } from '../components/sections/CallToAction'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'

const values = [
  ['Learning with purpose', 'We begin with the change learners and educators need to make.'],
  ['Evidence before assumption', 'We ask questions, examine evidence and remain open to revision.'],
  ['Human agency', 'Technology should strengthen people’s capacity to think and act.'],
  ['Inclusion', 'Learning design should respond to varied identities, languages and contexts.'],
  ['Practical innovation', 'New ideas matter when they become useful in practice.'],
  ['Continuous improvement', 'We treat every programme, product and partnership as an opportunity to learn.'],
] as const

const expertise = ['Assessment and feedback', 'Writing development', 'Educational technology', 'Responsible AI in education', 'Teacher professional learning', 'Research and evaluation', 'Multilingual pedagogy', 'Institutional improvement']

const principles = [
  ['Start with learning', 'Define the learning problem before selecting a tool or intervention.'],
  ['Design with people', 'Include the learners, educators and institutions who will use the work.'],
  ['Make evidence useful', 'Turn research and data into decisions that can be acted upon.'],
  ['Build for transfer', 'Support change that can continue beyond a single session or project.'],
] as const

export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Topscore Learning" title="Learning with purpose." description="Topscore Learning works across assessment, research, technology, professional learning and consultancy to help people and institutions create meaningful, sustainable improvement." primary={{ label: 'Talk to Topscore', href: '/contact' }} aside={{ label: 'Our connected fields', items: ['Assessment', 'Educational technology', 'Research', 'Professional learning', 'Consulting'] }} />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-xl bg-brand-900 p-8 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">Mission</p>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight">To improve learning through evidence-informed assessment, technology, research and professional development.</h2>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Vision</p>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-ink">A future where feedback, research and technology support meaningful and sustainable improvement.</h2>
          </article>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Our values" title="Principles that shape the work." description="These values guide how Topscore approaches products, programmes, research and partnerships." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {values.map(([title, description], index) => (
              <article key={title} className="bg-white p-7 sm:p-8">
                <span className="text-xs font-bold text-brand-600">0{index + 1}</span>
                <h3 className="mt-6 font-display text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Our story" title="Connecting evidence with action." description="Topscore Learning was created around a practical question: how can assessment, research and technology help people improve rather than simply record performance? The organisation brings these areas together through products, professional learning and collaborative work with institutions." />
          </div>
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-8 sm:p-10">
            <p className="font-display text-2xl font-bold text-ink">From feedback to improvement</p>
            <p className="mt-4 leading-7 text-slate-600">That commitment is visible in PEER, our flagship guided writing platform, and in the wider research, Academy and consulting work being developed around it.</p>
          </div>
        </Container>
      </section>

      <section className="bg-brand-900 py-20 text-white sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Leadership" title="Practitioner-led by design." description="Approved founder biography, qualifications and photography will be published here when supplied. No credentials have been inferred or added." inverse />
            <div aria-label="Leadership photograph placeholder" className="mt-8 aspect-[4/3] max-w-md rounded-xl border border-dashed border-white/30 bg-white/5 p-6 text-sm text-slate-400">Approved leadership photograph</div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">Experience and expertise</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {expertise.map((item) => <div key={item} className="border-t border-white/20 py-4 font-semibold text-slate-200">{item}</div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Operating principles" title="How we move from question to impact." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {principles.map(([title, description]) => <article key={title} className="border-t-2 border-accent bg-white p-6"><h3 className="font-display text-xl font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></article>)}
          </div>
        </Container>
      </section>

      <CallToAction eyebrow="Start a conversation" title="Work with an organisation built around learning." description="Talk with Topscore about PEER, research, professional learning or an institutional challenge." primary={{ label: 'Contact Topscore', href: '/contact' }} secondary={{ label: 'Explore PEER', href: '/peer' }} />
    </>
  )
}
