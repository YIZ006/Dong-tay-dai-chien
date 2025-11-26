@echo off
echo ========================================
echo   Deploy to GitHub - Dong Tay Dai Chien
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing git repository...
    git init
)

REM Add all files
echo Adding files...
git add .

REM Commit
echo Committing changes...
git commit -m "Update: Dong Tay Dai Chien game"

REM Check if remote exists
git remote -v >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   Setup GitHub Remote
    echo ========================================
    echo.
    set /p GITHUB_URL="Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): "
    git remote add origin %GITHUB_URL%
)

REM Push to GitHub
echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code đã được push lên GitHub
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   ERROR: Không thể push lên GitHub
    echo   Kiểm tra lại GitHub URL và credentials
    echo ========================================
)

pause


