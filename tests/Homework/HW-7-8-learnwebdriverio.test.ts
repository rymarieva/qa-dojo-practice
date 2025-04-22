import { test, expect, Page } from '@playwright/test';

const baseUrl = "https://demo.learnwebdriverio.com";
const registerUrl = baseUrl + "/register";
const editorUrl = baseUrl + "/editor";
const usernameFieldSelector = "//input[@placeholder='Username']";
const emailFieldSelector = "//input[@placeholder='Email']";
const passwordFieldSelector = "//input[@placeholder='Password']";
const signUpBtnSelector = "//button[contains(text(),'Sign up')]";
const errorsListSelector = "ul.error-messages li";
const userLinkSelector = "(//*[@data-qa-id='site-nav']//a)[last()]";
const newArticleLinkSelector = "a[href='/editor']";
const articleTitleFieldSelector = "[data-qa-id='editor-title']";
const articleBodyFieldSelector = "[placeholder = 'Write your article (in markdown)']";
const articlePublishButtonSelector = "[data-qa-id='editor-publish']";
const articleTitleHeaderSelector = "[data-qa-id='article-title']";
const articleTitlePreviewSelector = "[data-qa-type='preview-title']";

async function RegistrationUser(page: Page, username: string, email: string, password: string) {
    await page.locator(usernameFieldSelector).fill(username);
    await page.locator(emailFieldSelector).fill(email);
    await page.locator(passwordFieldSelector).fill(password);
    await page.locator(signUpBtnSelector).click();
    await page.locator(newArticleLinkSelector).waitFor(); //чи правильно так чекати? і чи потрібно?
}

async function GreateArticle(page: Page, articleTitle: string, articleBody: string) {
    await page.goto(editorUrl);
    await page.locator(articleTitleFieldSelector).fill(articleTitle);
    await page.locator(articleBodyFieldSelector).fill(articleBody);
    await page.locator(articlePublishButtonSelector).click();
    await expect(page.locator(articleTitleHeaderSelector)).toHaveText(articleTitle); //чи правильно так чекати? і чи потрібно?
}


test('TS-0001 Registration with valid data', async ({ page }) => {
    const randomNumber = Math.random().toString().replace('.', '');
    const username = 'usertest' + randomNumber;
    const email = username + '@gmail.com';
    await page.goto(registerUrl);
    await RegistrationUser(page, username, email, 'pass');
    await expect(page.locator(userLinkSelector)).toHaveText(username);
})

test('TS-0002 Valadation errors are showen', async ({ page }) => {
    await page.goto(registerUrl); // одразу перехожимо на сторінку реєстарції, щоб прибирати зайві дії іпришвидшити тест
    await page.locator(signUpBtnSelector).click();
    await expect(page.locator(errorsListSelector)).toHaveText(['username can\'t be blank', 'email can\'t be blank']);
});

test('Register and publish article', async ({ page }) => {
    const randomNumber = Math.random().toString().replace('.', '');
    const username = 'usertest' + randomNumber;
    const email = username + '@gmail.com';
    const articleTitle = "test" + username;
    
    await page.goto(registerUrl);
    await RegistrationUser(page, username, email, 'pass');
    for (let i = 0; i < 3; i++) {
        await GreateArticle(page, articleTitle + ` ${i}`, 'test body');
    }
    await page.goto(baseUrl);
    expect(await page.locator(articleTitlePreviewSelector).filter({ hasText: articleTitle }).count()).toBe(3);

})