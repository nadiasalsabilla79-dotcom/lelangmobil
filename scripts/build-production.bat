@echo off
echo ========================================
echo Building LelangMobil for Production
echo ========================================
echo.

echo [1/5] Checking environment...
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please create .env file first.
    pause
    exit /b 1
)

echo [2/5] Installing dependencies...
call pnpm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [3/5] Generating Prisma Client...
call pnpm prisma generate
if errorlevel 1 (
    echo ERROR: Failed to generate Prisma Client
    pause
    exit /b 1
)

echo [4/5] Running database migrations...
call pnpm db:push
if errorlevel 1 (
    echo ERROR: Failed to push database schema
    pause
    exit /b 1
)

echo [5/5] Building Next.js application...
call pnpm build
if errorlevel 1 (
    echo ERROR: Failed to build application
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build completed successfully!
echo ========================================
echo.
echo To start production server, run:
echo   pnpm start
echo.
pause
