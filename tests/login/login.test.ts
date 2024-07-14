import { test, expect } from '@playwright/test'
import { PageManager } from '../../pageObjects/pageManager'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    await page.goto('http://localhost:8080/login')

    const pageManager = new PageManager(page)
    const existingUser = existingUsers[0]

    await pageManager.loginPage().assertThatLoginPageIsDisplayed()
    await pageManager.loginPage().login(existingUser.email, existingUser.password)
    await pageManager.homePage().assertThatHomePageIsDisplayed()
  })
})
