@echo off
echo ========================================
echo SETUP VERCEL ENV OTOMATIS
echo ========================================
echo.

echo [1/7] Install Vercel CLI...
call npm install -g vercel

echo.
echo [2/7] Login ke Vercel...
call vercel login

echo.
echo [3/7] Link project...
call vercel link

echo.
echo [4/7] Set POSTGRES_PRISMA_URL...
call vercel env add POSTGRES_PRISMA_URL production

echo.
echo [5/7] Set DATABASE_URL...
call vercel env add DATABASE_URL production

echo.
echo [6/7] Set JWT_SECRET...
call vercel env add JWT_SECRET production

echo.
echo [7/7] Redeploy...
call vercel --prod

echo.
echo ========================================
echo SELESAI!
echo ========================================
pause
