import { Page } from "@playwright/test";

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // ACTIONS
    async waitForNumberOfSeconds(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000)
    }

    async waitForShortDuration() {
        await this.page.waitForTimeout(3000)
    }

    async waitForMediumDuration() {
        await this.page.waitForTimeout(5000)
    }

    async waitForLongDuration() {
        await this.page.waitForTimeout(10000)
    }
}