import { Shuffle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function RegenerateButton() {
  const { randomize, generation } = useTheme()
  const [active, setActive] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleClick() {
    randomize()
    if (activateTimer.current) clearTimeout(activateTimer.current)
    if (timer.current) clearTimeout(timer.current)
    setActive(false)
    activateTimer.current = setTimeout(() => {
      setActive(true)
      timer.current = setTimeout(() => setActive(false), 2200)
    }, 80)
  }

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
      if (activateTimer.current) clearTimeout(activateTimer.current)
    },
    [],
  )

  return (
    <div className="hero-cta mt-4 lg:mt-5">
      <button
        type="button"
        onClick={handleClick}
        data-active={active ? 'true' : 'false'}
        className="hero-cta-button group relative min-h-11 w-full overflow-hidden border border-accent bg-transparent px-5 py-3 text-left transition-colors duration-300 hover:bg-accent lg:max-w-[46ch]"
        aria-label="Regenerate design colors and layout"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left bg-accent transition-transform duration-500 ease-out"
          style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
        />

        <span className="relative flex items-center justify-between gap-4">
          <span
            className={`hero-cta-label font-sans text-base font-medium transition-colors duration-300 group-hover:text-on-accent lg:text-lg ${
              active ? 'text-on-accent' : 'text-bone'
            }`}
          >
            Regenerate design
          </span>
          <Shuffle
            size={16}
            strokeWidth={1.25}
            aria-hidden
            className={`hero-cta-icon shrink-0 transition-all duration-500 group-hover:rotate-180 group-hover:text-on-accent ${
              active ? 'text-on-accent' : 'text-accent'
            }`}
          />
        </span>
      </button>

      <p className="sr-only" aria-live="polite">
        {generation > 0 ? 'Design refreshed.' : ''}
      </p>
    </div>
  )
}
