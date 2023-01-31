#!/bin/bash
#
# IHS - By Melchisedech333 - https://github.com/melchisedech333
#

pkill -f x11vnc
pkill -f native-app
killall Xephyr

sleep 1
python3 interface/native-app.py &

../dependencies/electron-v22.1.0-linux-x64/electron --user-data-dir=../data/electron .


