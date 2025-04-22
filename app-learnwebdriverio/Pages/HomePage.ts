import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage"
import { HeaderComponente } from "./HeaderComponent";

export class HomePage extends BasePage {

    header:  HeaderComponente

    constructor (page: Page) {
        super(page);
        this.header = new HeaderComponente(page);
    }

}