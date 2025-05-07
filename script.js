let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
const totalTime = 25 * 60; // Store total time for calculations

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

function calculatePosition() {
    const progress = 1 - (timeLeft / totalTime);
    const maxLeft = window.innerWidth - 140; // Account for element width
    return 60 + (progress * maxLeft); // Start from 60px, move to maxLeft
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
    
    // Calculate and update sun/moon position
    const newPosition = calculatePosition();
    
    if (document.body.classList.contains('dark')) {
        moon.style.left = `${newPosition}px`;
    } else {
        sun.style.left = `${newPosition}px`;
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (!isRunning) return; // Only update position if timer is running
    updateDisplay();
});

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alert('Pomodoro complete!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = totalTime;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
const restBtn = document.getElementById('rest');

function startRest() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 5 * 60; // 5 minutes in seconds
    updateDisplay();
    startTimer();
}

restBtn.addEventListener('click', startRest);
const toggleModeBtn = document.getElementById('toggle-mode');
toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        toggleModeBtn.textContent = '☀️ Light Mode';
    } else {
        toggleModeBtn.textContent = '🌙 Dark Mode';
    }
});

// Initialize display
updateDisplay();