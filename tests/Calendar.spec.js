const {test, expect} = require("@playwright/test")

test("Calendar validations", async ({page}) => {

    const monthNumber = "9"
    const date = "20"
    const year = "2027"

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    const topDealsBtn = page.getByText("Top Deals");
    const [newPage] = await Promise.all([
         page.waitForEvent("popup"),
         topDealsBtn.click()
    ]);
    console.log(await newPage.title());
    await newPage.locator(".react-date-picker__inputGroup").click();
    await newPage.locator(".react-calendar__navigation__label__labelText").click();
    await newPage.locator(".react-calendar__navigation__label__labelText").click();
    await newPage.getByText(year).click();
    await newPage.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await newPage.locator("//abbr[text() = '"+date+"']").click();
})

test.only("Calendar practice demo", async ({page}) =>{
    await page.goto("https://letcode.in/calendar?utm_source=chatgpt.com");
    await page.getByLabel("birthday").click();
})