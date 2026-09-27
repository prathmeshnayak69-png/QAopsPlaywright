const {test, expect} = require('@playwright/test');

test('Test Make My Trip FLow', async ({page}) => {

    await page.goto('https://www.makemytrip.com/');
    await expect(page).toHaveTitle(/MakeMyTrip/);
    await page.locator('[data-cy="closeModal"]').click();
    await expect(page.locator('img[alt="Make My Trip"]')).toBeVisible();    
    await page.locator('#fromCity').click();
    await page.getByPlaceholder('From').fill('Ahmedabad');
    await page.locator('.revampedSuggestionContentColumn').filter({hasText: 'Ahmedabad, India'}).click();
    await page.locator('#toCity').click();
    await page.getByPlaceholder('To').fill('Thailand');
    await page.locator('.revampedSuggestionContent').filter({hasText: 'Don Mueang International Airport'}).click();
   
   
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 1);

    const dateLabel = todayDate.toDateString();

    await expect(page.getByRole('gridcell', { name: dateLabel })).toBeVisible();

    await page.getByRole('gridcell', { name: dateLabel }).click();

    await page.locator('[data-cy="returnArea"]').click();


    await expect(page.getByRole('gridcell', { name: dateLabel })).toBeVisible();

    await page.getByRole('gridcell', { name: dateLabel }).click();

    await page.getByText('Search').click();

    await expect(page.locator('p.journey-title')).toBeVisible();

    await expect(page.locator('p.journey-title')).toContainText('Flights from Ahmedabad to Bangkok, and back');
    

});