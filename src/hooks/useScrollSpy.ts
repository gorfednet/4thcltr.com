import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router'
import {
  scrollSpySections,
  type ScrollSpySectionId,
} from '../content/motion'

function getAnchorOffset(): number {
  const header = document.querySelector<HTMLElement>('.site-header')
  const headerBottom = header?.getBoundingClientRect().bottom
  // Place the reading anchor below the fixed header and its visual breathing room.
  return typeof headerBottom === 'number' && Number.isFinite(headerBottom)
    ? headerBottom + 48
    : 120
}

function pickActiveSection(): ScrollSpySectionId | null {
  const anchorY = getAnchorOffset()

  for (const { id } of scrollSpySections) {
    const el = document.getElementById(id)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= anchorY && rect.bottom > anchorY) return id
  }

  if (window.scrollY <= anchorY) return 'why'
  return null
}

function getHashSectionId(hash: string): ScrollSpySectionId | null {
  if (!hash) return null
  try {
    const decodedId = decodeURIComponent(hash.slice(1))
    const id = decodedId === 'proof' ? 'history' : decodedId
    return scrollSpySections.some((section) => section.id === id)
      ? (id as ScrollSpySectionId)
      : null
  } catch {
    return null
  }
}

export function useScrollSpy(): ScrollSpySectionId | null {
  const location = useLocation()
  const [homeState, setHomeState] = useState<{
    locationKey: string
    activeId: ScrollSpySectionId | null
  }>(() => ({
    locationKey: location.key,
    activeId: null,
  }))

  useLayoutEffect(() => {
    if (location.pathname !== '/') return

    let frame = 0
    const update = () => {
      frame = 0
      const activeId = pickActiveSection()
      setHomeState((current) =>
        current.locationKey === location.key &&
        current.activeId === activeId
          ? current
          : { locationKey: location.key, activeId },
      )
    }

    const onScrollOrResize = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    // A mapped hash is authoritative until scrolling settles; geometry alone
    // would briefly report the top section before the hash scroll lands.
    const hashSectionId = getHashSectionId(location.hash)
    if (hashSectionId) {
      setHomeState((current) =>
        current.locationKey === location.key &&
        current.activeId === hashSectionId
          ? current
          : { locationKey: location.key, activeId: hashSectionId },
      )
    } else {
      update()
    }
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [location.hash, location.key, location.pathname])

  if (location.pathname !== '/') return null
  return homeState.locationKey === location.key ? homeState.activeId : null
}
