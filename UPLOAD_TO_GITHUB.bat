@echo off
echo ========================================
echo    UPLOAD LELANGMOBIL KE GITHUB
echo ========================================
echo.

echo [1/4] Checking Git installation...
where git >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git tidak terinstall!
    echo Download dari: https://git-scm.com/download/win
    echo.
    echo Setelah install Git, restart Command Prompt dan jalankan lagi.
    pause
    exit /b 1
)
echo Git terdeteksi!

echo.
echo [2/4] Initialize Git repository...
if exist ".git" (
    echo Git repository sudah ada, skip init...
) else (
    git init
    if errorlevel 1 (
        echo ERROR: Failed to initialize Git
        pause
        exit /b 1
    )
    echo Git repository berhasil dibuat!
)

echo.
echo [3/4] Adding files...
git add .
if errorlevel 1 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo Files berhasil ditambahkan!

echo.
echo [4/4] Creating commit...
git commit -m "Initial commit - LelangMobil Platform" 2>nul
if errorlevel 1 (
    echo Commit sudah ada atau tidak ada perubahan
) else (
    echo Commit berhasil dibuat!
)

echo.
echo ========================================
echo           SETUP SELESAI!
echo ========================================
echo.
echo LANGKAH SELANJUTNYA:
echo.
echo 1. Buka: https://github.com/new
echo 2. Repository name: lelangmobil
echo 3. Klik "Create repository"
echo 4. Copy commands dari GitHub dan paste di sini:
echo.
echo    git remote add origin https://github.com/USERNAME/lelangmobil.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 5. Ganti USERNAME dengan username GitHub Anda!
echo.
echo ========================================
echo Ready untuk upload ke GitHub!
echo ========================================
echo.
pause