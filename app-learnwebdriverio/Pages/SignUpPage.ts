import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
    
    private usernameLocator: Locator;
    private passwordLocator: Locator;
    private emailLocator: Locator;
    private signUpButtonLocator: Locator;
    errorsListLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameLocator = this.page.locator("//input[@placeholder='Username']");
        this.emailLocator = this.page.locator("//input[@placeholder='Email']");
        this.passwordLocator = this.page.locator("//input[@placeholder='Password']");
        this.signUpButtonLocator = this.page.locator("//button[contains(text(),'Sign up')]");
        this.errorsListLocator = this.page.locator("ul.error-messages li");
    }

    async goto() {
        await this.page.goto("/register")
    }

    async setUsername(username: string = "") {
        await this.usernameLocator.fill(username);
    }

    async setPassword(password: string = "") {
        await this.passwordLocator.fill(password);
    }

    async setEmail(email: string = "") {
        await this.emailLocator.fill(email);
    }

    async clicksignUpButton() {
        await this.signUpButtonLocator.click();
    }

    async registerUser(registrationData: {
        username?: string;
        email?: string;
        pass?: string;
    }) {
        await this.setUsername(registrationData.username);
        await this.setEmail(registrationData.email);
        await this.setPassword(registrationData.pass);
        await this.clicksignUpButton();
        await this.page.waitForResponse("**/api/users");
    }
}

