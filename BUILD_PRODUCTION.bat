@echo off
echo ========================================
echo  BUILDING LELANGMOBIL FOR PRODUCTION
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install

echo.
echo Step 2: Installing missing dependencies...
call npm install tailwindcss-animate

echo.
echo Step 3: Generating Prisma client...
call npx prisma generate

echo.
echo Step 4: Building Next.js application...
call npm run build

echo.
echo Step 5: Checking build output...
if exist ".next" (
    echo ✅ Build successful! .next folder created.
) else (
    echo ❌ Build failed! .next folder not found.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  BUILD COMPLETE!
echo ========================================
echo.
echo Your application is ready for production!
echo.
echo To start the production server:
echo   npm start
echo.
echo To run in development mode:
echo   npm run dev
echo.
pause