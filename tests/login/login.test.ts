import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    await page.goto('http://localhost:8080/login')

    const existingUser = existingUsers[0]

    // Improvement 01 - Using "page.fill" to simplify filling input fields.
    await page.fill('#root form div:nth-child(1) > div > input', existingUser.email)
    await page.fill('#root form div:nth-child(2) > div > input', existingUser.password)

    // Improvement 02 - Using "await" to ensure promise are awaited and "page.click" for better readability and conciseness.
    await page.click('form .MuiButton-sizeMedium')

    // Improvement 03 - Replaced hardcoded timeout with "page.waitForSelector" to wait for element to be visible.
    await page.waitForSelector('text=Log out')
    await expect(page.locator('text=Log out')).toBeVisible()

    // Improvement 04 - Ensure the page has navigated to the correct URL
    await expect(page).toHaveURL('http://localhost:8080/')
  })
})
