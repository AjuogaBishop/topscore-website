import { CallToAction } from '../components/sections/CallToAction'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EnquiryFormSection } from '../components/forms/EnquiryFormSection'

const audiences = ['Teachers and trainers', 'Academic leaders', 'Schools and universities', 'Language centres', 'Learning and development teams', 'Education organisations']

const categories = [
  ['IELTS teaching and preparation', 'Develop principled approaches to writing, feedback and learner preparation.'],
  ['Teacher development', 'Strengthen classroom practice through focused, reflective professional learning.'],
  ['AI for educators', 'Use generative AI critically, responsibly and in support of human learning.'],
  ['Assessment literacy', 'Make more informed decisions about criteria, evidence, feedback and quality.'],
  ['Multilingual pedagogy', 'Explore inclusive approaches to language, identity and learning.'],
  ['Corporate communication', 'Develop purposeful writing and communication in professional contexts.'],
  ['Training of trainers', 'Build the capacity to facilitate effective professional learning.'],
  ['Continuing professional development', 'Create coherent development experiences for individuals or institutions.'],
] as const

const formats = [
  ['Online', 'Flexible learning designed for independent participation.'],
  ['Live virtual', 'Facilitated sessions connecting participants across locations.'],
  ['In person', 'Context-responsive workshops and development programmes.'],
  ['Blended', 'A purposeful combination of independent and facilitated learning.'],
  ['Institution specific', 'Programmes shaped around an organisation’s priorities and context.'],
] as const

const principles = ['Relevant to practice', 'Active rather than passive', 'Evidence informed', 'Reflective and collaborative', 'Designed for transfer']

export function AcademyPage() {
  return (
    <>
      <PageHero eyebrow="Topscore Academy" title="Professional learning that translates into practice." description="Topscore Academy develops focused learning experiences for educators, trainers, institutions and organisations working across assessment, pedagogy, technology and communication." primary={{ label: 'Register your interest', href: '/contact' }} aside={{ label: 'Delivery possibilities', items: ['Online', 'Live virtual', 'In person', 'Blended', 'Institution specific'] }} />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <SectionHeading eyebrow="Who it is for" title="Development for people who shape learning." description="Academy programmes can support individuals, teams or institutions at different stages of professional growth." />
          <div className="grid gap-3 sm:grid-cols-2">{audiences.map((audience, index) => <div key={audience} className="flex min-h-24 items-center gap-4 rounded-lg border border-slate-200 bg-white p-5"><span className="text-xs font-bold text-brand-600">0{index + 1}</span><span className="font-display font-bold text-ink">{audience}</span></div>)}</div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Programme areas" title="A growing professional-learning portfolio." description="Initial Academy development is focused on the following areas. Individual programme schedules will be published once approved." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">{categories.map(([title, description], index) => <article key={title} className="bg-white p-6"><span className="text-xs font-bold text-brand-600">0{index + 1}</span><h3 className="mt-6 font-display text-lg font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></article>)}</div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Delivery formats" title="Flexible by format. Consistent in purpose." description="Programme format can be selected around the audience, learning aims and institutional context." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{formats.map(([title, description]) => <article key={title} className="border-t-2 border-accent p-5"><h3 className="font-display text-lg font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></article>)}</div>
        </Container>
      </section>

      <section className="bg-brand-900 py-20 text-white sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <SectionHeading eyebrow="Learning principles" title="Professional learning designed for transfer." description="The aim is not simply participation. Academy experiences are designed to help people understand, apply, reflect and continue developing." inverse />
          <ol className="grid gap-3 sm:grid-cols-2">{principles.map((principle, index) => <li key={principle} className="flex items-center gap-4 rounded-lg border border-white/15 p-5"><span className="grid size-8 place-items-center rounded-full bg-white text-xs font-bold text-brand-900">{index + 1}</span><span className="font-semibold">{principle}</span></li>)}</ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20"><Container><div className="rounded-xl border border-brand-100 bg-brand-50 p-8 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Participation</p><h2 className="mt-4 font-display text-2xl font-bold text-ink">Certificates of participation may be available for selected programmes.</h2><p className="mt-3 text-sm leading-6 text-slate-600">Certification or accreditation will only be stated for programmes where it has been formally confirmed.</p></div></Container></section>

      <EnquiryFormSection formType="academy-interest" />

      <CallToAction eyebrow="Academy interest" title="Tell us what you want to develop." description="Register interest as an individual, team or institution and help shape future Academy programmes." primary={{ label: 'Register your interest', href: '/contact' }} secondary={{ label: 'Discuss an institutional programme', href: '/contact' }} />
    </>
  )
}
