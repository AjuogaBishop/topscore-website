const framework = [
  { letter: 'P', name: 'Pinpoint', description: 'Identify the issue or opportunity.' },
  { letter: 'E', name: 'Explain', description: 'Understand why it matters.' },
  { letter: 'E', name: 'Enhance', description: 'Revise the writing through guided action.' },
  { letter: 'R', name: 'Result', description: 'Review the improvement and carry the learning forward.' },
] as const

type PeerFrameworkProps = {
  detailed?: boolean
}

export function PeerFramework({ detailed = false }: PeerFrameworkProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {framework.map((step, index) => (
        <li key={step.name} className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-100 hover:shadow-soft">
          <div className="flex items-center justify-between">
            <span className="grid size-11 place-items-center rounded-lg bg-brand-700 font-display text-lg font-bold text-white">{step.letter}</span>
            <span className="text-xs font-bold tracking-[0.18em] text-slate-400">0{index + 1}</span>
          </div>
          <h3 className="mt-5 font-display text-xl font-bold text-ink">{step.name}</h3>
          {(detailed || index < 4) && <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>}
          {index < framework.length - 1 && <span aria-hidden="true" className="absolute -right-3 top-10 z-10 hidden size-6 place-items-center rounded-full border border-slate-200 bg-canvas text-xs text-brand-700 md:grid">→</span>}
        </li>
      ))}
    </ol>
  )
}
