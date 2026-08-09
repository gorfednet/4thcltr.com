import { expect, test } from '@playwright/test'
import { navigationIds } from '../src/navigation'
import { designRecipes } from '../src/themes'

// Visual tests intentionally sample representative appearances. The exhaustive
// recipe, viewport, accessibility, and geometry coverage lives in design-matrix.spec.ts.
const navigationViewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
] as const

const contentViewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
] as const

const fullPageViewports = [
  ...contentViewports,
  { name: 'zoom-200', width: 640, height: 450 },
] as const

const curatedRecipeIds = [
  'noir',
  'terminal',
  'paper',
  'startupblue',
  'neonhype',
  'pastelcard',
  'broadsheet',
] as const
const curatedRecipes = curatedRecipeIds.map(
  (id) => designRecipes.find((recipe) => recipe.id === id)!,
)

const contactRecipeIds = ['noir', 'paper', 'startupblue', 'neonhype'] as const
const contactRecipes = contactRecipeIds.map(
  (id) => designRecipes.find((recipe) => recipe.id === id)!,
)

test.describe('navigation-focused visual matrix', () => {
  for (const navigationId of navigationIds) {
    const recipe = designRecipes.find((candidate) => candidate.navigationId === navigationId)!
    for (const viewport of navigationViewports) {
      test(`${navigationId} navigation at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport)
        await page.goto(`/?design=${recipe.id}`)
        await page.evaluate(() => document.fonts.ready)
        const menuTrigger = page.locator('.menu-trigger')
        if (await menuTrigger.isVisible()) {
          await menuTrigger.click()
          await expect(page.locator('#navigation-panel')).toBeVisible()
        }

        const screenshot = await page.screenshot({
          animations: 'disabled',
          caret: 'hide',
          quality: 62,
          scale: 'css',
          type: 'jpeg',
        })
        expect(screenshot).toMatchSnapshot(`navigation-${navigationId}-${viewport.name}.jpeg`, {
          maxDiffPixelRatio: 0.005,
        })
      })
    }
  }
})

test.describe('responsive content focused visuals', () => {
  const recipe = designRecipes[0]
  for (const viewport of contentViewports) {
    test(`brands and career reflow at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto(`/?design=${recipe.id}`)
      await page.evaluate(() => {
        document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
          element.dataset.shown = 'true'
        })
      })

      for (const selector of ['.brands-sector-band', '.who-content']) {
        const screenshot = await page.locator(selector).screenshot({
          animations: 'disabled',
          caret: 'hide',
          quality: 68,
          scale: 'css',
          type: 'jpeg',
        })
        expect(screenshot).toMatchSnapshot(
          `${selector.slice(1)}-${viewport.name}.jpeg`,
          { maxDiffPixelRatio: 0.005 },
        )
      }
    })
  }
})

test.describe('curated visual matrix', () => {
  for (const recipe of curatedRecipes) {
    for (const viewport of fullPageViewports) {
      test(`${recipe.id} full page at ${viewport.name}`, async ({ page }) => {
        test.slow()
        await page.setViewportSize(viewport)
        await page.goto(`/?design=${recipe.id}`)
        await page.evaluate(async () => {
          await document.fonts.ready
          document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => {
            element.dataset.shown = 'true'
          })
        })

        const screenshot = await page.screenshot({
          animations: 'disabled',
          caret: 'hide',
          fullPage: true,
          quality: 62,
          scale: 'css',
          type: 'jpeg',
        })

        expect(screenshot).toMatchSnapshot(`${recipe.id}-${viewport.name}.jpeg`, {
          maxDiffPixelRatio: 0.005,
        })
      })
    }
  }
})

test.describe('contact visual matrix', () => {
  for (const recipe of contactRecipes) {
    for (const viewport of contentViewports) {
      test(`${recipe.id} contact page at ${viewport.name}`, async ({ page }) => {
        test.slow()
        await page.setViewportSize(viewport)
        await page.goto(`/contact?design=${recipe.id}`)
        await page.evaluate(() => document.fonts.ready)

        const screenshot = await page.screenshot({
          animations: 'disabled',
          caret: 'hide',
          fullPage: true,
          quality: 62,
          scale: 'css',
          type: 'jpeg',
        })

        expect(screenshot).toMatchSnapshot(`contact-${recipe.id}-${viewport.name}.jpeg`, {
          maxDiffPixelRatio: 0.005,
        })
      })
    }
  }
})
