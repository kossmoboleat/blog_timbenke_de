---
title: Script Magic
date: 2012-05-17
---
When working with lots of remote machines it's sometimes necessary to reboot them. Then it's always a pain to wait for them booting up. If the machines have extra interface cards, e.g. RAID, you have to sit there for a while until the machine becomes usable. So being a geek, I made a (Windows) script:

![geeks vs non geeks at repetitive tasks](/images/geeks-vs-nongeeks-repetitive-tasks.png)

This script requires cygwin on windows and you should install it's ping implementation -- the windows version doesn't return with an error if the host in unreachable. You also have to run it as an administrator on windows, because it needs these privileges to open a socket.

```shell
function waithost() { 
    if [ -n "$1" ]; then
      ping localhost 1 1 > /dev/null
      if [ $? -eq 0 ]; then
          while ! ping $1 1 1 &>/dev/null; do sleep 5;echo -n .; done
          messagebox.sh "Host $1 is reachable now!"
      else
          messagebox.sh "Error: Need admin privileges!"
      fi
  else
      messagebox.sh "Error: No host parameter given!"
  fi
}
```

Here's the script to show the messagebox:
```shell
#!/bin/bash
/cygdrive/c/Scripts/messagebox.bat "$1"
```

The popop.bat only contains this:
```shell
cscript C:\Scripts\MessageBox.vbs "%~1"
```

And here's the final tidbit, a visual basic script to show a messagebox.
```
Set objArgs = WScript.Arguments
messageText = objArgs(0)
MsgBox messageText
```

This comes in handy in other situations, too. For instance you can schedule an alarm with Windows' task scheduling:
```
schtasks /create /tn "Lunch Notification" /tr "messagebox.bat Lunch" /ST 12:00 /SC daily
```

This script will display a messabox with the text "Lunch" every day at noon. You can choose much more refined date schedules or intervals. Here's the <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/bb736357(v=vs.85).aspx">documentation</a>.
