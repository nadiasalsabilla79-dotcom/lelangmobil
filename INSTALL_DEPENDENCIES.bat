@echo off
echo ========================================
echo  INSTALLING LELANGMOBIL DEPENDENCIES
echo ========================================
echo.

echo Installing Node.js dependencies...
call npm install

echo.
echo Installing additional required packages...
call npm install tailwindcss-animate

echo.
echo Generating Prisma client...
call npx prisma generate

echo.
echo ========================================
echo  INSTALLATION COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Setup your database in HeidiSQL
echo 2. Update .env file with your database credentials
echo 3. Run: npm run db:push
echo 4. Run: npm run db:seed
echo 5. Run: npm run dev
echo.
pause