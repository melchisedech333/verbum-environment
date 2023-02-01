#!/bin/bash

CDISPLAY=":10"
RESOLUTION=$(echo "400x400" | tr x ' ')
PROGRAM_NAME="thunar"

xwininfo -display $CDISPLAY -root -children | 
    grep "$PROGRAM_NAME" | 
    sed 's/[^0-9 x]//g' |
    awk -v v1="$CDISPLAY" -v v2="$RESOLUTION" \
        '{ system("export DISPLAY=" v1 "; xdotool windowsize " $1 " " v2) }'


