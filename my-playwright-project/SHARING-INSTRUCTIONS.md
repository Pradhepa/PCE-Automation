# 📤 How to Share This Automation Script

## What to Share

When sharing this automation with colleagues, you need to share the following files and folders:

### ✅ Files to Share:

```
my-playwright-project/
├── config/
│   └── credentials.template.json  ← Share this (template)
├── tests/
│   └── payroll-calculation.spec.ts
├── package.json
├── playwright.config.ts
├── SETUP-GUIDE.md
└── .gitignore
```

### ❌ Files NOT to Share:

```
❌ config/credentials.json  (Contains YOUR password!)
❌ node_modules/            (Will be installed by npm)
❌ test-results/            (Contains your reports)
```

---

## 📧 Instructions for the Recipient

### Step 1: Install Node.js
If they don't have Node.js installed:
- Download from: https://nodejs.org/
- Install the LTS (Long Term Support) version
- Verify installation: `node --version`

### Step 2: Extract the Files
Extract the shared project folder to their computer.

### Step 3: Install Dependencies

Open terminal/command prompt in the project folder and run:

```bash
npm install
```

This will install all required packages including Playwright.

### Step 4: Install Chrome Browser for Playwright

```bash
npx playwright install chrome
```

### Step 5: Configure Credentials

1. Go to the `config` folder
2. Make a copy of `credentials.template.json`
3. Rename the copy to `credentials.json`
4. Open `credentials.json` and update:
   ```json
   {
     "email": "their.email@ashleyfurniture.com",
     "password": "their_password",
     "portalUrl": "https://people.stage.ashleyfurniture.com/payhub/calculation-engine/calculation-set-groups"
   }
   ```

### Step 6: Run the Script

```bash
npx playwright test payroll-calculation.spec.ts --headed
```

---

## 🎥 Quick Start Video Script (for screen recording)

If you want to create a quick video tutorial:

1. **Show the project folder structure**
   - "Here's the automation project folder"
   
2. **Open terminal in the folder**
   - "Right-click and select 'Open in Terminal' or 'Open PowerShell here'"
   
3. **Run: `npm install`**
   - "This installs all the dependencies"
   
4. **Run: `npx playwright install chrome`**
   - "This installs the Chrome browser for automation"
   
5. **Show config folder**
   - "Go to the config folder"
   - "Copy credentials.template.json"
   - "Rename to credentials.json"
   - "Edit and add your email and password"
   
6. **Run the script**
   - `npx playwright test payroll-calculation.spec.ts --headed`
   - "Watch it run and generate the Excel file!"

7. **Show the results**
   - "The Excel file is in test-results folder"
   - "Open and show the data"

---

## 📋 Email Template

Here's a template email you can use:

---

**Subject:** Ashley Payroll Automation Script - Setup Instructions

Hi [Name],

I'm sharing the automated script for extracting payroll data from the Ashley Furniture Payroll Calculation Engine.

**What it does:**
- Logs into the portal automatically
- Extracts Paycode and Earning Code data from all succeeded groups
- Creates an Excel report with the results

**Attached:**
- Project folder with all scripts and instructions

**Setup Steps:**
1. Extract the folder to your computer
2. Follow the instructions in `SETUP-GUIDE.md`
3. Create your `config/credentials.json` file (use the template provided)
4. Run: `npm install`
5. Run: `npx playwright install chrome`
6. Run the script: `npx playwright test payroll-calculation.spec.ts --headed`

**Important Security Notes:**
- ⚠️ Never share your credentials.json file with anyone
- ⚠️ Keep your password secure
- ⚠️ The credentials.template.json is just a template - you need to create credentials.json

If you have any questions, feel free to reach out!

Best regards,
[Your Name]

---

## 🔐 Security Reminders

When sharing:
1. ✅ Delete your `credentials.json` before sharing
2. ✅ Delete `node_modules` folder (it's large and will be reinstalled)
3. ✅ Delete `test-results` folder (contains your data)
4. ✅ Only share the template file, not your actual credentials
5. ✅ Include the `.gitignore` file to prevent accidental credential commits

## 📦 How to Package for Sharing

### Option 1: Zip File
1. Delete `config/credentials.json`
2. Delete `node_modules/` folder
3. Delete `test-results/` folder
4. Zip the entire `my-playwright-project` folder
5. Share the zip file

### Option 2: Git Repository
1. Make sure `.gitignore` includes `config/credentials.json`
2. Commit all files except credentials.json
3. Push to a private repository
4. Share repository access

---

**Remember:** The recipient needs to create their own `credentials.json` file!
