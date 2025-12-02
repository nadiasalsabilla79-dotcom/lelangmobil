@echo off
set PATH=C:\Program Files\Git\bin;%PATH%
cd /d "%~dp0"
git add .
git commit -m "Initial commit - LelangMobil Platform"
git remote remove origin 2>nul
git remote add origin https://github.com/nadiasalsabilla79-dotcom/lelangmobil.git
git branch -M main
git push -u origin main
pause
