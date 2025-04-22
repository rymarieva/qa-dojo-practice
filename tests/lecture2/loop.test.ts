import {test} from '@playwright/test'

//loop
test ('order all existing coffes', async({page})=>{
    await page.goto('https://coffee-cart.app/');
   const count = await page.locator('.cup-body').count();
   for (let i = 0; i < count; i++) {
    await page.locator('.cup-body').nth(i).click();    
   }
});