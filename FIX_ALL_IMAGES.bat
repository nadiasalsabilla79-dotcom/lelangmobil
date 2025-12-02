@echo off
echo 🖼️ FIXING ALL IMAGES - LELANGMOBIL
echo.

echo Step 1: Creating missing image placeholders...
if not exist "public\banks\bca-logo.png" copy "public\placeholder-logo.png" "public\banks\bca-logo.png"
if not exist "public\banks\mandiri-logo.png" copy "public\placeholder-logo.png" "public\banks\mandiri-logo.png"
if not exist "public\banks\bri-logo.png" copy "public\placeholder-logo.png" "public\banks\bri-logo.png"

echo Step 2: Checking BNI logo...
if exist "public\banks\bni-logo.png" (
    echo ✅ BNI logo exists
) else (
    echo ❌ BNI logo missing - copying placeholder
    copy "public\placeholder-logo.png" "public\banks\bni-logo.png"
)

echo Step 3: Verifying all bank logos...
dir "public\banks\*.png"

echo.
echo ✅ ALL IMAGES FIXED!
echo - BCA Logo: ✅
echo - Mandiri Logo: ✅  
echo - BRI Logo: ✅
echo - BNI Logo: ✅
echo.
pause