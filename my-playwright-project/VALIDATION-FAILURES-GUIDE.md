# 📋 Validation Failures Automation - Setup Guide

## ✅ Script Created: `tests/validation-failures.spec.ts`

This new automation extracts **validation failures** from the Payroll Calculation Engine, reusing the same authentication and navigation logic as the payroll automation.

---

## 🎯 What It Does

1. **Authenticates** using ADFS (same as payroll automation)
2. **Navigates** to Calculation Set Groups page
3. **Processes each group** to find validation failures
4. **Extracts** validation failure data
5. **Creates Excel file** with all failures

---

## 🚀 How to Run

```bash
cd my-playwright-project
npx playwright test validation-failures.spec.ts --headed --timeout=1200000
```

---

## ⚙️ Customization Required

The script is **90% complete**, but you need to customize the validation failure extraction based on how they appear in your application.

### Step 1: Identify Where Validation Failures Appear

Open the browser and manually navigate to see where validation failures show up:

**Possible locations:**
- ❓ Error messages on the group page
- ❓ Validation failure table/grid
- ❓ Alert boxes or notifications
- ❓ Red error text
- ❓ Specific "Validation Failures" section

### Step 2: Update Error Selectors

In `validation-failures.spec.ts`, find this section (around line 323):

```typescript
const errorSelectors = [
  '.validation-error',          // CSS class for validation errors
  '.error-message',             // CSS class for error messages
  'text=/validation failed/i',  // Text containing "validation failed"
  'text=/error/i',              // Text containing "error"
  '[class*="error"]',           // Any class containing "error"
  '[class*="validation"]'       // Any class containing "validation"
];
```

**Replace these with the actual selectors from your application!**

### Step 3: Test on One Group First

1. Run the script
2. Check the browser window
3. See where validation failures appear
4. Update the selectors accordingly

---

## 📊 Output Excel Format

The Excel file will have these columns:

| Group Name | Error Type | Error Message | Record ID | Employee ID |
|------------|------------|---------------|-----------|-------------|
| AGRHBW - Pay Process | Validation Error | Missing required field | 12345 | EMP001 |

**Customize the columns** based on what data you need!

---

## 🔍 Example: Common Scenarios

### Scenario A: Validation Failures in a Table

If failures appear in a table, modify the extraction like this:

```typescript
// Find the validation failures table
const failureTable = page.locator('table').filter({ hasText: 'Validation' }).first();
const failureRows = await failureTable.locator('tbody tr').all();

for (const row of failureRows) {
  const cells = await row.locator('td').all();
  
  validationFailures.push({
    groupName: group.name,
    errorType: await cells[0].textContent() || '',
    errorMessage: await cells[1].textContent() || '',
    recordId: await cells[2].textContent() || '',
    employeeId: await cells[3].textContent() || ''
  });
}
```

### Scenario B: Validation Failures as Error Messages

If failures appear as error messages:

```typescript
// Find all error message elements
const errorMessages = await page.locator('.error-message, .validation-error').all();

for (const error of errorMessages) {
  const errorText = await error.textContent();
  
  validationFailures.push({
    groupName: group.name,
    errorType: 'Validation Error',
    errorMessage: errorText?.trim() || '',
    recordId: undefined,
    employeeId: undefined
  });
}
```

### Scenario C: Click "Validation Failures" Button First

If you need to click a button to see failures:

```typescript
// Click "Validation Failures" or similar button
const validationButton = page.locator('button:has-text("Validation"), button:has-text("Failures")').first();

try {
  await validationButton.waitFor({ state: 'visible', timeout: 5000 });
  await validationButton.click();
  await page.waitForTimeout(2000);
  
  // Now extract failures
  // ... your extraction logic here
  
} catch (e) {
  console.log('   ℹ️  No validation failures button found');
}
```

---

## 🛠️ Where to Make Changes

### Main areas to customize:

1. **Line 323-330:** Error selectors - Update based on your UI
2. **Line 335-350:** Extraction logic - How to get the data
3. **Line 162-170:** Data structure - What fields to store
4. **Line 383-389:** Excel columns - What to display

---

## 🎯 Quick Start Workflow

### Option 1: Test Manually First

1. **Run the script** with current selectors
2. **Watch the browser** to see what happens
3. **Identify** where validation failures appear
4. **Update selectors** in the code
5. **Run again** to verify

### Option 2: Inspect the Page

1. **Manually login** to the portal
2. **Navigate** to a group with validation failures
3. **Right-click** on an error → "Inspect"
4. **Copy the selector** from DevTools
5. **Add to the script**

---

## 📝 Example Test Run

```bash
# Run the script
npx playwright test validation-failures.spec.ts --headed --timeout=1200000

# Expected output:
✅ Credentials loaded successfully
⚠️  AUTHENTICATION REQUIRED
... (authentication process)
✅ Now on Calculation Set Groups page
📦 Processing Group 1/15: AGRHBW - Pay Process
👉 Looking for validation failures...
   ✅ Found 3 validation errors
... (continues for all groups)
🎉 VALIDATION FAILURES EXTRACTION COMPLETED!
📊 Data exported to: test-results/ValidationFailures_2026-06-10_14-30-15.xlsx
📈 Total validation failures: 12
```

---

## 🆘 Need Help?

If you're not sure where validation failures appear:

1. **Take a screenshot** of the page showing validation failures
2. **Share the screenshot** so I can help identify selectors
3. **Or describe** where the failures appear on the page

---

## 🔄 Next Steps

1. **Run the script** to see current behavior
2. **Identify** where validation failures show up
3. **Customize** the selectors and extraction logic
4. **Test** on a few groups
5. **Run on all groups** once verified

---

## 📂 Related Files

- `tests/validation-failures.spec.ts` - Main automation script
- `tests/payroll-calculation.spec.ts` - Reference for similar logic
- `config/credentials.json` - Same credentials used
- `VALIDATION-FAILURES-GUIDE.md` - This guide

---

**The script structure is ready - you just need to point it to where validation failures appear in your application!** 🚀

**Questions? Let me know and I'll help customize it further!**
