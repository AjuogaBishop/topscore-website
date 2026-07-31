import { Link } from 'react-router-dom'
import type { ResearchItem } from '../../types/content'

type ResearchCardProps = {
  item: ResearchItem
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}

export function ResearchCard({ item }: ResearchCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-100 hover:shadow-soft">
      {item.coverImage && <img src={item.coverImage} alt={item.coverImageAlt ?? ''} className="aspect-[16/9] w-full object-cover" loading="lazy" />}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-brand-900">{item.status}</span>
          <span className="text-slate-500">{item.category}</span>
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-ink"><Link to={`/research/${item.slug}`} className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600">{item.title}</Link></h3>
        <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{item.summary}</p>
        {(item.author || item.publicationDate) && <p className="mt-5 text-xs text-slate-500">{[item.author, item.publicationDate ? formatDate(item.publicationDate) : undefined].filter(Boolean).join(' · ')}</p>}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-700">Read project overview <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
      </div>
    </article>
  )
}
