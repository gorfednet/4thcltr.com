import { expect, test } from '@playwright/test'
import { designRecipes } from '../src/themes'

const visualViewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop-short', width: 1280, height: 760 },
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'desktop-wide', width: 1600, height: 1000 },
  { name: 'zoom-200', width: 640, height: 450 },
] as const

const contactViewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'zoom-200', width: 640, height: 450 },
] as const

test.describe('curated visual matrix', () => {
  for (const recipe of designRecipes) {
    for (const viewport of visualViewports) {
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
  for (const recipe of designRecipes) {
    for (const viewport of contactViewports) {
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
