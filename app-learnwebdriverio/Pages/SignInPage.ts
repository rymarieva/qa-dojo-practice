import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignInPage extends BasePage {
    
    private emailLocator: Locator;
    private passwordLocator: Locator;
    private signInButtonLocator: Locator;  

    constructor(page: Page) {
        super(page)
        this.emailLocator = this.page.locator("//input[@placeholder='Email']");
        this.passwordLocator = this.page.locator("//input[@placeholder='Password']");
        this.signInButtonLocator = this.page.locator("//button[contains(text(),'Sign in')]");
    }

    async setEmail(email: string = '') {
        await this.emailLocator.fill(email);
    }

    async setPassword(password: string = '') {
        await this.passwordLocator.fill(password);
    }

    async clicksignInButton() {
        await this.signInButtonLocator.click();
    }

    async goto(){
        this.page.goto('/login')
    }

    async signinUser(userData: {
        email?: string;
        pass?: string;
    }) {
        await this.setEmail(userData.email);
        await this.setPassword(userData.pass);
        await this.clicksignInButton();
    }
}
