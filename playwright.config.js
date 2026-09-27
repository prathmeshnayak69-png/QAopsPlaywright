// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
 
  use: {

    baseURL: process.env.BASE_URL,
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on'
   
}
  
});
module.exports = config


