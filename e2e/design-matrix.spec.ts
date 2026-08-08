import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { getNavigationConstruct, navigationIds } from '../src/navigation'
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

function boxesOverlap(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}

async function assertVisibleControlsNotCovered(page: Page) {
  const controls = page.locator(
    'a[href]:not(.sr-only), button, input:not([type="hidden"]), textarea, [role="tab"]',
  )

  for (let index = 0; index < (await controls.count()); index += 1) {
    const control = controls.nth(index)
    if (!(await control.isVisible())) continue
    await control.evaluate((element) => {
      const previous = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      element.scrollIntoView({ block: 'center', inline: 'center' })
      document.documentElement.style.scrollBehavior = previous
    })
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

      const projectLink = page.getByRole('link', { name: 'Start a project', exact: true })
      if ((await projectLink.count()) === 0) {
        await page.getByRole('button', { name: 'Menu' }).click()
      }
      await page.getByRole('link', { name: 'Start a project', exact: true }).first().click()
      await expect(page).toHaveURL(new RegExp(`/contact\\?design=${recipe.id}`))
      await expect(page.locator('form')).toHaveCount(1)

      await page.goto(`/?design=${recipe.id}`)
      await page.getByRole('link', { name: 'Read the seven positions' }).click()
      await expect(page).toHaveURL(new RegExp(`/manifesto\\?design=${recipe.id}`))
    })
  }
})

test.describe('navigation construct coverage', () => {
  for (const navigationId of navigationIds) {
    const recipe = designRecipes.find((candidate) => candidate.navigationId === navigationId)!
    const construct = getNavigationConstruct(navigationId)

    test(`${navigationId} is reachable and keyboard operable`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await openRecipe(page, recipe.id)

      if (construct.usesMenu) {
        const trigger = page.locator('.menu-trigger')
        await trigger.focus()
        await page.keyboard.press('Enter')
        await expect(trigger).toHaveAttribute('aria-expanded', 'true')
        await expect(page.locator('#navigation-panel')).toHaveAttribute('aria-hidden', 'false')
        await page.keyboard.press('Escape')
        await expect(trigger).toBeFocused()
        await page.keyboard.press('Enter')
      }

      const link = page.locator(
        construct.usesMenu
          ? '#navigation-panel a[href*="#practice"]'
          : '.primary-navigation a[href*="#practice"]',
      )
      await expect(link).toBeVisible()
      const box = await link.boundingBox()
      expect(box?.height).toBeGreaterThanOrEqual(44)
      await link.focus()
      await page.keyboard.press('Enter')
      await expect(page).toHaveURL(/#practice$/)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      expect(results.violations).toEqual([])
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

test.describe('contact recipe coverage', () => {
  for (const recipe of designRecipes) {
    test(`${recipe.id} contact route remains accessible`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 })
      await page.goto(`/contact?design=${recipe.id}`)
      await page.evaluate(() => document.fonts.ready)

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(1)
      await expect(page.locator('form.contact-form')).toHaveCount(1)
      await expect(page.getByLabel('Reason for getting in touch')).not.toContainText(/music/i)
      await assertVisibleControlsNotCovered(page)

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
    expect(colors.card, `${recipe.id}: card differs from ground`).not.toBe(colors.ground)
    expect(colors.cardStrong, `${recipe.id}: selected surface differs`).not.toBe(colors.card)
    expect(colors.cardStrong, `${recipe.id}: strong surface differs from lift`).not.toBe(
      colors.groundLift,
    )
    const checks = [
      ['bone/ground', colors.bone, colors.ground, 4.5],
      ['muted/ground', colors.muted, colors.ground, 4.5],
      ['faint/ground', colors.faint, colors.ground, 4.5],
      ['bone/groundLift', colors.bone, colors.groundLift, 4.5],
      ['muted/groundLift', colors.muted, colors.groundLift, 4.5],
      ['faint/groundLift', colors.faint, colors.groundLift, 4.5],
      ['bone/card', colors.bone, colors.card, 4.5],
      ['muted/card', colors.muted, colors.card, 4.5],
      ['faint/card', colors.faint, colors.card, 4.5],
      ['bone/cardStrong', colors.bone, colors.cardStrong, 4.5],
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

test('all 20 navigation constructs are assigned to the curated catalog', () => {
  expect(new Set(designRecipes.map((recipe) => recipe.navigationId))).toEqual(
    new Set(navigationIds),
  )
})

test('regeneration never repeats palette, layout or navigation consecutively', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 760 })
  await openRecipe(page, designRecipes[0].id)
  const root = page.locator('html')
  const regenerate = page.getByRole('button', { name: 'Regenerate design colors and layout' })

  for (let index = 0; index < designRecipes.length * 2; index += 1) {
    const previousLayout = await root.getAttribute('data-layout')
    const previousNavigation = await root.getAttribute('data-navigation')
    const previousPalette = await root.evaluate((element) =>
      ['--color-ground', '--color-bone', '--color-accent']
        .map((token) => getComputedStyle(element).getPropertyValue(token).trim())
        .join('|'),
    )
    await regenerate.click()
    await expect.poll(() => root.getAttribute('data-layout')).not.toBe(previousLayout)
    await expect.poll(() => root.getAttribute('data-navigation')).not.toBe(previousNavigation)
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
  await expect(page.locator('form')).toHaveCount(0)
  await page.goto(`/contact?design=${designRecipes[0].id}`)
  const form = page.locator('form.contact-form')

  await expect(form).toHaveCount(1)
  await expect(form.locator('input[name="botcheck"]')).toHaveCount(0)
  await expect(form.getByLabel('Name')).toHaveAttribute('required', '')
  await expect(form.getByLabel('Email')).toHaveAttribute('type', 'email')
  await expect(form.getByLabel('Organisation')).toBeVisible()
  await expect(form.getByLabel('Reason for getting in touch')).toHaveAttribute('required', '')
  await expect(form.getByLabel('Reason for getting in touch').locator('option')).toHaveCount(7)
  await expect(form.getByLabel('Message')).toHaveAttribute('required', '')
  await expect(form.getByRole('button', { name: 'Send enquiry' })).toBeEnabled()
})

test('contact form submits successfully without changing design state or URL', async ({ page }) => {
  let submittedBody = ''
  let requestCount = 0
  await page.route('https://api.web3forms.com/submit', async (route) => {
    requestCount += 1
    submittedBody = route.request().postData() ?? ''
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  })
  await page.goto(`/contact?design=${designRecipes[0].id}`)
  const before = await page.locator('html').evaluate((element) => ({
    navigation: element.dataset.navigation,
    layout: element.dataset.layout,
    colors: [
      '--color-ground',
      '--color-card',
      '--color-accent',
    ].map((token) => getComputedStyle(element).getPropertyValue(token)),
  }))

  await page.getByLabel('Name').fill('Test Person')
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByLabel('Organisation').fill('Example Company')
  await page
    .getByLabel('Reason for getting in touch')
    .selectOption('Build or strengthen a product or design team')
  await page.getByLabel('Message').fill('A useful test enquiry.')
  await page.locator('form.contact-form').evaluate((form: HTMLFormElement) => {
    form.requestSubmit()
    form.requestSubmit()
  })

  const status = page.getByRole('status')
  await expect(status).toContainText('Message sent')
  await expect(status).toBeFocused()
  await expect(page.locator('form')).toHaveCount(0)
  expect(submittedBody).toContain('Test Person')
  expect(submittedBody).toContain('test@example.com')
  expect(submittedBody).toContain('Example Company')
  expect(submittedBody).toContain('Build or strengthen a product or design team')
  await expect(page).toHaveURL(/design=noir/)
  await expect(page).not.toHaveURL(/submitted=/)
  expect(requestCount).toBe(1)
  expect(
    await page.locator('html').evaluate((element) => ({
      navigation: element.dataset.navigation,
      layout: element.dataset.layout,
      colors: [
        '--color-ground',
        '--color-card',
        '--color-accent',
      ].map((token) => getComputedStyle(element).getPropertyValue(token)),
    })),
  ).toEqual(before)
})

test('contact form failure stays editable and reports the error', async ({ page }) => {
  await page.route('https://api.web3forms.com/submit', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ success: false, message: 'Please try again.' }),
    }),
  )
  await page.goto(`/contact?design=${designRecipes[0].id}`)
  await page.getByLabel('Name').fill('Test Person')
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByLabel('Reason for getting in touch').selectOption('Something else')
  await page.getByLabel('Message').fill('A useful test enquiry.')
  await page.getByRole('button', { name: 'Send enquiry' }).click()

  await expect(page.getByRole('alert')).toHaveText('Please try again.')
  await expect(page.locator('form.contact-form')).toBeVisible()
  await expect(page.getByLabel('Message')).toHaveValue('A useful test enquiry.')
})

test('a bare route loads the default recipe and a direct design link remains deterministic', async ({ page }) => {
  await page.goto('/contact')
  await expect(page).toHaveURL(new RegExp(`design=${designRecipes[0].id}`))
  const persisted = new URL(page.url()).searchParams.get('design')
  expect(persisted).toBe(designRecipes[0].id)

  const requested = designRecipes.at(-1)!
  await page.goto(`/manifesto?design=${requested.id}`)
  await expect(page.locator('html')).toHaveAttribute('data-navigation', requested.navigationId)
})

test('brands and career reflow in chronological readable columns', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 })
  await openRecipe(page, designRecipes[0].id)

  const careerCards = page.locator('[aria-labelledby="career-heading"] > ol > li')
  const tabletBoxes = await careerCards.evaluateAll((elements) =>
    elements.slice(0, 3).map((element) => element.getBoundingClientRect()),
  )
  expect(new Set(tabletBoxes.map((box) => Math.round(box.left))).size).toBe(1)

  const sectorBottom = await page
    .locator('.brands-sector-band > div')
    .first()
    .evaluate((element) => element.getBoundingClientRect().bottom)
  const brandsTop = await page
    .locator('.brands-sector-band > div')
    .nth(1)
    .evaluate((element) => element.getBoundingClientRect().top)
  expect(brandsTop).toBeGreaterThan(sectorBottom)

  await page.setViewportSize({ width: 1440, height: 900 })
  const desktopBoxes = await careerCards.evaluateAll((elements) =>
    elements.slice(0, 4).map((element) => element.getBoundingClientRect()),
  )
  expect(new Set(desktopBoxes.map((box) => Math.round(box.left))).size).toBe(2)
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

  await page.goto('/contact')
  expect(await page.locator('body').innerText()).not.toContain('—')
  await expect(page).toHaveTitle(/Contact Michael Duncan McArthur/)
  await expect(page.locator('link[rel="canonical"]').last()).toHaveAttribute(
    'href',
    'https://4thcltr.com/contact',
  )
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

test('hero copy, CTA, and visual do not overlap at desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  for (const recipe of designRecipes) {
    await openRecipe(page, recipe.id)

    const titleBox = await page.locator('.hero-title').boundingBox()
    const ctaBox = await page.locator('.hero-cta').boundingBox()

    if (titleBox && ctaBox) {
      expect(titleBox.y + titleBox.height).toBeLessThanOrEqual(ctaBox.y + 1)
    }

    const visual = page.locator('.hero-visual')
    if (await visual.isVisible()) {
      const copyBox = await page.locator('.hero-copy').boundingBox()
      const visualBox = await visual.boundingBox()

      if (copyBox && visualBox) {
        expect(boxesOverlap(copyBox, visualBox)).toBe(false)
      }
    }
  }
})

test('hero stat cards separate from the body and use gutter spacing', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  for (const recipe of designRecipes) {
    await openRecipe(page, recipe.id)

    const gridGap = await page.locator('.hero-stats-grid').evaluate((element) => {
      const style = getComputedStyle(element)
      return Math.max(Number.parseFloat(style.gap), Number.parseFloat(style.columnGap))
    })
    expect(gridGap).toBeGreaterThanOrEqual(8)

    const cellUsesCardSurface = await page.locator('.stat-cell').first().evaluate(() => {
      const cell = document.querySelector('.stat-cell')
      if (!cell) return false

      const probe = document.createElement('div')
      probe.style.background = 'var(--color-card)'
      document.body.appendChild(probe)
      const cardBg = getComputedStyle(probe).backgroundColor
      probe.remove()

      return getComputedStyle(cell).backgroundColor === cardBg
    })
    expect(cellUsesCardSurface).toBe(true)

    const { colors } = getTheme(recipe.themeId)
    const tokenSeparation = Math.abs(luminance(colors.ground) - luminance(colors.card))
    expect(tokenSeparation).toBeGreaterThan(0)
  }
})
