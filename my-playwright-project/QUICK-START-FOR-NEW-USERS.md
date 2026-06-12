# ⚡ Quick Start - New Users

**Welcome! This guide will get you running the automation in 10 minutes.**

---

## 📋 What You Need

- ✅ Windows, Mac, or Linux computer
- ✅ Internet connection
- ✅ Your Ashley Furniture email and password
- ✅ 10 minutes of your time

---

## 🚀 Setup Steps

### 1️⃣ Install Node.js (If Not Already Installed)

**Download from:** https://nodejs.org/

**Choose:** LTS (Long Term Support) version

**Verify it worked:**
```bash
node --version
```

You should see something like: `v18.17.0` or `v20.10.0`

---

### 2️⃣ Get the Code

**Option A - From GitHub (Recommended):**
```bash
git clone https://github.com/Pradhepa/PCE-Automation.git
cd PCE-Automation/my-playwright-project
```

**Option B - From ZIP file:**
1. Extract the ZIP file
2. Open terminal/command prompt  
3. Navigate to the folder:
   ```bash
   cd path/to/my-playwright-project
   ```

---

### 3️⃣ Install Everything

**Copy and paste these commands:**

```bash
npm install
npx playwright install
```

**Wait 5-7 minutes** while it downloads and installs.

---

### 4️⃣ Add Your Credentials

**Step 1: Copy the template**

**Windows:**
```bash
copy config\credentials.template.json config\credentials.json
```

**Mac/Linux:**
```bash
cp config/credentials.template.json config/credentials.json
```

**Step 2: Edit the file**

Open `config/credentials.json` in Notepad (Windows) or TextEdit (Mac) and change:

```json
{
  "email": "your.email@ashleyfurniture.com",
  "password": "YourPasswordHere",
  "portalUrl": "https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups"
}
```

**Example:**
```json
{
  "email": "john.smith@ashleyfurniture.com",
  "password": "MyPass2024!",
  "portalUrl": "https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups"
}
```

**Save and close the file.**

---

### 5️⃣ Run the Automation!

**For Payroll Data (Paycode & Earning Code):**
```bash
npx playwright test payroll-calculation.spec.ts --headed --timeout=1200000
```

**For Validation Failures:**
```bash
npx playwright test validation-failures.spec.ts --headed --timeout=1200000
```

---

## 🎬 What You'll See

1. **Browser opens** - Chrome will open automatically
2. **Login** - Script enters your credentials
3. **Automation runs** - You'll see it navigate through groups
4. **Excel created** - Check the `test-results/` folder
5. **Browser closes** - Done!

---

## 📊 Where's My Output?

Your Excel files are in:
```
my-playwright-project/test-results/
```

**Files:**
- `PayrollData_AllGroups_YYYY-MM-DD_HH-MM-SS.xlsx`
- `ValidationFailures_YYYY-MM-DD_HH-MM-SS.xlsx`

---

## ❓ Troubleshooting

### ❌ "npm: command not found"
**Solution:** Install Node.js (Step 1)

### ❌ "Credentials file not found"
**Solution:** Make sure you copied the template (Step 4)

### ❌ "Authentication failed"
**Solution:** Check your email and password in `config/credentials.json`

### ❌ Browser doesn't open
**Solution:** Run: `npx playwright install`

---

## 🔒 Security

**Your credentials are safe!**
- ✅ They stay on your computer only
- ✅ Never shared with anyone
- ✅ Never committed to Git
- ✅ Protected by `.gitignore`

**Never share your `config/credentials.json` file!**

---

## 💡 Pro Tips

**Watch it run:**
- The `--headed` flag shows you the browser
- Remove it to run in background: `npx playwright test payroll-calculation.spec.ts --timeout=1200000`

**Let it run:**
- Payroll: ~10-15 minutes
- Validation Failures: ~5-7 minutes
- You can minimize the browser window

**Multiple runs:**
- Files are timestamped
- Run as many times as you want
- Old files won't be overwritten

---

## 📞 Need Help?

1. ✅ Check the [SETUP-GUIDE.md](SETUP-GUIDE.md) for detailed instructions
2. ✅ Check the [SHARING-GUIDE.md](SHARING-GUIDE.md) for team sharing info
3. ✅ Ask Pradhepa or the automation team
4. ✅ Check the terminal output for error messages

---

## ✅ Quick Checklist

Before running:
- [ ] Node.js installed (`node --version` works)
- [ ] Code downloaded/cloned
- [ ] `npm install` completed
- [ ] `npx playwright install` completed
- [ ] `config/credentials.json` created with your credentials
- [ ] Ready to run!

---

## 🎉 You're All Set!

**That's it! You're ready to automate!**

Just run the command and watch the magic happen! 🚀

```bash
npx playwright test payroll-calculation.spec.ts --headed --timeout=1200000
```

**Happy Automating!** 🎊

---

**Questions? Check the other documentation files or ask the team!**
