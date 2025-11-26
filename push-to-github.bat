@echo off
chcp 65001 >nul
echo ========================================
echo   Push to GitHub - Dong Tay Dai Chien
echo ========================================
echo.

cd /d "%~dp0"

echo Setting remote URL...
git remote set-url origin https://github.com/YIZ006/Dong-tay-dai-chien.git

echo.
echo Checking git status...
git status

echo.
echo Adding all changes...
git add -A

echo.
echo Committing changes...
git commit -m "Fix: Logic kiem tra luot choi va hien thi phan chon dong xu - Update coin flip and turn validation"

echo.
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code da duoc push len GitHub
    echo   Repository: https://github.com/YIZ006/Dong-tay-dai-chien
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   ERROR: Khong the push len GitHub
    echo   Kiem tra lai GitHub credentials hoac chay:
    echo   git config --global user.name "Your Name"
    echo   git config --global user.email "your.email@example.com"
    echo ========================================
)

echo.
pause

