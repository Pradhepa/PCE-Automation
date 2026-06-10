# 🚀 Ashley Furniture Payroll Automation - Setup Guide

This automation script extracts payroll data (Paycodes and Earning Codes) from the Ashley Furniture Payroll Calculation Engine and exports it to an Excel file.

## 📋 Prerequisites

- Node.js (version 14 or higher)
- Access to Ashley Furniture Payroll Portal
- Valid credentials (email and password)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browser

```bash
npx playwright install chrome
```

### 3. Configure Your Credentials

1. Navigate to the `config` folder
2. Copy the `credentials.template.json` file
3. Rename it to `credentials.json`
4. Update the values with your credentials:

```json
{
  "email": "YOUR_EMAIL@ashleyfurniture.com",
  "password": "YOUR_PASSWORD",
  "portalUrl": "https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups"
}
```

**⚠️ Important:** Do NOT share or commit the `credentials.json` file!

## ▶️ Running the Script

### Headed Mode (Recommended for first run)
This will show the browser so you can see what's happening:

```bash
npx playwright test payroll-calculation.spec.ts --headed
```

### Headless Mode (Background)
This runs the browser in the background:

```bash
npx playwright test payroll-calculation.spec.ts
```

## 📊 Output

The script will:
1. ✅ Log in to the Ashley Furniture portal using your credentials
2. ✅ Navigate to Calculation Set Groups
3. ✅ Find all groups with "succeeded" status
4. ✅ For each group:
   - Click on the group name
   - Navigate through the job runs
   - Click "Review Staged Earnings"
   - Extract Paycode and Earning Code data
5. ✅ Create an Excel file with the results

### Excel File Location

The Excel file will be saved in:
```
test-results/PayrollData_AllGroups_YYYY-MM-DD_HH-MM-SS.xlsx
```

### Excel File Structure

| Group Name | Pay Code | Earning Code |
|------------|----------|--------------|
| AGRHBW - Pay Process | FOT PREMIUM | OVTPC |
| AGRHBW - Pay Process | FOT STRAIGHT | PDPLV |
| ... | ... | ... |

## ⚙️ Configuration Options

You can modify the `config/credentials.json` file to change:

- **email**: Your login email address
- **password**: Your login password
- **portalUrl**: The URL of the portal (if it changes)

## 🐛 Troubleshooting

### "Credentials not found" error
- Make sure you've created `config/credentials.json` from the template
- Check that the file is in the correct location: `config/credentials.json`

### "Login failed" error
- Verify your email and password are correct in `config/credentials.json`
- Make sure you have access to the Ashley Furniture portal

### Script stops or times out
- Some groups may not have the "Review Staged Earnings" button
- The script will continue with the next group automatically
- Check the terminal output for detailed error messages

## 📁 Project Structure

```
my-playwright-project/
├── config/
│   ├── credentials.json          (Your credentials - DO NOT SHARE)
│   └── credentials.template.json (Template file)
├── tests/
│   └── payroll-calculation.spec.ts (Main automation script)
├── test-results/                  (Excel files and screenshots)
├── package.json
└── SETUP-GUIDE.md
```

## 🔒 Security Notes

- ⚠️ Never share your `credentials.json` file
- ⚠️ Never commit `credentials.json` to version control
- ⚠️ Keep your password secure
- ✅ The template file is safe to share

## ℹ️ Additional Information

- **Browser**: Chrome (headed or headless)
- **Timeout**: 10 minutes per run
- **Maximum Groups**: All groups with "succeeded" status
- **Data Extracted**: Paycode and Earning Code labels

## 📞 Support

If you encounter any issues, check:
1. Terminal output for error messages
2. Screenshots in `test-results/` folder
3. Make sure all dependencies are installed
4. Verify your credentials are correct

---

**Created with Playwright** 🎭
