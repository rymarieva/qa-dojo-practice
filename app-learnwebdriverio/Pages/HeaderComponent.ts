import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HeaderComponente extends BasePage {
    newArticleLink: Locator;
    userLink: Locator;

    constructor(page: Page) {
        super(page);
        this.newArticleLink = this.page.locator("a[href='/editor']");
        this.userLink = this.page.locator("//*[@data-qa-id='site-nav']//a[starts-with(@href, '/@')]");
    }
}