' ------------------------------------------------------------------
' God's Eye View 啟動器（繁體中文版）
' 雙擊本檔案即可啟動：
'   1. 若尚未安裝相依套件，會先自動執行「安裝.bat」
'   2. 啟動本機伺服器（一個縮到工作列的視窗，可從那裡看到記錄，
'      要結束程式時關閉那個視窗即可）
'   3. 等伺服器就緒後，自動用預設瀏覽器開啟 http://localhost:4173
' ------------------------------------------------------------------
Option Explicit

Dim fso, shell, scriptDir, projectDir, url, ready, i, http

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
projectDir = fso.GetParentFolderName(scriptDir)
url = "http://localhost:4173/"

' 1) 第一次執行：先安裝相依套件（顯示一般視窗，讓使用者看到安裝進度）
If Not fso.FolderExists(projectDir & "\node_modules") Then
  shell.Run """" & scriptDir & "\install.bat""", 1, True
  If Not fso.FolderExists(projectDir & "\node_modules") Then
    MsgBox "安裝似乎沒有完成（找不到 node_modules 資料夾）。" & vbCrLf & _
           "請重新雙擊「install.bat」查看錯誤訊息。", vbExclamation, "God's Eye View"
    WScript.Quit 1
  End If
End If

' 2) 啟動伺服器（縮到工作列、不搶焦點的視窗；關閉該視窗即可停止程式）
shell.Run "cmd /c cd /d """ & projectDir & """ && title God's Eye View - 伺服器（關閉此視窗即可結束程式） && npm run dev -- --host localhost --port 4173", 6, False

' 3) 等伺服器就緒後開啟瀏覽器（最多等待 60 秒，逾時仍會嘗試開啟一次）
ready = False
For i = 1 To 60
  On Error Resume Next
  Err.Clear
  Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
  http.Open "GET", url, False
  http.SetTimeouts 1000, 1000, 1000, 1000
  http.Send
  If Err.Number = 0 Then
    If http.Status >= 200 And http.Status < 500 Then
      ready = True
    End If
  End If
  Err.Clear
  On Error Goto 0
  Set http = Nothing
  If ready Then Exit For
  WScript.Sleep 1000
Next

shell.Run url, 1, False
