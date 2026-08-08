import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'
import {
  defaultRecipe,
  defaultTheme,
  designRecipes,
  getFontPack,
  getTheme,
  type DesignRecipe,
  type FontPack,
  type HeroComposition,
  type Layout,
  type Mood,
  type RadiusScale,
  type Theme,
  type TypeScale,
} from '../themes'
import type { NavigationId } from '../navigation'

export type DesignState = {
  recipe: DesignRecipe
  theme: Theme
  layout: Layout
  mood: Mood
  hero: HeroComposition
  radius: RadiusScale
  fontPack: FontPack
  typeScale: TypeScale
  navigationId: NavigationId
  generation: number
  randomize: () => void
}

const ThemeContext = createContext<DesignState>({
  recipe: defaultRecipe,
  theme: defaultTheme,
  layout: defaultRecipe.layout,
  mood: defaultRecipe.mood,
  hero: defaultRecipe.hero,
  radius: defaultRecipe.radius,
  fontPack: getFontPack(defaultRecipe.fontPackId),
  typeScale: defaultRecipe.typeScale,
  navigationId: defaultRecipe.navigationId,
  generation: 0,
  randomize: () => {},
})

function getInitialRecipeIndex() {
  if (typeof window === 'undefined') return 0
  const requestedId = new URLSearchParams(window.location.search).get('design')
  const requestedIndex = designRecipes.findIndex((recipe) => recipe.id === requestedId)
  return requestedIndex >= 0 ? requestedIndex : 0
}

function shuffledRecipeIds() {
  return designRecipes
    .map((recipe) => recipe.id)
    .sort(() => Math.random() - 0.5)
}

function applyDesign(
  theme: Theme,
  layout: Layout,
  mood: Mood,
  hero: HeroComposition,
  radius: RadiusScale,
  fontPack: FontPack,
  typeScale: TypeScale,
  navigationId: NavigationId,
) {
  const root = document.documentElement
  const { colors } = theme

  root.style.setProperty('--color-ground', colors.ground)
  root.style.setProperty('--color-ground-lift', colors.groundLift)
  root.style.setProperty('--color-card', colors.card)
  root.style.setProperty('--color-card-strong', colors.cardStrong)
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
  root.dataset.navigation = navigationId
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [recipeIndex, setRecipeIndex] = useState(getInitialRecipeIndex)
  const [generation, setGeneration] = useState(0)
  const recipe = designRecipes[recipeIndex] ?? defaultRecipe
  const theme = getTheme(recipe.themeId)
  const fontPack = getFontPack(recipe.fontPackId)
  const remainingRecipeIds = useRef(shuffledRecipeIds())

  useLayoutEffect(() => {
    applyDesign(
      theme,
      recipe.layout,
      recipe.mood,
      recipe.hero,
      recipe.radius,
      fontPack,
      recipe.typeScale,
      recipe.navigationId,
    )

    const url = new URL(window.location.href)
    if (!url.searchParams.has('design')) {
      url.searchParams.set('design', recipe.id)
      window.history.replaceState({}, '', url)
    }
  }, [theme, recipe, fontPack])

  function randomize() {
    const isEligible = (candidate: DesignRecipe) =>
      candidate.themeId !== recipe.themeId &&
      candidate.layout !== recipe.layout &&
      candidate.navigationId !== recipe.navigationId
    let eligibleIds = remainingRecipeIds.current.filter((id) => {
      const candidate = designRecipes.find((item) => item.id === id)
      return candidate ? isEligible(candidate) : false
    })

    if (eligibleIds.length === 0) {
      remainingRecipeIds.current = shuffledRecipeIds()
      eligibleIds = remainingRecipeIds.current.filter((id) => {
        const candidate = designRecipes.find((item) => item.id === id)
        return candidate ? isEligible(candidate) : false
      })
    }

    const nextId = eligibleIds[0]
    const nextIndex = designRecipes.findIndex((candidate) => candidate.id === nextId)
    const nextRecipe = designRecipes[nextIndex] ?? defaultRecipe
    remainingRecipeIds.current = remainingRecipeIds.current.filter((id) => id !== nextRecipe.id)
    const url = new URL(window.location.href)
    url.searchParams.set('design', nextRecipe.id)
    window.history.replaceState({}, '', url)

    setRecipeIndex(nextIndex)
    setGeneration((value) => value + 1)
  }

  return (
    <ThemeContext.Provider
      value={{
        recipe,
        theme,
        layout: recipe.layout,
        mood: recipe.mood,
        hero: recipe.hero,
        radius: recipe.radius,
        fontPack,
        typeScale: recipe.typeScale,
        navigationId: recipe.navigationId,
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
