const {test, expect} = require('@playwright/test');

test('Browser context Playwright test',async ({page})=>
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

test('Client login page', async ({page})=>
{

await page.goto('https://rahulshettyacademy.com/client');
await page.locator('#userEmail').fill("prathmesh1@gmail.com");
await page.locator('#userPassword').fill("Abcd@123");
await page.locator("[type='submit']").click();
//await page.waitForLoadState('networkidle');
await page.locator('.card-body b').first().waitFor();
const productTitles = await page.locator('.card-body b').allTextContents();
console.log(productTitles);

});

test("UI Control playwright test", async ({page}) => {

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

test("Child window handling", async ({page}) => {
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



})