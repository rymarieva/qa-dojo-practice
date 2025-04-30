import { ArticleEditorPage } from "./ArticleEditorPage";


export class ArticleCreationPage extends ArticleEditorPage{

    async goto() {
        await this.page.goto("/editor");
    }

    async fillAndPublishArticle(articleData: {
        title: string;
        description: string;
        body: string;
    }){
        await this.fillArticle(articleData);
        await this.publishArticle();
    }
}