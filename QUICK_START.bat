@echo off
echo ========================================
echo  LELANGMOBIL - QUICK START
echo ========================================
echo.

set NODE_PATH=%~dp0node-portable\node-v20.11.0-win-x64
cd /d "%~dp0"

echo Starting development server without install...
"%NODE_PATH%\npm.cmd" run dev

pause