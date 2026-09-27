const { expect, test, request } = require("@playwright/test");
let token;
const loginPayLoad = {
    userEmail: "prathmesh1@gmail.com",
    userPassword: "Abcd@123"
};
const orderPayLoad = {

    orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]

};

test.beforeAll(async () => {

    // Create API context

    const apiContext = await request.newContext();

    // Login response

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        }
    );

    // Verfiy login response status code
    expect(loginResponse.status()).toBe(200);
    expect(loginResponse.ok()).toBeTruthy();

    // Read json response body
    const loginResponseJson = await loginResponse.json();

    // save token 

    token = loginResponseJson.token;

    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                         'authorization': token,
                        'Content-Type': 'application/json'
            },
    });

        const orderResponseJson = await orderResponse.json();
        orderId = orderResponseJson.orders[0];
    });

    test('Login page playwright test', async ({ page }) => {

    // inject token into local strorage
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);

    const productName = "IPHONE 13 PRO";
    const emailName = "";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator(".card-body").first().waitFor();
    const productList = await (page.locator(".card-body").allTextContents());
    console.log(productList);
        await page.locator(".card-body").filter({ hasText: productName }).locator("text=Add To Cart").click();
    //await page.pause();
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        //await expect(page.locator("h3:has-text('iphone 13 pro')")).toBeVisible();
        const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
        console.log(bool);
        expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();
        await page.locator(".input.ddl").nth(0).selectOption("03");
        await page.locator(".input.ddl").nth(1).selectOption("13");
        await page.locator("//div[contains(text(),'CVV Code ')]/following-sibling::input").fill("123");
        await page.locator("//div[contains(text(),'Name on Card ')]/following-sibling::input").fill("Prathmesh");
        await page.locator('[placeholder="Select Country"]').pressSequentially("ind", { delay: 150 });
        const countryResults = await page.locator(".ta-results");
        await countryResults.waitFor();
        const optionsCount = await countryResults.locator("button").count();

        for (let i = 0; i < optionsCount; i++) {
            const text = await countryResults.locator("[type='button']").nth(i).textContent();
            if (text === " India") {
                await countryResults.locator("[type='button']").nth(i).click();
                break;
            }
        }
        await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailName);
        await page.getByText("Place Order").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const pageOrderId = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).split("|")[1].trim();
        console.log(pageOrderId);
        await page.getByRole('button', { name: '  ORDERS' }).click();
        const row = page.locator("tbody tr").filter({ has: page.locator(`th:has-text("${pageOrderId}")`) });
        console.log(`Found Order ID: ${pageOrderId}`);
        await row.getByRole('button', { name: 'View' }).click();
        const orderDetails = await page.locator(".col-text").textContent();
        expect(pageOrderId).toContain(orderDetails);
        // expect(orderId.includes(orderDetails)).toBeTruthy();
    });
