# Ashley Furniture Payroll Calculation Engine Automation

## 📋 Overview
This project automates the extraction of payroll data from the Ashley Furniture Payroll Calculation Engine and exports it to Excel format.

## 🎯 What This Automation Does

The script performs the following steps:
1. **Navigate** to the Calculation Set Groups page
2. **Find** a calculation set group with "succeeded" status
3. **Click** on the group name
4. **Select** the topmost ID from the calculation sets
5. **Access** the "Review Stage Earning" section
6. **Extract** all paycode and earning code data
7. **Export** to a professionally formatted Excel file

## 🚀 Quick Start

### First Time Setup
1. Open PowerShell in the project directory
2. Run: `npx playwright install chromium`

### Running the Automation

**Method 1: Using the PowerShell Script (Easiest)**
```powershell
cd my-playwright-project
.\run-payroll-automation.ps1
```

**Method 2: Direct Command (Recommended)**
```powershell
cd my-playwright-project
npx playwright test payroll-calculation.spec.ts --headed
```

**Method 3: Background Mode**
```powershell
npx playwright test payroll-calculation.spec.ts
```

## 📊 Output Files

### Excel File
- **Location**: `test-results/PayrollData_YYYY-MM-DD_HH-MM-SS.xlsx`
- **Format**: Professional formatting with headers, borders, and styling
- **Columns**:
  - Pay Group
  - Pay Code
  - Earning Code

### Screenshots (for debugging)
All screenshots are saved in `test-results/` folder:
1. `01-calculation-set-groups.png` - Initial page load
2. `02-succeeded-row-found.png` - Row with succeeded status highlighted
3. `03-group-details.png` - Group details page
4. `04-calculation-details.png` - Calculation details page
5. `05-review-stage-earning.png` - Final data table

### HTML Report
View detailed test execution report:
```powershell
npx playwright show-report
```

## 🔧 Configuration

### Timeouts
- Overall test timeout: 3 minutes (180 seconds)
- Element wait timeout: 15 seconds
- Configurable in `payroll-calculation.spec.ts`

### Browser Settings
- Default: Chromium (visible mode)
- Change in `playwright.config.ts` if needed

## 🛠️ Troubleshooting

### Authentication Required
If you see a login page:
1. Run with `--headed` flag to see the browser
2. The automation will pause - manually log in
3. Consider setting up persistent authentication for automated runs

### Element Not Found Errors
- Check the screenshots in `test-results/` to see where it stopped
- The page structure may have changed
- Update selectors in `payroll-calculation.spec.ts`

### Timeout Errors
- Increase timeout values in the script
- Check your network connection
- Verify the portal is accessible

### No Data Extracted
- Verify "Review Stage Earning" button exists on the page
- Check table structure matches expected format
- Review console logs for details

## 📁 Project Structure

```
my-playwright-project/
├── tests/
│   ├── payroll-calculation.spec.ts    # Main automation script
│   └── payroll-calculation-README.md  # Detailed documentation
├── test-results/                       # Output folder (auto-created)
│   ├── PayrollData_*.xlsx             # Excel files
│   └── *.png                          # Screenshots
├── playwright.config.ts                # Playwright configuration
├── QUICKSTART.md                       # Quick reference guide
└── run-payroll-automation.ps1         # PowerShell runner script
```

## 🔐 Security Notes

- No credentials are stored in the code
- Uses your existing browser authentication
- All data is saved locally in `test-results/`

## 📝 Customization

### Modify Excel Output
Edit `payroll-calculation.spec.ts` starting at line 131 to:
- Add more columns
- Change formatting
- Adjust column widths

### Change Selectors
If page structure changes, update selectors in the test file:
- Line 34: Row selector
- Line 44: Name link selector
- Line 57: ID link selector
- Line 70: Review button selector

### Add Filters
To filter specific pay groups, add logic at line 99 in the data extraction loop.

## 📞 Support

For issues:
1. Check screenshots in `test-results/`
2. Review HTML report: `npx playwright show-report`
3. Check console output for error messages
4. Review `tests/payroll-calculation-README.md` for detailed docs

## 📖 Additional Documentation

- **QUICKSTART.md** - Quick reference for running tests
- **tests/payroll-calculation-README.md** - Detailed technical documentation
- **Playwright Docs** - https://playwright.dev/docs/intro

---

**Created**: 2026-06-04  
**Purpose**: Automate payroll data extraction from Ashley Furniture portal  
**Technology**: Playwright + TypeScript + ExcelJS
