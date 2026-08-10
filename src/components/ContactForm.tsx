import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { submitContactEnquiry } from '../config/contactForm'
import { contactCopy } from '../content/site'

const enquiryReasons = [
  'Focused day',
  'One-to-four-week engagement',
  'Scoped project or assembled team',
  'Leadership, strategy or team development',
  'Speaking, advisory or collaboration',
  'Something else',
]

const engagementReasons: Record<string, string> = {
  day: 'Focused day',
  week: 'One-to-four-week engagement',
  project: 'Scoped project or assembled team',
}

export default function ContactForm() {
  const [searchParams] = useSearchParams()
  const [honeypot, setHoneypot] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const submissionInFlight = useRef(false)
  const successRef = useRef<HTMLDivElement>(null)
  const selectedReason = engagementReasons[searchParams.get('engagement') ?? ''] ?? ''
  const [reason, setReason] = useState(selectedReason)

  // Engagement CTAs update the param while the form is already mounted.
  useEffect(() => {
    if (selectedReason) setReason(selectedReason)
  }, [selectedReason])

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submissionInFlight.current) return
    setFormError(null)

    if (honeypot.trim() !== '') {
      setSubmitted(true)
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    submissionInFlight.current = true
    setSubmitting(true)
    const result = await submitContactEnquiry({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      organisation: String(formData.get('organisation') ?? ''),
      reason: String(formData.get('reason') ?? ''),
      message: String(formData.get('message') ?? ''),
    })
    submissionInFlight.current = false
    setSubmitting(false)

    if (result.ok) {
      setSubmitted(true)
      form.reset()
      setReason(selectedReason)
      return
    }

    setFormError(result.error)
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="card-surface flex flex-col justify-center p-8 sm:p-12"
        role="status"
        tabIndex={-1}
      >
        <p className="label text-accent">Message sent</p>
        <h3 className="display-xl mt-5 text-4xl sm:text-5xl">
          Thank you for the context.
        </h3>
        <p className="measure mt-6 text-lg leading-relaxed text-muted">
          Michael will read your note and reply directly. The design you chose
          has stayed exactly where you left it.
        </p>
        <div className="mt-10">
          <button
            type="button"
            className="button-outline label min-h-12 px-6 py-3"
            onClick={() => {
              setSubmitted(false)
              setHoneypot('')
            }}
          >
            Send another enquiry
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form relative grid gap-6">
      <input
        hidden
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
      />

      {formError && (
        <p className="border-l-2 border-accent pl-4 text-base text-bone" role="alert">
          {formError}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="label text-faint">Name</span>
          <input
            className="form-field"
            type="text"
            name="name"
            autoComplete="name"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="label text-faint">Email</span>
          <input
            className="form-field"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="label text-faint">Organisation</span>
        <input
          className="form-field"
          type="text"
          name="organisation"
          autoComplete="organization"
        />
      </label>

      <label className="grid gap-2">
        <span className="label text-faint">Reason for getting in touch</span>
        <select
          className="form-field"
          name="reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          required
        >
          <option value="" disabled>
            Select the closest fit
          </option>
          {enquiryReasons.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="label text-faint">Message</span>
        <textarea
          className="form-field min-h-48 resize-y"
          name="message"
          required
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="button-solid group min-h-12 justify-between gap-4 px-6 py-4 text-left disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-accent-deep disabled:border-accent-deep"
        data-cta="contact-submit"
      >
        <span className="label">{submitting ? 'Sending...' : 'Send enquiry'}</span>
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      <p className="text-sm leading-relaxed text-faint">{contactCopy.privacyNote}</p>
    </form>
  )
}
