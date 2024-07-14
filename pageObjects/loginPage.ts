import { Locator, expect, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.welcomeMessage = page.getByText('Welcome to the Strawberry QA Chapter website!');
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

    // GROUP ASSERTIONS
    async assertThatLoginPageIsDisplayed() {
        await this.assertThatPageURLIsCorrect()
        await this.assertThatWelcomeMessageIsDisplayed()
        await this.assertThatLoginButtonIsDisplayed()
    }
}
