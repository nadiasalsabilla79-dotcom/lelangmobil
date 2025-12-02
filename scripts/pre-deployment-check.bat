@echo off
echo ========================================
echo Pre-Deployment Checklist
echo ========================================
echo.

set /a passed=0
set /a failed=0

echo Checking environment configuration...
echo.

REM Check .env.production exists
if exist ".env.production" (
    echo [PASS] .env.production file exists
    set /a passed+=1
) else (
    echo [FAIL] .env.production file not found
    set /a failed+=1
)

REM Check if JWT_SECRET is changed
findstr /C:"CHANGE-THIS-TO-STRONG-SECRET" .env.production >nul 2>&1
if errorlevel 1 (
    echo [PASS] JWT_SECRET has been changed
    set /a passed+=1
) else (
    echo [FAIL] JWT_SECRET still contains default value
    set /a failed+=1
)

REM Check if DATABASE_URL is configured
findstr /C:"username:password@host" .env.production >nul 2>&1
if errorlevel 1 (
    echo [PASS] DATABASE_URL has been configured
    set /a passed+=1
) else (
    echo [FAIL] DATABASE_URL still contains placeholder
    set /a failed+=1
)

REM Check node_modules exists
if exist "node_modules" (
    echo [PASS] Dependencies installed
    set /a passed+=1
) else (
    echo [FAIL] Dependencies not installed
    set /a failed+=1
)

REM Check Prisma Client
if exist "node_modules\.prisma" (
    echo [PASS] Prisma Client generated
    set /a passed+=1
) else (
    echo [FAIL] Prisma Client not generated
    set /a failed+=1
)

REM Check package.json
if exist "package.json" (
    echo [PASS] package.json exists
    set /a passed+=1
) else (
    echo [FAIL] package.json not found
    set /a failed+=1
)

REM Check next.config.mjs
if exist "next.config.mjs" (
    echo [PASS] next.config.mjs exists
    set /a passed+=1
) else (
    echo [FAIL] next.config.mjs not found
    set /a failed+=1
)

echo.
echo ========================================
echo Results: %passed% passed, %failed% failed
echo ========================================
echo.

if %failed% gtr 0 (
    echo WARNING: Some checks failed!
    echo Please fix the issues before deploying.
    echo.
    pause
    exit /b 1
) else (
    echo SUCCESS: All checks passed!
    echo Your application is ready for deployment.
    echo.
    pause
    exit /b 0
)
