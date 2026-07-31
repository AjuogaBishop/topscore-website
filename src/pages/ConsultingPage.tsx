import { CallToAction } from '../components/sections/CallToAction'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EnquiryFormSection } from '../components/forms/EnquiryFormSection'

const clients = ['Schools', 'Universities', 'Language centres', 'Education providers', 'NGOs', 'Ministries and public institutions', 'Learning and development teams', 'Companies with communication needs']

const services = [
  ['Curriculum design', 'Create coherent learning aims, sequences, materials and implementation guidance.'],
  ['Assessment design', 'Develop criteria, tasks and evidence systems aligned with learning priorities.'],
  ['Teacher development', 'Design professional learning that responds to educator and institutional needs.'],
  ['School improvement', 'Connect evidence, priorities and practical implementation planning.'],
  ['Educational technology', 'Select and introduce technology around clear learning and organisational goals.'],
  ['AI adoption in education', 'Develop responsible policies, practices and professional capability.'],
  ['Programme evaluation', 'Examine implementation, experience and outcomes to inform better decisions.'],
  ['Corporate communication training', 'Strengthen purposeful writing and communication in professional contexts.'],
] as const

const process = [
  ['Discover', 'Understand the context, people and need.'],
  ['Define', 'Agree the problem, scope and evidence of success.'],
  ['Design', 'Develop the programme, framework or intervention.'],
  ['Deliver', 'Support implementation with the right people and resources.'],
  ['Evaluate', 'Review evidence, learning and next steps.'],
] as const

const deliverables = ['Needs analysis', 'Curriculum framework', 'Assessment framework', 'Training programme', 'Implementation plan', 'Facilitator materials', 'Evaluation report', 'Institutional recommendations']

export function ConsultingPage() {
  return (
    <>
      <PageHero eyebrow="Consulting" title="Evidence-informed support for complex learning challenges." description="Topscore Learning works with educational and organisational partners to discover, define, design, deliver and evaluate practical solutions." primary={{ label: 'Start a conversation', href: '/contact' }} aside={{ label: 'Areas of work', items: ['Learning design', 'Assessment', 'Professional capability', 'Educational technology', 'Evaluation'] }} />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <SectionHeading eyebrow="Who we work with" title="Partnerships across learning systems." description="Consulting engagements can support organisations at different scales, from a focused team need to wider institutional change." />
          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2">{clients.map((client, index) => <div key={client} className="flex items-center gap-4 bg-white p-5"><span className="text-xs font-bold text-brand-600">0{index + 1}</span><span className="font-semibold text-ink">{client}</span></div>)}</div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Services" title="Focused expertise, shaped around context." description="Each engagement begins with the need rather than a predefined package." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{services.map(([title, description], index) => <article key={title} className="rounded-lg border border-slate-200 bg-canvas p-6"><span className="text-xs font-bold text-brand-600">0{index + 1}</span><h3 className="mt-6 font-display text-xl font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></article>)}</div>
        </Container>
      </section>

      <section className="bg-brand-900 py-20 text-white sm:py-28">
        <Container>
          <SectionHeading eyebrow="Engagement process" title="From discovery to useful evidence." description="A clear five-stage process keeps the work connected to the original need while leaving room to learn and adapt." inverse />
          <ol className="mt-12 grid gap-4 md:grid-cols-5">{process.map(([title, description], index) => <li key={title} className="border-t border-white/25 pt-6"><span className="text-xs font-bold tracking-[0.18em] text-brand-100">0{index + 1}</span><h3 className="mt-6 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{description}</p></li>)}</ol>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading eyebrow="Example deliverables" title="Outputs designed to be used." description="The exact output depends on the engagement. These examples show the kinds of practical resources a project may produce." />
          <ul className="grid gap-3 sm:grid-cols-2">{deliverables.map((item, index) => <li key={item} className="flex min-h-24 items-center gap-4 rounded-lg border border-slate-200 bg-white p-5"><span className="grid size-8 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">{index + 1}</span><span className="font-display font-bold text-ink">{item}</span></li>)}</ul>
        </Container>
      </section>

      <EnquiryFormSection formType="consulting-enquiry" />

      <CallToAction eyebrow="Consulting enquiry" title="Begin with the challenge, not a package." description="Tell us about your context, priorities and intended change. We’ll use that starting point to explore whether Topscore is the right partner." primary={{ label: 'Start a consulting conversation', href: '/contact' }} />
    </>
  )
}
