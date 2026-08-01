import type { EnquiryFormType } from '../../../shared/enquirySchema'
import { EnquiryForm } from './EnquiryForm'
import { Container } from '../ui/Container'

export function EnquiryFormSection({ formType }: { formType: EnquiryFormType }) {
  return <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-24"><Container className="max-w-4xl"><EnquiryForm formType={formType} /></Container></section>
}
