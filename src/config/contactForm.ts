const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = '8ee89548-7302-4128-950b-55fed9b298d1'

export type ContactEnquiryPayload = {
  name: string
  email: string
  organisation: string
  reason: string
  message: string
}

export async function submitContactEnquiry(
  payload: ContactEnquiryPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const body = new FormData()
  body.append('access_key', WEB3FORMS_ACCESS_KEY)
  body.append('name', payload.name.trim())
  body.append('email', payload.email.trim())
  body.append('organization', payload.organisation.trim())
  body.append('reason', payload.reason)
  body.append('subject', 'New 4th Culture project enquiry')
  body.append('from_name', '4th Culture website')
  body.append(
    'message',
    `Reason for contact: ${payload.reason}\nOrganisation: ${payload.organisation.trim() || 'Not provided'}\n\n${payload.message.trim()}`,
  )
  body.append('botcheck', 'false')

  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    body,
  })

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
  return { ok: false, error: msg }
}
