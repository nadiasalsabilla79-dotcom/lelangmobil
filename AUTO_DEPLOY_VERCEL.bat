@echo off
echo 🚀 AUTO DEPLOY LELANGMOBIL TO VERCEL
echo.

echo Step 1: Installing Vercel CLI...
call node-portable\node-v20.11.0-win-x64\npm.cmd install -g vercel

echo Step 2: Login to Vercel...
call node-portable\node-v20.11.0-win-x64\npx.cmd vercel login

echo Step 3: Deploy to production...
call node-portable\node-v20.11.0-win-x64\npx.cmd vercel --prod --yes

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo 🌐 Website: https://lelangmobil.vercel.app
pause