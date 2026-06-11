@echo off
cd /d "%~dp0"
title Rezen Website

echo.
echo  REZEN WEBSITE
echo  Folder: %CD%
echo  =============
echo.

node scripts\kill-port.mjs 3002

if not exist "node_modules\next\package.json" (
  echo  Installing dependencies...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  INSTALL FAILED
    pause
    exit /b 1
  )
  echo.
)

echo  Building latest changes...
echo.
call npm run build
if errorlevel 1 (
  echo.
  echo  BUILD FAILED - check errors above.
  pause
  exit /b 1
)
echo.
echo  Build OK.
echo.

echo  Starting server: http://localhost:3002
echo  Keep this window open. Ctrl+C to stop.
echo.

timeout /t 2 /nobreak >nul
start "" "http://localhost:3002"

call npm run start

pause
