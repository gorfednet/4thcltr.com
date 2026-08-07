import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { defaultTheme, themes, type Theme } from '../themes'

type ThemeContextValue = {
  theme: Theme
  themeIndex: number
  randomize: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  themeIndex: 0,
  randomize: () => {},
})

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const { colors, fonts, displayXl } = theme

  root.style.setProperty('--color-ground', colors.ground)
  root.style.setProperty('--color-ground-lift', colors.groundLift)
  root.style.setProperty('--color-bone', colors.bone)
  root.style.setProperty('--color-muted', colors.muted)
  root.style.setProperty('--color-faint', colors.faint)
  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-accent-deep', colors.accentDeep)
  root.style.setProperty('--color-line', colors.line)
  root.style.setProperty('--color-line-soft', colors.lineSoft)

  root.style.setProperty('--font-display', fonts.display)
  root.style.setProperty('--font-sans', fonts.sans)
  root.style.setProperty('--font-mono', fonts.mono)

  root.style.setProperty('--display-xl-line-height', displayXl.lineHeight)
  root.style.setProperty('--display-xl-letter-spacing', displayXl.letterSpacing)
  root.style.setProperty('--display-xl-font-weight', displayXl.fontWeight)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(0)
  const prevIndex = useRef(0)

  useEffect(() => {
    applyTheme(themes[themeIndex])
    prevIndex.current = themeIndex
  }, [themeIndex])

  function randomize() {
    let next: number
    do {
      next = Math.floor(Math.random() * themes.length)
    } while (next === prevIndex.current)
    setThemeIndex(next)
  }

  return (
    <ThemeContext.Provider value={{ theme: themes[themeIndex], themeIndex, randomize }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
