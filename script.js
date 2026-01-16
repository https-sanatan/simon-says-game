let gameSeq = [];
let userSeq = [];

let btns = ['red', 'yellow', 'green', 'purple'];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

const clickAudio = new Audio("sound/mouse-click.mp3");
const levelUpAudio = new Audio("sound/levelUp.mp3");
const overAudio = new Audio("sound/over.mp3");

clickAudio.volume = 0.6;
levelUpAudio.volume = 0.6;
overAudio.volume = 0.6;

document.addEventListener("keydown", (event) => {
    if (event.code === 'Enter' && started === false) {
            reset();
            console.log("game started.");
            started = true;
            levelUp();
    }
})

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    lvlUpSound();  //✅ level Up sound
    //random
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);    //push in gameSequence  (data)
    console.log(gameSeq);

    //choose random button by machine   (UI)
    setTimeout(() => {
        gameFlash(randBtn);
    }, 500);
}

//flash by the machine
function gameFlash(btn) {
    btn.classList.add("gameFlash");

    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 300);
}

//flash by the user
function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 300);
}

//press button by user.
function userPress() {
    let btn = this;

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor); //push in userSequence (data)

    clickSound(); // ✅ CLICK SOUND
    userFlash(btn);   //flash by the user when clicked (UI)

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener('click', userPress);
}


function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over ! Final Score <b>${level}</b> <br> Press Enter to Restart`;
        h2.classList.add("alert");

        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 300)

        overSound();    //✅ Game Over Sound
        highestScore(level);
        
        started = false // // ✅ game stopped, waiting for Enter 
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.classList.remove("alert");
}

let h3 = document.querySelector('h3');
let highScore = 0;
function highestScore(level) {
    if (highScore < level) highScore = level;
    h3.innerText = `Highest Score : ${highScore}`;
}

//mouse click sound.
function clickSound() {
    clickAudio.currentTime = 0;
    clickAudio.play();
}
//levelUp sound
function lvlUpSound() {
    levelUpAudio.currentTime = 0;
    levelUpAudio.play();
}
//Game Over sound
function overSound() {
    overAudio.currentTime = 0;
    overAudio.play();
}

