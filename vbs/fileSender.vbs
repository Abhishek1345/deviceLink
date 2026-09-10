Set shell = CreateObject("WScript.Shell")

cmd = "powershell.exe -NoProfile -Command ""Add-Type -AssemblyName System.Windows.Forms; $f=[System.Windows.Forms.Clipboard]::GetFileDropList(); node 'C:/Users/Abhishek/Desktop/deviceLink/sendFile.js' $f[$f.Count-1]"""

shell.Run cmd, 0, False