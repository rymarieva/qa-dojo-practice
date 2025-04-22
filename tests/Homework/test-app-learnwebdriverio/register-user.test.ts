import { expect, Page, test } from "@playwright/test";
import { SignUpPage } from "../../../app-learnwebdriverio/Pages/SignUpPage";
import { HomePage } from "../../../app-learnwebdriverio/Pages/HomePage";

test('01-1 Register user with valid data', async ({ page }) => {
    const testUserData = { username: "nf313311322333nfnfnf", email: "o.ry222mf333311333hfhf@gmail.com", pass: "pass" }
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    await signUpPage.goto();
    await signUpPage.registerUser(testUserData);  
    await expect(homePage.header.userLink).toHaveText(testUserData.username);
})

test('01-2 Faild registration user without email', async ({ page }) => {
    const testUserData = { username: "test", email: "", pass: "pass" }
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();
    await signUpPage.registerUser(testUserData);
    await expect(signUpPage.errorsListLocator).toHaveText("email can\'t be blank");
})

