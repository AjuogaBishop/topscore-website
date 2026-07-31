import type { EnquiryFormValues } from '../components/forms/formSchemas'

export type FormSubmissionResult = { ok: true } | { ok: false; message: string; fieldErrors?: Record<string, string[]> }

export interface FormSubmissionAdapter {
  submit(values: EnquiryFormValues, signal?: AbortSignal): Promise<FormSubmissionResult>
}

class ApiFormAdapter implements FormSubmissionAdapter {
  async submit(values: EnquiryFormValues, signal?: AbortSignal): Promise<FormSubmissionResult> {
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/api/enquiry'
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
        signal,
      })
      const data = await response.json().catch(() => null) as FormSubmissionResult | null
      if (data && typeof data === 'object' && 'ok' in data) return data
      return response.ok ? { ok: true } : { ok: false, message: 'The enquiry could not be submitted. Please try again.' }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') throw error
      return { ok: false, message: 'We could not connect to the enquiry service. Please try again or contact us by email.' }
    }
  }
}

export const formSubmissionAdapter: FormSubmissionAdapter = new ApiFormAdapter()
