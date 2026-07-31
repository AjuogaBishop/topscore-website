import { Link, useParams } from 'react-router-dom'
import { CallToAction } from '../components/sections/CallToAction'
import { Container } from '../components/ui/Container'
import { getResearchItem } from '../content/research'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}

export function ResearchArticlePage() {
  const { slug = '' } = useParams()
  const item = getResearchItem(slug)

  if (!item) {
    return (
      <section className="py-20 sm:py-28">
        <Container>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Research</p>
          <h1 className="mt-5 font-display text-4xl font-bold text-ink sm:text-5xl">Research item not found.</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">The requested item may have moved, or it may not yet be available for publication.</p>
          <Link to="/research" className="mt-8 inline-flex min-h-11 items-center rounded-md bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Return to research</Link>
        </Container>
      </section>
    )
  }

  return (
    <>
      <article>
        <header className="border-b border-slate-200 bg-white py-16 sm:py-24">
          <Container>
            <Link to="/research" className="inline-flex items-center gap-2 rounded-sm text-sm font-bold text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"><span aria-hidden="true">←</span>All research</Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-bold"><span className="rounded-full bg-brand-100 px-3 py-1 text-brand-900">{item.status}</span><span className="text-slate-500">{item.category}</span></div>
            <h1 className="mt-6 max-w-5xl font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">{item.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{item.summary}</p>
            {(item.author || item.publicationDate) && <p className="mt-6 text-sm text-slate-500">{[item.author, item.publicationDate ? formatDate(item.publicationDate) : undefined].filter(Boolean).join(' · ')}</p>}
          </Container>
        </header>
        {item.coverImage && <Container className="pt-12"><img src={item.coverImage} alt={item.coverImageAlt ?? ''} className="aspect-[16/7] w-full rounded-xl object-cover" /></Container>}
        <Container className="grid gap-10 py-16 lg:grid-cols-[14rem_1fr] lg:py-20">
          <aside>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Research item</p>
              <dl className="mt-5 space-y-5 text-sm"><div><dt className="font-bold text-ink">Status</dt><dd className="mt-1 text-slate-600">{item.status}</dd></div><div><dt className="font-bold text-ink">Category</dt><dd className="mt-1 text-slate-600">{item.category}</dd></div>{item.author && <div><dt className="font-bold text-ink">Author</dt><dd className="mt-1 text-slate-600">{item.author}</dd></div>}</dl>
              {(item.pdfUrl || item.externalUrl) && <div className="mt-7 space-y-3">{item.pdfUrl && <a href={item.pdfUrl} className="block text-sm font-bold text-brand-700 underline-offset-4 hover:underline">Download PDF</a>}{item.externalUrl && <a href={item.externalUrl} target="_blank" rel="noreferrer" className="block text-sm font-bold text-brand-700 underline-offset-4 hover:underline">View external publication <span className="sr-only">(opens in a new tab)</span></a>}</div>}
            </div>
          </aside>
          <div className="max-w-3xl">
            {item.body.map((block, index) => {
              if (block.type === 'heading') return <h2 key={index} className="mb-4 mt-10 font-display text-2xl font-bold text-ink first:mt-0">{block.text}</h2>
              if (block.type === 'list') return <ul key={index} className="my-6 space-y-3">{block.items.map((listItem) => <li key={listItem} className="flex gap-3 leading-7 text-slate-600"><span aria-hidden="true" className="text-brand-600">•</span>{listItem}</li>)}</ul>
              if (block.type === 'quote') return <blockquote key={index} className="my-8 border-l-4 border-accent pl-6 font-display text-xl font-semibold leading-8 text-ink"><p>{block.text}</p>{block.attribution && <footer className="mt-3 font-sans text-sm font-normal text-slate-500">{block.attribution}</footer>}</blockquote>
              return <p key={index} className="mb-5 leading-8 text-slate-600">{block.text}</p>
            })}
          </div>
        </Container>
      </article>
      <CallToAction eyebrow="Research collaboration" title="Explore the question with us." description="Talk with Topscore about practitioner research, writing development, assessment or responsible educational technology." primary={{ label: 'Discuss a research partnership', href: '/contact' }} />
    </>
  )
}
