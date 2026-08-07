import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { designRecipes, getTheme } from '../src/themes'

const viewports = [
  { name: 'mobile-short', width: 320, height: 568 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop-transition', width: 1024, height: 768 },
  { name: 'desktop-short', width: 1280, height: 760 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'desktop-wide', width: 1600, height: 1000 },
] as const

function channel(value: number) {
  const normalized = value / 255
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string) {
  const value = hex.replace('#', '')
  const channels =
    value.length === 3
      ? value.split('').map((part) => Number.parseInt(part + part, 16))
      : [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16))
  return 0.2126 * channel(channels[0]) + 0.7152 * channel(channels[1]) + 0.0722 * channel(channels[2])
}

function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

async function openRecipe(page: Page, recipeId: string) {
  await page.goto(`/?design=${recipeId}`)
  await page.evaluate(() => document.fonts.ready)
}

async function assertVisibleControlsNotCovered(page: Page) {
  const controls = page.locator(
    'a[href]:not(.sr-only), button, input:not([type="hidden"]), textarea, [role="tab"]',
  )

  for (let index = 0; index < (await controls.count()); index += 1) {
    const control = controls.nth(index)
    if (!(await control.isVisible())) continue
    await control.scrollIntoViewIfNeeded()
    const hitTarget = await control.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const top = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      )
      return {
        label:
          element.getAttribute('aria-label') ??
          element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80),
        target: top?.tagName ?? null,
        reachable: Boolean(top && (element === top || element.contains(top))),
      }
    })
    expect(hitTarget.reachable, `${hitTarget.label} is covered by ${hitTarget.target}`).toBe(true)
  }
}

test.describe('curated design matrix', () => {
  for (const recipe of designRecipes) {
    for (const viewport of viewports) {
      test(`${recipe.id} is accessible at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport)
        await openRecipe(page, recipe.id)

        const state = await page.evaluate(() => {
          const root = document.documentElement
          const cta = document.querySelector<HTMLElement>('.hero-cta-button')
          const displayText = [...document.querySelectorAll<HTMLElement>('.font-display')]
            .filter((element) => {
              const style = getComputedStyle(element)
              return element.offsetParent !== null && Number.parseFloat(style.fontSize) < 18
            })
            .map((element) => ({
              text: element.textContent?.trim().slice(0, 60),
              size: getComputedStyle(element).fontSize,
            }))
          const undersizedButtons =
            innerWidth <= 768
              ? [...document.querySelectorAll<HTMLElement>('button')]
                  .filter((element) => {
                    if (element.offsetParent === null) return false
                    const rect = element.getBoundingClientRect()
                    return rect.width < 44 || rect.height < 44
                  })
                  .map((element) => element.getAttribute('aria-label') ?? element.textContent?.trim())
              : []

          return {
            horizontalOverflow: root.scrollWidth - root.clientWidth,
            ctaBottom: cta?.getBoundingClientRect().bottom ?? Number.POSITIVE_INFINITY,
            viewportHeight: innerHeight,
            displayText,
            undersizedButtons,
            design: new URLSearchParams(location.search).get('design'),
          }
        })

        expect(state.design).toBe(recipe.id)
        expect(state.horizontalOverflow).toBeLessThanOrEqual(1)
        expect(state.ctaBottom).toBeLessThanOrEqual(state.viewportHeight + 1)
        expect(state.displayText, 'serif/display text smaller than 18px').toEqual([])
        expect(state.undersizedButtons, 'mobile buttons smaller than 44px').toEqual([])

        if (viewport.width >= 768) await assertVisibleControlsNotCovered(page)

        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
        expect(results.violations).toEqual([])
      })
    }
  }
})

test.describe('desktop interaction matrix', () => {
  for (const recipe of designRecipes) {
    test(`${recipe.id} desktop controls work`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 760 })
      await openRecipe(page, recipe.id)

      const tabs = page.getByRole('tab')
      for (let index = 0; index < (await tabs.count()); index += 1) {
        await tabs.nth(index).click()
        await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true')
      }

      await page.getByRole('link', { name: 'Start a project' }).first().click()
      await expect(page.locator('#contact')).toBeInViewport()
      await expect(page.locator('form')).toHaveCount(1)

      await page.getByRole('link', { name: 'Read the seven positions' }).click()
      await expect(page).toHaveURL(/\/manifesto$/)
    })
  }
})

test.describe('manifesto recipe coverage', () => {
  for (const recipe of designRecipes) {
    test(`${recipe.id} manifesto remains accessible`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(`/manifesto?design=${recipe.id}`)
      await page.evaluate(() => document.fonts.ready)

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(1)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      expect(results.violations).toEqual([])
    })
  }
})

test('all palette tokens meet AA contrast thresholds', () => {
  for (const recipe of designRecipes) {
    const { colors } = getTheme(recipe.themeId)
    const checks = [
      ['bone/ground', colors.bone, colors.ground, 4.5],
      ['muted/ground', colors.muted, colors.ground, 4.5],
      ['faint/ground', colors.faint, colors.ground, 4.5],
      ['bone/groundLift', colors.bone, colors.groundLift, 4.5],
      ['muted/groundLift', colors.muted, colors.groundLift, 4.5],
      ['faint/groundLift', colors.faint, colors.groundLift, 4.5],
      ['accent/ground', colors.accent, colors.ground, 4.5],
      ['accent/groundLift', colors.accent, colors.groundLift, 4.5],
      ['onAccent/accent', colors.onAccent, colors.accent, 4.5],
      ['onAccent/accentDeep', colors.onAccent, colors.accentDeep, 4.5],
    ] as const

    for (const [name, foreground, background, minimum] of checks) {
      expect(
        contrast(foreground, background),
        `${recipe.id}: ${name}`,
      ).toBeGreaterThanOrEqual(minimum)
    }
  }
})

test('regeneration never repeats palette or layout consecutively', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 760 })
  await openRecipe(page, designRecipes[0].id)
  const root = page.locator('html')
  const regenerate = page.getByRole('button', { name: 'Regenerate design colors and layout' })

  for (let index = 0; index < designRecipes.length * 2; index += 1) {
    const previousLayout = await root.getAttribute('data-layout')
    const previousPalette = await root.evaluate((element) =>
      ['--color-ground', '--color-bone', '--color-accent']
        .map((token) => getComputedStyle(element).getPropertyValue(token).trim())
        .join('|'),
    )
    await regenerate.click()
    await expect.poll(() => root.getAttribute('data-layout')).not.toBe(previousLayout)
    await expect
      .poll(() =>
        root.evaluate((element) =>
          ['--color-ground', '--color-bone', '--color-accent']
            .map((token) => getComputedStyle(element).getPropertyValue(token).trim())
            .join('|'),
        ),
      )
      .not.toBe(previousPalette)
  }

  await expect(page.getByText(/Generated:/)).toHaveCount(0)
})

test('site has one accessible contact form without DOM botcheck', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await openRecipe(page, designRecipes[0].id)
  const form = page.locator('form.contact-form')

  await expect(form).toHaveCount(1)
  await expect(form.locator('input[name="botcheck"]')).toHaveCount(0)
  await expect(form.getByLabel('Name')).toHaveAttribute('required', '')
  await expect(form.getByLabel('Email')).toHaveAttribute('type', 'email')
  await expect(form.getByLabel('Message')).toHaveAttribute('required', '')
  await expect(form.getByRole('button', { name: 'Send enquiry' })).toBeEnabled()
})

test('contact form submits successfully without losing the design URL', async ({ page }) => {
  let submittedBody = ''
  await page.route('https://api.web3forms.com/submit', async (route) => {
    submittedBody = route.request().postData() ?? ''
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  })
  await openRecipe(page, designRecipes[0].id)

  await page.getByLabel('Name').fill('Test Person')
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByLabel('Message').fill('A useful test enquiry.')
  await page.getByRole('button', { name: 'Send enquiry' }).click()

  await expect(page.getByRole('status')).toHaveText('Thanks. Your message has been sent.')
  expect(submittedBody).toContain('Test Person')
  expect(submittedBody).toContain('test@example.com')
  await expect(page).toHaveURL(/design=noir/)
  await expect(page).toHaveURL(/submitted=true/)
})

test('public copy and metadata contain no em dashes', async ({ page }) => {
  await openRecipe(page, designRecipes[0].id)
  expect(await page.locator('body').innerText()).not.toContain('—')
  expect(await page.title()).not.toContain('—')
  expect(
    await page.locator('meta[name="description"]').first().getAttribute('content'),
  ).not.toContain('—')

  await page.goto('/manifesto')
  expect(await page.locator('body').innerText()).not.toContain('—')
})

test('keyboard and reduced-motion essentials remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openRecipe(page, designRecipes[0].id)

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()

  const menu = page.locator('.menu-trigger')
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')

  const revealDuration = await page.locator('.reveal').first().evaluate((element) => getComputedStyle(element).transitionDuration)
  expect(Number.parseFloat(revealDuration)).toBeLessThanOrEqual(0.001)
})
