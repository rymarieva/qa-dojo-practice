import { expect, Page, test } from "@playwright/test";
import { SignUpPage } from "../../../app-learnwebdriverio/Pages/SignUpPage";
import { HomePage } from "../../../app-learnwebdriverio/Pages/HomePage";
import { ArticleCreationPage } from "../../../app-learnwebdriverio/Pages/ArticleCreationPage";
import { ArticlesPage } from "../../../app-learnwebdriverio/Pages/ArticlePage";
import { faker } from "@faker-js/faker";

test('01-1 Register user with valid data', async ({ page }) => {
    const testUserData = { username: "nf3133333e1322333nfnfnf", email: "o.ry222mf333311333hfhf@gmail.com", pass: "pass" }
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    await signUpPage.goto();
    await signUpPage.registerUser(testUserData);
    await expect(homePage.header.userLink).toHaveText(testUserData.username);
})

test('01-2 Faild registration user without email', async ({ page }) => {
    const testUserData = { username: "test1", email: "", pass: "pass" }
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();
    await signUpPage.registerUser(testUserData);
    await expect(signUpPage.errorsListLocator).toHaveText("email can\'t be blank");
})

test('01-3 Register user and create article', async ({ page }) => {
    const testArticleData = {
        title: faker.commerce.productName(),
        description: faker.commerce.productMaterial(),
        body: faker.commerce.productDescription(),
    };
    const testUserData =
    {
        username: faker.person.lastName(),
        email: faker.internet.email(),
        pass: "pass"
    }
    const signUpPage = new SignUpPage(page);
    const articleCreationPage = new ArticleCreationPage(page);
    const articlePage = new ArticlesPage(page);
    await signUpPage.goto();
    await signUpPage.registerUser(testUserData);
    await articleCreationPage.goto();
    await page.waitForTimeout(1000);
    await articleCreationPage.fillAndPublishArticle(testArticleData)
    expect(await articlePage.getArticleHeaderTitle()).toContain(testArticleData.title);
})

