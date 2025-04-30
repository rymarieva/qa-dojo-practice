import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ArticleEditorPage } from "./ArticleEditorPage";

export class ArticlesPage extends BasePage {
    public editArticleButtonLocator: Locator;
    public deliteArticleButtonLocator: Locator;
    private articleHeaderTitleLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.editArticleButtonLocator = page.locator("data-qa-id='article-edit'");
        this.deliteArticleButtonLocator = page.locator("data-qa-id='article-delete'");
        this.articleHeaderTitleLocator = page.locator(`[data-qa-id="article-title"]`);
    }


    getArticleLocatorByTitle(title: string) {
        return this.page.getByRole("heading", {name: title});
    }

    async goToEditArticlePage() {
        await this.editArticleButtonLocator.click();
    }

    async removeArticle() {
        await this.deliteArticleButtonLocator.click();
    }

    async getArticleHeaderTitle() {
        const articleHeaderTitle = await this.articleHeaderTitleLocator.textContent();
        return articleHeaderTitle;
      }

}
