import { Page } from "@playwright/test";
import { HomePage } from "./homePage";
import { LoginPage } from "./loginPage";

export class PageManager {
    private readonly page: Page;
    private readonly loginPageInstance: LoginPage;
    private readonly homePageInstance: HomePage;


    constructor(page: Page) {
        this.page = page;
        this.loginPageInstance = new LoginPage(page);
        this.homePageInstance = new HomePage(page);
    }

    loginPage() {
        return this.loginPageInstance;
    }

    homePage() {
        return this.homePageInstance;
    }
}
