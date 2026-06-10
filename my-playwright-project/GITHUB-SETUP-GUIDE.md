# 🚀 GitHub Setup & Push Guide

## 📋 Prerequisites

Before pushing to GitHub, you need:
1. ✅ A GitHub account (create at https://github.com/signup if needed)
2. ✅ Git installed on your computer
3. ✅ A GitHub repository created (we'll do this together)

---

## Step 1: Install Git (If Not Already Installed)

### Download & Install Git for Windows

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Click "Click here to download" (64-bit version)

2. **Install Git:**
   - Run the installer
   - **Recommended settings during installation:**
     - ✅ Use Visual Studio Code as Git's default editor (or your preferred editor)
     - ✅ Git from the command line and also from 3rd-party software
     - ✅ Use bundled OpenSSH
     - ✅ Use the OpenSSL library
     - ✅ Checkout Windows-style, commit Unix-style line endings
     - ✅ Use MinTTY
     - ✅ Default (fast-forward or merge)
     - ✅ Git Credential Manager
     - ✅ Enable file system caching
   - Click "Install"

3. **Verify Installation:**
   - Open a new PowerShell window
   - Run: `git --version`
   - You should see something like: `git version 2.43.0.windows.1`

---

## Step 2: Create a GitHub Repository

### On GitHub.com

1. **Log in to GitHub:**
   - Go to: https://github.com
   - Sign in with your account

2. **Create New Repository:**
   - Click the "+" icon (top right)
   - Select "New repository"

3. **Repository Settings:**
   - **Repository name:** `ashley-payroll-automation` (or your preferred name)
   - **Description:** "Automated payroll data extraction from Ashley Furniture Payroll Calculation Engine"
   - **Visibility:** 
     - ⚠️ **Private** (recommended for work projects)
     - OR **Public** (if approved by your organization)
   - **Initialize repository:**
     - ❌ DO NOT check "Add a README file"
     - ❌ DO NOT add .gitignore
     - ❌ DO NOT choose a license
   - Click "Create repository"

4. **Copy Repository URL:**
   - After creation, you'll see a URL like:
     ```
     https://github.com/YOUR-USERNAME/ashley-payroll-automation.git
     ```
   - **SAVE THIS URL** - you'll need it in Step 3

---

## Step 3: Push Your Code to GitHub

### Open PowerShell in Your Project Directory

1. **Navigate to your project:**
   ```powershell
   cd "C:\Users\PE\OneDrive - Ashley Furniture Industries, Inc\Playwrightautomation"
   ```

2. **Verify you're in the right place:**
   ```powershell
   dir
   ```
   You should see the `my-playwright-project` folder

3. **Initialize Git Repository:**
   ```powershell
   git init
   ```
   Expected output: `Initialized empty Git repository...`

4. **Configure Git (First time only):**
   ```powershell
   git config user.name "Your Name"
   git config user.email "your.email@ashleyfurniture.com"
   ```

5. **Add all files to Git:**
   ```powershell
   git add .
   ```
   This adds all files EXCEPT those in `.gitignore` (like credentials.json)

6. **Verify what will be committed:**
   ```powershell
   git status
   ```
   **IMPORTANT:** Check that `config/credentials.json` is NOT listed in green
   - ✅ If it's NOT listed = GOOD (protected by .gitignore)
   - ❌ If it IS listed = STOP and ask for help

7. **Create your first commit:**
   ```powershell
   git commit -m "Initial commit: Payroll automation complete and verified"
   ```

8. **Add your GitHub repository as remote:**
   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   ```
   Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual values

9. **Set default branch to main:**
   ```powershell
   git branch -M main
   ```

10. **Push to GitHub:**
    ```powershell
    git push -u origin main
    ```
    - You may be prompted to sign in to GitHub
    - Use your GitHub username and password
    - OR use a Personal Access Token (GitHub may require this)

---

## Step 4: Verify on GitHub

1. **Go to your repository:**
   ```
   https://github.com/YOUR-USERNAME/YOUR-REPO-NAME
   ```

2. **Check that files are there:**
   - ✅ You should see:
     - `my-playwright-project/` folder
     - `README-AUTOMATION.md`
     - `config/credentials.template.json`
     - All documentation files
   - ❌ You should NOT see:
     - `config/credentials.json` (YOUR PASSWORD)
     - `node_modules/` folder
     - `test-results/` folder

3. **✅ Success!** Your code is now on GitHub!

---

## 🔄 Future Updates (How to Push Changes)

Whenever you make changes:

```powershell
# 1. Check what changed
git status

# 2. Add the changes
git add .

# 3. Commit with a message
git commit -m "Description of what you changed"

# 4. Push to GitHub
git push
```

---

## 🆘 Troubleshooting

### Problem: "git: command not found"
**Solution:** Git is not installed or not in PATH. Reinstall Git and restart PowerShell.

### Problem: Authentication failed
**Solution:** 
1. GitHub may require a Personal Access Token instead of password
2. Go to: https://github.com/settings/tokens
3. Generate a new token (classic)
4. Use the token as your password when pushing

### Problem: credentials.json appears in git status
**Solution:**
1. **DO NOT COMMIT!**
2. Run: `git reset`
3. Verify `.gitignore` contains `config/credentials.json`
4. Run: `git add .` again
5. Check `git status` - credentials.json should be gone

### Problem: Permission denied
**Solution:** Make sure you own the repository or have been added as a collaborator.

---

## 📚 Additional Resources

- Git documentation: https://git-scm.com/doc
- GitHub guides: https://guides.github.com/
- Git cheat sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

## ✅ Checklist Before Pushing

- [ ] Git is installed and working
- [ ] GitHub repository created
- [ ] `.gitignore` file exists and includes `config/credentials.json`
- [ ] `git status` does NOT show credentials.json
- [ ] All documentation files are included
- [ ] You've committed with a meaningful message

---

**🎉 Ready to push your code to GitHub! Follow the steps above.**
