import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import {
  scrollSpySections,
  type ScrollSpySectionId,
} from '../content/motion'

function getAnchorOffset(): number {
  const root = document.documentElement
  const clearance = getComputedStyle(root).getPropertyValue('--header-clearance')
  const parsed = Number.parseFloat(clearance)
  return Number.isFinite(parsed) ? parsed + 24 : 120
}

function pickActiveSection(): ScrollSpySectionId | null {
  const anchorY = getAnchorOffset()
  let bestId: ScrollSpySectionId | null = null
  let bestDistance = Infinity

  for (const { id } of scrollSpySections) {
    const el = document.getElementById(id)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    const distance = Math.abs(center - anchorY)
    if (distance < bestDistance) {
      bestDistance = distance
      bestId = id
    }
  }

  return bestId
}

export function useScrollSpy(): ScrollSpySectionId | null {
  const location = useLocation()
  const [activeId, setActiveId] = useState<ScrollSpySectionId | null>(null)

  useEffect(() => {
    if (location.pathname === '/contact') {
      setActiveId('contact')
      return
    }

    if (location.pathname !== '/') {
      setActiveId(null)
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      setActiveId(pickActiveSection())
    }

    const onScrollOrResize = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [location.pathname, location.hash])

  return activeId
}
