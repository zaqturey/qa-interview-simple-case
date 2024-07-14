import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'
import { LoginPage } from '../../pageObjects/loginPage'
import { HomePage } from '../../pageObjects/homePage'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    await page.goto('http://localhost:8080/login')

    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const existingUser = existingUsers[0]

    await loginPage.assertThatLoginPageIsDisplayed()
    await loginPage.login(existingUser.email, existingUser.password)
    await homePage.assertThatHomePageIsDisplayed()
  })
})
