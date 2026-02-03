import { test, expect } from '@playwright/test'

test('homepage loads and displays content', async ({ page }) => {
  await page.goto('/')
  
  // Check header elements
  await expect(page.locator('text=Vixion Play')).toBeVisible()
  await expect(page.locator('text=Cinema-grade streaming')).toBeVisible()
  
  // Check catalog section
  await expect(page.locator('h2:has-text("Catálogo")')).toBeVisible()
  await expect(page.locator('text=Explore recomendações')).toBeVisible()
})

test('signin page loads correctly', async ({ page }) => {
  await page.goto('/signin')
  
  await expect(page.locator('h1:has-text("Entrar")')).toBeVisible()
  await expect(page.locator('input[placeholder="Email"]')).toBeVisible()
  await expect(page.locator('input[placeholder="Password"]')).toBeVisible()
  await expect(page.locator('button:has-text("Entrar")')).toBeVisible()
})

test('signin and redirect to homepage', async ({ page }) => {
  await page.goto('/signin')
  
  // Fill in credentials
  await page.fill('input[placeholder="Email"]', 'demo@vixion.test')
  await page.fill('input[placeholder="Password"]', 'demo')
  await page.click('button:has-text("Entrar")')
  
  // Should redirect to homepage
  await page.waitForURL('/')
  await expect(page.locator('h2:has-text("Catálogo")')).toBeVisible()
})

test('title page loads with video player', async ({ page }) => {
  await page.goto('/title/m1')
  
  // Check title information
  await expect(page.locator('h1')).toContainText('A Última Aurora')
  await expect(page.locator('text=2025')).toBeVisible()
  await expect(page.locator('text=Drama')).toBeVisible()
})

test('catalog page is accessible', async ({ page }) => {
  await page.goto('/catalog')
  await expect(page.locator('text=Catálogo')).toBeVisible()
})
