export const company = {
  name: 'Topscore Learning',
  legalName: '[REGISTERED COMPANY NAME — LEGAL REVIEW REQUIRED]',
  email: 'hello@topscorelearning.com',
  description:
    'Evidence-informed platforms, programmes and services for learners, educators and institutions.',
  socialLinks: [] as Array<{ label: string; href: string }>,
} as const

export const contactConfig = {
  publicEmails: [company.email],
  recipients: {
    general: company.email,
    peer: company.email,
    academy: company.email,
    consulting: company.email,
  },
} as const
