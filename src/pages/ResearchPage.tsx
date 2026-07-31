import { CallToAction } from '../components/sections/CallToAction'
import { PageHero } from '../components/sections/PageHero'
import { ResearchCard } from '../components/research/ResearchCard'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { researchItems } from '../content/research'

const priorities = [
  ['Writing assessment and feedback', 'How assessment and feedback can support decisions, revision and durable learning.'],
  ['Learner uptake of feedback', 'What learners notice, understand and actually do after feedback is provided.'],
  ['Peer review', 'How structured peer interaction can develop judgement, dialogue and learner agency.'],
  ['AI-supported writing development', 'How AI can guide reflection and revision without replacing learner thinking.'],
  ['Multilingual pedagogy', 'How multilingual and translanguaging practices can support equitable learning.'],
  ['Teacher professional learning', 'How educators develop knowledge and transfer it into classroom practice.'],
  ['Assessment literacy', 'How learners, teachers and institutions make informed assessment decisions.'],
] as const

const methods = ['Practitioner inquiry', 'Design-based research', 'Classroom evidence', 'Collaborative projects', 'Transparent reporting']

export function ResearchPage() {
  return (
    <>
      <PageHero eyebrow="Research" title="Evidence for better learning." description="Topscore Learning investigates how assessment, feedback, pedagogy and responsible technology can contribute to meaningful improvement in real learning contexts." primary={{ label: 'Discuss a research partnership', href: '/contact' }} aside={{ label: 'Research orientation', items: ['Practice connected', 'Question led', 'Method transparent', 'Learner centred', 'Open to revision'] }} />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <SectionHeading eyebrow="Research priorities" title="Questions grounded in practice." description="Our priorities sit at the intersection of writing, feedback, educator expertise and learning technology." />
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {priorities.map(([title, description], index) => <article key={title} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr_1.4fr]"><span className="text-xs font-bold text-brand-600">0{index + 1}</span><h3 className="font-display text-lg font-bold text-ink">{title}</h3><p className="text-sm leading-6 text-slate-600">{description}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Current work" title="Selected projects and areas of inquiry." description="These project summaries describe work in development. They do not claim completed or statistically established outcomes." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {researchItems.filter((item) => item.featured).map((item) => <ResearchCard key={item.slug} item={item} />)}
          </div>
        </Container>
      </section>

      <section className="bg-brand-900 py-20 text-white sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <SectionHeading eyebrow="How we approach research" title="Useful evidence, communicated responsibly." description="Topscore aims to connect disciplined inquiry with decisions that learners, educators and institutions can understand and use." inverse />
          <ul className="grid gap-3 sm:grid-cols-2">{methods.map((method, index) => <li key={method} className="flex items-center gap-4 rounded-lg border border-white/15 p-5"><span className="text-xs font-bold text-brand-100">0{index + 1}</span><span className="font-semibold">{method}</span></li>)}</ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Publications and outputs" title="A foundation for a growing research library." description="The library supports published work, presentations, working papers, ongoing research and project overviews. Formal publications will be added after approval." />
          <div className="mt-10 flex flex-wrap gap-2" aria-label="Supported publication statuses">{['Published', 'Presented', 'Working paper', 'Ongoing research', 'Project overview'].map((status) => <span key={status} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600">{status}</span>)}</div>
        </Container>
      </section>

      <CallToAction eyebrow="Research partnerships" title="Investigate meaningful questions together." description="Talk with Topscore about practitioner research, project evaluation, writing development or responsible educational technology." primary={{ label: 'Discuss a research partnership', href: '/contact' }} />
    </>
  )
}
