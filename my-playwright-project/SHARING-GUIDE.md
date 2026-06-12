# 🤝 Sharing Guide - PCE Automation

This guide explains how to share the automation scripts with other team members so they can run them with their own credentials.

---

## ✅ YES! Easy to Share!

Your automation is **already set up** for easy sharing! Other users can run it with their own credentials in just a few simple steps.

---

## 🔐 How Security Works

### Protected Files (Never Shared):
- ❌ `config/credentials.json` - Each user's personal credentials
- ❌ `test-results/` - Excel output files (may contain sensitive data)
- ❌ `node_modules/` - Auto-installed dependencies

### Shared Files (Safe to Share):
- ✅ `config/credentials.template.json` - Template for credentials
- ✅ All `.ts` script files - The automation code
- ✅ `package.json` - Dependencies list
- ✅ `.gitignore` - Protects sensitive files
- ✅ Documentation files (README, guides, etc.)

**The `.gitignore` file automatically prevents sensitive files from being committed to Git!**

---

## 📤 How to Share the Automation

### Option 1: Share via GitHub (Recommended)

**The automation is already on GitHub:**
```
https://github.com/Pradhepa/PCE-Automation
```

**Tell your team members to:**
1. Clone the repository
2. Follow the setup steps below

### Option 2: Share as a ZIP File

1. **Create a ZIP** of the `my-playwright-project` folder
2. **Share the ZIP** via email, Teams, or shared drive
3. **Tell recipients** to follow the setup steps below

**Note:** The `.gitignore` already ensures credentials won't be in the ZIP!

---

## 👥 Setup Steps for Other Users

Share these instructions with your team:

### Step 1: Get the Code

**From GitHub:**
```bash
git clone https://github.com/Pradhepa/PCE-Automation.git
cd PCE-Automation/my-playwright-project
```

**From ZIP file:**
1. Extract the ZIP file
2. Open terminal/command prompt
3. Navigate to the folder:
   ```bash
   cd path/to/my-playwright-project
   ```

### Step 2: Install Dependencies

```bash
npm install
npx playwright install
```

**Time:** About 5-7 minutes (one-time setup)

### Step 3: Create Personal Credentials

**Windows:**
```bash
copy config\credentials.template.json config\credentials.json
```

**Mac/Linux:**
```bash
cp config/credentials.template.json config/credentials.json
```

### Step 4: Edit Credentials

Open `config/credentials.json` in any text editor and add **your own** credentials:

```json
{
  "email": "your.email@ashleyfurniture.com",
  "password": "YourPassword123",
  "portalUrl": "https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups"
}
```

**⚠️ IMPORTANT:** Never share this file with anyone!

### Step 5: Run the Automation

**Payroll Calculation:**
```bash
npx playwright test payroll-calculation.spec.ts --headed --timeout=1200000
```

**Validation Failures:**
```bash
npx playwright test validation-failures.spec.ts --headed --timeout=1200000
```

---

## 📋 Quick Setup Checklist for New Users

- [ ] Clone/download the project
- [ ] Run `npm install`
- [ ] Run `npx playwright install`
- [ ] Copy template: `config/credentials.template.json` → `config/credentials.json`
- [ ] Edit `config/credentials.json` with your credentials
- [ ] Run the automation
- [ ] Find Excel output in `test-results/` folder

---

## 🎯 What Each User Gets

Each team member will:
- ✅ Have their own `credentials.json` file (never shared)
- ✅ Generate their own Excel output files
- ✅ Run the automation with their own login
- ✅ See the browser automation happen on their machine

**Everyone uses the same scripts, but with their own credentials!**

---

## 💡 Best Practices for Team Sharing

### DO ✅
- ✅ Share the GitHub repository link
- ✅ Share documentation and guides
- ✅ Help teammates with setup questions
- ✅ Update the GitHub repo when you improve the scripts
- ✅ Use the credentials template

### DON'T ❌
- ❌ Share your `credentials.json` file
- ❌ Email passwords in plain text
- ❌ Commit credentials to Git
- ❌ Share Excel output files if they contain sensitive employee data
- ❌ Post credentials in Slack/Teams

---

## 🔄 Updating the Automation

When you make improvements to the scripts:

1. **Update GitHub:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

2. **Tell Your Team:**
   - Notify team members there's an update
   - They can pull the latest version:
     ```bash
     git pull
     ```

**Their credentials file stays safe on their machine!**

---

## 📞 Support for New Users

**Common Questions:**

**Q: Do I need to share my password?**
A: No! Each person uses their own credentials in their own `credentials.json` file.

**Q: Will my credentials be visible to others?**
A: No! The `.gitignore` file prevents `credentials.json` from being committed to Git.

**Q: Can multiple people run this at the same time?**
A: Yes! Each person runs it independently on their own machine.

**Q: Do I need admin rights?**
A: No admin rights needed! Just Node.js installed and access to the Ashley portal.

---

## 🎉 Summary

Your automation is **ready to share**! The security is built-in:

- ✅ Template-based credentials system
- ✅ `.gitignore` protects sensitive files
- ✅ Each user has their own credentials
- ✅ Easy setup process (5-10 minutes)
- ✅ No risk of exposing passwords

**Share confidently! Your automation is secure and ready for the team!** 🚀

