import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000, // Increased to 2 minutes for complex workflows
  expect: {
    timeout: 10000,
  },
  reporter: 'html',
  use: {
    headless: false, // Run in headed mode to see the automation
    channel: 'chrome', // Use Google Chrome
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  // Create test-results folder if it doesn't exist
  outputDir: 'test-results',
});