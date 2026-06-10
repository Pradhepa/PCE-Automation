# PowerShell Script to Run Payroll Automation
# Save this as run-payroll-automation.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ashley Payroll Automation Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "playwright.config.ts")) {
    Write-Host "Error: Please run this script from the my-playwright-project directory" -ForegroundColor Red
    exit 1
}

# Ask user for run mode
Write-Host "Select run mode:" -ForegroundColor Yellow
Write-Host "1. Headed (visible browser - recommended)" -ForegroundColor White
Write-Host "2. Headless (background)" -ForegroundColor White
Write-Host "3. Debug mode" -ForegroundColor White
Write-Host ""
$choice = Read-Host "Enter choice (1, 2, or 3)"

Write-Host ""
Write-Host "Starting automation..." -ForegroundColor Green
Write-Host ""

switch ($choice) {
    "1" {
        npx playwright test payroll-calculation.spec.ts --headed
    }
    "2" {
        npx playwright test payroll-calculation.spec.ts
    }
    "3" {
        npx playwright test payroll-calculation.spec.ts --debug
    }
    default {
        Write-Host "Invalid choice. Running in headed mode by default..." -ForegroundColor Yellow
        npx playwright test payroll-calculation.spec.ts --headed
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Automation Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Check the test-results folder for:" -ForegroundColor Green
Write-Host "  - Excel file with extracted data" -ForegroundColor White
Write-Host "  - Screenshots from each step" -ForegroundColor White
Write-Host ""
Write-Host "To view detailed HTML report, run:" -ForegroundColor Yellow
Write-Host "  npx playwright show-report" -ForegroundColor White
Write-Host ""
