@echo off
echo ========================================
echo  FIXING ALL BUILD ISSUES - LELANGMOBIL
echo ========================================
echo.

echo Step 1: Cleaning previous builds...
if exist ".next" rmdir /s /q ".next"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo Step 2: Setting up environment...
set NODE_ENV=production
set PATH=%CD%\node-portable\node-v20.11.0-win-x64;%PATH%

echo Step 3: Installing/updating dependencies...
call node-portable\node-v20.11.0-win-x64\npm.cmd install --force

echo Step 4: Installing missing dependencies...
call node-portable\node-v20.11.0-win-x64\npm.cmd install tailwindcss-animate --save-dev

echo Step 5: Generating Prisma client...
call node-portable\node-v20.11.0-win-x64\npx.cmd prisma generate

echo Step 6: Building application...
call node-portable\node-v20.11.0-win-x64\npm.cmd run build

echo.
if exist ".next" (
    echo ✅ BUILD SUCCESSFUL!
    echo.
    echo Your application is ready for production.
    echo.
    echo To start production server:
    echo   npm start
    echo.
    echo To deploy to Vercel:
    echo   vercel --prod
) else (
    echo ❌ BUILD FAILED!
    echo.
    echo Please check the error messages above.
    echo Common issues:
    echo - Missing dependencies
    echo - TypeScript errors
    echo - CSS import issues
    echo - Environment variables
)

echo.
echo ========================================
echo  PROCESS COMPLETE
echo ========================================
pause