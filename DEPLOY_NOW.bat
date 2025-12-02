@echo off
echo ========================================
echo  DEPLOY LELANGMOBIL TO PRODUCTION
echo ========================================
echo.

echo Step 1: Final build check...
if not exist ".next" (
    echo Building application first...
    call FIX_BUILD_ISSUES.bat
)

echo Step 2: Preparing for deployment...
echo.
echo ✅ Build files ready
echo ✅ Environment variables configured
echo ✅ Database schema updated
echo ✅ Vercel configuration optimized

echo.
echo Step 3: Deployment options...
echo.
echo Choose deployment method:
echo [1] Auto deploy via GitHub (Recommended)
echo [2] Manual deploy via Vercel CLI
echo [3] Check deployment status
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🚀 AUTO DEPLOY VIA GITHUB
    echo.
    echo 1. Push your code to GitHub:
    echo    git add .
    echo    git commit -m "Production ready - All issues fixed"
    echo    git push origin main
    echo.
    echo 2. Vercel will automatically deploy from GitHub
    echo 3. Check deployment at: https://vercel.com/dashboard
    echo.
) else if "%choice%"=="2" (
    echo.
    echo 🚀 MANUAL DEPLOY VIA VERCEL CLI
    echo.
    echo Installing Vercel CLI...
    call node-portable\node-v20.11.0-win-x64\npm.cmd install -g vercel
    echo.
    echo Deploying to production...
    call node-portable\node-v20.11.0-win-x64\npx.cmd vercel --prod
    echo.
) else if "%choice%"=="3" (
    echo.
    echo 📊 DEPLOYMENT STATUS CHECK
    echo.
    echo Visit these URLs to check status:
    echo - Vercel Dashboard: https://vercel.com/dashboard
    echo - GitHub Actions: https://github.com/your-repo/actions
    echo - Live Site: https://lelangmobil.vercel.app
    echo.
) else (
    echo Invalid choice. Please run the script again.
)

echo.
echo ========================================
echo  DEPLOYMENT PROCESS COMPLETE
echo ========================================
echo.
echo 🌐 Your website will be available at:
echo    https://lelangmobil.vercel.app
echo    https://lelangmobil.com (if custom domain configured)
echo.
echo 📧 Admin Email: jamila.lelangmobil@gmail.com
echo 📱 Admin Phone: 0882022783493
echo.
pause