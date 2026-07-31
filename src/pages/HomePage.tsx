import { ArrowLink } from '../components/ui/ArrowLink'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CallToAction } from '../components/sections/CallToAction'
import { PeerFramework } from '../components/sections/PeerFramework'

const pillars = [
  { number: '01', title: 'Assessment', description: 'Thoughtful approaches to assessment and feedback that make next steps visible.', href: '/peer' },
  { number: '02', title: 'Educational Technology', description: 'Purpose-built tools that support learning without replacing human thinking.', href: '/products' },
  { number: '03', title: 'Research', description: 'Practitioner inquiry into feedback, writing, pedagogy and responsible AI.', href: '/research' },
  { number: '04', title: 'Professional Learning', description: 'Development experiences designed to translate into confident practice.', href: '/academy' },
  { number: '05', title: 'Consulting', description: 'Evidence-informed support for institutions facing complex learning challenges.', href: '/consulting' },
] as const

const researchAreas = ['Peer feedback', 'Writing development', 'AI-supported learning', 'Multilingual pedagogy', 'Assessment literacy', 'Teacher development']

const credibility = [
  ['Practitioner-led', 'Built with a close understanding of real classrooms and institutions.'],
  ['Research-informed', 'Shaped by evidence, inquiry and transparent learning principles.'],
  ['Classroom-tested', 'Designed around the realities of teaching, feedback and revision.'],
  ['Institution-ready', 'Created with implementation, reporting and scale in mind.'],
  ['International outlook', 'Responsive to varied learners, educators and educational contexts.'],
] as const

export function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-canvas py-20 sm:py-28 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_22%,rgb(215_239_236/.8),transparent_32%),linear-gradient(180deg,rgb(255_255_255/.45),transparent)]" />
        <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Learning <span aria-hidden="true">•</span> Assessment <span aria-hidden="true">•</span> Research <span aria-hidden="true">•</span> Innovation</p>
            <h1 className="mt-6 font-display text-5xl font-bold tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">Building better ways to <span className="text-brand-700">learn, assess and improve.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">Topscore Learning develops evidence-informed platforms, programmes and services that help learners, educators and institutions achieve meaningful improvement.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/peer">Explore PEER</ButtonLink>
              <ButtonLink to="/contact" variant="secondary">Talk to Topscore</ButtonLink>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg" aria-label="The Topscore Learning improvement cycle">
            <div className="absolute -inset-8 -z-10 rounded-full border border-brand-100/80" />
            <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">A connected approach</p>
              <div className="mt-6 space-y-3">
                {['Evidence', 'Thoughtful design', 'Action in practice', 'Visible improvement'].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-lg bg-brand-50 p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-brand-700 shadow-sm">0{index + 1}</span>
                    <span className="font-semibold text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="What we do" title="Five pillars. One focus: meaningful improvement." description="Topscore brings together assessment, technology, research and professional expertise to address learning challenges as connected systems." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="flex min-h-64 flex-col border-t-2 border-brand-700 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold tracking-[0.18em] text-slate-400">{pillar.number}</span>
                <h3 className="mt-8 font-display text-xl font-bold text-ink">{pillar.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{pillar.description}</p>
                <div className="mt-6"><ArrowLink to={pillar.href}>Explore</ArrowLink></div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-brand-900 py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-100">Our flagship product</p>
              <p className="mt-5 font-display text-7xl font-bold tracking-[-0.06em] text-white sm:text-8xl">PEER</p>
              <p className="mt-2 text-base font-semibold text-brand-100">Guided writing assessment and feedback</p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Feedback that leads to revision.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">PEER helps learners understand feedback, review writing, make meaningful revisions and see how their work improves.</p>
              <div className="mt-7"><ArrowLink to="/peer" inverse>Discover PEER</ArrowLink></div>
            </div>
          </div>
          <div className="mt-12"><PeerFramework /></div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="Research and insight" title="Questions that matter in practice." description="Our work connects practitioner research with the everyday decisions learners, teachers and institutions make." />
            <div className="mt-7"><ArrowLink to="/research">Explore our research</ArrowLink></div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {researchAreas.map((area, index) => (
              <div key={area} className="bg-white p-6 sm:p-8">
                <span className="text-xs font-bold text-brand-600">0{index + 1}</span>
                <h3 className="mt-7 font-display text-xl font-bold text-ink">{area}</h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Learning and support" title="From professional learning to organisational change." description="Topscore supports people and institutions through focused development programmes and tailored consulting engagements." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-xl bg-brand-50 p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Academy</p>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">Learning designed for professional practice.</h3>
              <p className="mt-4 leading-7 text-slate-600">Planned development across assessment, pedagogy, responsible AI and educator expertise.</p>
              <div className="mt-7"><ArrowLink to="/academy">Explore Academy</ArrowLink></div>
            </article>
            <article className="rounded-xl bg-slate-100 p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Consulting</p>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">Practical support for complex challenges.</h3>
              <p className="mt-4 leading-7 text-slate-600">Collaborative work spanning curriculum, assessment, technology, evaluation and institutional improvement.</p>
              <div className="mt-7"><ArrowLink to="/consulting">Explore Consulting</ArrowLink></div>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="How we work" title="Credibility built into the approach." align="center" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {credibility.map(([title, description]) => (
              <div key={title} className="text-center">
                <span aria-hidden="true" className="mx-auto block size-2 rounded-full bg-accent" />
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction eyebrow="Work with Topscore" title="Let’s build better learning together." description="Explore PEER, discuss an institutional pilot, or talk with us about research, professional learning and consultancy." primary={{ label: 'Request a PEER demo', href: '/contact' }} secondary={{ label: 'Contact Topscore', href: '/contact' }} />
    </>
  )
}
