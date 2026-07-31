export type NavigationChild = {
  label: string
  href: string
  description?: string
}

export type NavigationItem = {
  label: string
  href: string
  children?: NavigationChild[]
}

export type FooterGroup = {
  title: string
  links: NavigationChild[]
}

export const researchStatuses = [
  'Published',
  'Presented',
  'Working paper',
  'Ongoing research',
  'Project overview',
] as const

export type ResearchStatus = (typeof researchStatuses)[number]

export type ResearchBodyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }

export type ResearchItem = {
  title: string
  slug: string
  summary: string
  author?: string
  publicationDate?: string
  category: string
  status: ResearchStatus
  featured: boolean
  coverImage?: string
  coverImageAlt?: string
  pdfUrl?: string
  externalUrl?: string
  body: ResearchBodyBlock[]
}

export type LegalSection = {
  title: string
  paragraphs?: string[]
  items?: string[]
}

export type LegalDocument = {
  slug: 'privacy' | 'terms' | 'cookies'
  title: string
  summary: string
  lastUpdated?: string
  sections: LegalSection[]
}
