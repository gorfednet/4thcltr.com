import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'

type SectionLinkProps = {
  to: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
}

/**
 * Scrolls to a homepage section. If we are on another route it routes home
 * first, then scrolls once the section has mounted.
 */
export default function SectionLink({
  to,
  children,
  className = '',
  onNavigate,
}: SectionLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = () => {
    document.getElementById(to)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate?.()

    if (location.pathname === '/') {
      scrollTo()
      return
    }

    navigate('/')
    requestAnimationFrame(() => requestAnimationFrame(scrollTo))
  }

  return (
    <a href={`/#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
