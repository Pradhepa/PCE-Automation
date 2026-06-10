# Quick Start Guide - Payroll Calculation Automation

## 🚀 Quick Setup (First Time Only)

1. **Open PowerShell/Terminal** in the project directory:
   ```powershell
   cd "my-playwright-project"
   ```

2. **Install Playwright browsers** (if not already done):
   ```powershell
   npx playwright install chromium
   ```

## ▶️ Running the Automation

### Option 1: Run with Browser Visible (Recommended for First Run)
```powershell
npx playwright test payroll-calculation.spec.ts --headed
```

### Option 2: Run in Background (Headless)
```powershell
npx playwright test payroll-calculation.spec.ts
```

### Option 3: Run with Debugging
```powershell
npx playwright test payroll-calculation.spec.ts --debug
```

## 📊 Finding Your Results

After the test completes:

1. **Excel File**: Located in `test-results/` folder
   - File name format: `PayrollData_YYYY-MM-DD_HH-MM-SS.xlsx`
   - Contains columns: Pay Group, Pay Code, Earning Code

2. **Screenshots**: Also in `test-results/` folder
   - `01-calculation-set-groups.png` - Initial page
   - `02-succeeded-row-found.png` - Row with succeeded status
   - `03-group-details.png` - Group details page
   - `04-calculation-details.png` - Calculation details
   - `05-review-stage-earning.png` - Final data table

3. **HTML Report**: View detailed test results
   ```powershell
   npx playwright show-report
   ```

## ⚙️ What the Automation Does

1. ✅ Opens the Calculation Set Groups page
2. ✅ Finds a row with "succeeded" status
3. ✅ Clicks on the group name
4. ✅ Clicks on the topmost ID
5. ✅ Clicks "Review Stage Earning"
6. ✅ Extracts all pay codes and earning codes
7. ✅ Saves data to formatted Excel file

## 🔧 Troubleshooting

### Authentication Issues
If you're not logged in, you may need to:
1. Run the test with `--headed` to see the browser
2. Manually log in when the browser opens
3. Or set up persistent authentication (see advanced setup)

### Timeout Errors
If elements take longer to load:
- The test is set to 3 minutes timeout
- Screenshots are saved for debugging
- Check the HTML report for details

### Element Not Found
- Screenshots show exactly where the automation stopped
- Check if the page structure has changed
- Update selectors in the test file if needed

## 📝 Notes

- The automation runs in visible browser mode by default (easier to monitor)
- All steps are logged to console
- Screenshots are taken at each major step
- Test results are saved even if the test fails

## 🆘 Need Help?

Check the detailed documentation in `tests/payroll-calculation-README.md`
