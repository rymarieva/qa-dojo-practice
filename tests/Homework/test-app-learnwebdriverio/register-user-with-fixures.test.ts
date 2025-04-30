import { expect, Page } from "@playwright/test";
import { test } from "../../../app-learnwebdriverio/Fixures/fixture.ts";
import { faker } from "@faker-js/faker";

test('02-1 Register user with valid data with fixture', async ({ signUpPage, homePage }) => {
    const testUserData =
    {
        username: faker.person.lastName().toLowerCase(),
        email: faker.internet.email(),
        pass: "pass"
    }
    await signUpPage.goto();
    await signUpPage.registerUser(testUserData);
    await expect(homePage.header.userLink).toContainText(testUserData.username.trim());
})

test('01-2 Faild registration user without email', async ({ signUpPage }) => {
    const testUserData = { username: "test1", email: "", pass: "pass" }
    await signUpPage.goto();
    await signUpPage.registerUser(testUserData);
    await expect(signUpPage.errorsListLocator).toHaveText("email can\'t be blank");
})

test('01-3 Register user and create article', async ({ signUpPage, articleCreationPage, articlePage }) => {
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

    await signUpPage.goto();
    await signUpPage.registerUser(testUserData);
    await articleCreationPage.goto();
    await articleCreationPage.fillAndPublishArticle(testArticleData)
    expect(await articlePage.getArticleHeaderTitle()).toContain(testArticleData.title);
})

