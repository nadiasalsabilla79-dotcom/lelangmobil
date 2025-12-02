@echo off
echo ========================================
echo LelangMobil - Fix Common Issues
echo ========================================
echo.

:menu
echo Select an option:
echo 1. Fix node_modules (reinstall dependencies)
echo 2. Fix Prisma Client (regenerate)
echo 3. Fix database connection
echo 4. Clear Next.js cache
echo 5. Fix all issues (full reset)
echo 6. Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto fix_modules
if "%choice%"=="2" goto fix_prisma
if "%choice%"=="3" goto fix_database
if "%choice%"=="4" goto fix_cache
if "%choice%"=="5" goto fix_all
if "%choice%"=="6" goto end
goto menu

:fix_modules
echo.
echo [1/2] Removing node_modules...
rmdir /s /q node_modules 2>nul
echo [2/2] Installing dependencies...
call pnpm install
echo Done!
pause
goto menu

:fix_prisma
echo.
echo [1/2] Removing Prisma Client...
rmdir /s /q node_modules\.prisma 2>nul
echo [2/2] Generating Prisma Client...
call pnpm prisma generate
echo Done!
pause
goto menu

:fix_database
echo.
echo [1/2] Pushing database schema...
call pnpm db:push
echo [2/2] Seeding database...
call pnpm db:seed
echo Done!
pause
goto menu

:fix_cache
echo.
echo [1/2] Removing .next folder...
rmdir /s /q .next 2>nul
echo [2/2] Rebuilding...
call pnpm build
echo Done!
pause
goto menu

:fix_all
echo.
echo WARNING: This will reset everything!
set /p confirm="Are you sure? (Y/N): "
if /i not "%confirm%"=="Y" goto menu

echo.
echo [1/5] Removing node_modules...
rmdir /s /q node_modules 2>nul
echo [2/5] Removing .next cache...
rmdir /s /q .next 2>nul
echo [3/5] Installing dependencies...
call pnpm install
echo [4/5] Generating Prisma Client...
call pnpm prisma generate
echo [5/5] Pushing database schema...
call pnpm db:push
echo.
echo All issues fixed!
pause
goto menu

:end
echo.
echo Goodbye!
exit /b 0
