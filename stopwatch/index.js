const resetButton = document.getElementById("reset-button");
const stopButton = document.getElementById("stop-button");
const startButton = document.getElementById("start-button");
const state = document.getElementById("state");
const displayHours = document.getElementById("hours");
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");

let intervalId;
let startTime = 0;

const formatTime = (totalSeconds) => {
    const seconds = Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const hours = Math.floor(totalSeconds / 3600)
        .toString()
        .padStart(2, "0");

    displayHours.textContent = hours;
    displayMinutes.textContent = minutes;
    displaySeconds.textContent = seconds;
};

const startTimer = () => {
    intervalId = setInterval(() => {
        startTime++;
        formatTime(startTime);
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    state.textContent = "Running";
};

const stopTimer = () => {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
    state.textContent = "Paused";
    startButton.textContent = "Resume";
};

const resetTimer = () => {
    clearInterval(intervalId);
    startTime = 0;
    formatTime(startTime);

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    state.textContent = "Stopped";
    startButton.textContent = "Start";
};

stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
startButton.addEventListener("click", startTimer);

formatTime(startTime);
