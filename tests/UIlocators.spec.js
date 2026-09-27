const {test, expect} = require('@playwright/test')

test('UI different locators in playwright', async ({page}) => {
    const email = "prathmesh1@gmail.com"
    const password = "Abcd@123"

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole("button", {name:'login'}).click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText: "iphone 13 pro"})
    .getByRole("button", {name:" Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name:"  Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("iphone 13 pro")).toBeVisible();
    await page.getByRole("button", {name: "Checkout"}).click();
     await page.locator("//div[contains(text(),'CVV Code ')]/following-sibling::input")
     .fill("123");
    await page.locator("//div[contains(text(),'Name on Card ')]/following-sibling::input")
    .fill("Prathmesh");
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name:"India"}).nth(1).click();
    await page.getByText("Place Order ").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


})