import { z } from 'zod'

export const formTypes = ['general-contact', 'peer-demo', 'academy-interest', 'consulting-enquiry'] as const

export const enquiryTypes = [
  'General enquiry',
  'PEER demo',
  'PEER institutional pilot',
  'Academy programme',
  'Consulting',
  'Research collaboration',
  'Media or speaking request',
  'Privacy request',
] as const

const optionalShortText = z.string().trim().max(120, 'Please use 120 characters or fewer.').optional().or(z.literal(''))

export const enquirySchema = z.object({
  formType: z.enum(formTypes),
  fullName: z.string().trim().min(2, 'Enter your full name.').max(120, 'Please use 120 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  organisation: z.string().trim().min(2, 'Enter your organisation.').max(160),
  role: z.string().trim().min(2, 'Enter your role.').max(120),
  country: z.string().trim().min(2, 'Enter your country.').max(120),
  enquiryType: z.enum(enquiryTypes),
  message: z.string().trim().min(20, 'Please provide at least 20 characters.').max(5000, 'Please use 5,000 characters or fewer.'),
  consent: z.boolean().refine((value) => value, 'You must agree before submitting.'),
  phone: optionalShortText,
  preferredContactMethod: z.enum(['Email', 'Phone']).optional().or(z.literal('')),
  pageSource: z.string().trim().max(500),
  website: z.string().max(0, 'Invalid submission.'),
  turnstileToken: z.string().optional(),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>

export type EnquiryFormType = (typeof formTypes)[number]

export const formConfigurations: Record<EnquiryFormType, {
  title: string
  description: string
  defaultEnquiryType: (typeof enquiryTypes)[number]
  showEnquiryType: boolean
}> = {
  'general-contact': {
    title: 'Send an enquiry',
    description: 'Tell us about your question, organisation and the kind of conversation you would like to begin.',
    defaultEnquiryType: 'General enquiry',
    showEnquiryType: true,
  },
  'peer-demo': {
    title: 'Request a PEER demo',
    description: 'Tell us about your learners, institution and interest in PEER.',
    defaultEnquiryType: 'PEER demo',
    showEnquiryType: false,
  },
  'academy-interest': {
    title: 'Register Academy interest',
    description: 'Share the professional-learning area, audience and delivery context you have in mind.',
    defaultEnquiryType: 'Academy programme',
    showEnquiryType: false,
  },
  'consulting-enquiry': {
    title: 'Start a consulting conversation',
    description: 'Describe the context, challenge and intended change. A finished project brief is not required.',
    defaultEnquiryType: 'Consulting',
    showEnquiryType: false,
  },
}
