@echo off
echo ========================================
echo  QUICK FIX BUILD ISSUES - LELANGMOBIL
echo ========================================
echo.

echo Step 1: Setting up Node.js environment...
set PATH=%CD%\node-portable\node-v20.11.0-win-x64;%PATH%

echo Step 2: Installing dependencies...
call node-portable\node-v20.11.0-win-x64\npm.cmd install

echo Step 3: Generating Prisma client...
call node-portable\node-v20.11.0-win-x64\npx.cmd prisma generate

echo Step 4: Building application...
call node-portable\node-v20.11.0-win-x64\npm.cmd run build

echo.
echo ========================================
echo  BUILD PROCESS COMPLETE!
echo ========================================
pause