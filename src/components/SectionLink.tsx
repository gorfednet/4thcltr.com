import type { AnchorHTMLAttributes, ReactNode } from 'react'
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
  params?: Record<string, string>
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick' | 'className' | 'children' | 'aria-current'
>

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
  params,
  ...anchorProps
}: SectionLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { recipe } = useTheme()

  const query =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : ''
  const destination = designAwarePath(
    `/${query}#${to}`,
    location.search,
    recipe.id,
  )

  const scrollTo = () => {
    document.getElementById(to)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate?.()

    navigate(destination)
    requestAnimationFrame(() => requestAnimationFrame(scrollTo))
  }

  return (
    <a
      href={destination}
      onClick={handleClick}
      className={className}
      aria-current={current}
      data-nav-key={navKey}
      {...anchorProps}
    >
      {children}
    </a>
  )
}
