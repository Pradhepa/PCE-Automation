@echo off
echo ============================================================
echo PUSHING CODE TO GITHUB REPOSITORY: PCE-Automation
echo ============================================================
echo.

cd /d "C:\Users\PE\OneDrive - Ashley Furniture Industries, Inc\Playwrightautomation"

echo Step 1: Initializing Git repository...
git init
echo.

echo Step 2: Configuring Git...
git config user.name "Pradhepa"
git config user.email "PE@ashleyfurniture.com"
echo.

echo Step 3: Adding all files...
git add .
echo.

echo Step 4: Checking files to be committed...
echo ============================================================
echo IMPORTANT: Check that credentials.json is NOT in the list below!
echo ============================================================
git status
echo.
echo.

pause
echo.

echo Step 5: Creating first commit...
git commit -m "Initial commit: Payroll automation complete and verified"
echo.

echo Step 6: Adding GitHub repository...
git remote add origin https://github.com/Pradhepa/PCE-Automation.git
echo.

echo Step 7: Setting branch to main...
git branch -M main
echo.

echo Step 8: Pushing to GitHub...
git push -u origin main
echo.

echo ============================================================
echo DONE! Check your repository at:
echo https://github.com/Pradhepa/PCE-Automation
echo ============================================================
echo.

pause
