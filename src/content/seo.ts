export const siteConfig = {
  url: (import.meta.env.VITE_SITE_URL || 'https://topscorelearning.com').replace(/\/$/, ''),
  defaultTitle: 'Topscore Learning',
  titleTemplate: '%s | Topscore Learning',
  defaultDescription: 'Topscore Learning develops evidence-informed platforms, programmes and services for learners, educators and institutions.',
  defaultImage: '/social-card.svg',
} as const

export type SeoRecord = {
  title: string
  description: string
  noIndex?: boolean
}

export const routeSeo: Record<string, SeoRecord> = {
  '/': { title: 'Topscore Learning', description: 'Evidence-informed platforms, programmes and services that help learners, educators and institutions achieve meaningful improvement.' },
  '/about': { title: 'About', description: 'Learn about Topscore Learning’s mission, values and approach to assessment, research, educational technology and professional learning.' },
  '/products': { title: 'Products', description: 'Explore Topscore Learning products designed around meaningful learning, feedback and improvement.' },
  '/peer': { title: 'PEER — Guided writing assessment and feedback', description: 'PEER helps learners understand feedback, make meaningful writing revisions and observe improvement.' },
  '/research': { title: 'Research', description: 'Explore Topscore Learning research into writing feedback, peer assessment, learner agency, multilingual pedagogy and responsible AI.' },
  '/academy': { title: 'Academy', description: 'Professional learning for educators, trainers and institutions across assessment, pedagogy, AI and communication.' },
  '/consulting': { title: 'Consulting', description: 'Evidence-informed educational consulting across curriculum, assessment, professional learning, technology and programme evaluation.' },
  '/contact': { title: 'Contact', description: 'Contact Topscore Learning about PEER, Academy programmes, consulting, research collaboration or general enquiries.' },
  '/privacy': { title: 'Privacy Policy', description: 'Read the Topscore Learning website privacy policy.' },
  '/terms': { title: 'Terms of Use', description: 'Read the terms for using the Topscore Learning corporate website.' },
  '/cookies': { title: 'Cookie Policy', description: 'Read how the Topscore Learning website uses cookies and comparable technologies.' },
}
