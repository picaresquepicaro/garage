#!/bin/bash
if [ -z "$STY" ]; then exec screen -dm -S end_stream /bin/bash "$0"; fi
sleep 60
screen -S video_stream -X stuff $'\003'
exit


