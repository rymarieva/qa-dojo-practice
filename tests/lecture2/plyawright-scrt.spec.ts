import { test, expect, chromium } from '@playwright/test';

test('test1', async () => {
  const browser = await chromium.launch({headless:false});

  const context = await browser.newContext();

  const page = await context.newPage();
  const page2 = await context.newPage();
  const page3 = await context.newPage();

  console.log("safs");
})

test('test', async ({page}) => {
  await page.goto('https://playwright.dev/');
})