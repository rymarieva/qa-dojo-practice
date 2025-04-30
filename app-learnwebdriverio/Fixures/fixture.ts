import { test as base } from '@playwright/test';
import { SignUpPage } from '../Pages/SignUpPage';
import { ArticleCreationPage } from '../Pages/ArticleCreationPage';
import { ArticlesPage } from '../Pages/ArticlePage';
import { HomePage } from '../Pages/HomePage';

type Fixture = {
    signUpPage: SignUpPage,
    articleCreationPage: ArticleCreationPage,
    articlePage: ArticlesPage,
    homePage: HomePage
}

export const test = base.extend<Fixture>({
    signUpPage: async ({ page }, use) => {
        const signUpPage = new SignUpPage(page);
        await use(signUpPage);
    },
    articleCreationPage: async ({ page }, use) => {
        const articleCreationPage = new ArticleCreationPage(page);
        await use(articleCreationPage);
    },
    articlePage: async ({ page }, use) => {
        const articlePage = new ArticlesPage(page);
        await use(articlePage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }

})