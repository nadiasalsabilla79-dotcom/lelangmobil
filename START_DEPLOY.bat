@echo off
setlocal DisableDelayedExpansion

REM ==============================================
REM LELANGMOBIL.COM - AUTO DEPLOY SCRIPT (Windows)
REM - Requires Admin rights
REM - Enables WSL2, checks Docker Desktop, opens firewall
REM - docker compose (app + mysql + caddy)
REM - Runs Prisma migrate + seed via ephemeral Node container
REM ==============================================

REM Ensure running as Administrator
net session >nul 2>&1
if %errorlevel% NEQ 0 (
  echo [INFO] Elevating privileges. Please accept the UAC prompt...
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)

REM Set UTF-8 codepage (optional)
chcp 65001 >nul

echo ==============================================
echo [1/9] Enabling required Windows features (WSL2)
echo ==============================================

echo [INFO] Enabling Windows Subsystem for Linux...
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart >nul

echo [INFO] Enabling Virtual Machine Platform...
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart >nul

wsl --set-default-version 2 >nul 2>&1

REM Check if restart is pending (best-effort)
for /f "tokens=2 delims==" %%R in ('wmic os get rebootrequired /value ^| find "="') do set REBOOT_REQ=%%R
if /I "%REBOOT_REQ%"=="TRUE" (
  echo [WARN] System restart is required to complete WSL2 enablement.
  echo        Please restart Windows, then re-run this script.
  pause
  exit /b 1
)

echo ==============================================
echo [2/9] Checking Docker Desktop
echo ==============================================

docker --version >nul 2>&1
if %errorlevel% NEQ 0 (
  echo [ERROR] Docker Desktop is not installed or not in PATH.
  echo         Opening Docker Desktop download page...
  start https://www.docker.com/products/docker-desktop/
  echo         Install Docker Desktop, then re-run this script.
  pause
  exit /b 1
)

REM Try to ensure Docker Engine is running
for /f %%i in ('docker info ^>nul 2^>^&1 ^& echo !errorlevel!') do set DOCKERINFO_RET=%%i
if not "%DOCKERINFO_RET%"=="0" (
  echo [INFO] Starting Docker Desktop...
  if exist "C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe" (
    start "" "C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe"
  ) else (
    echo [WARN] Could not locate Docker Desktop executable. Ensure it is running.
  )
  echo [INFO] Waiting up to 90 seconds for Docker Engine...
  set /a _WAIT=0
  :WAIT_DOCKER
  docker info >nul 2>&1 && goto DOCKER_READY
  timeout /t 3 >nul
  set /a _WAIT+=3
  if %_WAIT% GEQ 90 (
    echo [ERROR] Docker Engine did not start in time. Please open Docker Desktop and ensure it is running, then re-run.
    pause
    exit /b 1
  )
  goto WAIT_DOCKER
)
:DOCKER_READY

echo ==============================================
echo [3/9] Configuring Windows Firewall (HTTP/HTTPS)
echo ==============================================

netsh advfirewall firewall add rule name="Allow HTTP 80 LelangMobil" dir=in action=allow protocol=TCP localport=80 >nul 2>&1
netsh advfirewall firewall add rule name="Allow HTTPS 443 LelangMobil" dir=in action=allow protocol=TCP localport=443 >nul 2>&1

echo ==============================================
echo [4/9] Checking DNS for lelangmobil.com
echo ==============================================

for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "(Invoke-RestMethod -Uri 'https://api.ipify.org').Content"`) do set PUBLIC_IP=%%i
for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "[System.Net.Dns]::GetHostAddresses('lelangmobil.com') | Where-Object { $_.AddressFamily -eq 'InterNetwork' } | Select-Object -ExpandProperty IPAddressToString | Select-Object -First 1"`) do set DOMAIN_IP=%%i

echo [INFO] Public IP     : %PUBLIC_IP%
echo [INFO] Domain resolves: %DOMAIN_IP%
if "%PUBLIC_IP%"=="%DOMAIN_IP%" (
  echo [OK] DNS lelangmobil.com sudah mengarah ke server ini.
) else (
  echo [WARN] DNS lelangmobil.com belum mengarah ke IP server ini.
  echo       SSL issuance by Caddy will wait until DNS is correct. You can continue.
)

echo ==============================================
echo [5/9] Validating required files
echo ==============================================

if not exist ".env" (
  echo [ERROR] .env not found in current directory: %CD%
  echo         Create .env first, then re-run.
  pause
  exit /b 1
)
if not exist "docker-compose.yml" (
  echo [ERROR] docker-compose.yml not found in current directory: %CD%
  pause
  exit /b 1
)
if not exist "Caddyfile" (
  echo [ERROR] Caddyfile not found in current directory: %CD%
  pause
  exit /b 1
)

echo ==============================================
echo [6/9] Bringing up stack via Docker Compose (project: lelangmobil)
echo ==============================================

echo [INFO] Building and starting containers...
docker compose -p lelangmobil up -d --build
if %errorlevel% NEQ 0 (
  echo [ERROR] docker compose up failed.
  pause
  exit /b 1
)

echo ==============================================
echo [7/9] Waiting for MySQL to become ready (port 3306)
echo ==============================================

set /a _WAIT=0
:WAIT_MYSQL
powershell -NoProfile -Command "(Test-NetConnection -ComputerName 127.0.0.1 -Port 3306 -InformationLevel Quiet)" | find /I "True" >nul 2>&1
if %errorlevel% EQU 0 (
  echo [OK] MySQL port is open.
) else (
  timeout /t 3 >nul
  set /a _WAIT+=3
  if %_WAIT% GEQ 120 (
    echo [WARN] MySQL port not ready after 120s. Continuing anyway...
  ) else (
    goto WAIT_MYSQL
  )
)

echo ==============================================
echo [8/9] Running Prisma migrate deploy + seed (ephemeral Node container)
echo ==============================================

echo [INFO] This may take several minutes (npm ci, prisma, seed)...
docker run --rm --network lelangmobil_default -v "%CD%":/workspace -w /workspace --env-file .env node:18-alpine sh -lc "apk add --no-cache g++ make python3 openssl && npm ci && npx prisma migrate deploy && npm run db:seed"
if %errorlevel% NEQ 0 (
  echo [WARN] Migration/seed encountered an error. Check output above.
  echo        You can re-run this step later with the same command.
) else (
  echo [OK] Database migration and seed completed.
)

echo [INFO] Restarting app container to ensure latest schema...
docker compose -p lelangmobil restart app >nul 2>&1

echo ==============================================
echo [9/9] Status and final information
echo ==============================================

docker compose -p lelangmobil ps

echo.
echo Deployment completed. Access URLs:
echo   - HTTP:  http://%PUBLIC_IP%
echo   - HTTPS: https://lelangmobil.com
if not "%PUBLIC_IP%"=="%DOMAIN_IP%" (
  echo NOTE: SSL will be automatically issued by Caddy after DNS points to this server.
)

echo.
echo Done.
pause

endlocal
