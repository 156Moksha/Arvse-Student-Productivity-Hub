const SESSIONS_KEY = "arvsePomodoroSessions";
const SESSION_TARGET = 8;

let timeDisplay = document.querySelector("#time");
let startBtn = document.querySelector("#startBtn");
let pauseBtn = document.querySelector("#pauseBtn");
let resetBtn = document.querySelector("#resetBtn");
let sessionCount = document.querySelector("#sessionCount");

let totalSeconds = 25 * 60;
let timer;
let sessionsCompleted = Number(localStorage.getItem(SESSIONS_KEY) || 0);

function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timeDisplay.innerText = `${minutes}:${seconds}`;
}

function updateSessionDisplay() {
    if (!sessionCount) return;
    sessionCount.textContent = `Sessions completed: ${sessionsCompleted} / ${SESSION_TARGET}`;
}

function saveSessions() {
    localStorage.setItem(SESSIONS_KEY, sessionsCompleted.toString());
}

startBtn.addEventListener("click", function() {
    clearInterval(timer);
    timer = setInterval(function() {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimer();
        } else {
            clearInterval(timer);
            timeDisplay.innerText = "Done!";
            if (sessionsCompleted < SESSION_TARGET) {
                sessionsCompleted += 1;
                saveSessions();
                updateSessionDisplay();
            }
        }
    }, 1000);
});

pauseBtn.addEventListener("click", function() {
    clearInterval(timer);
});

resetBtn.addEventListener("click", function() {
    clearInterval(timer);
    totalSeconds = 25 * 60;
    updateTimer();
});

updateTimer();
updateSessionDisplay();