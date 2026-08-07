import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  defaultFontPack,
  defaultTheme,
  fontPacks,
  heroes,
  layouts,
  moods,
  radii,
  themes,
  typeScales,
  type FontPack,
  type HeroComposition,
  type Layout,
  type Mood,
  type RadiusScale,
  type Theme,
  type TypeScale,
} from '../themes'

export type DesignState = {
  theme: Theme
  themeIndex: number
  layout: Layout
  mood: Mood
  hero: HeroComposition
  radius: RadiusScale
  fontPack: FontPack
  typeScale: TypeScale
  generation: number
  randomize: () => void
}

const ThemeContext = createContext<DesignState>({
  theme: defaultTheme,
  themeIndex: 0,
  layout: defaultTheme.layout,
  mood: defaultTheme.mood,
  hero: defaultTheme.hero,
  radius: defaultTheme.radius,
  fontPack: defaultFontPack,
  typeScale: 'default',
  generation: 0,
  randomize: () => {},
})

function pickDifferent<T>(options: readonly T[], current: T): T {
  if (options.length < 2) return options[0]
  let next: T
  do {
    next = options[Math.floor(Math.random() * options.length)]
  } while (next === current)
  return next
}

function applyDesign(
  theme: Theme,
  layout: Layout,
  mood: Mood,
  hero: HeroComposition,
  radius: RadiusScale,
  fontPack: FontPack,
  typeScale: TypeScale,
) {
  const root = document.documentElement
  const { colors } = theme

  root.style.setProperty('--color-ground', colors.ground)
  root.style.setProperty('--color-ground-lift', colors.groundLift)
  root.style.setProperty('--color-bone', colors.bone)
  root.style.setProperty('--color-muted', colors.muted)
  root.style.setProperty('--color-faint', colors.faint)
  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-accent-deep', colors.accentDeep)
  root.style.setProperty('--color-on-accent', colors.onAccent)
  root.style.setProperty('--color-line', colors.line)
  root.style.setProperty('--color-line-soft', colors.lineSoft)

  root.style.setProperty('--font-display', fontPack.display)
  root.style.setProperty('--font-sans', fontPack.sans)
  root.style.setProperty('--font-mono', fontPack.mono)

  root.style.setProperty('--display-xl-line-height', fontPack.displayXl.lineHeight)
  root.style.setProperty('--display-xl-letter-spacing', fontPack.displayXl.letterSpacing)
  root.style.setProperty('--display-xl-font-weight', fontPack.displayXl.fontWeight)

  root.dataset.layout = layout
  root.dataset.mood = mood
  root.dataset.hero = hero
  root.dataset.radius = radius
  root.dataset.type = typeScale
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(0)
  const [layout, setLayout] = useState<Layout>(defaultTheme.layout)
  const [mood, setMood] = useState<Mood>(defaultTheme.mood)
  const [hero, setHero] = useState<HeroComposition>(defaultTheme.hero)
  const [radius, setRadius] = useState<RadiusScale>(defaultTheme.radius)
  const [fontPack, setFontPack] = useState<FontPack>(defaultFontPack)
  const [typeScale, setTypeScale] = useState<TypeScale>('default')
  const [generation, setGeneration] = useState(0)
  const prevIndex = useRef(0)

  useEffect(() => {
    applyDesign(themes[themeIndex], layout, mood, hero, radius, fontPack, typeScale)
    prevIndex.current = themeIndex
  }, [themeIndex, layout, mood, hero, radius, fontPack, typeScale])

  function randomize() {
    let nextTheme: number
    do {
      nextTheme = Math.floor(Math.random() * themes.length)
    } while (nextTheme === prevIndex.current && themes.length > 1)

    // Independently shuffle every surface so colors, type, layout, and mood
    // recombine — the joke is how interchangeable the “AI design” becomes.
    setThemeIndex(nextTheme)
    setLayout(pickDifferent(layouts, layout))
    setMood(pickDifferent(moods, mood))
    setHero(pickDifferent(heroes, hero))
    setRadius(pickDifferent(radii, radius))
    setFontPack(pickDifferent(fontPacks, fontPack))
    setTypeScale(pickDifferent(typeScales, typeScale))
    setGeneration((value) => value + 1)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[themeIndex],
        themeIndex,
        layout,
        mood,
        hero,
        radius,
        fontPack,
        typeScale,
        generation,
        randomize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
