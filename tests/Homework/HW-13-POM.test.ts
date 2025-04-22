import { test, Locator, Page } from "@playwright/test";

const baseUrl = "https://demo.learnwebdriverio.com";
const registerUrl = baseUrl + "/register";
const singinUrl = baseUrl + "/login";

const randomNumber = '';
const testusername = '';
const testemail = '';
const password = 'pass'

const userData =
{
    randomNumber: '',
 testusername : '',
 testemail :'',
password : 'pass'
}

class SignUpPage {
    page: Page;
    usernameLocator: Locator;
    passwordLocator: Locator;
    emailLocator: Locator;
    signUpButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameLocator = this.page.locator("//input[@placeholder='Username']");
        this.emailLocator = this.page.locator("//input[@placeholder='Email']");
        this.passwordLocator = this.page.locator("//input[@placeholder='Password']");
        this.signUpButtonLocator = this.page.locator("//button[contains(text(),'Sign up')]");
    }

    async setUsername(username: string) {
        await this.usernameLocator.fill(username);
    }

    async setPassword(password: string) {
        await this.passwordLocator.fill(password);
    }

    async setEmail(email: string) {
        await this.emailLocator.fill(email);
    }

    async clicksignUpButton() {
        await this.signUpButtonLocator.click();
    }

    async registrationUser(username: string, email: string, password: string) {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.setEmail(email);
        await this.clicksignUpButton();
    }
}

class SignInPage {
    page: Page;
    emailLocator: Locator;
    passwordLocator: Locator;
    signInButtonLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailLocator = this.page.locator("//input[@placeholder='Email']");
        this.passwordLocator = this.page.locator("//input[@placeholder='Password']");
        this.signInButtonLocator = this.page.locator("//button[contains(text(),'Sign in')]");
    }

    async setEmail(email: string) {
        await this.emailLocator.fill(email);
    }

    async setPassword(password: string) {
        await this.passwordLocator.fill(password);
    }

    async clicksignInButton() {
        await this.signInButtonLocator.click();
    }

    async signinUser(email: string, password: string) {
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clicksignInButton();
    }
}


test.beforeAll(async () => {
   userData.randomNumber = Math.random().toString().replace('.', '');
    userData.testusername = 'usertest' + userData.randomNumber;
    userData.testemail = userData.testusername + '@gmail.com';
  });

test("001-33 Register user", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await page.goto(registerUrl);
    await signUpPage.registrationUser( userData.testusername, userData.testemail , userData.password);
});

test("001-33 Sign in registered user", async ({ page }) => {
    const signInPage = new SignInPage(page);
    await page.goto(singinUrl);
    await signInPage.signinUser(userData.testemail, userData.password)
});




  










    


    