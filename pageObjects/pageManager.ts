import { Page } from "@playwright/test";
import { HomePage } from "./homePage";
import { LoginPage } from "./loginPage";
import { SignupPage } from "./signupPage";

export class PageManager {
    
    private readonly page: Page;
    private readonly loginPageInstance: LoginPage;
    private readonly homePageInstance: HomePage;
    private readonly signupPageInstance: SignupPage;


    constructor(page: Page) {
        this.page = page;
        this.loginPageInstance = new LoginPage(page);
        this.homePageInstance = new HomePage(page);
        this.signupPageInstance = new SignupPage(page);
    }

    loginPage() {
        return this.loginPageInstance;
    }

    homePage() {
        return this.homePageInstance;
    }

    signupPage() {
        return this.signupPageInstance;
    }
}
