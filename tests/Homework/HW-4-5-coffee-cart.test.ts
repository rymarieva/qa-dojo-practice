import { test, expect, Page } from '@playwright/test';

const url = 'https://coffee-cart.app/';

enum COFFEES {
  Espresso = "Espresso",
  EspressoMacchiato = "Espresso_Macchiato"
}
function getCoffeCupLocatorByName(page: Page, coffeeName: COFFEES) {
  return page.locator(`//*[@data-test="${coffeeName}"]`)
}


//css +
test('Espresso is added to cart by left mouse click', async ({ page }) => {
  const espressoCupLocator = await page.locator('[data-test="Espresso"]');
  const cartPageLocator = await page.locator('[aria-label="Cart page"]');
  const orderItemLocator = await page.locator('li div');

  await page.goto(url);
  await espressoCupLocator.click();
  await cartPageLocator.click();
  await expect(orderItemLocator.filter({ hasText: /^Espresso$/ })).toBeVisible();
});

//css +
test('Espresso is added to cart by right mouse click', async ({ page }) => {
  const espressoCupLocator = await page.locator('[data-test="Espresso"]');
  const cartPageLocator = await page.locator('[aria-label="Cart page"]');
  const orderItemLocator = await page.locator('li.list-item> div:nth-child(1)');
  const buttonYesLocator = await page.locator('[method="dialog"] > button:nth-child(1)');

  await page.goto(url);
  await espressoCupLocator.click({ button: 'right' });
  await buttonYesLocator.click();
  await cartPageLocator.click();
  await expect(orderItemLocator.filter({ hasText: /^Espresso$/ })).toBeVisible();
});

//css +
test('Deliting espresso from card', async ({ page }) => {
  const espressoCupLocator = await page.locator('[data-test="Espresso"]');
  const cartPageLocator = await page.locator('[aria-label="Cart page"]');
  const removeEspressoBtnLocator = await page.locator('[aria-label="Remove all Espresso"]');
  const noCoffeeLabelLocator = await page.locator('div.list > p');

  await page.goto(url);
  await espressoCupLocator.click();
  await cartPageLocator.click();
  await removeEspressoBtnLocator.click();
  await expect(noCoffeeLabelLocator).toContainText('No coffee, go add some.');
});

//css +
test('Check cart content in the pop-up cart', async ({ page }) => {
  const espressoCupLocator = await page.locator('[data-test="Espresso"]');
  const espressoMacchiatoCupLocator = await page.locator('[data-test="Espresso_Macchiato"]');
  const checkoutLocator = await page.locator('[data-test="checkout"]');
  const cartPreview = await page.locator('.cart-preview.show');
  const orderItemLocator = cartPreview.locator('li span');

  await page.goto(url);
  await espressoCupLocator.click();
  await espressoMacchiatoCupLocator.click();
  await checkoutLocator.hover();
  //await expect(cartPreview).toBeVisible();
  await expect(orderItemLocator.filter({ hasText: /^Espresso$/ })).toBeVisible();
  await expect(orderItemLocator.filter({ hasText: /^Espresso Macchiato$/ })).toBeVisible();
})

//css +
test('Translate coffee title to Chinese by double click on it', async ({ page }) => {
  await page.goto(url);
  let EspressoNameLocator = await page.locator('h4').first();
  EspressoNameLocator.dblclick();
  await expect(EspressoNameLocator).toContainText('特浓咖啡');
})

//xpath +
test('Placing an order', async ({ page }) => {
  await page.goto(url);
  const espressoMacchiatoCupLocator = await getCoffeCupLocatorByName(page, COFFEES.EspressoMacchiato);
  await espressoMacchiatoCupLocator.click();
  //await page.locator('//*[@data-test="Espresso_Macchiato"]').click();
  await page.locator('//*[@data-test="checkout"]').click();
  await page.locator('//*[@id="name"]').fill('olya');
  await page.locator('//*[@id="email"]').fill('olya@gmail.com');
  await page.locator('//*[@id="submit-payment"]').click();
  await expect(page.locator('//div[@class="snackbar success"]')).toBeVisible();
})

//xpath +
test('A gift for 3 drinks', async ({ page }) => {
  const espressoCupLocator = await page.locator('//*[@data-test="Espresso"]');
  const promoLabelLocator = page.locator('//*[@class="promo"]/span');

  await page.goto(url);
  await espressoCupLocator.click({ clickCount: 3 });
  await expect(promoLabelLocator).toContainText("It's your lucky day! Get an extra cup");
})

//xpath +
test('Increasing the number of drinks in the cart', async ({ page }) => {
  const espressoCupLocator = await page.locator('//*[@data-test="Espresso"]');
  await page.goto(url);
  await espressoCupLocator.click();
  await page.locator('//*[@href="/cart"]').click();
  let espreso = await page.locator("//ul[not(@class='cart-preview')]/li[@class='list-item']//span");
  await expect(espreso).toContainText('x 1');
  await page.locator("//ul[not(@class='cart-preview')]/li[@class='list-item']//button[@aria-label='Add one Espresso']").click();
  await expect(espreso).toContainText('x 2');
})

//xpath +-
test('Increasing the number of drinks in in the pop-up cart', async ({ page }) => {
  const espressoCupLocator = await page.locator('//*[@data-test="Espresso"]');
  const checkoutLocator = await page.locator('//*[@data-test="checkout"]');
  const cartPreview = await page.locator("//ul[@class='cart-preview show']");
  await page.goto(url);
  await espressoCupLocator.click();
  await checkoutLocator.hover();
  //await expect(cartPreview).toBeVisible();
  await page.locator("//button[@aria-label='Add one Espresso']").click();
  await expect(page.locator("//ul[@class='cart-preview show']/li[@class='list-item']//span[@class='unit-desc']")).toContainText('x 2');
})

//xpath -
test('подарункова кава має ціну 4 $', async ({ page }) => {
  await page.goto(url);
  await page.locator('[data-test="Espresso"]').click({ clickCount: 3 });
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await page.getByRole('listitem').filter({ hasText: 'cart (4)' }).click();
  await expect(page.locator('div').filter({ hasText: /^\(Discounted\) Mocha$/ })).toBeVisible();
  await expect(page.locator('#app')).toContainText('$4.00');
});

test('Order every type of coffe', async ({ page }) => {
  await page.goto(url);
  let coffeTypeName: string[] = [];
  const coffeType = await page.locator(".cup-body").all();
  for (let i = 0; i < coffeType.length; i++) {
    let coffeeName = await coffeType[i].getAttribute('data-test');
    if (coffeeName != null) {
      coffeTypeName.push(coffeeName);
    }
  }

  for (let i = 0; i < coffeTypeName.length; i++) {
    let coffeeName = coffeTypeName[i]
    await page.locator(`//*[@data-test="${coffeeName}"]`).click()
  }

  //acert

})
