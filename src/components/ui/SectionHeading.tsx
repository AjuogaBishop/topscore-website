type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  inverse?: boolean
}

export function SectionHeading({ eyebrow, title, description, align = 'left', inverse = false }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className={`text-sm font-bold uppercase tracking-[0.16em] ${inverse ? 'text-brand-100' : 'text-brand-700'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl ${inverse ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {description && <p className={`mt-5 text-lg leading-8 ${inverse ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>}
    </div>
  )
}
