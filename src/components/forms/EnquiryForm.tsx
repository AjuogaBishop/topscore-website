import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm, type Path } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { enquirySchema, enquiryTypes, formConfigurations, type EnquiryFormType, type EnquiryFormValues } from '../../../shared/enquirySchema'
import { formSubmissionAdapter } from '../../lib/forms'
import { FormField } from './FormField'
import { TurnstileField } from './TurnstileField'

type EnquiryFormProps = {
  formType: EnquiryFormType
}

export function EnquiryForm({ formType }: EnquiryFormProps) {
  const config = formConfigurations[formType]
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'failure'>('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')
  const statusId = `${formType}-submission-status`
  const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      formType,
      enquiryType: config.defaultEnquiryType,
      consent: false,
      pageSource: typeof window === 'undefined' ? '' : window.location.pathname,
      website: '',
      phone: '',
      preferredContactMethod: 'Email',
      turnstileToken: '',
    },
  })
  const setTurnstileToken = useCallback((token: string) => setValue('turnstileToken', token), [setValue])

  async function onSubmit(values: EnquiryFormValues) {
    setSubmissionState('submitting')
    setSubmissionMessage('')
    const result = await formSubmissionAdapter.submit(values)
    if (result.ok) {
      setSubmissionState('success')
      setSubmissionMessage('Thank you. Your enquiry has been received, and a member of Topscore Learning will respond as soon as possible.')
    } else {
      setSubmissionState('failure')
      setSubmissionMessage(result.message)
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          if (messages[0]) setError(field as Path<EnquiryFormValues>, { type: 'server', message: messages[0] })
        })
      }
    }
    requestAnimationFrame(() => document.getElementById(statusId)?.focus())
  }

  if (submissionState === 'success') {
    return <div id={statusId} tabIndex={-1} role="status" className="rounded-xl border border-brand-100 bg-brand-50 p-8 focus:outline-none"><p className="font-display text-2xl font-bold text-ink">Enquiry received</p><p className="mt-4 leading-7 text-slate-600">{submissionMessage}</p></div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <input type="hidden" {...register('formType')} />
      <input type="hidden" {...register('pageSource')} />
      <input type="hidden" {...register('turnstileToken')} />
      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formType}-website`}>Website</label>
        <input id={`${formType}-website`} tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{config.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{config.description}</p>
        <p className="mt-3 text-xs text-slate-500"><span aria-hidden="true">*</span> Required fields</p>
      </div>
      {submissionState === 'failure' && <div id={statusId} tabIndex={-1} role="alert" className="mt-7 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 focus:outline-none">{submissionMessage}</div>}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <FormField id={`${formType}-name`} label="Full name" registration={register('fullName')} error={errors.fullName} required autoComplete="name" />
        <FormField id={`${formType}-email`} label="Email address" registration={register('email')} error={errors.email} required type="email" autoComplete="email" />
        <FormField id={`${formType}-organisation`} label="Organisation" registration={register('organisation')} error={errors.organisation} required autoComplete="organization" />
        <FormField id={`${formType}-role`} label="Role" registration={register('role')} error={errors.role} required autoComplete="organization-title" />
        <FormField id={`${formType}-country`} label="Country" registration={register('country')} error={errors.country} required autoComplete="country-name" />
        <FormField id={`${formType}-phone`} label="Phone number" registration={register('phone')} error={errors.phone} type="tel" autoComplete="tel" />
        {config.showEnquiryType && <div>
          <label htmlFor={`${formType}-type`} className="block text-sm font-bold text-ink">Enquiry type<span className="text-brand-700" aria-hidden="true"> *</span></label>
          <select id={`${formType}-type`} aria-invalid={Boolean(errors.enquiryType)} aria-describedby={errors.enquiryType ? `${formType}-type-error` : undefined} className="mt-2 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100" {...register('enquiryType')}>{enquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>
          {errors.enquiryType && <p id={`${formType}-type-error`} role="alert" className="mt-2 text-sm font-semibold text-red-700">{errors.enquiryType.message}</p>}
        </div>}
        <div>
          <label htmlFor={`${formType}-preference`} className="block text-sm font-bold text-ink">Preferred contact method</label>
          <select id={`${formType}-preference`} className="mt-2 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100" {...register('preferredContactMethod')}><option value="Email">Email</option><option value="Phone">Phone</option></select>
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor={`${formType}-message`} className="block text-sm font-bold text-ink">Message<span className="text-brand-700" aria-hidden="true"> *</span></label>
        <textarea id={`${formType}-message`} rows={7} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${formType}-message-error` : `${formType}-message-hint`} className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3.5 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100" placeholder="Tell us about your context and enquiry." {...register('message')} />
        <p id={`${formType}-message-hint`} className="mt-1 text-xs text-slate-500">Do not include sensitive personal information.</p>
        {errors.message && <p id={`${formType}-message-error`} role="alert" className="mt-2 text-sm font-semibold text-red-700">{errors.message.message}</p>}
      </div>
      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
          <input type="checkbox" className="mt-1 size-4 rounded border-slate-300 text-brand-700 focus:ring-brand-600" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${formType}-consent-error` : undefined} {...register('consent')} />
          <span>I agree that Topscore Learning may use the information I provide to respond to this enquiry. Please review the <Link to="/privacy" className="font-semibold text-brand-700 underline-offset-4 hover:underline">Privacy Policy</Link> for more information.<span className="text-brand-700" aria-hidden="true"> *</span></span>
        </label>
        {errors.consent && <p id={`${formType}-consent-error`} role="alert" className="mt-2 text-sm font-semibold text-red-700">{errors.consent.message}</p>}
      </div>
      <TurnstileField onToken={setTurnstileToken} />
      <button type="submit" disabled={submissionState === 'submitting'} className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-wait disabled:opacity-60">{submissionState === 'submitting' ? 'Sending enquiry…' : 'Send enquiry'}</button>
    </form>
  )
}
