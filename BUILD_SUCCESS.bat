@echo off
echo 🚀 BUILDING LELANGMOBIL
echo.

echo Setting PATH...
set PATH=%CD%\node-portable\node-v20.11.0-win-x64;%PATH%

echo Step 1: Generating Prisma client...
call npx prisma generate

echo Step 2: Building Next.js app...
call npx next build

echo.
if exist ".next" (
    echo ✅ BUILD SUCCESSFUL!
    echo Ready for deployment
) else (
    echo ❌ Build failed
)
pause