@echo off
chcp 65001 >nul
echo ========================================
echo   DEPLOY LÊN GITHUB - ĐÔNG TÂY ĐẠI CHIẾN
echo ========================================
echo.

REM Kiểm tra git đã được cài đặt chưa
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git chưa được cài đặt!
    echo Vui lòng cài đặt Git từ: https://git-scm.com/downloads
    pause
    exit /b 1
)

REM Kiểm tra đã có git repository chưa
if not exist ".git" (
    echo [INFO] Khởi tạo Git repository...
    git init
    echo.
)

REM Kiểm tra remote đã được cấu hình chưa
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [SETUP] Chưa có remote repository!
    echo.
    set /p GITHUB_URL="Nhập URL GitHub repository (ví dụ: https://github.com/YIZ006/Dong-tay-dai-chien.git): "
    if "!GITHUB_URL!"=="" (
        echo [ERROR] URL không được để trống!
        pause
        exit /b 1
    )
    git remote add origin "!GITHUB_URL!"
    echo [SUCCESS] Đã thêm remote: !GITHUB_URL!
    echo.
)

REM Hiển thị trạng thái thay đổi
echo [INFO] Kiểm tra thay đổi...
git status --short
echo.

REM Hỏi commit message
set /p COMMIT_MSG="Nhập commit message (Enter để dùng mặc định): "
if "!COMMIT_MSG!"=="" (
    set COMMIT_MSG=Update: Cập nhật game Đông Tây Đại Chiến
)

REM Add tất cả file
echo.
echo [INFO] Đang thêm file vào staging...
git add .
if %errorlevel% neq 0 (
    echo [ERROR] Không thể add file!
    pause
    exit /b 1
)

REM Commit
echo [INFO] Đang commit với message: "!COMMIT_MSG!"
git commit -m "!COMMIT_MSG!"
if %errorlevel% neq 0 (
    echo [WARNING] Không có thay đổi để commit hoặc commit thất bại!
    echo.
)

REM Đảm bảo branch là main
git branch -M main >nul 2>&1

REM Push lên GitHub
echo.
echo [INFO] Đang push lên GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✓ SUCCESS! Đã deploy lên GitHub thành công!
    echo ========================================
    echo.
    echo Repository: 
    git remote get-url origin
    echo.
) else (
    echo.
    echo ========================================
    echo   ✗ ERROR: Không thể push lên GitHub
    echo ========================================
    echo.
    echo Có thể do:
    echo 1. Chưa đăng nhập GitHub (dùng: git config --global user.name và user.email)
    echo 2. Chưa có quyền truy cập repository
    echo 3. Cần authentication token
    echo.
    echo Hướng dẫn:
    echo - Tạo Personal Access Token tại: https://github.com/settings/tokens
    echo - Dùng token thay cho password khi push
    echo.
)

pause

