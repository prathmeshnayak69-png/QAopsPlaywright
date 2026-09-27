const {test, expect} = require('@playwright/test');
test('Google search Playwright test', async ({page}) => {
    await page.goto('https://www.google.com/');
    console.log(await page.title());
    await page.getByRole('button', {name: "I'm Feeling Lucky"}).click();
    const placesBtn =  page.locator('a[aria-label="Places"]');
    await expect(placesBtn).toBeVisible();
    console.log(await placesBtn.textContent());
    await placesBtn.click();
    await page.getByPlaceholder('Search Doodles').fill('india');
    await page.getByRole('button', {name: 'Search'}).click();
    const results = page.locator('.doodle-card-content__event');
    await expect(results.first()).toBeVisible();
    await page.getByText('India Republic Day 2025').click();
    await expect( page.getByRole('heading', { name: 'India Republic Day 2025' })).toBeVisible();

    await expect(page).toHaveURL(/india-republic-day-2025/);
})
