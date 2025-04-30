import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HeaderComponente {
    page: Page;
    newArticleLink: Locator;
    userLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newArticleLink = this.page.locator("a[href='/editor']");
        this.userLink = this.page.locator("//*[@data-qa-id='site-nav']//a[starts-with(@href, '/@')]");
    }

    async gotoNewArticleCreationPage(){
        await this.newArticleLink.click();
    }
}