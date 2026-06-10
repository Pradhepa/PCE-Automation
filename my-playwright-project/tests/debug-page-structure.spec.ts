import { test } from '@playwright/test';

test('Debug page structure', async ({ page }) => {
  test.setTimeout(300000); // 5 minutes
  
  console.log('Navigating to Calculation Set Groups page...');
  await page.goto('https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Handle login if needed
  const currentUrl = page.url();
  if (currentUrl.includes('login')) {
    console.log('Logging in...');
    const emailInput = page.locator('input[type="email"], input[name="loginfmt"]');
    if (await emailInput.count() > 0) {
      console.log('Entering email...');
      await emailInput.fill('PE@ashleyfurniture.com');
      await page.waitForTimeout(500);
      const nextButton = page.locator('button:has-text("Next")');
      if (await nextButton.count() > 0) {
        await nextButton.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
      }
    }

    // Enter password
    const passwordInput = page.locator('input[type="password"], input[name="passwd"]');
    if (await passwordInput.count() > 0) {
      console.log('Entering password...');
      await passwordInput.fill('Welcomeashley3#');
      await page.waitForTimeout(500);
      const signInButton = page.locator('button:has-text("Sign in"), input[type="submit"]').first();
      if (await signInButton.count() > 0) {
        await signInButton.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
      }
    }

    await page.waitForURL('**/{calculation-set-groups,login-callback}', { timeout: 180000 });
    
    if (page.url().includes('login-callback')) {
      await page.goto('https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups');
    }
    await page.waitForLoadState('networkidle');
  }
  
  console.log('Taking screenshot...');
  await page.screenshot({ path: 'test-results/debug-page.png', fullPage: true });
  
  // Get page content
  console.log('Getting page HTML...');
  const html = await page.content();
  const fs = require('fs');
  fs.writeFileSync('test-results/page-content.html', html);
  
  // Look for tables
  const tables = await page.locator('table').count();
  console.log(`Found ${tables} table(s)`);
  
  if (tables > 0) {
    // Get table structure
    const headers = await page.locator('table thead th, table th').allTextContents();
    console.log('Table headers:', headers);
    
    // Get first few rows
    const rows = await page.locator('table tbody tr, table tr').all();
    console.log(`Found ${rows.length} rows`);
    
    for (let i = 0; i < Math.min(3, rows.length); i++) {
      const rowText = await rows[i].textContent();
      console.log(`Row ${i + 1}: ${rowText?.substring(0, 200)}`);
      
      // Check for links in this row
      const links = await rows[i].locator('a').count();
      console.log(`  - Links in row: ${links}`);
      
      if (links > 0) {
        const linkTexts = await rows[i].locator('a').allTextContents();
        console.log(`  - Link texts:`, linkTexts);
      }
    }
  }
  
  console.log('Debug complete! Check test-results/debug-page.png and test-results/page-content.html');
  
  // Keep browser open
  await page.waitForTimeout(5000);
});
