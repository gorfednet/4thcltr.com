const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = '8ee89548-7302-4128-950b-55fed9b298d1'

export type ContactEnquiryPayload = {
  name: string
  email: string
  organisation: string
  reason: string
  message: string
  botcheck: boolean
}

export async function submitContactEnquiry(
  payload: ContactEnquiryPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const body = {
    access_key: WEB3FORMS_ACCESS_KEY,
    name: payload.name.trim(),
    email: payload.email.trim(),
    organization: payload.organisation.trim(),
    reason: payload.reason,
    subject: 'New 4th Culture project enquiry',
    from_name: '4th Culture website',
    message: `Reason for contact: ${payload.reason}\nOrganisation: ${payload.organisation.trim() || 'Not provided'}\n\n${payload.message.trim()}`,
    // Web3Forms expects a real checkbox boolean. The former multipart
    // string "false" was non-empty and therefore treated as checked.
    botcheck: payload.botcheck,
  }

  let res: Response
  try {
    res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch {
    return {
      ok: false,
      error: 'Could not reach the mail service. Check your connection and try again.',
    }
  }

  let data: { success?: boolean; message?: string } = {}
  try {
    data = await res.json()
  } catch {
    return { ok: false, error: 'Invalid response from mail service. Please try again later.' }
  }

  if (res.ok && data.success === true) {
    return { ok: true }
  }

  const msg =
    typeof data.message === 'string' && data.message.length > 0
      ? data.message
      : 'Could not send your message. Please try again in a few minutes.'
  const error = /(?:honeypot|botcheck)/i.test(msg)
    ? 'Could not verify your submission. Refresh the page and try again.'
    : msg
  return { ok: false, error }
}
