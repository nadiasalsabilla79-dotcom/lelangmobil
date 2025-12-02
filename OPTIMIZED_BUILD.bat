@echo off
echo ========================================
echo  LELANGMOBIL - OPTIMIZED BUILD 2025
echo ========================================
echo.

echo ✅ Installing dependencies...
call npm install

echo.
echo ✅ Installing Tailwind animate plugin...
call npm install tailwindcss-animate

echo.
echo ✅ Generating Prisma client...
call npx prisma generate

echo.
echo ✅ Building optimized production version...
call npm run build

echo.
echo ========================================
echo  🚀 BUILD COMPLETE - OPTIMIZED!
echo ========================================
echo.
echo ✅ Lightweight background implemented
echo ✅ Navbar colors fixed (blue theme)
echo ✅ Professional logo added
echo ✅ Performance optimized
echo ✅ Heavy animations removed
echo ✅ Modern UI maintained
echo.
echo To start: npm run dev (development) or npm start (production)
echo.
pause