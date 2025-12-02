@echo off
setlocal ENABLEDELAYEDEXPANSION

:: Ensure script is run as Administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo.
  echo [!] This script must be run as Administrator.
  echo     Right-click this file and choose "Run as administrator".
  echo.
  pause
  exit /b 1
)

cls

echo ================================================
echo  Enabling Virtualization prerequisites for Docker
echo  - Virtual Machine Platform
echo  - Windows Subsystem for Linux (WSL)
echo  - Hyper-V and Containers (if available)
echo  - Hypervisor auto-launch
echo ================================================

echo.
echo [1/5] Enabling Virtual Machine Platform...
dism /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
if %errorlevel% neq 0 echo    (If it reports already enabled, that's OK.)

echo.
echo [2/5] Enabling Windows Subsystem for Linux (WSL)...
dism /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
if %errorlevel% neq 0 echo    (If it reports already enabled, that's OK.)

:: Hyper-V only available on Pro/Enterprise/Education. Will fail gracefully on Home.
echo.
echo [3/5] Enabling Hyper-V (if supported by this edition)...
dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /all /norestart
if %errorlevel% neq 0 echo    (Hyper-V may not be available on this Windows edition. Continuing...)

echo.
echo [4/5] Enabling Containers feature (optional)...
dism /online /enable-feature /featurename:Containers /all /norestart
if %errorlevel% neq 0 echo    (Containers feature may not be available. Continuing...)

echo.
echo [5/5] Configuring hypervisor to start automatically...
bcdedit /set hypervisorlaunchtype auto >nul 2>&1
if %errorlevel% neq 0 (
  echo    Could not set hypervisorlaunchtype. This may require Secure Boot or admin policies.
) else (
  echo    Hypervisor set to launch automatically.
)

echo.
echo Setting WSL default version to 2 (if WSL is installed)...
wsl --set-default-version 2 2>nul


echo.
echo ================================================
echo  All operations completed. A reboot is required
echo  for changes to take effect.
echo ================================================

echo.
choice /M "Reboot now"
if %errorlevel%==1 (
  echo Rebooting in 5 seconds...
  shutdown /r /t 5
) else (
  echo Please reboot later to complete setup.
)

exit /b 0
