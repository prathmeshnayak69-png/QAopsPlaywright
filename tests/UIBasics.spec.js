const {test, expect} = require('@playwright/test');

test('Browser context Playwright test',async ({browser})=> 
{
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator("#username");
const password = page.locator("[type='password']");
const signInBtn = page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a");

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());

await userName.fill("rahulshettyacade");
await password.fill("learning");
await signInBtn.click();
console.log(await page.locator("[style*= 'block']").textContent());
await expect(await page.locator("[style*= 'block']")).toContainText('Incorrect username/password.');

await userName.fill("");
await userName.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");
await signInBtn.click();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(2).textContent());
const allCardTitles = await cardTitles.allTextContents();
console.log(allCardTitles);


//await expect(page.locator(".alert-danger")).toHaveText("Incorrect username/password.");

});

test('Page Playwright test',async ({page})=>
{
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
console.log(await page.title());
await page.getByText('Register here').click();
await page.locator('#firstName').fill("John");
await page.locator("[placeholder='Last Name']").fill("Doe");
await page.locator('[type = "email"]').fill("johndoe@example.com");
await page.locator("[type='text']").fill(9898769456);
await page.locator('#confirmPassword').fill("Password123");
await page.locator('#register').click();

});