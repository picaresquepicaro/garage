#!/bin/bash
if [ -z "$STY" ]; then exec screen -dm -S video_stream /bin/bash "$0"; fi
. .venv/bin/activate
python3 video_stream.py
xdotool key ctrl+a+d
