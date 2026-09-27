const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const { json } = require('node:stream/consumers');
const dataSet=JSON.parse(JSON.stringify(require('../utils/ClientAppPo.testdata.json')));


test.skip('Browser context Playwright test',async ({page})=>
{
await page.goto('https://rahulshettyacademy.com/client');
await page.getByText('Register here').click();
await page.locator('#firstName').fill("John");
await page.locator("[placeholder='Last Name']").fill("Doe");
await page.locator('[type = "email"]').fill("johndoe123@example.com");
await page.locator("[type='text']").fill("9898769456");
await page.locator("[placeholder = 'Passsword']").fill("Password123");
await page.locator('#confirmPassword').fill("Password123");
await page.locator('input[formcontrolname="required"]').click();
await page.locator('#login').click();

});

for(const data of dataSet)
{

test.only(`Client login page for ${data.productName}`, async ({page})=>
{

const products = page.locator('.card-body');
const loginPage = new LoginPage(page);

await loginPage.goTo();

// Get credentials from .env file

const username = process.env[data.user + "_USERNAME"];
const password = process.env[data.user + "_PASSWORD"];

// Check if credentials are available
        if (!username || !password)
        {
            throw new Error(`Credentials are missing for ${data.user}`);
        }

await loginPage.validLogin(username, password);

await expect(page.locator('.card-body b').first()).toBeVisible();

const productTitles = await page.locator('.card-body b').allTextContents();
console.log(productTitles);

const productCount = await products.count();
for (let i = 0; i<productCount; ++i)
{
    if (await products.nth(i).locator('b').textContent() === data.productName)
    {
        await products.nth(i).locator("text = Add To Cart").click();
        break;
    }
}
await page.locator("[routerlink*='cart']").click();
await expect(page.locator(`h3:has-text('${data.productName}')`)).toBeVisible();

});
}


test.skip("UI Control playwright test", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const dropdown = page.locator("select.form-control");
    const ducumentLink = page.locator('a[href*="documents-request"]');
    await dropdown.selectOption("teach");
    await page.locator("input[value='user']").click();
    await page.locator("button#okayBtn").click();
    console.log(await page.locator("input[value='user']").isChecked());
    expect(page.locator("input[value='user']")).toBeChecked();
   // await page.pause();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await(page.locator("#terms")).isChecked()).toBeFalsy();
   await expect(ducumentLink).toHaveAttribute("class", "blinkingText");

})

test.skip("Child window handling", async ({page}) => {
    const username = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const ducumentLink = page.locator('a[href*="documents-request"]');
    const [newPage] = await Promise.all([
        page.waitForEvent("popup"),
        ducumentLink.click()
  ]);
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").type(domain);
    await page.pause();
    console.log(await page.locator("#username").textContent());



});