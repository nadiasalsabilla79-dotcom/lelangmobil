@echo off
echo ========================================
echo  🚀 DEPLOY LELANGMOBIL TO VERCEL
echo ========================================
echo.

set NODE_PATH=%~dp0node-portable\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%

echo Installing Vercel CLI...
npm install -g vercel

echo.
echo Deploying to Vercel...
vercel --prod

echo.
echo ✅ DEPLOYMENT COMPLETE!
echo.
echo Next steps:
echo 1. Go to Vercel Dashboard
echo 2. Add custom domain: lelangmobil.com
echo 3. Add www.lelangmobil.com
echo 4. Update Cloudflare DNS to point to Vercel
echo.
pause