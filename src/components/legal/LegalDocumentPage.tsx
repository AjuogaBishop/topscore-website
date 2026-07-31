import type { LegalDocument } from '../../types/content'
import { Container } from '../ui/Container'

type LegalDocumentPageProps = {
  document: LegalDocument
}

export function LegalDocumentPage({ document }: LegalDocumentPageProps) {
  return (
    <>
      <header className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <Container>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Legal</p>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{document.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{document.summary}</p>
          {document.lastUpdated && <p className="mt-5 text-sm text-slate-500">Last updated: {document.lastUpdated}</p>}
        </Container>
      </header>
      <Container className="grid gap-10 py-16 lg:grid-cols-[15rem_1fr] lg:py-20">
        <aside>
          <nav aria-label={`${document.title} sections`} className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">On this page</p>
            <ol className="mt-4 space-y-2">
              {document.sections.map((section, index) => <li key={section.title}><a href={`#legal-section-${index + 1}`} className="block rounded-sm py-1 text-sm text-slate-600 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600">{section.title}</a></li>)}
            </ol>
          </nav>
        </aside>
        <div className="max-w-3xl">
          {import.meta.env.DEV && <div role="note" className="mb-10 rounded-lg border border-amber-300 bg-amber-50 p-5 text-sm font-bold text-amber-950">LEGAL REVIEW REQUIRED BEFORE PUBLIC LAUNCH</div>}
          <div className="space-y-12">
            {document.sections.map((section, index) => (
              <section key={section.title} id={`legal-section-${index + 1}`} className="scroll-mt-28">
                <p className="text-xs font-bold text-brand-600">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-ink">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 leading-7 text-slate-600">{paragraph}</p>)}
                {section.items && <ul className="mt-5 space-y-3">{section.items.map((item) => <li key={item} className="flex gap-3 leading-7 text-slate-600"><span aria-hidden="true" className="text-brand-600">•</span>{item}</li>)}</ul>}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}
