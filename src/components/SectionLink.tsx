import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useTheme } from '../context/ThemeContext'
import { designAwarePath } from '../utils/designPath'

type SectionLinkProps = {
  to: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
  current?: 'location' | 'page'
  navKey?: string
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
  current,
  navKey,
}: SectionLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { recipe } = useTheme()

  const scrollTo = () => {
    document.getElementById(to)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate?.()

    navigate(designAwarePath(`/#${to}`, location.search, recipe.id))
    requestAnimationFrame(() => requestAnimationFrame(scrollTo))
  }

  return (
    <a
      href={designAwarePath(`/#${to}`, location.search, recipe.id)}
      onClick={handleClick}
      className={className}
      aria-current={current}
      data-nav-key={navKey}
    >
      {children}
    </a>
  )
}
