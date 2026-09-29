@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title God's Eye View - 安裝

cd /d "%~dp0\.."
echo ============================================
echo   God's Eye View 安裝程式（繁體中文版）
echo ============================================
echo.
echo 專案位置：%cd%
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [錯誤] 找不到 Node.js。
  echo.
  echo 這個專案需要 Node.js 24.14 或以上版本（或 26.x）。
  echo 請先到 https://nodejs.org/ 下載並安裝 LTS 版本，
  echo 安裝完成後重新執行本檔案。
  echo.
  pause
  exit /b 1
)

for /f "tokens=1 delims=v" %%v in ('node -v') do set NODE_RAW=%%v
echo 目前 Node.js 版本：
node -v
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo [錯誤] 找不到 npm，請確認 Node.js 安裝完整。
  pause
  exit /b 1
)

echo 正在安裝相依套件（第一次安裝可能需要幾分鐘）...
echo.
call npm ci
if errorlevel 1 (
  echo.
  echo npm ci 失敗，改用 npm install 再試一次...
  call npm install
  if errorlevel 1 (
    echo.
    echo [錯誤] 安裝相依套件失敗，請將上方錯誤訊息回報給協助你安裝的人。
    pause
    exit /b 1
  )
)

echo.
echo ============================================
echo   安裝完成！
echo   現在可以雙擊「啟動 God's Eye View.vbs」
echo   或桌面上的捷徑來開啟程式。
echo ============================================
echo.
pause
