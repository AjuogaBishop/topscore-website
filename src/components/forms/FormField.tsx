import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type FormFieldProps = {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: FieldError
  required?: boolean
  hint?: string
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
}

export function FormField({ id, label, registration, error, required = false, hint, type = 'text', autoComplete }: FormFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-ink">{label}{required && <span className="text-brand-700" aria-hidden="true"> *</span>}</label>
      {hint && <p id={hintId} className="mt-1 text-xs text-slate-500">{hint}</p>}
      <input id={id} type={type} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : hint ? hintId : undefined} className="mt-2 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100" {...registration} />
      {error && <p id={errorId} role="alert" className="mt-2 text-sm font-semibold text-red-700">{error.message}</p>}
    </div>
  )
}
