@echo off
echo ========================================
echo UPLOAD PROJECT KE GITHUB
echo ========================================
echo.

cd /d "%~dp0"

set /p REPO_URL="Masukkan URL GitHub Repository (https://github.com/username/repo.git): "

if "%REPO_URL%"=="" (
    echo Error: URL repository tidak boleh kosong!
    pause
    exit /b 1
)

echo.
echo [1/5] Menambahkan semua file...
git add .

echo.
echo [2/5] Membuat commit...
git commit -m "Initial commit - LelangMobil Platform"

echo.
echo [3/5] Menambahkan remote repository...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo [4/5] Mengecek branch...
git branch -M main

echo.
echo [5/5] Upload ke GitHub...
git push -u origin main

echo.
echo ========================================
echo UPLOAD SELESAI!
echo ========================================
echo.
echo Repository: %REPO_URL%
echo Branch: main
echo.
pause
