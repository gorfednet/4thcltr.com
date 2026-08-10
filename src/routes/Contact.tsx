import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

/**
 * The contact form lives in the home Start section. Old /contact links
 * redirect there, preserving design and engagement params.
 */
export default function Contact() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(
      { pathname: '/', search: location.search, hash: '#contact' },
      { replace: true },
    )
  }, [location.search, navigate])

  return null
}
