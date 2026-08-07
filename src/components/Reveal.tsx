import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Reveals children once on first intersection. The transition itself lives in
 * index.css so reduced-motion users get the finished state with no animation.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
