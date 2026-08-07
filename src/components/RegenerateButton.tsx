import { Shuffle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function RegenerateButton() {
  const { randomize } = useTheme()
  const [active, setActive] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleClick() {
    randomize()
    setActive(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setActive(false), 1800)
  }

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={handleClick}
        className="group relative w-full overflow-hidden border border-accent bg-transparent px-6 py-5 text-left transition-colors duration-300 hover:bg-accent lg:max-w-[52ch]"
        aria-label="Regenerate design"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left bg-accent transition-transform duration-500 ease-out"
          style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
        />

        <span className="relative flex items-center justify-between gap-4">
          <span className="font-display text-xl italic text-bone transition-colors duration-300 group-hover:text-white lg:text-2xl">
            Regenerate design.
          </span>
          <Shuffle
            size={20}
            strokeWidth={1.25}
            aria-hidden
            className="shrink-0 text-accent transition-all duration-500 group-hover:rotate-180 group-hover:text-white"
          />
        </span>
      </button>
    </div>
  )
}
