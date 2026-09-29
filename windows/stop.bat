@echo off
chcp 65001 >nul
title God's Eye View - 停止程式
echo 正在尋找監聽 4173 埠的伺服器並結束它...
echo.

set FOUND=0
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":4173" ^| findstr "LISTENING"') do (
  echo 找到程序 PID %%p，正在結束...
  taskkill /PID %%p /F >nul 2>nul
  set FOUND=1
)

if "%FOUND%"=="0" (
  echo 沒有找到正在執行的 God's Eye View 伺服器。
) else (
  echo.
  echo 已結束 God's Eye View 伺服器。
)

echo.
pause
