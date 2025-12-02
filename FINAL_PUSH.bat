@echo off
echo ========================================
echo UPLOAD KE GITHUB
echo ========================================
set PATH=C:\Program Files\Git\bin;%PATH%
cd /d "%~dp0"

echo [1/6] Git add...
git add .

echo [2/6] Git commit...
git commit -m "Initial commit - LelangMobil Platform Full Production Ready"

echo [3/6] Remove old origin...
git remote remove origin 2>nul

echo [4/6] Add new origin...
git remote add origin https://github.com/nadiasalsabilla79-dotcom/lelangmobil.git

echo [5/6] Set branch main...
git branch -M main

echo [6/6] Push to GitHub...
git push -u origin main --force

echo.
echo ========================================
echo SELESAI! Repository: https://github.com/nadiasalsabilla79-dotcom/lelangmobil
echo ========================================
pause
