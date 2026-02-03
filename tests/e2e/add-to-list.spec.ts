import { test, expect } from '@playwright/test'

// This test requires a working Supabase backend
// Set SKIP_SUPABASE_TESTS=true to skip this test in local development
test('signin demo, add to list and verify', async ({ page }) => {
  // Skip if Supabase is not configured (optional - set env var to skip)
  test.skip(process.env.SKIP_SUPABASE_TESTS === 'true', 'Supabase backend not configured')
  
  // Sign in demo
  await page.goto('/signin')
  await page.fill('input[placeholder="Email"]', 'demo@vixion.test')
  await page.fill('input[placeholder="Password"]', 'demo')
  await page.click('button:has-text("Entrar")')
  await page.waitForURL('/')

  // Open a title page
  await page.goto('/title/m1')
  await expect(page.locator('h1')).toContainText('A Última Aurora')

  // Click add to list
  await page.click('button:has-text("Adicionar à Minha Lista")')
  
  // Wait for button to change (requires Supabase backend)
  await page.waitForSelector('button:has-text("Adicionado")', { timeout: 5000 })
  
  // Go to my-list and check
  await page.goto('/my-list')
  await expect(page.locator('text=A Última Aurora')).toBeVisible()
})
