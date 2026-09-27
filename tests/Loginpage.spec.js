const {test, expect} = require('@playwright/test');

test('Login page playwright test', async ({page}) => {
    const emailName = "prathmesh1@gmail.com";
    const productName = "iphone 13 pro";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(emailName);
    await page.locator('#userPassword').fill("Abcd@123");
    await page.locator("input[value = 'Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    const productList = await(page.locator(".card-body").allTextContents());
    console.log(productList);
    await page.locator(".card-body").filter({hasText: productName}).locator("text = Add To Cart").click();
    //await page.pause();
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    //await expect(page.locator("h3:has-text('iphone 13 pro')")).toBeVisible();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    console.log(bool);
    expect(bool).toBeTruthy();
    await page.locator("text = Checkout").click();
    await page.locator(".input.ddl").nth(0).selectOption("03");
    await page.locator(".input.ddl").nth(1).selectOption("13");
    await page.locator("//div[contains(text(),'CVV Code ')]/following-sibling::input").fill("123");
    await page.locator("//div[contains(text(),'Name on Card ')]/following-sibling::input").fill("Prathmesh");
    await page.locator('[placeholder="Select Country"]').pressSequentially("ind", {delay: 150});
    const countryResults = await page.locator(".ta-results");
    await countryResults.waitFor();
    const optionsCount = await countryResults.locator("button").count();

    for (let i =0; i < optionsCount; i++) 
    {
        const text = await countryResults.locator("[type='button']").nth(i).textContent();
        if (text ===" India")
        {
           await countryResults.locator("[type='button']").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailName);
    await page.getByText("Place Order").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).split("|")[1].trim();
    console.log(orderId);
    await page.getByRole('button', {name: '  ORDERS'}).click();
    const row = page.locator("tbody tr").filter({ has: page.locator(`th:has-text("${orderId}")`)});
    console.log(`Found Order ID: ${orderId}`);
    await row.getByRole('button', {name: 'View'}).click();
    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderId).toContain(orderDetails);
   // expect(orderId.includes(orderDetails)).toBeTruthy();
    

})


