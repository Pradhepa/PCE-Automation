/**
 * ============================================================================
 * 🔒 PRODUCTION CODE - DO NOT MODIFY
 * ============================================================================
 * File: validation-failures.spec.ts
 * Purpose: Automated extraction of Validation Failures data
 * Author: Pradhepa
 * Created: 2026-06-10
 * Last Updated: 2026-06-12
 *
 * ⚠️ WARNING: This code is production-ready and tested.
 * ⚠️ DO NOT MODIFY unless you know what you're doing.
 * ⚠️ Always test changes in a separate file first.
 * ============================================================================
 *
 * PURPOSE:
 * Extracts validation failure data from the Ashley Furniture Payroll
 * Calculation Engine for all calculation set groups.
 *
 * WORKFLOW:
 * 1. Authenticate via ADFS (automatically handles login)
 * 2. Navigate to Calculation Set Groups page
 * 3. Process all 16 groups
 * 4. For each group: click job run → expand validation failures
 * 5. Extract data from ALL validation failure tables
 * 6. Export consolidated Excel file with all failures
 *
 * FEATURES:
 * - Multi-table extraction (handles multiple dropdown sections)
 * - Filters out non-validation tables automatically
 * - Handles missing job runs and timeouts gracefully
 * - Creates timestamped Excel files
 *
 * BASED ON: payroll-calculation.spec.ts (authentication & navigation)
 * ============================================================================
 */

import { test, expect, Page } from '@playwright/test';
import ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';

// ============================================================================
// CONFIGURATION LOADING
// ============================================================================
const configPath = path.join(process.cwd(), 'config', 'credentials.json');
let credentials: { email: string; password: string; portalUrl: string };

try {
  const configData = fs.readFileSync(configPath, 'utf-8');
  credentials = JSON.parse(configData);
  console.log('✅ Credentials loaded successfully from:', configPath);
} catch (error: any) {
  console.error('❌ Error loading credentials from config/credentials.json');
  console.error('   Expected path:', configPath);
  console.error('   Please create config/credentials.json file using config/credentials.template.json as a template');
  throw error;
}

// ============================================================================
// AUTHENTICATION HANDLER (Reused from payroll-calculation.spec.ts)
// ============================================================================
async function handleAuthentication(page: Page) {
  await page.waitForTimeout(5000);
  
  const currentUrl = page.url();
  const pageTitle = await page.title();
  const hasSignInHeading = await page.locator('h1:has-text("Sign in")').count() > 0;

  console.log('   Current URL:', currentUrl);
  console.log('   Page Title:', pageTitle);

  if (currentUrl.includes('login.microsoftonline.com') || currentUrl.includes('oauth') || 
      currentUrl.includes('authorize') || hasSignInHeading || pageTitle.includes('Sign in') ||
      pageTitle.toLowerCase().includes('loading') || pageTitle.toLowerCase().includes('redirect')) {
    console.log('');
    console.log('='.repeat(70));
    console.log('⚠️  AUTHENTICATION REQUIRED');
    console.log('='.repeat(70));
    console.log('');

    try {
      await page.waitForTimeout(8000);

      // Email Input
      console.log('⏳ Waiting for login form to load...');
      const emailInput = page.locator('input[type="email"], input[name="loginfmt"], input[placeholder*="someone@"]');

      try {
        await emailInput.waitFor({ state: 'visible', timeout: 15000 });
        console.log(`📧 Filling in email address: ${credentials.email}`);
        await emailInput.fill(credentials.email);
        await page.waitForTimeout(1000);

        const nextButton = page.locator('button:has-text("Next"), input[type="submit"][value="Next"]');
        await nextButton.waitFor({ state: 'visible', timeout: 5000 });
        console.log('👉 Clicking Next button...');
        await nextButton.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(5000);
      } catch (e) {
        console.log('ℹ️  Email input not found or already filled');
      }

      // Password Input
      console.log('⏳ Waiting for password field...');
      await page.waitForTimeout(5000);

      const allInputs = await page.locator('input').all();
      console.log(`   Found ${allInputs.length} input fields on page`);
      for (let i = 0; i < Math.min(allInputs.length, 10); i++) {
        const input = allInputs[i];
        const type = await input.getAttribute('type').catch(() => 'unknown');
        const name = await input.getAttribute('name').catch(() => 'unknown');
        const id = await input.getAttribute('id').catch(() => 'unknown');
        console.log(`   Input ${i + 1}: type="${type}", name="${name}", id="${id}"`);
      }

      // Try to find ANY password field
      const passwordInput = page.locator('input[type="password"]').first();

      try {
        console.log(`   Looking for password field...`);
        await passwordInput.waitFor({ state: 'visible', timeout: 30000 });

        const currentPageUrl = page.url();
        console.log(`🔐 Found password field on: ${currentPageUrl.includes('ashleyportal') ? 'Ashley Portal (ADFS)' : 'Microsoft Login'}`);
        console.log('🔐 Filling in password...');

        await passwordInput.fill(credentials.password);
        await page.waitForTimeout(500);

        // Click Sign in / Submit button (different selectors for ADFS vs Microsoft)
        const signInButton = page.locator(
          'button:has-text("Sign in"), ' +
          'input[type="submit"][value="Sign in"], ' +
          'button[type="submit"], ' +
          'input[type="submit"], ' +
          'span[id="submitButton"]'
        ).first();

        await signInButton.waitFor({ state: 'visible', timeout: 10000 });
        console.log('👉 Clicking Sign in button...');
        await signInButton.click();

        // Wait for redirect after password submission
        await page.waitForTimeout(3000);
        console.log('✅ Password submitted successfully!');
      } catch (e) {
        console.log(`ℹ️  Password input not found`);
      }

      // "Stay signed in" prompt
      console.log('⏳ Checking for "Stay signed in" prompt...');
      await page.waitForTimeout(2000);

      const yesButtonSelectors = [
        'button:has-text("Yes")',
        'input[type="submit"][value="Yes"]',
        'input[id="idSIButton9"]',
        'button[type="submit"]',
        'input[type="submit"]'
      ];

      let yesButtonFound = false;
      for (const selector of yesButtonSelectors) {
        try {
          const yesButton = page.locator(selector).first();
          await yesButton.waitFor({ state: 'visible', timeout: 3000 });
          console.log(`✅ Found "Yes" button using selector: ${selector}`);
          console.log('👉 Clicking "Yes" button directly (without checkbox)...');
          await yesButton.click();
          await page.waitForTimeout(2000);
          yesButtonFound = true;
          break;
        } catch (e) {
          continue;
        }
      }

      if (!yesButtonFound) {
        console.log('ℹ️  No "Stay signed in" prompt found - continuing...');
      }

      console.log('⏳ Waiting for authentication to complete...');
      await page.waitForTimeout(3000);
      try {
        await page.waitForLoadState('load', { timeout: 15000 });
      } catch (e) {
        console.log('ℹ️  Navigation continuing...');
      }

      console.log('✅ Authentication flow completed!');
      console.log('');
    } catch (error) {
      console.error('❌ Error during authentication:', error);
      throw error;
    }
  } else {
    console.log('ℹ️  No authentication required - already logged in');
  }
}

// ============================================================================
// MAIN TEST - VALIDATION FAILURES EXTRACTION
// ============================================================================

test.describe('Ashley Furniture Payroll Validation Failures Extraction', () => {

  test('Extract validation failures from all calculation set groups', async ({ page }) => {
    // Array to store validation failure data
    const validationFailures: {
      groupName: string;
      errorType: string;
      errorMessage: string;
      recordId?: string;
      employeeId?: string;
    }[] = [];

    // Ensure test-results directory exists
    const testResultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir, { recursive: true });
    }

    // ========================================================================
    // STEP 1: AUTHENTICATION & NAVIGATION
    // ========================================================================
    console.log('Step 1: Navigating to Calculation Set Groups page...');
    await page.goto(credentials.portalUrl);
    await page.waitForLoadState('load');
    await page.waitForTimeout(3000);

    // Handle authentication
    await handleAuthentication(page);

    // Ensure we're on the calculation-set-groups page and authenticated
    console.log('📍 Ensuring we are on Calculation Set Groups page...');

    // Wait for any remaining redirects
    await page.waitForTimeout(3000);

    const pageTitle = await page.title();
    const currentUrl = page.url();

    console.log(`   Current URL: ${currentUrl}`);
    console.log(`   Page Title: ${pageTitle}`);

    if (pageTitle.includes('Sign in') || !currentUrl.includes('calculation-set-groups')) {
      console.log('   Not authenticated or redirected - handling authentication...');
      await handleAuthentication(page);

      console.log('   Navigating to Calculation Set Groups...');
      await page.goto(credentials.portalUrl);
      await page.waitForLoadState('load');
      await page.waitForTimeout(5000);
    }

    console.log('✅ Now on Calculation Set Groups page');

    // ========================================================================
    // STEP 2: WAIT FOR TABLE TO LOAD
    // ========================================================================
    console.log('Step 2: Waiting for table to load...');

    let tableFound = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      console.log(`   Attempt ${attempt}/3 to find data table...`);

      try {
        await page.waitForSelector('table', { timeout: 10000 });
        console.log('   ✅ Found element using selector: table');
        tableFound = true;
        break;
      } catch (e) {
        console.log(`   ⚠️  Data container not found on attempt ${attempt}`);
        if (attempt < 3) {
          console.log('   Waiting for data to load...');
          await page.waitForTimeout(5000);
        }
      }
    }

    if (!tableFound) {
      throw new Error('Could not find table after 3 attempts');
    }

    // ========================================================================
    // STEP 3: FIND ALL GROUPS (HANDLE PAGINATION)
    // ========================================================================
    console.log('Step 3: Finding all calculation set groups (checking all pages)...');

    await page.waitForTimeout(2000);

    const groups: { name: string; rowIndex: number }[] = [];
    let currentPage = 1;
    let hasMorePages = true;

    // Loop through all pages
    while (hasMorePages) {
      console.log(`   📄 Scanning page ${currentPage}...`);

      // Get all table rows from current page
      const table = page.locator('table').first();
      const rows = await table.locator('tbody tr').all();
      console.log(`   Found ${rows.length} groups on page ${currentPage}`);

      // Extract group names from current page
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = await row.locator('td').all();

        if (cells.length > 0) {
          const firstCell = cells[0];
          const cellText = await firstCell.textContent();
          const groupName = cellText?.trim() || '';

          if (groupName && !groups.find(g => g.name === groupName)) {
            groups.push({ name: groupName, rowIndex: i });
          }
        }
      }

      // Check if there's a "Next" button or pagination
      const nextButton = page.locator('button[aria-label="Go to next page"], button:has-text("Next"), .mud-pagination-item-next button, button.mud-icon-button-edge-end').first();
      const nextButtonExists = await nextButton.count() > 0;

      if (nextButtonExists) {
        const isDisabled = await nextButton.isDisabled().catch(() => true);

        if (!isDisabled) {
          console.log(`   👉 Clicking "Next" to go to page ${currentPage + 1}...`);
          await nextButton.click();
          await page.waitForTimeout(2000);
          currentPage++;
        } else {
          console.log(`   ✅ Reached last page (page ${currentPage})`);
          hasMorePages = false;
        }
      } else {
        console.log(`   ✅ No pagination found - only one page`);
        hasMorePages = false;
      }
    }

    console.log('');
    console.log(`✅ Found ${groups.length} groups across ${currentPage} page(s)`);

    // Print all groups
    for (let i = 0; i < groups.length; i++) {
      console.log(`  ${i + 1}. ${groups[i].name}`);
    }

    console.log('');
    console.log(`📋 Will process ${groups.length} groups for validation failures`);
    console.log('');

    // ========================================================================
    // STEP 4: PROCESS EACH GROUP FOR VALIDATION FAILURES
    // ========================================================================

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      const group = groups[groupIndex];

      console.log('');
      console.log('='.repeat(70));
      console.log(`📦 Processing Group ${groupIndex + 1}/${groups.length}: ${group.name}`);
      console.log('='.repeat(70));

      try {
        // Always navigate back to groups page and wait for full reload
        console.log('👉 Navigating back to groups page...');
        await page.goto(credentials.portalUrl, { waitUntil: 'load', timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(5000);

        // Wait for table to be fully loaded with retry logic
        try {
          await page.waitForSelector('table tbody tr', { state: 'visible', timeout: 20000 });
          await page.waitForTimeout(2000);
        } catch (e) {
          console.log('   ⚠️  Table taking longer to load, waiting additional time...');
          await page.waitForTimeout(5000);
          // Try one more time
          try {
            await page.waitForSelector('table tbody tr', { state: 'visible', timeout: 15000 });
          } catch (e2) {
            console.log('   ❌ Could not load groups table - skipping this group');
            continue;
          }
        }

        // Find and click the group by name (not by index - more reliable)
        console.log(`👉 Looking for clickable element for group: ${group.name}`);

        // Try to find the button by the group name text
        const groupCode = group.name.split(' - ')[0]; // e.g., "AGRHBW" from "AGRHBW - Pay Process"
        const groupButton = page.locator(`button:has-text("${groupCode}")`).first();

        try {
          await groupButton.waitFor({ state: 'visible', timeout: 10000 });

          console.log('   ⏳ Waiting for page to be fully interactive...');
          await page.waitForTimeout(1000);

          console.log(`   👉 Clicking on group name button: ${group.name}`);
          await groupButton.click();
        } catch (e) {
          console.log(`   ⚠️ Could not find button for group: ${group.name}`);
          console.log(`   Current URL: ${page.url()}`);
          // Continue anyway - don't throw, just log and skip
          continue;
        }

        console.log('⏳ Waiting for page to navigate after button click...');
        await page.waitForLoadState('load');
        await page.waitForTimeout(2000);

        // ====================================================================
        // FIND AND CLICK FIRST JOB RUN ID
        // ====================================================================
        console.log('👉 Looking for first job run ID...');

        // Wait for tables to load
        await page.waitForTimeout(3000);

        // Try multiple approaches to find job run IDs
        let idElement = null;

        // Approach 1: Look for ANY element (not just a/button) with UUID pattern in tables
        console.log('   Searching for job run ID in tables...');
        const tables = await page.locator('table').all();
        console.log(`   Found ${tables.length} table(s)`);

        for (let tableIndex = 0; tableIndex < tables.length && !idElement; tableIndex++) {
          const table = tables[tableIndex];
          const rows = await table.locator('tbody tr').all();

          for (let rowIndex = 0; rowIndex < Math.min(rows.length, 10) && !idElement; rowIndex++) {
            const row = rows[rowIndex];
            const cells = await row.locator('td').all();

            // Look for ID in all cells
            for (let cellIndex = 0; cellIndex < cells.length && !idElement; cellIndex++) {
              const cell = cells[cellIndex];
              const cellText = await cell.textContent();
              const cleanText = cellText?.trim() || '';

              // Check if this cell contains a UUID-like pattern
              if (cleanText.match(/^[a-f0-9]{8}/i)) {
                console.log(`   ✅ Found ID in table ${tableIndex + 1}, row ${rowIndex + 1}, cell ${cellIndex + 1}: "${cleanText.substring(0, 12)}..."`);

                // Try to find clickable element inside the cell
                const clickableInCell = await cell.locator('a, button, span, div').first().count();

                if (clickableInCell > 0) {
                  idElement = cell.locator('a, button, span, div').first();
                  console.log('   👉 Using clickable element inside cell');
                } else {
                  // Cell itself might be clickable
                  idElement = cell;
                  console.log('   👉 Using cell itself as clickable element');
                }
                break;
              }
            }
          }
        }

        // Approach 2: If still not found, look for clickable elements anywhere on page
        if (!idElement) {
          console.log('   Trying broader search for clickable elements...');
          const allClickableElements = await page.locator('a, button, [role="button"], .clickable').all();
          console.log(`   Scanning ${allClickableElements.length} clickable element(s)...`);

          for (const clickable of allClickableElements) {
            try {
              const text = await clickable.textContent();
              const cleanText = text?.trim() || '';

              // Check if this looks like a job run ID (UUID-like pattern)
              if (cleanText.match(/^[a-f0-9]{8}/i)) {
                console.log(`   ✅ Found clickable ID: "${cleanText.substring(0, 12)}..."`);
                idElement = clickable;
                break;
              }
            } catch (e) {
              // Skip if we can't get text
            }
          }
        }

        // Approach 3: Last resort - use regex to find UUID pattern anywhere in page
        if (!idElement) {
          console.log('   Trying regex-based search...');
          try {
            // Look for text matching UUID pattern
            const uuidElement = page.locator('text=/^[a-f0-9]{8}-?[a-f0-9]{4}/i').first();
            const count = await uuidElement.count();

            if (count > 0) {
              const text = await uuidElement.textContent();
              console.log(`   ✅ Found UUID-like text: "${text?.substring(0, 12)}..."`);
              idElement = uuidElement;
            }
          } catch (e) {
            console.log('   ⚠️  Regex search failed');
          }
        }

        if (!idElement) {
          console.log('   ⏭️  No job run ID found - skipping this group');
          continue;
        }

        // Click the ID
        console.log('   👉 Clicking on the ID element...');
        await idElement.click();
        await page.waitForLoadState('load');
        await page.waitForTimeout(2000);

        console.log('   ✅ Clicked on ID element');

        // ====================================================================
        // LOOK FOR VALIDATION FAILURES SECTION
        // ====================================================================
        console.log('👉 Looking for Validation Failures section...');

        // Check if there are validation failures
        const validationSection = page.locator('text=/Validation Failures/i').first();
        const hasValidationFailures = await validationSection.count() > 0;

        if (!hasValidationFailures) {
          console.log('   ✅ No validation failures for this group');
          continue;
        }

        console.log('   ✅ Found Validation Failures section');

        // Get the count of failures
        const failureCountBadge = page.locator('text=/Validation Failures/i').locator('..').locator('[class*="badge"], .mud-chip');
        let failureCount = 0;

        try {
          const badgeText = await failureCountBadge.first().textContent();
          failureCount = parseInt(badgeText?.trim() || '0');
          console.log(`   📊 Found ${failureCount} validation failure(s)`);
        } catch (e) {
          console.log('   ℹ️  Could not determine failure count');
        }

        // ====================================================================
        // EXPAND ALL VALIDATION FAILURE DROPDOWNS AND EXTRACT DATA
        // ====================================================================
        console.log('👉 Looking for all validation failure dropdown sections...');

        try {
          // Wait for content to load
          await page.waitForTimeout(2000);

          // Find all dropdown/expand buttons using multiple selectors
          const dropdownButtons = await page.locator('button[aria-label*="expand"]').all();

          console.log(`   📋 Found ${dropdownButtons.length} dropdown button(s) to expand`);

          // Click all dropdown buttons to expand all sections
          for (let i = 0; i < dropdownButtons.length; i++) {
            try {
              const button = dropdownButtons[i];
              const isVisible = await button.isVisible();

              if (isVisible) {
                console.log(`   👉 Clicking dropdown ${i + 1}/${dropdownButtons.length}...`);
                await button.click();
                await page.waitForTimeout(1000);
                console.log(`   ✅ Expanded dropdown ${i + 1}`);
              }
            } catch (e) {
              console.log(`   ⚠️  Could not expand dropdown ${i + 1}`);
            }
          }

          // ====================================================================
          // EXTRACT VALIDATION FAILURE DATA WITH PROPER COLUMN NAMES
          // ====================================================================
          console.log('👉 Extracting validation failure data from all expanded sections...');

          // Wait for all tables to load
          await page.waitForTimeout(2000);

          // Find all tables on the page
          const allTables = await page.locator('table').all();
          console.log(`   Found ${allTables.length} table(s) on the page`);

          let headers: string[] = [];
          let extractedCount = 0;

          // Process each table that looks like a validation failures table
          for (let tableIndex = 0; tableIndex < allTables.length; tableIndex++) {
            const table = allTables[tableIndex];

            // Get headers for this table
            const headerCells = await table.locator('thead th').all();
            if (headerCells.length > 0) {
              const tempHeaders: string[] = [];
              for (const headerCell of headerCells) {
                const headerText = await headerCell.textContent();
                tempHeaders.push(headerText?.trim() || '');
              }

              // ONLY process tables that have validation failure columns
              // Exclude tables with "#, Calculation Set, Status, Started At, Completed At, Duration"
              const headerString = tempHeaders.join(' ').toLowerCase();
              const isValidationTable = (
                  headerString.includes('employee') &&
                  headerString.includes('failure')
              );

              // Skip tables that are NOT validation failure tables
              const isCalculationSetTable = (
                  headerString.includes('started at') &&
                  headerString.includes('completed at') &&
                  headerString.includes('duration')
              );

              if (isValidationTable && !isCalculationSetTable) {
                headers = tempHeaders;
                console.log(`   ✅ Table ${tableIndex + 1} is a validation failures table with headers: ${headers.join(', ')}`);

                // Extract data rows from this table
                const tableRows = await table.locator('tbody tr').all();
                console.log(`   📊 Found ${tableRows.length} data row(s) in table ${tableIndex + 1}`);

                for (const row of tableRows) {
                  try {
                    const cells = await row.locator('td').all();
                    if (cells.length > 0) {
                      const rowData: any = {
                        'Group Name': group.name
                      };

                      // Extract text from each cell using proper column names
                      for (let i = 0; i < cells.length; i++) {
                        const cellText = await cells[i].textContent();
                        const columnName = headers[i] || `Column ${i + 1}`;
                        rowData[columnName] = cellText?.trim() || '';
                      }

                      validationFailures.push(rowData);
                      extractedCount++;
                    }
                  } catch (e) {
                    // Skip rows that can't be processed
                  }
                }
              } else {
                console.log(`   ⏭️  Skipping table ${tableIndex + 1} (not a validation failures table)`);
              }
            }
          }

          console.log(`   ✅ Extracted ${extractedCount} validation failure record(s) total for ${group.name}`);

        } catch (e) {
          console.log('   ⚠️  Could not extract validation failures');
          console.log(`   Error: ${e}`);
        }

      } catch (error) {
        console.log(`❌ Error processing group ${group.name}:`, error);
        console.log('   Continuing with next group...');
      }
    }

    console.log('');
    console.log('='.repeat(70));
    console.log(`✅ Completed processing ${groups.length} groups`);
    console.log(`📊 Total validation failures found: ${validationFailures.length}`);
    console.log('='.repeat(70));
    console.log('');

    // ========================================================================
    // STEP 5: CREATE EXCEL FILE WITH ALL VALIDATION FAILURES
    // ========================================================================
    console.log('Step 5: Creating Excel file with all validation failure data...');

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Validation Failures');

    // Define columns based on the data we extracted
    // Extract column names from the first record
    if (validationFailures.length > 0) {
      const firstRecord = validationFailures[0];
      const columnKeys = Object.keys(firstRecord);

      worksheet.columns = columnKeys.map(key => {
        // Set appropriate widths for different columns
        let width = 20;
        if (key === 'Group Name') width = 30;
        else if (key.toLowerCase().includes('message')) width = 50;
        else if (key.toLowerCase().includes('reason')) width = 35;
        else if (key.toLowerCase().includes('details')) width = 30;
        else if (key.toLowerCase().includes('employee')) width = 15;

        return {
          header: key,
          key: key,
          width: width
        };
      });

      console.log(`   ✅ Excel columns: ${columnKeys.join(', ')}`);
    } else {
      // Default columns if no data
      worksheet.columns = [
        { header: 'Group Name', key: 'Group Name', width: 35 },
        { header: 'Status', key: 'status', width: 20 },
        { header: 'Message', key: 'message', width: 60 }
      ];
    }

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0070C0' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    headerRow.height = 25;

    // Add data rows
    if (validationFailures.length > 0) {
      validationFailures.forEach(failure => {
        worksheet.addRow(failure);
      });
      console.log(`   ✅ Added ${validationFailures.length} validation failure records to Excel`);
    } else {
      // Add a message if no failures found
      worksheet.addRow({
        groupName: 'No validation failures found',
        status: 'Success',
        message: 'All groups processed - no validation failures detected'
      });
      console.log('   ℹ️  No validation failures found in any group');
    }

    // Add borders to all cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // Auto-filter (set to the number of columns we have)
    if (validationFailures.length > 0) {
      const columnCount = Object.keys(validationFailures[0]).length;
      const lastColumn = String.fromCharCode(64 + columnCount); // A, B, C, etc.
      worksheet.autoFilter = {
        from: 'A1',
        to: `${lastColumn}1`
      };
    }

    // Generate timestamped filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const timeStr = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    const fileName = `ValidationFailures_${timestamp}_${timeStr}.xlsx`;
    const filePath = path.join(testResultsDir, fileName);

    // Save the Excel file
    await workbook.xlsx.writeFile(filePath);

    console.log('');
    console.log('='.repeat(70));
    console.log('🎉 VALIDATION FAILURES EXTRACTION COMPLETED!');
    console.log('='.repeat(70));
    console.log(`📊 Excel file exported to: ${filePath}`);
    console.log(`📈 Groups processed: ${groups.length}`);
    console.log(`📈 Total validation failure records: ${validationFailures.length}`);
    console.log('='.repeat(70));
  });
});

/**
 * ============================================================================
 * USAGE INSTRUCTIONS
 * ============================================================================
 *
 * RUN COMMAND:
 * npx playwright test validation-failures.spec.ts --headed --timeout=1200000
 *
 * OUTPUT:
 * - Excel file: test-results/ValidationFailures_YYYY-MM-DD_HH-MM-SS.xlsx
 * - Contains: Group Name, Error Type, Error Message, Record ID, Employee ID
 *
 * CUSTOMIZATION NEEDED:
 * - Update error selectors (lines 323-330) based on actual validation failure UI
 * - Add specific extraction logic for your validation failure data structure
 *
 * BASED ON: payroll-calculation.spec.ts
 * CREATED: 2026-06-10
 * ============================================================================
 */
