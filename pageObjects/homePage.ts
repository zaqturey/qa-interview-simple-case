import { Locator, expect, Page } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly welcomeMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.welcomeMessage = page.getByText('Welcome')
        this.logoutButton = page.getByRole('button', { name: 'Log out' })
    }

    // ACTIONS
    async logout() {
        await this.logoutButton.click()
    }

    // ASSERTIONS
    async assertThatPageURLIsCorrect() {
        await expect(this.page).toHaveURL('http://localhost:8080/')
    }

    async assertThatWelcomeMessageIsDisplayed() {
        await this.welcomeMessage.isVisible()
    }

    async assertThatLogoutButtonIsDisplayed() {
        await this.logoutButton.isVisible()
    }

    // GROUP ASSERTIONS
    async assertThatHomePageIsDisplayed() {
        await this.assertThatPageURLIsCorrect()
        await this.assertThatWelcomeMessageIsDisplayed()
        await this.assertThatLogoutButtonIsDisplayed()
    }
}
