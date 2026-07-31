import type { LegalDocument } from '../types/content'

export const legalEntity = {
  registeredName: '[REGISTERED COMPANY NAME — LEGAL REVIEW REQUIRED]',
  registrationNumber: '[REGISTRATION NUMBER — LEGAL REVIEW REQUIRED]',
  registeredAddress: '[REGISTERED ADDRESS — LEGAL REVIEW REQUIRED]',
  jurisdiction: '[COMPANY JURISDICTION — LEGAL REVIEW REQUIRED]',
  governingLaw: '[GOVERNING LAW — LEGAL REVIEW REQUIRED]',
  dataProtectionContact: '[DATA-PROTECTION CONTACT — LEGAL REVIEW REQUIRED]',
} as const

export const privacyDocument: LegalDocument = {
  slug: 'privacy',
  title: 'Privacy Policy',
  summary: 'This draft describes how Topscore Learning intends to handle information submitted through its corporate website.',
  sections: [
    { title: 'Who we are', paragraphs: [`The website is operated by ${legalEntity.registeredName}, registered in ${legalEntity.jurisdiction}. Registered address: ${legalEntity.registeredAddress}.`] },
    { title: 'Information we may collect', items: ['Contact and professional information you provide in an enquiry', 'The content and category of your enquiry', 'Technical and spam-prevention information where permitted', 'Analytics information only when configured and legally permitted'] },
    { title: 'How information may be used', items: ['To respond to an enquiry', 'To arrange a demonstration, pilot or professional service', 'To maintain the security and reliability of the website', 'To meet applicable legal obligations'] },
    { title: 'Legal basis and retention', paragraphs: ['The applicable legal bases and retention periods must be confirmed for the final jurisdiction and configured services before launch. Personal information should not be retained for longer than necessary for the stated purpose.'] },
    { title: 'Sharing and international transfers', paragraphs: ['Final wording must identify any form, email, analytics, hosting or security providers that process personal information, together with relevant international-transfer safeguards.'] },
    { title: 'Your rights', paragraphs: ['Your rights depend on the law that applies to you and to Topscore Learning. The final policy must explain those rights and how to exercise them.'] },
    { title: 'Contact', paragraphs: [`Data-protection contact: ${legalEntity.dataProtectionContact}.`] },
  ],
}

export const termsDocument: LegalDocument = {
  slug: 'terms',
  title: 'Terms of Use',
  summary: 'These draft terms outline the intended conditions for using the public Topscore Learning corporate website.',
  sections: [
    { title: 'Website operator', paragraphs: [`This website is operated by ${legalEntity.registeredName}, registration number ${legalEntity.registrationNumber}, with a registered address at ${legalEntity.registeredAddress}.`] },
    { title: 'Using this website', items: ['Use the website only for lawful purposes', 'Do not interfere with its operation or security', 'Do not attempt to gain unauthorised access to systems or data', 'Do not misrepresent your identity when making an enquiry'] },
    { title: 'Information and availability', paragraphs: ['Corporate, research, Academy, consulting and product information may change. The website does not guarantee that every page or service will always be available.'] },
    { title: 'Intellectual property', paragraphs: ['Final terms must identify ownership and permitted use of site text, graphics, brand assets, research outputs and downloadable resources.'] },
    { title: 'External links', paragraphs: ['Links to third-party websites may be provided for context. Topscore Learning does not control those websites, and final counsel-approved wording should define the relevant limitation.'] },
    { title: 'Liability', paragraphs: ['A jurisdiction-appropriate limitation of liability must be drafted or approved by qualified legal counsel before launch.'] },
    { title: 'Governing law', paragraphs: [`These terms are intended to be governed by ${legalEntity.governingLaw}, subject to final legal approval.`] },
  ],
}

export const cookiesDocument: LegalDocument = {
  slug: 'cookies',
  title: 'Cookie Policy',
  summary: 'This policy will describe the cookies and comparable technologies actually configured on the website.',
  sections: [
    { title: 'Current approach', paragraphs: ['The website should not activate non-essential analytics before consent where consent is legally required. If no non-essential cookies are used at launch, an unnecessary cookie banner should not be displayed.'] },
    { title: 'Essential technologies', paragraphs: ['Hosting, security, form protection or preference features may require essential technologies. The final policy must name the services actually configured and explain their purpose and duration.'] },
    { title: 'Analytics', paragraphs: ['Plausible is the preferred privacy-conscious analytics option. If another provider is selected, this policy and the consent implementation must be updated before activation.'] },
    { title: 'Managing cookies', paragraphs: ['Final instructions must reflect the technologies actually used and explain any available browser or consent controls.'] },
    { title: 'Updates and contact', paragraphs: [`Material changes should be reflected in this policy. Data-protection contact: ${legalEntity.dataProtectionContact}.`] },
  ],
}
