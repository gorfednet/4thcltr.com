import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react'

type MotionEntry = {
  el: HTMLElement
  drift: number
  inView: boolean
}

type ScrollMotionContextValue = {
  register: (id: string, el: HTMLElement, drift: number) => void
  unregister: (id: string) => void
  setInView: (id: string, inView: boolean) => void
}

const ScrollMotionContext = createContext<ScrollMotionContextValue | null>(null)

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ScrollMotionProvider({ children }: { children: ReactNode }) {
  const entriesRef = useRef<Map<string, MotionEntry>>(new Map())
  const frameRef = useRef(0)

  const updateTransforms = useCallback(() => {
    frameRef.current = 0
    if (prefersReducedMotion()) return

    const viewportMid = window.innerHeight / 2
    const viewportHeight = window.innerHeight

    for (const entry of entriesRef.current.values()) {
      if (!entry.inView) {
        entry.el.style.setProperty('--motion-y', '0px')
        continue
      }
      const rect = entry.el.getBoundingClientRect()
      const elementMid = rect.top + rect.height / 2
      const progress = (elementMid - viewportMid) / viewportHeight
      const y = progress * entry.drift * viewportHeight
      entry.el.style.setProperty('--motion-y', `${y.toFixed(2)}px`)
    }
  }, [])

  const scheduleUpdate = useCallback(() => {
    if (frameRef.current) return
    frameRef.current = window.requestAnimationFrame(updateTransforms)
  }, [updateTransforms])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const onScrollOrResize = () => scheduleUpdate()
    updateTransforms()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => updateTransforms()
    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [scheduleUpdate, updateTransforms])

  const register = useCallback(
    (id: string, el: HTMLElement, drift: number) => {
      entriesRef.current.set(id, { el, drift, inView: false })
      el.classList.add('scroll-motion')
      scheduleUpdate()
    },
    [scheduleUpdate],
  )

  const unregister = useCallback((id: string) => {
    const entry = entriesRef.current.get(id)
    if (entry) {
      entry.el.style.removeProperty('--motion-y')
      entry.el.classList.remove('scroll-motion')
    }
    entriesRef.current.delete(id)
  }, [])

  const setInView = useCallback(
    (id: string, inView: boolean) => {
      const entry = entriesRef.current.get(id)
      if (!entry) return
      entry.inView = inView
      scheduleUpdate()
    },
    [scheduleUpdate],
  )

  return (
    <ScrollMotionContext.Provider value={{ register, unregister, setInView }}>
      {children}
    </ScrollMotionContext.Provider>
  )
}

export function ScrollMotion({
  children,
  drift,
  className = '',
}: {
  children: ReactNode
  drift: number
  className?: string
}) {
  const context = useContext(ScrollMotionContext)
  const uid = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!context || prefersReducedMotion()) return
    const node = ref.current
    if (!node) return

    const id = uid
    context.register(id, node, drift)

    const observer = new IntersectionObserver(
      (entries) => {
        context.setInView(id, entries[0]?.isIntersecting ?? false)
      },
      { rootMargin: '10% 0px 10% 0px', threshold: 0 },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      context.unregister(id)
    }
  }, [context, drift, uid])

  if (!context || prefersReducedMotion()) {
    return className ? <div className={className}>{children}</div> : <>{children}</>
  }

  return (
    <div ref={ref} className={`scroll-motion-wrap ${className}`.trim()}>
      {children}
    </div>
  )
}
