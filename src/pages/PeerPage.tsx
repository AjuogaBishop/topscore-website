import { ArrowLink } from '../components/ui/ArrowLink'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CallToAction } from '../components/sections/CallToAction'
import { PeerFramework } from '../components/sections/PeerFramework'
import { EnquiryFormSection } from '../components/forms/EnquiryFormSection'

const feedbackProblems = [
  ['Understand', 'Feedback can be difficult to interpret or connect to a specific part of the writing.'],
  ['Locate', 'Learners may not know exactly where an issue occurs or why it matters.'],
  ['Act', 'Comments often identify a problem without making the route to improvement clear.'],
  ['Learn', 'Surface corrections can fix a sentence without developing transferable understanding.'],
  ['See progress', 'Without comparison and reflection, improvement can remain invisible.'],
] as const

const audiences = [
  {
    label: 'For learners',
    title: 'Build agency through guided action.',
    description: 'PEER keeps learners involved in assessment, feedback and revision instead of positioning them as passive recipients of corrections.',
    items: ['Structured self-assessment', 'Guided revision', 'Peer feedback', 'Visible progress', 'Stronger learner agency'],
  },
  {
    label: 'For teachers',
    title: 'Make feedback a visible learning process.',
    description: 'Create structured review workflows and follow what learners do after feedback is provided.',
    items: ['Structured review workflows', 'Feedback-quality monitoring', 'Class progress evidence', 'Revision tracking', 'Less one-directional marking'],
  },
  {
    label: 'For institutions',
    title: 'Implement with purpose and evidence.',
    description: 'Bring platform access together with onboarding, implementation support and reporting.',
    items: ['Cohort implementation', 'Teacher onboarding', 'Reporting', 'Research partnerships', 'Pilot programmes'],
  },
] as const

const process = [
  ['Submit', 'Create a clear starting point.'],
  ['Assess', 'Use structured self-assessment.'],
  ['Review', 'Engage with peer and teacher perspectives.'],
  ['Revise', 'Make deliberate, guided changes.'],
  ['Reflect', 'Recognise progress and transfer learning.'],
] as const

const programme = [
  'Digital platform access',
  'Teacher orientation',
  'Implementation support',
  'Pilot design',
  'Reporting',
  'Research collaboration',
] as const

export function PeerPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-900 py-20 text-white sm:py-28 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_15%,rgb(18_112_108/.65),transparent_34%)]" />
        <div aria-hidden="true" className="absolute -bottom-56 -right-36 -z-10 size-[34rem] rounded-full border-[90px] border-white/[0.035]" />
        <Container className="grid gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-100">PEER <span className="font-medium normal-case tracking-normal text-slate-300">by Topscore Learning</span></p>
            <p className="mt-7 font-display text-2xl font-bold text-brand-100 sm:text-3xl">Guided writing assessment and feedback</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold tracking-[-0.045em] sm:text-6xl lg:text-7xl">Feedback that leads to revision.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">PEER helps learners notice problems, understand feedback, make decisions, revise writing and observe improvement.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/contact" className="bg-white text-brand-900 hover:bg-brand-50">Request a demo</ButtonLink>
              <a href="#how-it-works" className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Explore how it works</a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">A guided improvement cycle</p>
            <div className="mt-6 space-y-2">
              {['Notice', 'Understand', 'Decide', 'Revise', 'Improve'].map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white font-display text-sm font-bold text-brand-900">{index + 1}</span>
                  <span className="font-semibold">{item}</span>
                  {index < 4 && <span aria-hidden="true" className="ml-auto text-brand-100">↓</span>}
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-slate-300"><strong className="text-white">PEER is not an AI essay writer.</strong> It supports learning without replacing the thinking that learning requires.</p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <SectionHeading eyebrow="The feedback gap" title="Feedback only matters when learners can use it." description="Writing feedback frequently stops at the comment. PEER is designed around what happens next." />
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {feedbackProblems.map(([title, description], index) => (
                <div key={title} className="grid gap-3 py-6 sm:grid-cols-[3rem_8rem_1fr] sm:items-start">
                  <span className="text-xs font-bold text-brand-600">0{index + 1}</span>
                  <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="The PEER framework" title="A learning workflow, not just a product name." description="Every assessment activity is designed to move learners from noticing an issue to understanding, action and reflection." />
          <div className="mt-12"><PeerFramework detailed /></div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Designed for the whole learning system" title="Useful at every level." description="PEER connects learner action, teacher insight and institutional implementation without losing sight of the writing itself." align="center" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {audiences.map((audience, index) => (
              <article key={audience.label} className={`rounded-xl border p-7 sm:p-8 ${index === 1 ? 'border-brand-100 bg-brand-50' : 'border-slate-200 bg-white'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{audience.label}</p>
                <h3 className="mt-5 font-display text-2xl font-bold text-ink">{audience.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{audience.description}</p>
                <ul className="mt-7 space-y-3">
                  {audience.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-medium text-slate-700"><span aria-hidden="true" className="mt-1 text-brand-600">✓</span>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-brand-900 py-20 text-white sm:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="From first draft to visible learning." description="A simple five-part journey keeps assessment connected to revision and reflection." inverse />
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {process.map(([title, description], index) => (
              <li key={title} className="relative border-t border-white/25 pt-6">
                <span className="text-xs font-bold tracking-[0.18em] text-brand-100">0{index + 1}</span>
                <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Platform and programme" title="Technology supported by thoughtful implementation." description="PEER can be introduced as more than software access. An institutional engagement can bring together orientation, implementation, evidence and collaboration." />
            <div className="mt-7"><ArrowLink to="/contact">Discuss an institutional pilot</ArrowLink></div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {programme.map((item, index) => (
              <li key={item} className="flex min-h-28 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <span className="text-xs font-bold text-brand-600">0{index + 1}</span>
                <span className="mt-5 font-display font-bold text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
          <div className="rounded-xl bg-brand-50 p-8">
            <p className="font-display text-5xl font-bold tracking-tight text-brand-700">Research<br />in practice.</p>
          </div>
          <div>
            <SectionHeading eyebrow="Research foundation" title="Developed through practitioner inquiry." description="PEER is being developed through practitioner research into writing feedback, peer assessment, revision and learner agency. We describe that foundation transparently without making unsupported effectiveness claims." />
            <div className="mt-7"><ArrowLink to="/research">Explore the research context</ArrowLink></div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-8 rounded-xl border border-slate-200 bg-white p-8 sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Pricing</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink">Pilot and institutional pricing is available on request.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">We’ll discuss your learners, context and implementation needs before proposing an approach.</p>
            </div>
            <ButtonLink to="/contact" className="shrink-0">Start a conversation</ButtonLink>
          </div>
        </Container>
      </section>

      <EnquiryFormSection formType="peer-demo" />

      <CallToAction eyebrow="Bring PEER to your institution" title="Make feedback part of the learning." description="Request a product demonstration or talk with Topscore about designing an institutional pilot for your context." primary={{ label: 'Request a PEER demo', href: '/contact' }} secondary={{ label: 'Discuss an institutional pilot', href: '/contact' }} />
    </>
  )
}
