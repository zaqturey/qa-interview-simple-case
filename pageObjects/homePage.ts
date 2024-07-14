import { Locator, expect, Page } from "@playwright/test";

import { BasePage } from "./basePage";

export class HomePage extends BasePage {

    readonly welcomeMessage: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page)
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

    async assertThatWelcomeMessageDisplaysCorrectFirstAndLastName(firstName: string, lastName: string) {
        await expect(this.welcomeMessage).toHaveText(`Welcome ${firstName} ${lastName}`)
    }

    async assertThatLogoutButtonIsDisplayed() {
        await this.logoutButton.isVisible()
    }

    // GROUP ASSERTIONS
    async assertThatHomePageIsDisplayed() {
        await this.waitForShortDuration();
        await this.assertThatPageURLIsCorrect()
        await this.assertThatWelcomeMessageIsDisplayed()
        await this.assertThatLogoutButtonIsDisplayed()
    }
}
