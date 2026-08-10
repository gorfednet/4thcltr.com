import { test, expect } from '@playwright/test'

test.describe('smoke', () => {
  test('homepage loads without fatal errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))

    const response = await page.goto('/')
    expect(response?.status()).toBeLessThan(400)

    await expect(page.locator('body')).toBeVisible()
    const title = await page.title()
    expect(title.trim().length).toBeGreaterThan(0)

    expect(errors, `page errors: ${errors.join('; ')}`).toEqual([])
  })

  test('/manifesto/ loads directly as a modal above home', async ({ page }) => {
    const response = await page.goto('/manifesto/')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.getByRole('dialog').locator('h1')).toBeVisible()
  })

  test('/contact/ redirects to the home start section', async ({ page }) => {
    const response = await page.goto('/contact/')
    expect(response?.status()).toBeLessThan(400)
    await expect(page).toHaveURL(/#contact$/)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('#contact form.contact-form')).toBeVisible()
  })
})
