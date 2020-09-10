//
const playerCharacter = document.getElementById("playerCharacter");
const score = document.getElementById("score");
let highScore, intervalLeft, intervalDown, intervalRight, intervalUp, traps, gameScore;

if (localStorage.getItem('highScoreLS') == undefined) localStorage.setItem('highScoreLS', 0);

highScore = parseInt(localStorage.getItem('highScoreLS'))
gameScore = 0;

function lose() {
    traps.forEach(trap => {
        //hitboxes (Ik they sucks sometimes)
        if (trap.offsetTop < playerCharacter.offsetTop + 16 &&
            trap.offsetTop > playerCharacter.offsetTop - 24 &&
            trap.offsetLeft < playerCharacter.offsetLeft + 24 &&
            trap.offsetLeft > playerCharacter.offsetLeft - 60
        ) {
            if (highScore == undefined || highScore < gameScore) localStorage.setItem('highScoreLS', gameScore);

            clearIntervals();
            alert(`High Score: ${localStorage.getItem('highScoreLS')}\nScore: ${gameScore}`);
            location.reload();
        }

    });
}

function levelWin() {
    for (let i = 0; i < traps.length; i++) {
        if (traps[i].offsetTop < 0) { //changing position when trap is unvisible 

            traps[i].style.top = `${Math.floor(Math.random() * window.innerHeight)+600}px`;
            trapX = Math.floor(Math.random() * window.innerWidth);

            if (trapX < 65) trapX += 64;
            if (trapX > innerWidth - 65) trapX -= 64;

            traps[i].style.left = `${trapX}px`;

            if (i % traps.length == 0) createTrap(); // adding new element after "level win"

            gameScore = traps.length - 40;; //score
            score.innerHTML = `Score ${gameScore}`;
        }
    }
}

function moveUp() { //"dev" function :D           
    intervalUp =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop+3}px`;
            }
            lose();
            levelWin();
        }, 15)
}

function moveDown() {
    intervalDown =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-3}px`;
            }
            lose();
            levelWin();
        }, 15)
}

function moveRight() {
    intervalRight =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-3}px`;
                traps[i].style.left = `${traps[i].offsetLeft-3}px`;
            }
            lose();
            levelWin();
        }, 15)
}

function moveLeft() {
    intervalLeft =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-3}px`;
                traps[i].style.left = `${traps[i].offsetLeft+3}px`;
            }
            lose();
            levelWin();
        }, 15)
}

function clearIntervals() { //"dev" function :D   
    clearInterval(intervalDown);
    clearInterval(intervalRight);
    clearInterval(intervalLeft);
    clearInterval(intervalUp);
}

function usingDevFunction() {
    console.log("Dont be cheater. Dont use dev functions");
}

function createTrap() {
    // trap styles
    treeTrap = document.createElement('div');
    treeTrap.className = "traps";
    treeTrap.id = "deadTree";
    treeTrap.style.left = `${trapX}px`;
    treeTrap.style.top = `${trapY}px`;
    treeTrap.style.backgroundImage = "url('assets/deadTree.png')";
    //create trap
    document.body.appendChild(treeTrap);
    //trap array
    traps = document.getElementsByClassName("traps");
    traps = [...traps];
}
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) { //"dev" function :D space
        clearIntervals();
        usingDevFunction();
    }
    if (event.keyCode == 38 || event.keyCode == 87) { //"dev" function :D up
        clearIntervals();
        moveUp();
        usingDevFunction();
    }
    if (event.keyCode == 37 || event.keyCode == 65) { //left
        clearIntervals();
        moveLeft();
        playerCharacter.style.backgroundImage = 'url("./assets/playerLeft.png")';
    }

    if (event.keyCode == 39 || event.keyCode == 68) { //right
        clearIntervals();
        moveRight();
        playerCharacter.style.backgroundImage = 'url("./assets/playerRight.png")';
    }

    if (event.keyCode == 40 || event.keyCode == 83) { //down
        clearIntervals();
        moveDown();
        playerCharacter.style.backgroundImage = 'url("./assets/playerDown.png")';
    }
})

let trapX, trapY, treeTrap;

function init() {
    for (let i = 0; i < 40; i++) { // Traps quantity

        trapX = Math.floor(Math.random() * window.innerWidth);

        if (trapX < 65) trapX += 64;
        if (trapX > innerWidth - 65) trapX -= 64;

        trapY = Math.floor(Math.random() * window.innerHeight)

        while (trapY < window.innerHeight * 0.5) {
            trapY = Math.floor(Math.random() * window.innerHeight);
        }
        createTrap();
    }
}
init();