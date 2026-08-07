import { ArrowRight } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import PageMeta from '../components/PageMeta'
import { submitContactEnquiry } from '../config/contactForm'
import { organizationJsonLd, personJsonLd } from '../content/jsonLd'
import { pageSeo } from '../content/seo'

const enquiryReasons = [
  'Hire Michael for a leadership role',
  'Contract or retained design leadership',
  'Build or strengthen a product or design team',
  'Product, brand or experience strategy',
  'Speaking, advisory or collaboration',
  'Something else',
]

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [honeypot, setHoneypot] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(searchParams.get('submitted') === 'true')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (honeypot.trim() !== '') {
      setSubmitted(true)
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitting(true)
    const result = await submitContactEnquiry({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      organisation: String(formData.get('organisation') ?? ''),
      reason: String(formData.get('reason') ?? ''),
      message: String(formData.get('message') ?? ''),
    })
    setSubmitting(false)

    if (result.ok) {
      setSubmitted(true)
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.set('submitted', 'true')
      setSearchParams(nextSearchParams, { replace: true })
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

      <section className="shell pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="grid-12">
          <div className="md:col-span-10 lg:col-span-7">
            <p className="label text-accent">Start a conversation</p>
            <h1 className="display-xl mt-8 text-[length:clamp(3rem,9vw,8rem)]">
              What needs
              <br />
              <span className="italic text-accent">to change?</span>
            </h1>
            <p className="measure mt-10 text-xl leading-relaxed text-muted">
              Share the situation, the stakes and what a useful outcome would look like.
              Michael reads every enquiry and replies directly.
            </p>
          </div>
        </div>

        <div className="grid-12 mt-16 lg:mt-24">
          <aside className="md:col-span-4 lg:col-span-3">
            <p className="label text-faint">Useful context</p>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <li>Your role and organisation</li>
              <li>The decision or problem at hand</li>
              <li>Any timing, team or regulatory constraints</li>
              <li>What a strong result would make possible</li>
            </ul>
          </aside>

          <div className="mt-12 md:col-span-8 md:mt-0 lg:col-span-7 lg:col-start-6">
            {submitted && (
              <p
                className="mb-8 border-l-2 border-accent bg-ground-lift p-5 text-lg text-bone"
                role="status"
              >
                Thanks. Your message has been sent. Michael will reply directly.
              </p>
            )}

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
                <select className="form-field" name="reason" defaultValue="" required>
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
                className="button-solid group min-h-12 justify-between gap-4 px-6 py-4 text-left disabled:opacity-60"
              >
                <span className="label">{submitting ? 'Sending...' : 'Send enquiry'}</span>
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
