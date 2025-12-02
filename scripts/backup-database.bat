@echo off
echo ========================================
echo Database Backup Script
echo ========================================
echo.

REM Set variables
set BACKUP_DIR=backups
set DB_NAME=lelangmobil
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_FILE=%BACKUP_DIR%\%DB_NAME%_%TIMESTAMP%.sql

REM Create backup directory if not exists
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo Creating backup: %BACKUP_FILE%
echo.

REM Run mysqldump (adjust path if needed)
mysqldump -u root -p %DB_NAME% > "%BACKUP_FILE%"

if errorlevel 1 (
    echo.
    echo [ERROR] Backup failed!
    echo Make sure MySQL is running and credentials are correct.
    pause
    exit /b 1
) else (
    echo.
    echo [SUCCESS] Backup created successfully!
    echo Location: %BACKUP_FILE%
    echo.
    
    REM Show backup size
    for %%A in ("%BACKUP_FILE%") do echo Size: %%~zA bytes
    echo.
    
    REM Keep only last 7 backups
    echo Cleaning old backups (keeping last 7)...
    for /f "skip=7 delims=" %%F in ('dir /b /o-d "%BACKUP_DIR%\*.sql"') do (
        del "%BACKUP_DIR%\%%F"
        echo Deleted: %%F
    )
    
    echo.
    echo Backup completed!
    pause
    exit /b 0
)
