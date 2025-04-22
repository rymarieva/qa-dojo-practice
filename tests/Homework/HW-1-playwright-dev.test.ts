import { test, expect } from "@playwright/test";

test("Playwright - Discord Servers page opened by Discord server link", async ({
  page,
}) => {
  await page.goto("https://playwright.dev/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Discord server" }).click();
  const page1 = await page1Promise;
  await expect(
    page1.getByRole("banner").getByRole("link").filter({ hasText: /^$/ })
  ).toBeVisible();
  await expect(page1).toHaveURL(
    "https://discord.com/servers/playwright-807756831384403968"
  );
  await expect(page1).toHaveTitle("Playwright - Discord Servers");
});

test("Chanche documentation for .NET", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("button", { name: "Node.js" }).click();
  await page
    .getByLabel("Main", { exact: true })
    .getByRole("link", { name: ".NET" })
    .click();
  await expect(
    page.getByLabel("Main", { exact: true }).locator("b")
  ).toContainText("Playwright for .NET");
});

test("Serch founds element in documentation", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("button", { name: "Search (Command+K)" }).click();
  await page.getByRole("searchbox", { name: "Search" }).fill("tohaveurl");
  await expect(page.locator("#docsearch-hits0-item-0")).toContainText(
    "toHaveURL"
  );
});

test("Go to test generator documentation", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: "Docs" }).click();
  await page.getByRole("link", { name: "Test generator" }).click();
  await expect(page.getByText("GuidesTest generator")).toBeVisible();
});

test("Changing to dark theme", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("button", { name: "Switch between dark and light" }).click();
  const attribute = await page.locator("html").getAttribute("data-theme");
  await expect(attribute).toContain("dark");
});
