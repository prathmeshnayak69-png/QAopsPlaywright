import {test, expect} from '@playwright/test';
test ('Handle Frames in Playwright', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/frames');
      await page.getByText('Nested Frames').click();

           const outerFrame = page.frameLocator('frame[name="frame-top"]');
           const middleFrame = outerFrame.frameLocator('frame[name="frame-middle"]');
           await expect(middleFrame.locator('body')).toContainText('MIDDLE');

         });