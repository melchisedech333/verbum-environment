#!/bin/bash

CDISPLAY=":$1"
RESOLUTION=$(echo "$2" | tr x ' ')
PROGRAM_NAME="$3"

xwininfo -display $CDISPLAY -root -children | 
    grep "$PROGRAM_NAME" | 
    sed 's/[^0-9 x]//g' |
    awk -v v1="$CDISPLAY" -v v2="$RESOLUTION" \
        '{ system("export DISPLAY=" v1 "; xdotool windowsize " $1 " " v2) }'

XephyrID=$(wmctrl -l | grep "Xephyr" | grep "$CDISPLAY" | awk '{ print $1 }')
xdotool windowsize $XephyrID $RESOLUTION


