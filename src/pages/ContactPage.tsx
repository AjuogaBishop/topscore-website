import { PageHero } from '../components/sections/PageHero'
import { company } from '../content/company'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EnquiryFormSection } from '../components/forms/EnquiryFormSection'

const enquiries = [
  ['General enquiry', 'Questions about Topscore Learning or where to begin.'],
  ['PEER demo', 'See the guided writing assessment and feedback platform.'],
  ['PEER institutional pilot', 'Discuss implementation for a cohort or institution.'],
  ['Academy programme', 'Register interest in professional learning.'],
  ['Consulting', 'Share an educational or organisational challenge.'],
  ['Research collaboration', 'Explore practitioner research or a collaborative project.'],
  ['Media or speaking request', 'Invite Topscore to contribute to an event or conversation.'],
  ['Privacy request', 'Ask about personal information or data-protection matters.'],
] as const

const nextSteps = [
  ['Choose a route', 'Select the enquiry category that best describes what you need.'],
  ['Share the context', 'Tell us enough about your role, organisation and question to understand the request.'],
  ['Continue the conversation', 'A member of Topscore Learning will respond as soon as possible.'],
] as const

export function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to Topscore." description="Choose the right path for a general enquiry, PEER demonstration, Academy programme, consulting project or research collaboration." aside={{ label: 'Contact', items: [company.email, 'Enquiries welcomed internationally', 'No fixed response time is promised'] }} />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Enquiry routes" title="Start in the right place." description="Choose the category that best matches your question. Email is available as the current contact channel." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {enquiries.map(([title, description], index) => (
              <article key={title} className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold text-brand-600">0{index + 1}</span>
                <h2 className="mt-6 font-display text-xl font-bold text-ink">{title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{description}</p>
                <a href={`mailto:${company.email}?subject=${encodeURIComponent(title)}`} className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-bold text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600">Email Topscore <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <SectionHeading eyebrow="What happens next" title="A straightforward first conversation." description="You do not need a finished brief. A clear account of the context and what you hope to change is enough to begin." />
            <a href={`mailto:${company.email}`} className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">{company.email}</a>
          </div>
          <ol className="divide-y divide-slate-200 border-y border-slate-200">{nextSteps.map(([title, description], index) => <li key={title} className="grid gap-3 py-6 sm:grid-cols-[3rem_11rem_1fr]"><span className="text-xs font-bold text-brand-600">0{index + 1}</span><h3 className="font-display text-lg font-bold text-ink">{title}</h3><p className="text-sm leading-6 text-slate-600">{description}</p></li>)}</ol>
        </Container>
      </section>

      <EnquiryFormSection formType="general-contact" />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="rounded-xl bg-brand-50 p-8 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Privacy</p>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">Your information should only be used to respond to your enquiry.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">Please review the Privacy Policy before contacting us, and avoid sending sensitive personal information by email.</p>
          </div>
        </Container>
      </section>
    </>
  )
}
