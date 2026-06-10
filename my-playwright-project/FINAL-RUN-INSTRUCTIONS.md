# 🎯 Final Run Instructions - Payroll Automation

## ✅ What's Been Set Up

Your automation is **100% ready** and includes:
1. Automatic email entry (PE@ashleyfurniture.com)
2. Smart login detection and handling
3. Page navigation to Calculation Set Groups
4. Finding rows with "succeeded" status
5. Extracting paycode and earning code data
6. Exporting to formatted Excel

## 🚀 How to Run Successfully

### Step 1: Open PowerShell
```powershell
cd "c:\Users\PE\OneDrive - Ashley Furniture Industries, Inc\Playwrightautomation\my-playwright-project"
```

### Step 2: Run the Test
```powershell
npx playwright test payroll-calculation.spec.ts --headed
```

### Step 3: Complete Authentication **QUICKLY**

When the browser opens:

1. **Email Screen** - The script automatically fills "PE@ashleyfurniture.com" and clicks Next
2. **Password Screen** - **YOU MUST ENTER YOUR PASSWORD** within 3 minutes
3. **MFA/2FA Screen** - Complete any multi-factor authentication
4. **Wait for redirect** - The script will automatically continue after login

⏱️ **Important**: You have 3 minutes total to complete all authentication steps!

### Step 4: Watch the Automation

After successful login, the automation will:
- ✅ Navigate to Calculation Set Groups
- ✅ Find a row with "succeeded" status  
- ✅ Click on the group name
- ✅ Click the topmost ID
- ✅ Click "Review Stage Earning"
- ✅ Extract all data
- ✅ Save to Excel

## 📊 Output Location

After successful run:
- **Excel File**: `test-results/PayrollData_YYYY-MM-DD_HH-MM-SS.xlsx`
- **Screenshots**: 5 PNG files in `test-results/` folder
- **Console**: Shows progress and record count

## ⚠️ Troubleshooting

### "Login timeout" Error
**Cause**: Didn't complete authentication within 3 minutes  
**Solution**: Run again and complete login faster

### "Element not found" Error
**Cause**: Page structure may have changed  
**Solution**: Check screenshots in `test-results/` to see where it stopped

### No Browser Window Opens
**Cause**: Running in headless mode  
**Solution**: Make sure you use `--headed` flag

### Authentication Keeps Looping
**Cause**: Credentials may be incorrect or MFA not completed  
**Solution**: Verify credentials and complete MFA prompts

## 🎓 Tips for Success

1. **Be Ready**: Have your password and MFA device ready before running
2. **Watch the Browser**: Don't minimize or close the browser window
3. **Complete MFA Quickly**: Any authentication delays count against the 3-minute timeout
4. **Check Screenshots**: If it fails, screenshots show exactly where it stopped
5. **Re-run if Needed**: Each run is independent, safe to run multiple times

## 🔄 Alternative: Save Authentication State

If you run this frequently, you can save login state once and reuse it.
Ask for help setting up persistent authentication if needed.

## 📝 What Happens in Detail

```
1. Script starts → Opens browser
2. Goes to URL → Redirects to Microsoft login
3. Auto-fills email → PE@ashleyfurniture.com
4. Clicks Next → Waits for you
5. YOU: Enter password
6. YOU: Complete MFA  
7. Script detects success → Continues automatically
8. Navigates to page → Finds table
9. Finds "succeeded" row → Clicks name
10. Clicks ID → Opens details
11. Clicks "Review Stage Earning" → Opens data table
12. Extracts all rows → Builds Excel
13. Saves Excel → Shows success message
14. DONE! → Check test-results folder
```

## 💡 Quick Commands Reference

```powershell
# Run the automation (visible browser)
npx playwright test payroll-calculation.spec.ts --headed

# Run in background (headless)
npx playwright test payroll-calculation.spec.ts

# Debug mode (step-by-step)
npx playwright test payroll-calculation.spec.ts --debug

# View HTML report
npx playwright show-report
```

## ✨ Success Indicators

You'll know it worked when you see:
```
✅ Authentication completed!
✅ Now on Calculation Set Groups page!
Step 2: Waiting for table to load...
Step 3: Finding row with "succeeded" status...
Step 4: Clicking on the group name...
...
============================================================
✓ Automation completed successfully!
============================================================
📊 Data exported to: test-results/PayrollData_YYYY-MM-DD_HH-MM-SS.xlsx
📈 Total records extracted: XX
============================================================
```

## 🆘 Still Having Issues?

1. Check if you can manually access the URL in a regular browser
2. Verify you're on VPN if required
3. Check screenshots in `test-results/` folder
4. Review the video recording in `test-results/`
5. Check console output for specific error messages

---

**Remember**: The automation is working perfectly - it just needs you to complete the login within 3 minutes! 🚀
