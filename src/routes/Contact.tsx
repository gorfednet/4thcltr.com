import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import DesignLink from '../components/DesignLink'
import PageMeta from '../components/PageMeta'
import { submitContactEnquiry } from '../config/contactForm'
import { contactCopy } from '../content/site'
import { organizationJsonLd, personJsonLd } from '../content/jsonLd'
import { pageSeo } from '../content/seo'

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

export default function Contact() {
  const [searchParams] = useSearchParams()
  const [honeypot, setHoneypot] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const submissionInFlight = useRef(false)
  const successRef = useRef<HTMLDivElement>(null)
  const selectedReason = engagementReasons[searchParams.get('engagement') ?? ''] ?? ''

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
      return
    }

    setFormError(result.error)
  }

  return (
    <>
      <PageMeta
        title={pageSeo.contact.title}
        description={pageSeo.contact.description}
        path={pageSeo.contact.path}
        jsonLd={[organizationJsonLd(), personJsonLd()]}
      />

      <section className="page-intro shell pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="grid-12">
          <div className="md:col-span-10 lg:col-span-7">
            <p className="label text-accent">Start a conversation</p>
            <h1 className="display-xl mt-8 text-[length:clamp(3rem,9vw,8rem)]">
              What needs
              <br />
              <span className="italic text-accent">to change?</span>
            </h1>
            <p className="measure mt-10 text-xl leading-relaxed text-muted">
              {contactCopy.introLede}
            </p>
          </div>
        </div>

        <div className="section-content grid-12 mt-16 lg:mt-24">
          <aside className="md:col-span-4 lg:col-span-3">
            <p className="label text-faint">Useful context</p>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <li>Your role and organisation</li>
              <li>The decision or problem at hand</li>
              <li>Where the product is today: concept, launch, live or scaling</li>
              <li>Any timing, team or regulatory constraints</li>
              <li>What a strong result would make possible</li>
            </ul>
            <div className="mt-10 border-t border-line-soft pt-6">
              <p className="label text-faint">What happens next</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {contactCopy.whatHappensNext.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="mt-12 md:col-span-8 md:mt-0 lg:col-span-7 lg:col-start-6">
            {submitted ? (
              <div
                ref={successRef}
                className="card-surface flex min-h-[32rem] flex-col justify-center p-8 sm:p-12"
                role="status"
                tabIndex={-1}
              >
                <p className="label text-accent">Message sent</p>
                <h2 className="display-xl mt-5 text-4xl sm:text-5xl">
                  Thank you for the context.
                </h2>
                <p className="measure mt-6 text-lg leading-relaxed text-muted">
                  Michael will read your note and reply directly. The design you chose
                  has stayed exactly where you left it.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
                  <DesignLink
                    to="/"
                    className="button-solid label min-h-12 px-6 py-3"
                  >
                    Return to the practice
                  </DesignLink>
                </div>
              </div>
            ) : (
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
                    defaultValue={selectedReason}
                    required
                  >
                    <option value="" disabled>
                      Select the closest fit
                    </option>
                    {enquiryReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
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
            )}
          </div>
        </div>
      </section>
    </>
  )
}
