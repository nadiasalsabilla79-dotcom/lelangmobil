@echo off
echo ========================================
echo       INSTALL GIT FOR WINDOWS
echo ========================================
echo.

echo Downloading Git for Windows...
echo.

echo Option 1: Download Manual
echo Buka browser dan download dari: https://git-scm.com/download/win
echo.

echo Option 2: Download via PowerShell (Otomatis)
echo.
set /p choice="Pilih (1/2): "

if "%choice%"=="2" (
    echo.
    echo Downloading Git installer...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe' -OutFile 'Git-installer.exe'"
    
    if exist "Git-installer.exe" (
        echo.
        echo Starting Git installation...
        start /wait Git-installer.exe
        
        echo.
        echo Installation complete!
        echo Restart Command Prompt dan jalankan UPLOAD_TO_GITHUB.bat lagi
        del Git-installer.exe
    ) else (
        echo Download failed. Silakan download manual dari https://git-scm.com/download/win
    )
) else (
    echo.
    echo Silakan download Git dari: https://git-scm.com/download/win
    echo Setelah install, restart Command Prompt dan jalankan UPLOAD_TO_GITHUB.bat
    start https://git-scm.com/download/win
)

echo.
pause