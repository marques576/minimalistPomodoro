#include <stdio.h>
#include <time.h>
#include <unistd.h>
#include <stdlib.h>

int MINUTES = 25;

void play_sound(){
    #if defined(_WIN32) || defined(_WIN64)
        system("start /min wmplayer /play /close \"pling.mp3\"");
    #elif defined(__APPLE__) || defined(__MACH__)
        system("afplay pling.mp3");
    #elif defined(__linux__)
        system("mpg123 pling.mp3");
    #else
        printf("Unable to play sound on this system.\n");
    #endif
}

int main() {
    play_sound();

    int duration = MINUTES * 60; 
    time_t start_time = time(NULL);
    time_t end_time = start_time + duration;

    while (time(NULL) < end_time) {
        int remaining = end_time - time(NULL);
        int minutes = remaining / 60;
        int seconds = remaining % 60;
        printf("\rTime remaining: %02d:%02d", minutes, seconds);
        fflush(stdout);
        sleep(60);
    }

    printf("\nTimer finished!\n");
    play_sound();

    return 0;
}
