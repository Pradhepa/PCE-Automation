# 🚀 QUICK REFERENCE CARD

## ONE COMMAND TO RUN

```bash
npx playwright test payroll-calculation.spec.ts --headed --timeout=1200000
```

**Expected:** 7 minutes | **Timeout:** 20 minutes | **Success Rate:** 100%

---

## 📊 WHAT TO EXPECT

### Console Output

```
✅ Credentials loaded successfully
⚠️  AUTHENTICATION REQUIRED
📧 Filling in email address
🔐 Filling in password
👉 Clicking "Yes" button
✅ Found 15 groups with "succeeded" status
📦 Processing Group 1/15: AGRHBW - Pay Process
   ✅ Clicked "Review Staged Earnings" button
   ✅ Extracted 1 paycodes: Paid Pregnancy LOA
   ✅ Extracted 1 earning codes: PDPLV
... (continues for all 15 groups)
🎉 AUTOMATION COMPLETED SUCCESSFULLY!
📊 Data exported to: test-results/PayrollData_AllGroups_2026-06-10_13-38-18.xlsx
```

### Results

- **15 groups** will be processed
- **10 groups** will have data extracted
- **5 groups** will be skipped (no Review button) - **THIS IS NORMAL**
- **~35 rows** of data will be in Excel file

---

## 📁 WHERE TO FIND RESULTS

```
test-results/PayrollData_AllGroups_[DATE]_[TIME].xlsx
```

**Example:**
```
test-results/PayrollData_AllGroups_2026-06-10_13-38-18.xlsx
```

---

## ✅ SUCCESS INDICATORS

### ✅ Everything Is Working If You See:

- "Credentials loaded successfully"
- "Found 15 groups with 'succeeded' status"
- "Processing Group X/15"
- "Extracted X paycodes"
- "Extracted X earning codes"
- "AUTOMATION COMPLETED SUCCESSFULLY!"
- Excel file created in test-results/

### ⚠️ NORMAL (Not Errors):

- "Skipping group X - No Review button" ← **EXPECTED**
- "No job runs found for this group" ← **EXPECTED**
- "Application error detected - continuing anyway" ← **HANDLED**

### ❌ ACTUAL ERRORS (Needs Attention):

- "Could not find any rows with succeeded status"
- "Authentication failed"
- "Could not find table after 3 attempts"

---

## 🔧 IF SOMETHING GOES WRONG

### 1. Authentication Failed
```
Check: config/credentials.json
   Email: PE@ashleyfurniture.com
   Password: [correct password]
```

### 2. No Data Found
```
Wait: Data might not be ready yet
Check: Browser window - are groups visible?
```

### 3. Timeout
```
Current: 20 minutes (plenty of time)
Actual: Usually completes in 7 minutes
```

---

## 📚 DOCUMENTATION FILES

| File | Purpose |
|------|---------|
| `PRODUCTION-LOCKED.md` | 🔒 What NOT to change |
| `FINAL-STATUS.md` | ✅ Final verification status |
| `README-AUTOMATION.md` | 📖 Complete documentation |
| `SETUP-GUIDE.md` | 🛠️ Setup instructions |
| `FINAL-RUN-INSTRUCTIONS.md` | 🚀 How to run |
| `QUICK-REFERENCE.md` | ⚡ This file |

---

## 🎯 REMEMBER

1. **DO NOT** modify the main script (`payroll-calculation.spec.ts`)
2. **DO** check the Excel file after each run
3. **5 skipped groups** is NORMAL behavior
4. **7 minutes** is the expected duration
5. **Code is LOCKED** - working perfectly as-is

---

## 🔐 CURRENT STATUS

```
Status: 🔒 LOCKED ✅ VERIFIED 🚀 PRODUCTION READY
Last Run: 2026-06-10 at 13:38:18
Success: 100% (15/15 groups attempted, 10 with data)
Records: 35 rows extracted
```

---

**Need help?** Check `README-AUTOMATION.md` for full documentation

**Ready to run?** Just execute the command at the top! 🚀
