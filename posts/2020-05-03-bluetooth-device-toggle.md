---
title: Bluetooth Device Toggle via Menubar
date: 2020-05-03
summary: Corona has made me realize the current confinement is going to take a while, so why not spend a bit of time and money optimizing my new work setup. Even though I cannot move *out* at least I can move *around* with my new fancy Bluetooth headphones. Still, it took me a bit of time to cobble together some scripts that help make them work the way I like them. To connect my devices I figured out specific quick solutions to connect/disconnect the headphones which reduces some of the headaches.     
---

Home-office work offers its own set of new challenges for everyone. One of the common problems is noise, be it from neighbors or your own family. After trying out the passable "Sennheiser Free Wireless" in-ear monitors with passive noise cancellation, I have changed to regular over-ear headphones and could not be happier. I have settled on the "Bose Noise Cancelling Headphones 700", which are excellent although pricey. In the end, I have decided that I would use them daily for my remote work, and it's worth it even if I pay myself.

In addition to the passive noise isolation, they have active noise cancellation tech to filter out a lot of background noise. Currently, even the most advanced Bluetooth gadgets have one problem though: they can only connect to up to two devices at the same time. As I'm switching between my smartphone, MacBook, tablet and occasionally lending the headphones to family members, I'm regularly reaching that limitation.

Seeing the current connection status and toggling it on all different devices was the problem I solved with a few nifty tools. For Android, the solutions was relatively simple with an app that creates a dedicated widget on the home screen to view and toggle the Bluetooth connection with a single click, it has the dry but accurate name ["Bluetooth audio device widget"](https://play.google.com/?id=com.tom.bluetoothDevicesWidget). For iOS and iPadOS devices, there does not seem to be a single-click solution, but you can reach the device management relatively simply using the control center and long-press menu on the Bluetooth symbol.

I had already found a paid app for macOS that accomplished what I wanted using a menuBar entry. It is called ["ToothFairy"](https://apps.apple.com/us/app/toothfairy/id1191449274), but I was questioning if I could solve it using simple scripts.

The solution uses two open-source tools called "BitBar" and "blueutil". [BitBar](https://getbitbar.com/) is a versatile menuBar app that allows you to add entries from simple shell scripts. Install it with `brew cask install bitbar`. [blueutil](https://github.com/toy/blueutil) gives you CLI access to analyze, pair, and connect Bluetooth devices on macOS. 

![screenshot of bluetoothdevinfo plugin for BitBar](/images/bluetoothdevinfo_screenshot.png)

Tied together with this simple script they perfectly achieve what I wanted:

```shell
#!/bin/bash

ID="Earmuffs"

# Function to notify the user via Apple Script
notify () {
    osascript -e "display notification \"$1\" with title \"$ID\""
}

BLUEUTIL="/usr/local/bin/blueutil"

# If called with parameter "connect", connect device via bluetooth
if [ "$1" = "connect" ]; then  
  $($BLUEUTIL --connect $ID)
  notify "Connected"
  exit 0
fi

# If called with parameter "disconnect", disconnect device via bluetooth
if [ "$1" = "disconnect" ]; then  
  $($BLUEUTIL --disconnect $ID)
  notify "Disconnected"
  exit 0
fi

CONNECTED=$($BLUEUTIL --is-connected $ID)

# Start building output
[[ "$CONNECTED" == "1" ]]  && echo "⊕" || echo "⊖"
echo "---"
echo "🔄 Refresh | colo=black refresh=true"
echo "---"
echo "Connect | terminal=false refresh=true bash='$0' param1=connect"
echo "Disconnect | terminal=false refresh=true bash='$0' param1=disconnect"
```

Save this script to a file specifying its refresh interval of for example 60 seconds like so "bluetoothdevinfo.60s.sh".

After "researching" this topic a bit more I've found a way to connect and disconnect the headphones using my app launcher too. The same solution can be used for Alfred/Spotlight/launchy. Use the [appify script](https://mathiasbynens.be/notes/shell-script-mac-apps) in its newest version from [here](https://gist.githubusercontent.com/mathiasbynens/674099/raw/9e64331e348b20049975519b866148050db06da5/appify) to transform a simple variant of the above script that either disconnects or connects the headphones. Then it is easy to launch the app quickly without needing to access the menuBar.

Bluetooth itself has a number of limitations and "works in mysterious ways".

There's an interesting article [here](https://habr.com/en/post/456182/) that describes the difference between codecs and bit-rates.
It also goes into bluetooth delay, and the relatively low bitrate for voice encoding.

The next version of the Bluetooth standard should overcome some limitations in that regard. It's going to introduce a 
proper Low Energy protocol for audio devices and a new high-quality codec called LC3. Here's the [announcement](https://www.bluetooth.com/learn-about-bluetooth/bluetooth-technology/le-audio/).
