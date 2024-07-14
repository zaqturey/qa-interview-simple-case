import { test, expect } from '@playwright/test'
import { PageManager } from '../../pageObjects/pageManager'

let skipBeforeEach = false;

test.beforeEach(async ({ page }) => {
  if (skipBeforeEach) return;
  await page.goto('http://localhost:8080/signup')
})

test.describe.configure({ mode: 'serial' })

test.describe('signup form tests', () => {

  test('login page signup link navigate to Signup Page', async ({ page }) => {
    skipBeforeEach = true; 
    await page.goto('http://localhost:8080/login')
    const pageManager = new PageManager(page)
    await pageManager.loginPage().assertThatLoginPageIsDisplayed()
    await pageManager.loginPage().clickOnSignupLink()
    await pageManager.signupPage().assertThatSignupPageIsDisplayed()
    skipBeforeEach = false; 
  })

  test('submit button is disabled if mandatory form fields are empty', async ({ page }) => {
    const pageManager = new PageManager(page)
    await pageManager.signupPage().assertThatSignupPageIsDisplayed()
    await pageManager.signupPage().assertThatSubmitButtonIsDisabledIfMandatoryFormFieldsAreEmpty()
  })

  test('signup with valid credentials redirects to home page', async ({ page }) => {
    const pageManager = new PageManager(page)
    await pageManager.signupPage().assertThatSignupPageIsDisplayed()
    await pageManager.signupPage().fillFormUsingValidCredentials('Test4', 'Testsson4', 'test4@mail.com', 'testPassword!')
    await pageManager.signupPage().assertThatSubmitButtonIsEnabled()
    await pageManager.signupPage().clickOnSubmitButton()
    await pageManager.homePage().assertThatHomePageIsDisplayed()
    await pageManager.homePage().assertThatWelcomeMessageDisplaysCorrectFirstAndLastName('Test4', 'Testsson4')
  })
})
