' 在桌面建立「God's Eye View (繁中版)」捷徑，雙擊即可啟動程式。
Option Explicit
Dim fso, shell, scriptDir, projectDir, desktop, shortcut

Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
projectDir = fso.GetParentFolderName(scriptDir)
desktop = shell.SpecialFolders("Desktop")

Set shortcut = shell.CreateShortcut(desktop & "\God's Eye View (繁中版).lnk")
shortcut.TargetPath = "wscript.exe"
shortcut.Arguments = """" & scriptDir & "\start.vbs"""
shortcut.WorkingDirectory = projectDir
If fso.FileExists(scriptDir & "\app-icon.ico") Then
  shortcut.IconLocation = scriptDir & "\app-icon.ico"
End If
shortcut.Description = "God's Eye View - 繁體中文介面版"
shortcut.WindowStyle = 1
shortcut.Save

MsgBox "已在桌面建立捷徑：" & vbCrLf & "「God's Eye View (繁中版)」" & vbCrLf & vbCrLf & _
       "以後雙擊桌面上這個捷徑即可開啟程式。", vbInformation, "完成"
