import { test, expect, Page } from '@playwright/test';


const userData =
{
    id: '1',
    firstName: "Olha",
    lastName: "Rymarieva",
    email: "test@gmail.com",
    gender: "Female",
    mobile: "1234567890",
    dateOfBirth: "31 Jul 1991",
    subjects: ["Maths", "Chemistry"],
    hobbies: ["Sports", "Music"],
    currentAddress: "Kyiv",
    state: "Uttar Pradesh",
    city: "Lucknow"
}

const gotoAutomationPracticeForm = async (page: Page) => { await page.goto('https://demoqa.com/automation-practice-form') }

async function fillFirstName(page: Page, firstName: string) {
    await page.locator('#firstName').fill(firstName);
}

async function fillLastName(page: Page, lastName: string) {
    await page.locator('#lastName').fill(lastName);
}

async function fillEmail(page: Page, email: string) {
    await page.locator('#userEmail').fill(email);
}

async function fillMobile(page: Page, mobile: string) {
    await page.locator('#userNumber').fill(mobile);
}

async function fillDateOfBirth(page: Page, dateOfBirth: string) {
    await page.locator('#dateOfBirthInput').fill(dateOfBirth);
}

async function fillGender(page: Page, gender: string) {
    if (gender == "Male") {
        await page.getByText('Male', { exact: true }).click();
    } if (gender == "Female") {
        await page.getByText('Female', { exact: true }).click();
    } else {
        await page.getByText('Other', { exact: true }).click();
    }
}

async function fillSubjects(page: Page, subjects: string[]) {
    for (const subject of subjects) {
        await page.locator('#subjectsInput').fill(subject);
        await page.locator('.subjects-auto-complete__option').filter({ hasText: subject }).click();
    }
}

async function fillHobbies(page: Page, hobbys: string[]) {
    for (const hobby of hobbys) {
        await page.getByText(hobby, { exact: true }).click();
    }
}

async function addPicture(page: Page) {
    await page.locator('#uploadPicture').setInputFiles('D:/Git/auto-test/02-Source/AutoTest/Playwright/Prototype/tests/uploads/test.png');
}

async function fillCurrentAddress(page: Page, currentAddress: string) {
    await page.locator('#currentAddress').fill(currentAddress);
}

async function fillState(page: Page, state: string) {
    await page.locator('#state').click();
    await page.locator("//*[starts-with(@id, 'react-select-3-option-')]").filter({ hasText: state }).click();
}

async function fillCity(page: Page, city: string) {
    await page.locator('#city').click();
    await page.locator("//*[starts-with(@id, 'react-select-4-option-')]").filter({ hasText: city }).click();
}

async function getFilledGender(page: Page) {
    const gender = await page.locator("//td[normalize-space(text())='Gender']/following-sibling::td[1]").textContent();
    return gender;
}

test.beforeEach(async ({ page }) => {
    await page.route(new RegExp("ad"), (route) => {
      route.abort(); // Block the request
    });
  });

test('test', async ({ page }) => {
    await gotoAutomationPracticeForm(page);
    await fillFirstName(page, userData.firstName);
    await fillLastName(page, userData.lastName);
    await fillEmail(page, userData.email);
    await fillGender(page, userData.gender);
    await fillMobile(page, userData.mobile);
    await fillDateOfBirth(page, userData.dateOfBirth);
    await fillSubjects(page, userData.subjects);
    await fillHobbies(page, userData.hobbies);
    await addPicture(page);
    await fillCurrentAddress(page, userData.currentAddress);
    await fillState(page, userData.state);
    await fillCity(page, userData.city);
    await page.locator('#submit').click();

    expect(await getFilledGender(page)).toContain(userData.gender);

});