@echo off
echo 🚀 COMMIT & DEPLOY LELANGMOBIL
echo.

echo Step 1: Adding all files to git...
git add .

echo Step 2: Committing changes...
git commit -m "✅ Fix globals.css and all build issues - Production ready"

echo Step 3: Pushing to GitHub...
git push origin main

echo.
echo ✅ COMMITTED AND PUSHED!
echo Vercel will auto-deploy from GitHub
echo.
pause