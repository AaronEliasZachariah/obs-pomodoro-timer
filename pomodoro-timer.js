// Pomodoro Timer Logic for OBS Media Sources
// This version triggers media sources instead of playing HTML audio

class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60;
        this.breakTime = 5 * 60;
        this.longBreakTime = 15 * 60;
        this.isWork = true;
        this.remaining = this.workTime;
        this.isLongBreak = false;
        this.sessionNum = 4;
        this.currentSession = 1;

        this.label = document.getElementById("label");
        this.status = document.getElementById("status");
        this.timer = document.getElementById("timer");

        this.updateTimer();
        this.startTimer();
    }

    updateTimer() {
        let m = Math.floor(this.remaining / 60);
        let s = this.remaining % 60;
        this.timer.textContent = `${m}:${s.toString().padStart(2, "0")}`;
    }

    // These functions will trigger OBS media sources via hotkeys or source visibility
    playSessionEndSound() {
        // This will be triggered by OBS when the media source becomes visible
        console.log("Session end sound should play");
    }

    playLongBreakSound() {
        console.log("Long break sound should play");
    }

    playSessionStartSound() {
        console.log("Session start sound should play");
    }

    tick() {
        if (this.remaining > 0) {
            this.remaining--;
            this.updateTimer();
        } else {
            if (this.isWork) {
                // Work session just completed
                this.currentSession++;
                if (this.currentSession > this.sessionNum) {
                    // Completed all 4 sessions, take long break
                    this.playLongBreakSound();
                    this.label.textContent = "Long Break";
                    this.remaining = this.longBreakTime;
                    this.status.textContent = "Well done!";
                    this.currentSession = 1; // Reset for next cycle
                    this.isLongBreak = true;
                } else {
                    // Take regular break
                    this.playSessionEndSound();
                    this.label.textContent = "Break";
                    this.remaining = this.breakTime;
                }
            } else {
                // Break just completed
                if (this.isLongBreak) {
                    // Long break completed, start new work session
                    this.playSessionStartSound();
                    this.label.textContent = "Focus";
                    this.remaining = this.workTime;
                    this.status.textContent = `Session ${this.currentSession}/${this.sessionNum}`;
                    this.isLongBreak = false;
                } else {
                    // Regular break completed, start work session
                    this.playSessionStartSound();
                    this.label.textContent = "Focus";
                    this.remaining = this.workTime;
                    this.status.textContent = `Session ${this.currentSession}/${this.sessionNum}`;
                }
            }
            this.isWork = !this.isWork;
            this.updateTimer();
        }
    }

    startTimer() {
        this.playSessionStartSound(); // Start with session start sound
        setInterval(() => this.tick(), 1000);
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
