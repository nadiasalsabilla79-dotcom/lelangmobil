@echo off
echo ========================================
echo  LELANGMOBIL - RUNNING NOW
echo ========================================
echo.

cd /d "%~dp0"
set PATH=%~dp0node-portable\node-v20.11.0-win-x64;%PATH%

echo Starting server...
npm run dev

pause