const inputHr = document.getElementById("input-hr");
const inputMin = document.getElementById("input-min");
const inputSec = document.getElementById("input-sec");
const inputLaps = document.getElementById("input-laps");

const timerText = document.getElementById("timer-text");
const lapText = document.getElementById("lap-text");

const loadBtn = document.getElementById("btn-load");
const startPauseBtn = document.getElementById("btn-start-pause");
const resetBtn = document.getElementById("btn-reset");

let timerPtr = null;
let totalSeconds = 0;
let remainingLaps = 0;
let initialSeconds = 0;
let isPaused = true;

init();

function init() {
  inputHr.value = 0;
  inputMin.value = 0;
  inputSec.value = 0;
  inputLaps.value = 0;
  remainingLaps = 0;
  totalSeconds = 0;
  let isPaused = true;
  timerText.innerText = "00:00:00";
  lapText.innerText = `Remain Laps: ${remainingLaps}`;
}

function upDateUI() {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  timerText.innerText = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  lapText.innerText = `Remain Laps: ${remainingLaps}`;
}

loadBtn.addEventListener("click", () => {
  const h = parseInt(inputHr.value) || 0;
  const m = parseInt(inputMin.value) || 0;
  const s = parseInt(inputSec.value) || 0;
  const l = parseInt(inputLaps.value) || 0;

  initialSeconds = h * 3600 + m * 60 + s;
  totalSeconds = initialSeconds;
  remainingLaps = l;

  if (totalSeconds <= 0 || l <= 0) return alert("Please input valid values.");
  upDateUI();
});

startPauseBtn.addEventListener("click", () => {
  if (isPaused) {
    if (totalSeconds <= 0 && remainingLaps <= 0) {
      return alert("Please input valid values.");
    }

    isPaused = false;
    startPauseBtn.innerText = "Stop";
    startPauseBtn.className = "btn-pause";
    timerPtr = setInterval(countDown, 1000);
  } else {
    pauseTimer();
  }
});

function pauseTimer() {
  clearInterval(timerPtr);
  timerPtr = null;
  isPaused = true;
  startPauseBtn.innerText = "Start";
  startPauseBtn.className = "btn-start";
}

function countDown() {
  if (totalSeconds > 0) {
    totalSeconds--;
  } else {
    remainingLaps--;
    if (remainingLaps > 0) {
      totalSeconds = initialSeconds;
      console.log("next round");
    } else {
      pauseTimer();
      remainingLaps = 0;
      totalSeconds = 0;
      alert("FINSH!");
    }
  }
  upDateUI();
}

resetBtn.addEventListener("click", () => {
  init();
  pauseTimer();
  upDateUI();
});
