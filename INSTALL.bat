@echo off
echo ========================================
echo   LELANGMOBIL - INSTALASI OTOMATIS
echo ========================================
echo.

echo [1/4] Memeriksa Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js tidak ditemukan!
    echo Silakan install Node.js dari https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js terdeteksi: 
node --version
echo.

echo [2/4] Memeriksa pnpm...
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo pnpm tidak ditemukan. Menginstall pnpm...
    npm install -g pnpm
    echo.
)
echo pnpm terdeteksi:
pnpm --version
echo.

echo [3/4] Menginstall dependencies...
echo Mohon tunggu, proses ini memakan waktu beberapa menit...
pnpm install
if errorlevel 1 (
    echo ERROR: Gagal menginstall dependencies!
    pause
    exit /b 1
)
echo.

echo [4/4] Instalasi selesai!
echo.
echo ========================================
echo   INSTALASI BERHASIL!
echo ========================================
echo.
echo Untuk menjalankan aplikasi:
echo   pnpm dev
echo.
echo Kemudian buka browser di:
echo   http://localhost:3000
echo.
echo Demo Accounts:
echo   User  : budi@gmail.com / password123
echo   Admin : admin@lelangmobil.com / password123
echo.
pause
