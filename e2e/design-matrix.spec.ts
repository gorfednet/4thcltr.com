import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import {
  getNavigationConstruct,
  mobileHeaderIds,
  mobileMenuCloseAtTriggerIds,
  mobileMenuIds,
  mobileNavigationIds,
  navigationIds,
} from '../src/navigation'
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

      const projectLink = page.getByRole('link', { name: 'Contact', exact: true })
      if ((await projectLink.count()) === 0) {
        await page.getByRole('button', { name: 'Menu' }).click()
      }
      await page.getByRole('link', { name: 'Contact', exact: true }).first().click()
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

test('desktop menu triggers stay separate from the wordmark', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  for (const navigationId of navigationIds) {
    const construct = getNavigationConstruct(navigationId)
    if (!construct.usesMenu) continue

    const recipe = designRecipes.find((candidate) => candidate.navigationId === navigationId)!
    await openRecipe(page, recipe.id)

    const wordmark = page.getByRole('link', { name: '4th Culture, home' }).first()
    const trigger = page.locator('.menu-trigger')
    const [wordmarkBox, triggerBox] = await Promise.all([
      wordmark.boundingBox(),
      trigger.boundingBox(),
    ])
    expect(wordmarkBox).not.toBeNull()
    expect(triggerBox).not.toBeNull()
    expect(boxesOverlap(wordmarkBox!, triggerBox!)).toBe(false)
    expect(triggerBox!.x + triggerBox!.width).toBeGreaterThan(1180)

    await trigger.click()
    const panel = page.locator('#navigation-panel')
    await expect(panel).toBeVisible()
    const panelBox = await panel.boundingBox()
    expect(panelBox).not.toBeNull()

    if (navigationId === 'side-collapsible') {
      expect(panelBox!.x).toBeLessThanOrEqual(1)
    } else if (navigationId === 'menu-dropdown' || navigationId === 'corner-launcher') {
      expect(panelBox!.x + panelBox!.width).toBeGreaterThan(1200)
    }
  }
})

test('desktop side rails keep brand and navigation top aligned', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  for (const navigationId of navigationIds) {
    if (!navigationId.startsWith('side-') || navigationId === 'side-collapsible') continue

    const recipe = designRecipes.find((candidate) => candidate.navigationId === navigationId)!
    await openRecipe(page, recipe.id)

    const wordmarkBox = await page
      .getByRole('link', { name: '4th Culture, home' })
      .first()
      .boundingBox()
    const firstNavBox = await page.locator('.primary-navigation .nav-link').first().boundingBox()
    const headerInner = page.locator('.site-header-inner')
    const headerMetrics = await headerInner.evaluate((element) => {
      const box = element.getBoundingClientRect()
      return { x: box.x, paddingLeft: Number.parseFloat(getComputedStyle(element).paddingLeft) }
    })
    expect(wordmarkBox).not.toBeNull()
    expect(firstNavBox).not.toBeNull()
    expect(wordmarkBox!.y).toBeLessThanOrEqual(48)
    expect(firstNavBox!.y).toBeGreaterThan(wordmarkBox!.y + wordmarkBox!.height)
    expect(firstNavBox!.y).toBeLessThanOrEqual(800 / 3)

    if (
      navigationId === 'side-left' ||
      navigationId === 'side-left-compact' ||
      navigationId === 'side-chapter-index'
    ) {
      expect(Math.abs(wordmarkBox!.x - (headerMetrics.x + headerMetrics.paddingLeft))).toBeLessThanOrEqual(1)
    }
  }
})

test('top navigation keeps brand and nav vertically centered', async ({ page }) => {
  const sameRowIds = [
    'top-inline',
    'top-split',
    'top-tabs',
    'top-floating-pill',
    'top-app-bar',
    'top-os-menu',
  ] as const

  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1600, height: 1000 },
  ]) {
    await page.setViewportSize(viewport)

    for (const navigationId of sameRowIds) {
      const recipe = designRecipes.find((candidate) => candidate.navigationId === navigationId)!
      await openRecipe(page, recipe.id)

      const wordmarkBox = await page.locator('.site-header .wordmark').boundingBox()
      const navLinkBox = await page.locator('.primary-navigation .nav-link').first().boundingBox()
      const navBox = await page.locator('.site-header .primary-navigation').boundingBox()
      const headerInnerBox = await page.locator('.site-header-inner').boundingBox()
      expect(wordmarkBox).not.toBeNull()
      expect(navLinkBox).not.toBeNull()
      expect(navBox).not.toBeNull()
      expect(headerInnerBox).not.toBeNull()
      expect(
        Math.abs(
          wordmarkBox!.y + wordmarkBox!.height / 2 -
            (navLinkBox!.y + navLinkBox!.height / 2),
        ),
      ).toBeLessThanOrEqual(2)
      expect(
        Math.abs(
          wordmarkBox!.y + wordmarkBox!.height / 2 -
            (headerInnerBox!.y + headerInnerBox!.height / 2),
        ),
      ).toBeLessThanOrEqual(2)

      if (navigationId === 'top-os-menu') {
        expect(navBox!.x).toBeLessThan(wordmarkBox!.x)
      } else {
        expect(navBox!.x).toBeGreaterThan(wordmarkBox!.x)
      }
    }

    const centeredRecipe = designRecipes.find(
      (candidate) => candidate.navigationId === 'top-centered',
    )!
    await openRecipe(page, centeredRecipe.id)

    const wordmarkBox = await page.locator('.site-header-inner > a').first().boundingBox()
    const navBox = await page.locator('.site-header .primary-navigation').boundingBox()
    const heroStatusBox = await page.locator('.hero-status').boundingBox()
    const headerBox = await page.locator('.site-header').boundingBox()
    expect(wordmarkBox).not.toBeNull()
    expect(navBox).not.toBeNull()
    expect(heroStatusBox).not.toBeNull()
    expect(headerBox).not.toBeNull()
    expect(wordmarkBox!.y + wordmarkBox!.height).toBeLessThanOrEqual(navBox!.y)
    expect(Math.abs(navBox!.x + navBox!.width / 2 - viewport.width / 2)).toBeLessThanOrEqual(2)
    expect(heroStatusBox!.y).toBeGreaterThanOrEqual(headerBox!.y + headerBox!.height)
  }
})

test('header wordmarks and menu triggers share a vertical center', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  for (const navigationId of navigationIds) {
    const construct = getNavigationConstruct(navigationId)
    if (!construct.usesMenu || navigationId === 'corner-launcher') continue

    const recipe = designRecipes.find((candidate) => candidate.navigationId === navigationId)!
    await openRecipe(page, recipe.id)

    const [wordmarkBox, triggerBox, headerInnerBox] = await Promise.all([
      page.locator('.site-header .wordmark').boundingBox(),
      page.locator('.site-header .menu-trigger').boundingBox(),
      page.locator('.site-header-inner').boundingBox(),
    ])
    expect(wordmarkBox).not.toBeNull()
    expect(triggerBox).not.toBeNull()
    expect(headerInnerBox).not.toBeNull()
    expect(
      Math.abs(wordmarkBox!.y + wordmarkBox!.height / 2 - (triggerBox!.y + triggerBox!.height / 2)),
    ).toBeLessThanOrEqual(2)
    expect(
      Math.abs(
        wordmarkBox!.y + wordmarkBox!.height / 2 -
          (headerInnerBox!.y + headerInnerBox!.height / 2),
      ),
    ).toBeLessThanOrEqual(2)
  }
})

test('mobile header wordmarks and menu triggers share a vertical center', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })

  for (const mobileNavigationId of mobileNavigationIds) {
    if (mobileNavigationId === 'tabs') continue

    const recipe = designRecipes.find(
      (candidate) => candidate.mobileNavigationId === mobileNavigationId,
    )!
    await openRecipe(page, recipe.id)

    const wordmarkBox = await page.locator('.site-header .wordmark').boundingBox()
    const headerInnerBox = await page.locator('.site-header-inner').boundingBox()
    expect(wordmarkBox).not.toBeNull()
    expect(headerInnerBox).not.toBeNull()
    expect(
      Math.abs(
        wordmarkBox!.y + wordmarkBox!.height / 2 -
          (headerInnerBox!.y + headerInnerBox!.height / 2),
      ),
    ).toBeLessThanOrEqual(2)

    if (mobileMenuIds.has(mobileNavigationId)) {
      const triggerBox = await page.locator('.site-header .menu-trigger').boundingBox()
      expect(triggerBox).not.toBeNull()
      expect(
        Math.abs(
          wordmarkBox!.y + wordmarkBox!.height / 2 - (triggerBox!.y + triggerBox!.height / 2),
        ),
      ).toBeLessThanOrEqual(2)
    }
  }
})

test('top headers never cover the hero proposition', async ({ page }) => {
  const desktopRecipes = navigationIds
    .map((navigationId) => designRecipes.find((recipe) => recipe.navigationId === navigationId)!)
    .filter((recipe) => ['top', 'menu', 'bottom'].includes(getNavigationConstruct(recipe.navigationId).family))

  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1600, height: 1000 },
  ]) {
    await page.setViewportSize(viewport)
    for (const recipe of desktopRecipes) {
      await openRecipe(page, recipe.id)
      const [headerBox, statusBox] = await Promise.all([
        page.locator('.site-header').boundingBox(),
        page.locator('.hero-status').boundingBox(),
      ])
      expect(headerBox).not.toBeNull()
      expect(statusBox).not.toBeNull()
      expect(statusBox!.y, `${recipe.id} header clearance`).toBeGreaterThanOrEqual(
        headerBox!.y + headerBox!.height - 1,
      )
    }
  }

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 375, height: 812 },
  ]) {
    await page.setViewportSize(viewport)
    for (const recipe of designRecipes) {
      await openRecipe(page, recipe.id)
      const [headerBox, statusBox] = await Promise.all([
        page.locator('.site-header').boundingBox(),
        page.locator('.hero-status').boundingBox(),
      ])
      expect(headerBox).not.toBeNull()
      expect(statusBox).not.toBeNull()
      expect(statusBox!.y, `${recipe.id} header clearance`).toBeGreaterThanOrEqual(
        headerBox!.y + headerBox!.height - 1,
      )
    }
  }
})

test('measured header spacing clears route intros across mobile treatments', async ({ page }) => {
  const representatives = mobileHeaderIds.map(
    (mobileHeaderId) =>
      designRecipes.find((recipe) => recipe.mobileHeaderId === mobileHeaderId)!,
  )

  await page.setViewportSize({ width: 375, height: 812 })
  for (const recipe of representatives) {
    await page.goto(`/contact?design=${recipe.id}`)
    await page.evaluate(() => document.fonts.ready)

    const geometry = await page.evaluate(() => {
      const frame = document.querySelector<HTMLElement>('.site-frame')!
      const header = document.querySelector<HTMLElement>('.site-header')!
      const headerInner = document.querySelector<HTMLElement>('.site-header-inner')!
      const heading = document.querySelector<HTMLElement>('.page-intro h1')!
      const intro = document.querySelector<HTMLElement>('.page-intro')!
      const headerStyle = getComputedStyle(header)

      return {
        measuredToken: Number.parseFloat(
          getComputedStyle(frame).getPropertyValue('--site-header-block-size'),
        ),
        expectedChrome:
          headerInner.getBoundingClientRect().height +
          Number.parseFloat(headerStyle.paddingTop) +
          Number.parseFloat(headerStyle.paddingBottom),
        headerBottom: header.getBoundingClientRect().bottom,
        headingTop: heading.getBoundingClientRect().top,
        sectionPadding: Number.parseFloat(getComputedStyle(intro).paddingBottom),
      }
    })

    expect(
      Math.abs(geometry.measuredToken - geometry.expectedChrome),
      `${recipe.mobileHeaderId} measured chrome`,
    ).toBeLessThanOrEqual(1)
    expect(geometry.headingTop, `${recipe.mobileHeaderId} intro clearance`).toBeGreaterThan(
      geometry.headerBottom,
    )
    expect(geometry.sectionPadding).toBeGreaterThanOrEqual(44)
    expect(geometry.sectionPadding).toBeLessThanOrEqual(132)
  }

  await page.goto(`/manifesto?design=${representatives[0].id}`)
  await expect(page.getByRole('heading', { name: 'A practice built between worlds.' })).toBeVisible()
  await expect(page.getByText('The fourth space', { exact: true })).toBeVisible()
})

test('shared route, theme, and section URLs load directly', async ({ page }) => {
  const theme = designRecipes.find((recipe) => recipe.id === 'noir')!

  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto(`/?design=${theme.id}`)
  await expect(page.locator('.hero-title')).toBeVisible()
  await expect(page).toHaveURL(new RegExp(`\\?design=${theme.id}$`))

  await page.goto(`/?design=${theme.id}#engage`)
  await expect(page.locator('#engage')).toBeVisible()
  const [engageBox, headerBox] = await Promise.all([
    page.locator('#engage').boundingBox(),
    page.locator('.site-header').boundingBox(),
  ])
  expect(engageBox).not.toBeNull()
  expect(headerBox).not.toBeNull()
  expect(engageBox!.y).toBeGreaterThanOrEqual(headerBox!.y + headerBox!.height - 1)
  expect(engageBox!.y).toBeLessThanOrEqual(160)

  await page.goto(`/contact?design=${theme.id}`)
  await expect(page.locator('form.contact-form')).toBeVisible()
  await expect(page).toHaveURL(new RegExp(`/contact\\?design=${theme.id}$`))

  await page.goto(`/manifesto?design=${theme.id}`)
  await expect(page.locator('article > header h1')).toBeVisible()
  await expect(page).toHaveURL(new RegExp(`/manifesto\\?design=${theme.id}$`))
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

test('desktop navigation, mobile navigation, and mobile headers are independently balanced', () => {
  const desktopCounts = navigationIds.map((navigationId) =>
    designRecipes.filter((recipe) => recipe.navigationId === navigationId).length,
  )
  const mobileCounts = mobileNavigationIds.map((mobileNavigationId) =>
    designRecipes.filter((recipe) => recipe.mobileNavigationId === mobileNavigationId).length,
  )
  const mobileHeaderCounts = mobileHeaderIds.map((mobileHeaderId) =>
    designRecipes.filter((recipe) => recipe.mobileHeaderId === mobileHeaderId).length,
  )

  expect(Math.max(...desktopCounts) - Math.min(...desktopCounts)).toBeLessThanOrEqual(1)
  expect(Math.max(...mobileCounts) - Math.min(...mobileCounts)).toBeLessThanOrEqual(1)
  expect(Math.max(...mobileHeaderCounts) - Math.min(...mobileHeaderCounts)).toBeLessThanOrEqual(1)
  expect(new Set(designRecipes.map((recipe) => recipe.navigationId))).toEqual(new Set(navigationIds))
  expect(new Set(designRecipes.map((recipe) => recipe.mobileNavigationId))).toEqual(
    new Set(mobileNavigationIds),
  )
  expect(new Set(designRecipes.map((recipe) => recipe.mobileHeaderId))).toEqual(
    new Set(mobileHeaderIds),
  )
  expect(mobileMenuCloseAtTriggerIds.size / mobileMenuIds.size).toBeGreaterThanOrEqual(0.3)
  expect(mobileMenuCloseAtTriggerIds.size / mobileMenuIds.size).toBeLessThanOrEqual(0.5)
})

test('every mobile navigation construct is usable and preserves drawer side', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })

  for (const mobileNavigationId of mobileNavigationIds) {
    const recipe = designRecipes.find(
      (candidate) => candidate.mobileNavigationId === mobileNavigationId,
    )!
    await openRecipe(page, recipe.id)
    await expect(page.locator('.site-frame')).toHaveAttribute(
      'data-mobile-navigation',
      mobileNavigationId,
    )

    const menu = page.locator('.menu-trigger')
    const primaryNavigation = page.locator('.primary-navigation')
    if (mobileMenuIds.has(mobileNavigationId)) {
      await expect(menu).toBeVisible()
      await menu.click()
      const panel = page.locator('#navigation-panel')
      await expect(panel).toBeVisible()

      if (mobileMenuCloseAtTriggerIds.has(mobileNavigationId)) {
        await expect(menu).toHaveAttribute('aria-label', 'Close menu')
        await expect(panel.getByRole('button', { name: 'Close menu' })).toBeHidden()
      } else {
        await expect(panel.getByRole('button', { name: 'Close menu' })).toBeVisible()
      }

      if (mobileNavigationId.startsWith('hamburger-')) {
        const box = await panel.boundingBox()
        expect(box).not.toBeNull()
        if (mobileNavigationId === 'hamburger-left') {
          expect(box!.x).toBeLessThanOrEqual(1)
        } else {
          expect(Math.abs(box!.x + box!.width - 375)).toBeLessThanOrEqual(1)
        }
      }

      await page.keyboard.press('Escape')
      await expect(menu).toBeFocused()
    } else {
      await expect(menu).toBeHidden()
      await expect(primaryNavigation).toBeVisible()
    }
  }
})

test('expanded mobile menus expose every destination without clipping', async ({ page }) => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 320, height: 568 },
  ]) {
    await page.setViewportSize(viewport)

    for (const mobileNavigationId of mobileMenuIds) {
      const recipe = designRecipes.find(
        (candidate) => candidate.mobileNavigationId === mobileNavigationId,
      )!
      await openRecipe(page, recipe.id)

      const trigger = page.locator('.menu-trigger')
      await trigger.click()
      const panel = page.locator('#navigation-panel')
      const panelBox = await panel.boundingBox()
      expect(panelBox).not.toBeNull()
      expect(panelBox!.y).toBeLessThanOrEqual(1)
      expect(panelBox!.y + panelBox!.height).toBeGreaterThanOrEqual(viewport.height - 1)

      const visibleControls = await panel.locator('a, button').evaluateAll((elements) =>
        elements
          .filter((element) => getComputedStyle(element).display !== 'none')
          .map((element) => {
          const box = element.getBoundingClientRect()
          return {
            height: box.height,
            top: box.top,
            bottom: box.bottom,
          }
          }),
      )
      expect(visibleControls).toHaveLength(
        mobileMenuCloseAtTriggerIds.has(mobileNavigationId) ? 5 : 6,
      )
      for (const control of visibleControls) {
        expect(control.height).toBeGreaterThan(0)
        expect(control.top).toBeGreaterThanOrEqual(0)
        expect(control.bottom).toBeLessThanOrEqual(viewport.height)
      }
    }
  }
})

test('mobile header constructs apply their intended behavior', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })

  for (const mobileHeaderId of mobileHeaderIds) {
    const recipe = designRecipes.find(
      (candidate) => candidate.mobileHeaderId === mobileHeaderId,
    )!
    await openRecipe(page, recipe.id)
    const frame = page.locator('.site-frame')
    const header = page.locator('.site-header')

    await expect(frame).toHaveAttribute('data-mobile-header', mobileHeaderId)

    if (mobileHeaderId === 'fixed-glass') {
      const backdropFilter = await header.evaluate((element) =>
        getComputedStyle(element).backdropFilter,
      )
      expect(backdropFilter).not.toBe('none')
    }

    if (mobileHeaderId === 'scroll-away') {
      await page.evaluate(() => window.scrollBy(0, 400))
      await expect
        .poll(async () => (await header.boundingBox())?.y ?? 0)
        .toBeLessThan(0)
    }
  }
})

test('desktop hamburger panels open on their trigger side', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  for (const [navigationId, side] of [
    ['side-collapsible', 'left'],
    ['menu-dropdown', 'right'],
    ['corner-launcher', 'right'],
  ] as const) {
    const recipe = designRecipes.find((candidate) => candidate.navigationId === navigationId)!
    await openRecipe(page, recipe.id)
    await page.locator('.menu-trigger').click()
    const box = await page.locator('#navigation-panel').boundingBox()
    expect(box).not.toBeNull()
    if (side === 'left') {
      expect(box!.x).toBeLessThanOrEqual(1)
    } else {
      expect(box!.x + box!.width).toBeGreaterThan(1280 / 2)
    }
  }
})

test('every desktop menu keeps a visible, reachable close path', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  for (const navigationId of navigationIds) {
    if (!getNavigationConstruct(navigationId).usesMenu) continue

    const recipe = designRecipes.find((candidate) => candidate.navigationId === navigationId)!
    await openRecipe(page, recipe.id)

    const trigger = page.locator('.menu-trigger')
    await trigger.click()
    const panel = page.locator('#navigation-panel')
    await expect(panel).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-label', 'Close menu')

    const triggerReachable = await trigger.evaluate((element) => {
      const box = element.getBoundingClientRect()
      const target = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)
      return Boolean(target && (target === element || element.contains(target)))
    })
    expect(triggerReachable).toBe(true)
    await expect(panel.getByRole('button', { name: 'Close menu' })).toBeVisible()

    if (navigationId === 'corner-launcher') {
      const [triggerBox, headerBox] = await Promise.all([
        trigger.boundingBox(),
        page.locator('.site-header').boundingBox(),
      ])
      expect(triggerBox).not.toBeNull()
      expect(headerBox).not.toBeNull()
      expect(triggerBox!.y).toBeGreaterThanOrEqual(headerBox!.y)
      expect(triggerBox!.y + triggerBox!.height).toBeLessThanOrEqual(
        headerBox!.y + headerBox!.height,
      )
    }

    if (navigationId === 'menu-fullscreen' || navigationId === 'menu-command') {
      await panel.click({ position: { x: 8, y: 8 } })
      await expect(panel).toBeHidden()
      await expect(trigger).toBeFocused()
    } else {
      await panel.getByRole('button', { name: 'Close menu' }).click()
      await expect(panel).toBeHidden()
      await expect(trigger).toBeFocused()
    }
  }
})

test('practice tabs signal hover without moving the layout', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })

  for (const recipe of [designRecipes[0], designRecipes[Math.floor(designRecipes.length / 2)], designRecipes.at(-1)!]) {
    await openRecipe(page, recipe.id)
    const tab = page.getByRole('tab', { name: 'Product & experience strategy' })
    await tab.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    const before = await tab.evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
        iconColor: getComputedStyle(element.querySelector('span')!).color,
        titleColor: getComputedStyle(element.querySelector('.font-display')!).color,
      }
    })
    await tab.hover()
    await page.waitForTimeout(300)
    const after = await tab.evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
        iconColor: getComputedStyle(element.querySelector('span')!).color,
        titleColor: getComputedStyle(element.querySelector('.font-display')!).color,
        transform: style.transform,
      }
    })
    expect(after.transform).toBe('none')
    expect(
      after.borderColor !== before.borderColor ||
        after.backgroundColor !== before.backgroundColor ||
        after.iconColor !== before.iconColor ||
        after.titleColor !== before.titleColor,
    ).toBe(true)
  }
})

test('interactive controls use a pointer cursor and the logo returns home', async ({ page }) => {
  const recipe = designRecipes[0]
  await page.goto(`/contact?design=${recipe.id}`)

  const controls = page.locator(
    'a[href], button:not(:disabled), [role="button"], [role="link"], [role="tab"], summary, label[for], select, input[type="checkbox"], input[type="radio"], input[type="submit"]',
  )
  for (let index = 0; index < (await controls.count()); index += 1) {
    const control = controls.nth(index)
    if (await control.isVisible()) {
      await expect(control).toHaveCSS('cursor', 'pointer')
    }
  }

  await page.getByRole('link', { name: '4th Culture, home' }).first().click()
  await expect(page).toHaveURL(new RegExp(`/\\?design=${recipe.id}$`))

  await page.goto(`/?design=${recipe.id}#engage`)
  await page.evaluate(() => window.scrollTo(0, 500))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)

  await page.getByRole('link', { name: '4th Culture, home' }).first().click()
  await expect(page).toHaveURL(new RegExp(`/\\?design=${recipe.id}$`))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1)
})

test('flow imagery is hidden on mobile for every design recipe', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })

  for (const recipe of designRecipes) {
    await openRecipe(page, recipe.id)
    await expect(page.locator('.hero-visual')).toBeHidden()
  }
})

test('mobile tab navigation scrolls horizontally with card-backed links', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  const tabsRecipes = designRecipes.filter((recipe) => recipe.mobileNavigationId === 'tabs')

  for (const recipe of tabsRecipes) {
    await openRecipe(page, recipe.id)
    await expect(page.locator('.site-frame')).toHaveAttribute('data-mobile-navigation', 'tabs')

    const nav = page.locator('[data-mobile-navigation="tabs"] .primary-navigation')
    const metrics = await nav.evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
    }))
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth)

    const scrolled = await nav.evaluate((element) => {
      element.scrollLeft = 48
      return element.scrollLeft
    })
    expect(scrolled).toBeGreaterThan(0)

    const linkCount = await nav.locator('.nav-link').count()
    for (let index = 0; index < linkCount; index += 1) {
      const background = await nav.locator('.nav-link').nth(index).evaluate((element) =>
        getComputedStyle(element).backgroundColor,
      )
      expect(background).not.toBe('transparent')
      expect(background).not.toMatch(/rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/)
    }
  }
})

test('primary navigation includes Contact link to contact route', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await openRecipe(page, designRecipes[0].id)

  const contactLink = page.getByRole('link', { name: 'Contact', exact: true }).first()
  await expect(contactLink).toBeVisible()
  await expect(contactLink).toHaveAttribute('href', expect.stringContaining('/contact'))
})

test('navigation links do not overlap hero wireframe imagery', async ({ page }) => {
  const tabsRecipes = designRecipes.filter((recipe) => recipe.mobileNavigationId === 'tabs')

  await page.setViewportSize({ width: 375, height: 812 })
  for (const recipe of tabsRecipes) {
    await openRecipe(page, recipe.id)

    const headerBox = await page.locator('.site-header').boundingBox()
    const visual = page.locator('.hero-visual')
    expect(headerBox).not.toBeNull()

    if (await visual.isVisible()) {
      const visualBox = await visual.boundingBox()
      expect(visualBox).not.toBeNull()
      expect(headerBox!.y + headerBox!.height).toBeLessThanOrEqual(visualBox!.y + 1)
    } else {
      await expect(visual).toBeHidden()
    }
  }

  await page.setViewportSize({ width: 1280, height: 800 })
  for (const recipe of designRecipes) {
    await openRecipe(page, recipe.id)

    const visual = page.locator('.hero-visual')
    if (!(await visual.isVisible())) continue

    const visualBox = await visual.boundingBox()
    expect(visualBox).not.toBeNull()

    const navLinks = page.locator('.primary-navigation .nav-link')
    for (let index = 0; index < (await navLinks.count()); index += 1) {
      const link = navLinks.nth(index)
      if (!(await link.isVisible())) continue

      const linkBox = await link.boundingBox()
      if (!linkBox) continue
      expect(boxesOverlap(linkBox, visualBox!)).toBe(false)
    }
  }
})

test('regeneration never repeats palette, layout or navigation consecutively', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 760 })
  await openRecipe(page, designRecipes[0].id)
  const root = page.locator('html')
  const regenerate = page.getByRole('button', { name: 'Regenerate design colors and layout' })

  for (let index = 0; index < designRecipes.length * 2; index += 1) {
    const previousLayout = await root.getAttribute('data-layout')
    const previousNavigation = await root.getAttribute('data-navigation')
    const previousMobileHeader = await root.getAttribute('data-mobile-header')
    const previousPalette = await root.evaluate((element) =>
      ['--color-ground', '--color-bone', '--color-accent']
        .map((token) => getComputedStyle(element).getPropertyValue(token).trim())
        .join('|'),
    )
    await regenerate.click()
    await expect.poll(() => root.getAttribute('data-layout')).not.toBe(previousLayout)
    await expect.poll(() => root.getAttribute('data-navigation')).not.toBe(previousNavigation)
    await expect
      .poll(() => root.getAttribute('data-mobile-header'))
      .not.toBe(previousMobileHeader)
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

test('design swaps suppress inherited motion and close open menus', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await openRecipe(page, designRecipes[0].id)

  const swapState = await page.evaluate(() => {
    document
      .querySelector<HTMLButtonElement>('[aria-label="Regenerate design colors and layout"]')
      ?.click()
    const header = document.querySelector<HTMLElement>('.site-header')!
    const stat = document.querySelector<HTMLElement>('.stat-cell')!
    return {
      transitioning: document.documentElement.dataset.designTransitioning,
      headerTransition: getComputedStyle(header).transitionDuration,
      statTransition: getComputedStyle(stat).transitionDuration,
    }
  })
  expect(swapState.transitioning).toBe('true')
  expect(swapState.headerTransition).toBe('0s')
  expect(swapState.statTransition).toBe('0s')
  await expect.poll(() => page.locator('html').getAttribute('data-design-transitioning')).toBeNull()

  const headerTransitionProperty = await page.locator('.site-header').evaluate((element) =>
    getComputedStyle(element).transitionProperty,
  )
  expect(headerTransitionProperty).not.toBe('all')

  await page.setViewportSize({ width: 375, height: 812 })
  await openRecipe(page, designRecipes[0].id)
  const trigger = page.locator('.menu-trigger')
  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await page
    .getByRole('button', { name: 'Regenerate design colors and layout' })
    .evaluate((element) => (element as HTMLButtonElement).click())
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
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
  await expect(form.getByLabel('Reason for getting in touch').locator('option')).toHaveCount(9)
  await expect(
    form
      .getByLabel('Reason for getting in touch')
      .locator('option', { hasText: 'End-to-end product design and front-end delivery' }),
  ).toHaveCount(1)
  await expect(form.getByLabel('Message')).toHaveAttribute('required', '')
  await expect(form.getByRole('button', { name: 'Send enquiry' })).toBeEnabled()
})

test('contact writing controls remain restrained in every recipe', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  for (const recipe of designRecipes) {
    await page.goto(`/contact?design=${recipe.id}`)
    const message = page.getByLabel('Message')
    const metrics = await message.evaluate((element) => {
      const style = getComputedStyle(element)
      return { radius: Number.parseFloat(style.borderRadius), height: element.getBoundingClientRect().height }
    })
    expect(metrics.radius).toBeLessThanOrEqual(8)
    expect(metrics.radius).toBeLessThan(metrics.height)
  }
})

test('hero opening and outcome stages are clean interface cards', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  for (const recipe of designRecipes) {
    await openRecipe(page, recipe.id)
    const opening = page.locator('[data-flow-stage="opening"]')
    const outcome = page.locator('[data-flow-stage="outcome"]')
    for (const stageName of ['opening', 'outcome']) {
      const stage = page.locator(`[data-flow-stage="${stageName}"]`)
      if (!(await stage.isVisible())) continue
      await expect(stage).toHaveCount(1)
      expect(await stage.locator('line').count()).toBe(0)
    }
    if ((await opening.isVisible()) && (await outcome.isVisible())) {
      const [openingBox, outcomeBox] = await Promise.all([
        opening.boundingBox(),
        outcome.boundingBox(),
      ])
      expect(openingBox).not.toBeNull()
      expect(outcomeBox).not.toBeNull()
      expect(outcomeBox!.height).toBeGreaterThanOrEqual(openingBox!.height * 0.6)
    }
  }
  expect(new Set(designRecipes.map((recipe) => recipe.hero))).toEqual(
    new Set(['split', 'split-reverse', 'stacked-center', 'stacked-flush']),
  )
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

test('public positioning includes implementation and accountable delivery', async ({ page }) => {
  await openRecipe(page, designRecipes[0].id)

  await expect(page.locator('.hero-lede')).toContainText('production front-end implementation')
  await expect(page.locator('.hero-lede')).toContainText('end-to-end delivery')
  const buildTab = page.getByRole('tab', { name: 'Design & build' })
  await expect(buildTab).toBeVisible()
  await buildTab.click()
  await expect(page.getByRole('tabpanel')).toContainText('Production front-end implementation')
  await expect(
    page.locator('#engage').getByText('trusted consultants and contractors', { exact: false }),
  ).toBeVisible()

  const description = await page
    .locator('meta[name="description"]')
    .first()
    .getAttribute('content')
  expect(description).toContain('production front-end implementation')
  expect(description).toContain('end-to-end delivery')

  const structuredData = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  ).join(' ')
  expect(structuredData).toContain('Front-end implementation')
  expect(structuredData).toContain('Agentic workflows')
})

test('keyboard and reduced-motion essentials remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openRecipe(page, designRecipes[0].id)

  const skipLink = page.getByRole('link', { name: 'Skip to content' })
  await skipLink.focus()
  await expect(skipLink).toBeFocused()

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
    await page.mouse.move(0, 0)
    await page.waitForTimeout(350)

    const gridGap = await page.locator('.hero-stats-grid').evaluate((element) => {
      const style = getComputedStyle(element)
      return Math.max(Number.parseFloat(style.gap), Number.parseFloat(style.columnGap))
    })
    expect(gridGap).toBeGreaterThanOrEqual(8)

    const cellSurface = await page.locator('.stat-cell').first().evaluate(() => {
      const cell = document.querySelector('.stat-cell')
      if (!cell) return null

      const probe = document.createElement('div')
      probe.style.background = 'var(--color-card)'
      document.body.appendChild(probe)
      const cardBg = getComputedStyle(probe).backgroundColor
      probe.remove()

      return {
        actual: getComputedStyle(cell).backgroundColor,
        expected: cardBg,
      }
    })
    expect(cellSurface?.actual, `${recipe.id} stat cell surface`).toBe(cellSurface?.expected)

    const { colors } = getTheme(recipe.themeId)
    const tokenSeparation = Math.abs(luminance(colors.ground) - luminance(colors.card))
    expect(tokenSeparation).toBeGreaterThan(0)
  }
})
