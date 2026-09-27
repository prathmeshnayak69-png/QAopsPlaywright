import { Page, Locator } from '@playwright/test';
export class LoginPage {

    userName: Locator;
    password: Locator;
    signInButton: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator("input[value='Login']");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();

        // Wait for the page after login
        await this.page.waitForLoadState('networkidle');
    }
}

