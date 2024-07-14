import { Locator, expect, Page } from "@playwright/test";

import { BasePage } from "./basePage";

export class LoginPage extends BasePage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly welcomeMessage: Locator;
    readonly signupLink: Locator;

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.welcomeMessage = page.getByText('Welcome to the Strawberry QA Chapter website!');
        this.signupLink = page.getByRole('link', { name: 'Signup' });
    }

    // ACTIONS
    /**
     * This method is used to login to the application with the given username and password.
     * @param username 
     * @param password 
     */
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async clickOnSignupLink() {
        await this.signupLink.click();
    }

    // ASSERTIONS
    async assertThatPageURLIsCorrect() {
        await expect(this.page).toHaveURL('http://localhost:8080/login')
    }

    async assertThatWelcomeMessageIsDisplayed() {
        await this.welcomeMessage.isVisible()
    }

    async assertThatLoginButtonIsDisplayed() {
        await this.loginButton.isVisible()
    }

    async assertThatSignupLinkIsDisplayed() {
        await this.signupLink.isVisible()
    }

    async assertThatSignupLinkIsNotDisplayed() {
        await expect(this.signupLink).not.toBeVisible()
    }

    // GROUP ASSERTIONS
    async assertThatLoginPageIsDisplayed() {
        await this.waitForShortDuration();
        await this.assertThatPageURLIsCorrect()
        await this.assertThatWelcomeMessageIsDisplayed()
        await this.assertThatLoginButtonIsDisplayed()
    }
}
