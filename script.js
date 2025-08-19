let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function timeToString(time) {
  let ms = time % 1000;
  ms = Math.floor(ms / 10);
  let s = Math.floor((time / 1000) % 60);
  let m = Math.floor((time / 60000) % 60);
  let h = Math.floor((time / 3600000));
  return (
    (h < 10 ? '0' + h : h) + ':' +
    (m < 10 ? '0' + m : m) + ':' +
    (s < 10 ? '0' + s : s) + '.' +
    (ms < 10 ? '0' + ms : ms)
  );
}

function start() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = timeToString(elapsedTime);
    }, 10);
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
  }
}

function pause() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  lapList.innerHTML = "";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function lap() {
  if (running) {
    const li = document.createElement('li');
    li.textContent = timeToString(elapsedTime);
    lapList.appendChild(li);
  }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initialize button states
pauseBtn.disabled = true;
lapBtn.disabled = true;
