import { Shuffle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const prompts = [
  'Regenerate design.',
  'Another template.',
  'Same page, new skin.',
  'Roll the AI dice.',
  'Homogenize again.',
  'Ship the vibe.',
  'Make it pop.',
  'More purple, please.',
  'Add rounded corners.',
  'Looks premium now.',
  'This one feels right.',
]

export default function RegenerateButton() {
  const { randomize, theme, layout, mood, hero, radius, fontPack, typeScale, generation } = useTheme()
  const [active, setActive] = useState(false)
  const [promptIndex, setPromptIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleClick() {
    randomize()
    setPromptIndex((value) => (value + 1) % prompts.length)
    setActive(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setActive(false), 2200)
  }

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const label =
    generation === 0
      ? null
      : `${theme.name} · ${fontPack.name} · ${layout} · ${mood} · ${hero} · ${radius} · ${typeScale}`

  return (
    <div className="hero-cta mt-5 lg:mt-6">
      <button
        type="button"
        onClick={handleClick}
        className="group relative w-full overflow-hidden border border-accent bg-transparent px-5 py-3.5 text-left transition-colors duration-300 hover:bg-accent lg:max-w-[46ch]"
        aria-label="Regenerate design colors and layout"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left bg-accent transition-transform duration-500 ease-out"
          style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
        />

        <span className="relative flex items-center justify-between gap-4">
          <span className="font-display text-base italic text-bone transition-colors duration-300 group-hover:text-on-accent lg:text-lg">
            {prompts[promptIndex]}
          </span>
          <Shuffle
            size={16}
            strokeWidth={1.25}
            aria-hidden
            className="shrink-0 text-accent transition-all duration-500 group-hover:rotate-180 group-hover:text-on-accent"
          />
        </span>
      </button>

      {label && (
        <p className="label mt-2.5 max-w-[52ch] text-faint" aria-live="polite">
          Generated: {label}
          {theme.tagline ? ` — ${theme.tagline}` : ''}
        </p>
      )}
    </div>
  )
}
