# Ashley Furniture Payroll Calculation Engine Automation

## Overview
This automation script navigates through the Ashley Furniture Payroll Calculation Engine to extract paycode and earning code data and export it to Excel.

## Workflow Steps
1. Navigate to the Calculation Set Groups page
2. Find a row with "succeeded" last run status
3. Click on the name/group
4. Click the topmost ID in the calculation sets table
5. Click "Review Stage Earning"
6. Extract all paycode and earning code data
7. Export data to Excel file with Pay Group, Pay Code, and Earning Code columns

## Prerequisites
- Node.js installed
- Playwright installed
- ExcelJS package installed
- Valid credentials for people.stage.ashleyfurniture.com

## Installation
```bash
cd my-playwright-project
npm install
```

## Configuration
The script assumes you're already authenticated to the Ashley Furniture portal. If authentication is required, you may need to:

1. Set up authentication state
2. Use environment variables for credentials
3. Add login steps before navigation

## Running the Test
```bash
# Run with browser visible (headed mode)
npx playwright test payroll-calculation.spec.ts --headed

# Run in headless mode
npx playwright test payroll-calculation.spec.ts

# Run with debug mode
npx playwright test payroll-calculation.spec.ts --debug
```

## Output
- Excel files are saved in the `test-results` folder
- File naming format: `PayrollData_YYYY-MM-DDTHH-MM-SS.xlsx`
- Console logs show progress and record count

## Customization
You can modify the script to:
- Change the Excel output location
- Add more columns from the table
- Filter specific pay groups
- Handle different table structures
- Add retry logic for failed operations

## Troubleshooting
- If selectors don't match, inspect the page and update the locators
- Increase timeout values if the page loads slowly
- Check console logs for detailed execution information
- Use `--headed` mode to watch the automation execute
