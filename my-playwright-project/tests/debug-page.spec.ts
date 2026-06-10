import { test, expect } from '@playwright/test';

test.describe('Debug Calculation Set Groups Page', () => {
  test('Check page structure and elements', async ({ page }) => {
    test.setTimeout(300000); // 5 minutes

    // Navigate to the home page
    console.log('📍 Navigating to Payroll Calculation Engine...');
    await page.goto('https://people.stage.ashleyfurniture.com/payhub/calculation-engine');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('✅ Current URL:', page.url());
    console.log('✅ Current Title:', await page.title());

    // Take screenshot of home page
    await page.screenshot({ path: 'test-results/debug-01-home.png', fullPage: true });

    // Look for navigation links
    console.log('\n📋 Looking for navigation links...');
    const navLinks = await page.locator('a').all();
    for (let i = 0; i < Math.min(navLinks.length, 20); i++) {
      const text = await navLinks[i].textContent();
      const href = await navLinks[i].getAttribute('href');
      if (text && text.trim()) {
        console.log(`  Link ${i + 1}: "${text.trim()}" -> ${href}`);
      }
    }

    // Try to navigate to Calculation Set Groups
    console.log('\n📍 Navigating to Calculation Set Groups...');
    
    // Look for the link
    const calcLink = page.locator('a:has-text("Calculation Set Groups")').first();
    const linkCount = await calcLink.count();
    
    if (linkCount > 0) {
      console.log('✅ Found "Calculation Set Groups" link, clicking...');
      await calcLink.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(5000);
    } else {
      console.log('⚠️  Link not found, navigating directly...');
      await page.goto('https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(5000);
    }

    console.log('✅ Current URL:', page.url());
    console.log('✅ Current Title:', await page.title());

    // Take screenshot
    await page.screenshot({ path: 'test-results/debug-02-calc-groups.png', fullPage: true });

    // Check what's on the page
    console.log('\n📋 Page Analysis:');
    const bodyText = await page.locator('body').textContent();
    console.log('  Page text length:', bodyText?.length || 0);
    console.log('  Contains "error":', bodyText?.toLowerCase().includes('error'));
    console.log('  Contains "succeeded":', bodyText?.toLowerCase().includes('succeeded'));
    console.log('  Contains "calculation":', bodyText?.toLowerCase().includes('calculation'));

    // Check for tables
    console.log('\n📋 Looking for tables...');
    const tables = await page.locator('table').count();
    console.log('  <table> elements:', tables);
    
    const tableDivs = await page.locator('[role="table"], .table').count();
    console.log('  .table or role="table" elements:', tableDivs);

    // Check for any rows
    const rows = await page.locator('tr').count();
    console.log('  <tr> elements:', rows);

    // Get all visible text
    console.log('\n📋 Visible text on page:');
    const allText = await page.locator('body').textContent();
    const cleanText = allText?.replace(/\s+/g, ' ').substring(0, 1000);
    console.log('  First 1000 chars:', cleanText);

    // Wait a bit and check again
    console.log('\n⏳ Waiting 30 seconds to see if data loads...');
    await page.waitForTimeout(30000);
    
    await page.screenshot({ path: 'test-results/debug-03-after-wait.png', fullPage: true });
    
    const bodyText2 = await page.locator('body').textContent();
    console.log('  Page text length after wait:', bodyText2?.length || 0);
    console.log('  Contains "succeeded" after wait:', bodyText2?.toLowerCase().includes('succeeded'));

    // Check for specific elements that might need interaction
    console.log('\n📋 Looking for interactive elements...');
    const buttons = await page.locator('button').all();
    console.log(`  Found ${buttons.length} buttons`);
    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      const text = await buttons[i].textContent();
      const visible = await buttons[i].isVisible();
      if (text && text.trim()) {
        console.log(`    Button ${i + 1}: "${text.trim()}" (visible: ${visible})`);
      }
    }

    // Check for any filter/search inputs
    const inputs = await page.locator('input').all();
    console.log(`\n  Found ${inputs.length} input fields`);
    for (let i = 0; i < Math.min(inputs.length, 10); i++) {
      const type = await inputs[i].getAttribute('type');
      const placeholder = await inputs[i].getAttribute('placeholder');
      const visible = await inputs[i].isVisible();
      console.log(`    Input ${i + 1}: type="${type}", placeholder="${placeholder}", visible=${visible}`);
    }

    console.log('\n✅ Debug complete! Check screenshots in test-results/');
    
    // Keep browser open for manual inspection
    console.log('\n⏸️  Pausing for 60 seconds so you can inspect the browser...');
    await page.waitForTimeout(60000);
  });
});
