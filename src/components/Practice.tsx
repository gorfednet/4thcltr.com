import { Hammer, Layers, LineChart, ScanSearch } from 'lucide-react'
import { useId, useState } from 'react'
import { facets } from '../content/site'

const facetIcons = [
  <Layers key="layers" size={18} strokeWidth={1.25} aria-hidden />,
  <LineChart key="line-chart" size={18} strokeWidth={1.25} aria-hidden />,
  <ScanSearch key="scan-search" size={18} strokeWidth={1.25} aria-hidden />,
  <Hammer key="hammer" size={18} strokeWidth={1.25} aria-hidden />,
]

export default function Practice() {
  const [active, setActive] = useState(0)
  const uid = useId()
  const facet = facets[active]

  const move = (index: number) => {
    const next = (index + facets.length) % facets.length
    setActive(next)
    requestAnimationFrame(() =>
      document.getElementById(`${uid}-tab-${next}`)?.focus(),
    )
  }

  return (
    <div className="mt-16 grid gap-px overflow-hidden border border-line-soft bg-line-soft md:grid-cols-12 lg:mt-24">
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
              className={`practice-tab group flex w-full items-center gap-4 border-b border-line-soft px-6 py-6 text-left lg:gap-5 lg:px-9 lg:py-7 ${
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
        className="practice-panel flex flex-col bg-ground p-6 sm:p-8 md:col-span-7 lg:col-span-8 lg:p-14"
      >
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
              <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent" />
              {method}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
