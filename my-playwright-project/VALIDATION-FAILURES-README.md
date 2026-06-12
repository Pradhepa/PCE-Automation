# 📋 Validation Failures Automation - Complete Guide

## ✅ READY TO RUN - No Customization Needed!

---

## 🎯 What This Script Does

This automation extracts **validation failures** from all Calculation Set Groups by:

1. **Login** → Authenticates via ADFS
2. **Navigate** → Goes to Calculation Set Groups page
3. **For each group:**
   - Click group name
   - Click first job run ID
   - Check for "Validation Failures" section
   - If found: Click "EXPORT CSV" button
   - Download CSV file
4. **Creates** → Excel summary of all downloads

---

## 🚀 How to Run

```bash
cd my-playwright-project
npx playwright test validation-failures.spec.ts --headed --timeout=1200000
```

**Expected Duration:** ~7-10 minutes for all groups

---

## 📊 Output Files

### 1. CSV Files (One per group with failures)

**Location:** `test-results/ValidationFailures_GROUPNAME_*.csv`

**Example:**
- `ValidationFailures_AHSHBW_Pay_Process_1733856234567.csv`
- `ValidationFailures_ECMHBW_Pay_Process_1733856245678.csv`

**Contents:** All validation failure details from the portal

---

### 2. Excel Summary

**Location:** `test-results/ValidationFailures_Summary_YYYY-MM-DD_HH-MM-SS.xlsx`

**Contents:**

| Group Name | Status | Details |
|------------|--------|---------|
| AHSHBW - Pay Process | CSV Export | 22 validation failures exported to... |
| ECMHBW - Pay Process | CSV Export | 15 validation failures exported to... |

---

## 🎯 Example Run Output

```
✅ Credentials loaded successfully
⚠️  AUTHENTICATION REQUIRED
📧 Filling in email address: PE@ashleyfurniture.com
🔐 Filling in password...
👉 Clicking "Yes" button...
✅ Authentication flow completed!

✅ Found 15 groups

======================================================================
📦 Processing Group 1/15: AHSHBW - Pay Process
======================================================================
👉 Looking for first job run ID...
   ✅ Found ID: "4f5aa906..."
   👉 Clicking on the ID element...
👉 Looking for Validation Failures section...
   ✅ Found Validation Failures section
   📊 Found 22 validation failure(s)
👉 Looking for "EXPORT CSV" button...
   ✅ Found "EXPORT CSV" button
   👉 Clicking "EXPORT CSV" button...
   ✅ Download started
   ✅ Saved CSV to: test-results/ValidationFailures_AHSHBW_Pay_Process_1733856234567.csv

... (continues for all groups)

======================================================================
🎉 VALIDATION FAILURES EXTRACTION COMPLETED!
======================================================================
📊 Summary exported to: test-results/ValidationFailures_Summary_2026-06-10_15-30-45.xlsx
📈 Groups processed: 15
📈 Groups with validation failures: 8
📁 CSV files saved in: test-results
```

---

## 🔍 What Happens for Each Group

### Groups WITH Validation Failures:
1. ✅ Click group name
2. ✅ Click first ID
3. ✅ Find "Validation Failures" section
4. ✅ Click "EXPORT CSV" button
5. ✅ Download CSV file
6. ✅ Continue to next group

### Groups WITHOUT Validation Failures:
1. ✅ Click group name
2. ✅ Click first ID
3. ✅ Check for "Validation Failures" section
4. ℹ️  No failures found
5. ✅ Skip and continue to next group

---

## 📁 File Structure After Running

```
test-results/
├── ValidationFailures_Summary_2026-06-10_15-30-45.xlsx  ← Summary
├── ValidationFailures_AHSHBW_Pay_Process_*.csv         ← Group 1 data
├── ValidationFailures_ECMHBW_Pay_Process_*.csv         ← Group 2 data
├── ValidationFailures_KWFHBW_Pay_Process_*.csv         ← Group 3 data
└── ... (one CSV per group with failures)
```

---

## ⚙️ Configuration

Uses the same credentials as payroll automation:

**File:** `config/credentials.json`

```json
{
  "email": "PE@ashleyfurniture.com",
  "password": "your-password",
  "portalUrl": "https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups"
}
```

---

## 🔐 Security

- ✅ Credentials protected by `.gitignore`
- ✅ Same security as payroll automation
- ✅ CSV files stored locally only

---

## 🎯 Key Features

### Automatic Handling

✅ **Skips groups without job runs**  
✅ **Skips groups without validation failures**  
✅ **Continues on errors** (doesn't fail completely)  
✅ **Downloads all CSV files automatically**  
✅ **Creates summary Excel file**

### Error Recovery

If a group fails:
- ❌ Logs the error
- ✅ Continues to next group
- ✅ Completes the run successfully

---

## 📊 Comparison with Payroll Automation

| Feature | Payroll Automation | Validation Failures |
|---------|-------------------|---------------------|
| **Login** | ✅ ADFS | ✅ Same |
| **Navigation** | ✅ Groups page | ✅ Same |
| **Click Group** | ✅ Yes | ✅ Yes |
| **Click ID** | ✅ Yes | ✅ Yes |
| **Action** | Click "Review Staged Earnings" | Click "EXPORT CSV" |
| **Output** | Single Excel file | Multiple CSV + Summary Excel |
| **Data** | Paycodes & Earning Codes | Validation Failures |

---

## 🆘 Troubleshooting

### Issue: No CSV files downloaded

**Reason:** No validation failures found  
**Solution:** This is normal! Not all groups have failures

### Issue: Some groups skipped

**Reason:** No job run ID found or no validation failures  
**Solution:** This is expected behavior

### Issue: Download failed

**Reason:** "EXPORT CSV" button not found  
**Solution:** Check if validation failures exist on that page

---

## 🔄 Running Regularly

You can run this automation:
- **Daily** - To catch new validation failures
- **Before deployments** - To ensure clean state
- **After data loads** - To verify data quality
- **On demand** - Whenever you need to check

**Same command every time:**
```bash
npx playwright test validation-failures.spec.ts --headed --timeout=1200000
```

---

## 📚 Related Files

- `tests/validation-failures.spec.ts` - Main automation script
- `tests/payroll-calculation.spec.ts` - Similar automation for paycodes
- `QUICK-START-VALIDATION.md` - Quick reference
- `VALIDATION-FAILURES-GUIDE.md` - Detailed guide

---

## ✅ Ready to Use!

**No setup required** - just run the command above!

The script will:
1. Login automatically
2. Process all groups
3. Download CSV files
4. Create summary Excel
5. Complete successfully

**Total time:** ~7-10 minutes for all groups

---

**Created:** 2026-06-10  
**Status:** ✅ Production Ready  
**Version:** 1.0
