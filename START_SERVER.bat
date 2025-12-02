@echo off
echo Starting LelangMobil Development Server...
echo.

set NODE_PATH=%~dp0node-portable\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%

cd /d "%~dp0"

echo Installing dependencies...
"%NODE_PATH%\npm.cmd" install

echo.
echo Starting development server...
"%NODE_PATH%\npm.cmd" run dev

pause