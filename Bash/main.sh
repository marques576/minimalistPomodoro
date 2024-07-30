#!/bin/bash

MINUTES=25
DURATION=$((MINUTES * 60))
SOUND_FILE="pling.mp3"

play_sound() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        mpg123 "$SOUND_FILE" &
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        afplay "$SOUND_FILE" &
    elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        start /min wmplayer /play /close "$SOUND_FILE"
    else
        echo "Unable to play sound on this system."
    fi
}

play_sound

start_time=$(date +%s)
end_time=$((start_time + DURATION))

while [[ $(date +%s) -lt $end_time ]]; do
    remaining=$((end_time - $(date +%s)))
    minutes=$((remaining / 60))
    seconds=$((remaining % 60))
    printf "\rTime remaining: %02d:%02d" $minutes $seconds
    sleep 1
done

echo -e "\nTimer finished!"
play_sound
