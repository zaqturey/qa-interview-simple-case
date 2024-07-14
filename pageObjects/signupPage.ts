import { Locator, expect, Page } from "@playwright/test";

import { BasePage } from "./basePage";

export class SignupPage extends BasePage {
    
    readonly becomeAMemberText: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly togglePasswordVisibilityButton: Locator;
    readonly submitButton: Locator;
    readonly alreadyHaveAccountText: Locator;
    readonly loginLink: Locator;
    readonly joinUsText: Locator;

    constructor(page: Page) {
        super(page)
        this.becomeAMemberText = page.getByText("Become a member");
        this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.togglePasswordVisibilityButton = page.getByRole('button', { name: 'toggle password visibility' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.alreadyHaveAccountText = page.getByText("Already have an account?");
        this.loginLink = page.getByRole('button', { name: 'Login' });
        this.joinUsText = page.getByRole('textbox', { name: 'You should join us because:' });
    }   

    // ACTIONS
    async fillFormUsingValidCredentials(firstName: string, lastName: string, email: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickOnSubmitButton() {
        await this.submitButton.click();
    }

    // ASSERTIONS
    async assertThatPageURLIsCorrect() {
        await expect(this.page).toHaveURL('http://localhost:8080/signup')
    }

    async assertThatBecomeAMemberTextIsVisible() {
        await expect(this.becomeAMemberText).toBeVisible();
    }

    async assertThatAlreadyHaveAccountTextIsVisible() {
        await expect(this.alreadyHaveAccountText).toBeVisible();
    }

    async assertThatSubmitButtonIsEnabled() {
        await expect(this.submitButton).toBeEnabled();
    }

    // GROUP ASSERTIONS
    async assertThatSignupPageIsDisplayed() {
        await this.waitForShortDuration();
        await this.assertThatPageURLIsCorrect();
        await this.assertThatBecomeAMemberTextIsVisible();
        await this.assertThatAlreadyHaveAccountTextIsVisible();
    }

    async assertThatSubmitButtonIsDisabledIfMandatoryFormFieldsAreEmpty() {
        await this.fillFormUsingValidCredentials('', '', '', '');
        await expect(this.submitButton).toBeDisabled();
    }
}