import { Hammer, Layers, LineChart, ScanSearch } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { facets } from '../content/site'

const facetIcons = [
  <Layers key="layers" size={18} strokeWidth={1.25} aria-hidden />,
  <LineChart key="line-chart" size={18} strokeWidth={1.25} aria-hidden />,
  <ScanSearch key="scan-search" size={18} strokeWidth={1.25} aria-hidden />,
  <Hammer key="hammer" size={18} strokeWidth={1.25} aria-hidden />,
]

export default function Practice() {
  const [active, setActive] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const uid = useId()
  const facet = facets[active]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const updateViewport = () => setIsDesktop(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)
    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  const move = (index: number) => {
    const next = (index + facets.length) % facets.length
    setActive(next)
    requestAnimationFrame(() =>
      document
        .getElementById(`${uid}-${isDesktop ? 'tab' : 'accordion'}-${next}`)
        ?.focus(),
    )
  }

  const panelContent = (
    <>
      <p className="measure-tight font-display text-2xl italic leading-snug text-bone lg:text-[1.9rem]">
        {facet.lede}
      </p>
      <p className="label mt-10 border-t border-line-soft pt-8 text-faint lg:mt-auto">
        What that looks like
      </p>
      <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {facet.methods.map((method) => (
          <li
            key={method}
            className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-muted"
          >
            <span aria-hidden className="list-marker h-px w-4 shrink-0 bg-accent" />
            {method}
          </li>
        ))}
      </ul>
    </>
  )

  if (!isDesktop) {
    return (
      <div className="practice-shell mt-16 lg:mt-24">
        <div className="practice-accordion grid gap-3">
          {facets.map((item, index) => {
            const selected = index === active
            const buttonId = `${uid}-accordion-${index}`
            const panelId = `${uid}-accordion-panel-${index}`

            return (
              <div key={item.id} className="practice-accordion-item">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={selected}
                  aria-controls={panelId}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                      event.preventDefault()
                      move(index + 1)
                    }
                    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                      event.preventDefault()
                      move(index - 1)
                    }
                    if (event.key === 'Home') {
                      event.preventDefault()
                      move(0)
                    }
                    if (event.key === 'End') {
                      event.preventDefault()
                      move(facets.length - 1)
                    }
                  }}
                  className={`practice-tab group flex w-full items-center gap-4 border border-line-soft px-6 py-6 text-left ${
                    selected ? 'bg-ground-lift' : 'bg-ground'
                  }`}
                >
                  <span
                    className={`shrink-0 transition-colors duration-240 ${
                      selected ? 'text-accent' : 'text-faint'
                    }`}
                  >
                    {facetIcons[index]}
                  </span>
                  <span
                    className={`balance font-display text-2xl leading-tight ${
                      selected ? 'text-bone' : 'text-muted'
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
                {selected && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="practice-panel practice-accordion-panel card-surface flex flex-col p-6 sm:p-8"
                  >
                    {panelContent}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="practice-shell mt-16 grid gap-3 md:grid-cols-12 lg:mt-24">
      <div
        role="tablist"
        aria-label="4th Culture practice areas"
        aria-orientation="vertical"
        className="md:col-span-5 lg:col-span-4"
      >
        {facets.map((item, index) => {
          const selected = index === active
          return (
            <button
              key={item.id}
              id={`${uid}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                  event.preventDefault()
                  move(index + 1)
                }
                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                  event.preventDefault()
                  move(index - 1)
                }
                if (event.key === 'Home') {
                  event.preventDefault()
                  move(0)
                }
                if (event.key === 'End') {
                  event.preventDefault()
                  move(facets.length - 1)
                }
              }}
              className={`practice-tab group flex w-full items-center gap-4 border border-line-soft px-6 py-6 text-left lg:gap-5 lg:px-9 lg:py-7 ${
                selected ? 'bg-ground-lift' : 'bg-ground'
              }`}
            >
              <span
                className={`shrink-0 transition-colors duration-240 ${
                  selected ? 'text-accent' : 'text-faint'
                }`}
              >
                {facetIcons[index]}
              </span>
              <span
                className={`balance font-display text-2xl leading-tight lg:text-[1.625rem] ${
                  selected ? 'text-bone' : 'text-muted'
                }`}
              >
                {item.title}
              </span>
            </button>
          )
        })}
      </div>
      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active}`}
        className="practice-panel card-surface flex flex-col p-6 sm:p-8 md:col-span-7 lg:col-span-8 lg:p-14"
      >
        {panelContent}
      </div>
    </div>
  )
}
