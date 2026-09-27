const {test, expect} = require("@playwright/test");
const { only } = require("node:test");


test("More validations", async({page})=> {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.getByRole('textbox', {name: 'Hide/Show Example'})).toBeVisible();
    await page.getByRole('button', {name: 'Hide'}).click();
    await expect(page.getByRole('textbox', {name: 'Hide/Show Example'})).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //mouse Hover 

    await page.locator("#mousehover").hover();

    // i frame handling
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log( textCheck.split(" ")[1]);
})

test("More Screenshot and partial Screenshot", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'tests/screenshots/visible.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'tests/screenshots/fullpage.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();
})

test.only("Visual testing screenshot comparison", async ({page}) => {
    await page.goto("https://www.flightaware.com/");
    expect (await page.screenshot()).toMatchSnapshot('flightaware.png');
})