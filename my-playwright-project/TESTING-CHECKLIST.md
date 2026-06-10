# Testing Checklist - Payroll Automation

## ✅ Pre-Run Checklist

### First Time Setup
- [ ] Node.js is installed
- [ ] Playwright browsers installed: `npx playwright install chromium`
- [ ] Dependencies installed: `npm install`
- [ ] You have access to people.stage.ashleyfurniture.com
- [ ] You are logged in to the Ashley Furniture portal

### Before Each Run
- [ ] You are on the company network or VPN
- [ ] Browser is not already running the portal
- [ ] `test-results` folder exists or will be auto-created
- [ ] You have write permissions to the project folder

## 🧪 Running the Test

### Step 1: Open PowerShell
```powershell
cd "c:\Users\PE\OneDrive - Ashley Furniture Industries, Inc\Playwrightautomation\my-playwright-project"
```

### Step 2: Choose Run Method

**Option A: Interactive Script**
```powershell
.\run-payroll-automation.ps1
```
Select option 1 for visible browser (recommended for first run)

**Option B: Direct Command**
```powershell
npx playwright test payroll-calculation.spec.ts --headed
```

**Option C: Debug Mode**
```powershell
npx playwright test payroll-calculation.spec.ts --debug
```

## 📊 Verify Results

### Immediate Checks (During Run)
- [ ] Browser window opens
- [ ] Navigates to Calculation Set Groups page
- [ ] Login page appears (if not already authenticated)
- [ ] Table with calculation groups loads
- [ ] Row with "succeeded" status is found and clicked
- [ ] Group details page loads
- [ ] First ID is clicked
- [ ] "Review Stage Earning" button is found and clicked
- [ ] Data table appears

### After Completion
- [ ] Test shows as PASSED in console
- [ ] Console shows "Automation completed successfully!"
- [ ] Console shows number of records extracted
- [ ] Excel file is created in `test-results/` folder
- [ ] File name format: `PayrollData_YYYY-MM-DD_HH-MM-SS.xlsx`
- [ ] 5 screenshots are created in `test-results/` folder

### Verify Excel File
- [ ] Open the Excel file
- [ ] Headers are present: Pay Group, Pay Code, Earning Code
- [ ] Headers are bold with blue background
- [ ] Data rows are populated
- [ ] All cells have borders
- [ ] Column widths are readable
- [ ] Data matches what you see on the portal

### Verify Screenshots
Check each screenshot for debugging:
- [ ] `01-calculation-set-groups.png` - Shows the initial table
- [ ] `02-succeeded-row-found.png` - Highlights the succeeded row
- [ ] `03-group-details.png` - Shows group details page
- [ ] `04-calculation-details.png` - Shows calculation details
- [ ] `05-review-stage-earning.png` - Shows final data table

## 🐛 Troubleshooting

### If Test Fails

**Authentication Error**
- [ ] Manually log in when browser opens
- [ ] Check VPN connection
- [ ] Verify portal access

**Element Not Found**
- [ ] Check screenshots to see where it stopped
- [ ] Verify page structure hasn't changed
- [ ] Check console for specific error message
- [ ] Increase timeout if network is slow

**No Data Extracted**
- [ ] Verify "succeeded" row exists in the table
- [ ] Check if "Review Stage Earning" button is available
- [ ] Inspect table structure on the portal
- [ ] Review console logs for extraction details

**Excel File Not Created**
- [ ] Check console for Excel writing errors
- [ ] Verify write permissions on `test-results/` folder
- [ ] Check available disk space

### View Detailed Report
```powershell
npx playwright show-report
```

## 📝 Test Output Examples

### Success Console Output
```
Step 1: Navigating to Calculation Set Groups page...
Step 2: Waiting for table to load...
Step 3: Finding row with "succeeded" status...
Step 4: Clicking on the group name...
Found group: AGRIHBW
Step 5: Clicking on the topmost ID...
Clicking on ID: 12345
Step 6: Clicking "Review Stage Earning" button...
Step 7: Extracting data from table...
Table headers: [ 'Pay Group', 'Pay Code', 'Earning Code' ]
Found 25 rows in the table
Extracted 25 rows of data
Step 8: Creating Excel file...
============================================================
✓ Automation completed successfully!
============================================================
📊 Data exported to: test-results/PayrollData_2026-06-04_10-30-45.xlsx
📈 Total records extracted: 25
============================================================
```

## 🔄 Regular Maintenance

### Weekly
- [ ] Verify automation still works
- [ ] Check for portal changes
- [ ] Review extracted data accuracy

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Check for Playwright updates
- [ ] Archive old test results

### As Needed
- [ ] Update selectors if page structure changes
- [ ] Adjust timeouts if portal performance changes
- [ ] Modify data extraction logic for new requirements

## 📞 Getting Help

If issues persist:
1. Review `README-AUTOMATION.md` for detailed setup
2. Check `QUICKSTART.md` for command reference
3. Review `tests/payroll-calculation-README.md` for technical details
4. Check Playwright documentation: https://playwright.dev

## 🎯 Success Criteria

The automation is successful when:
- ✅ Test completes without errors
- ✅ Excel file is created with correct data
- ✅ All screenshots are captured
- ✅ Data matches portal display
- ✅ Run time is under 3 minutes
