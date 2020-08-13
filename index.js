// https://codepen.io/carpenumidium/pen/vNNzyG
// animacja backgroundu?
//edge://surf/

const playerCharacter = document.getElementById("playerCharacter");
const score=document.getElementById("score");
let  highScore, intervalLeft, intervalDown, intervalRight,intervalUp, traps, gameScore;

highScore=window.localStorage.getItem('highScoreLS');

function lose() {
    for (let i = 0; i < traps.length; i++) {//hitboxes (Ik they sucks sometimes)
        if (traps[i].offsetTop < playerCharacter.offsetTop+16 &&
            traps[i].offsetTop > playerCharacter.offsetTop-26 &&
            traps[i].offsetLeft < playerCharacter.offsetLeft+16 &&
            traps[i].offsetLeft > playerCharacter.offsetLeft-60
        ) {
            console.log("lose");
            if(highScore== undefined || highScore<gameScore)
            {
                window.localStorage.setItem('highScoreLS', gameScore);

            }
            alert("High Score: "+window.localStorage.getItem('highScoreLS')+"\n Score: "+ gameScore);
            
            location.reload();
        }
    }
}
function usingDeveloperFunction(){
    console.log("dont be cheater dont use dev functions");
}
function levelWin() {
    for (let i = 0; i < traps.length; i++) {
        if (traps[i].offsetTop < 0) {//changing position after trap is unvisible
            traps[i].style.top = `${Math.floor(Math.random() * window.innerHeight)+600}px`;
            trapX = Math.floor(Math.random() * window.innerWidth);
            while (trapX < 65 || trapX > innerWidth - 65) {
                trapX = Math.floor(Math.random() * window.innerWidth);
            }
            traps[i].style.left=`${trapX}px`;
            if(i%traps.length==0){// adding new element after "level win"
                
                treeTrap = document.createElement('div');
                treeTrap.className = "traps";
                treeTrap.id = "deadTree";
                treeTrap.style.left = `${trapX}px`;
                treeTrap.style.top = `${trapY}px`;
                treeTrap.style.backgroundImage = "url('assets/deadTree.png')";
                document.body.appendChild(treeTrap);
                traps = document.getElementsByClassName("traps");
                traps = [...traps];
            }
            gameScore=traps.length-40;;//score
            score.innerHTML="Score "+gameScore;;
        }
    }
}
function moveUp() {//"dev" function :D           
    intervalUp =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop+2}px`;
            }
            lose();
            levelWin();
        }, 10)
}
function moveDown() {
    intervalDown =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-2}px`;
            }
            lose();
            levelWin();
        }, 10)
}
function moveRight() {
    intervalRight =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-2}px`;
                traps[i].style.left = `${traps[i].offsetLeft-2}px`;
            }
            lose();
            levelWin();
        }, 10)
}

function moveLeft() {
    intervalLeft =
        setInterval(function () {
            for (let i = 0; i < traps.length; i++) {
                traps[i].style.top = `${traps[i].offsetTop-2}px`;
                traps[i].style.left = `${traps[i].offsetLeft+2}px`;
            }
            lose();
            levelWin();
        }, 10)
}

function clearIntervals() {//"dev" function :D   
    clearInterval(intervalDown);
    clearInterval(intervalRight);
    clearInterval(intervalLeft);
    clearInterval(intervalUp);
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {//"dev" function :D space
        clearIntervals();
        usingDeveloperFunction();
        }
    if (event.keyCode == 38) {//"dev" function :D up
    clearIntervals();
    moveUp();
    usingDeveloperFunction();
    }
    if (event.keyCode == 37) {//left
        clearIntervals();
        moveLeft();
        playerCharacter.style.backgroundImage = 'url("./assets/playerLeft.png")';

    }

    if (event.keyCode == 39) {//right
        clearIntervals();
        moveRight();
        playerCharacter.style.backgroundImage = 'url("./assets/playerRight.png")';

    }

    if (event.keyCode == 40) {//down
        clearIntervals();
        moveDown();
        playerCharacter.style.backgroundImage = 'url("./assets/playerDown.png")';

    }
})

let trapX, trapY, treeTrap;

function init() {
    for (let i = 0; i < 40; i++) {// Traps quantity
        
        trapX = Math.floor(Math.random() * window.innerWidth);
        while (trapX < 65 || trapX > innerWidth - 65) {
            trapX = Math.floor(Math.random() * window.innerWidth);
        }
        trapY = Math.floor(Math.random() * window.innerHeight)
        while (trapY < window.innerHeight * 0.5) {
            trapY = Math.floor(Math.random() * window.innerHeight);
        }
        // trap creating
        treeTrap = document.createElement('div');
        treeTrap.className = "traps";
        treeTrap.id = "deadTree";
        treeTrap.style.left = `${trapX}px`;
        treeTrap.style.top = `${trapY}px`;

        treeTrap.style.backgroundImage = "url('assets/deadTree.png')";
        document.body.appendChild(treeTrap);
    }
    //making trap Array
    traps = document.getElementsByClassName("traps");
    traps = [...traps];
}
init();

// TO DO:
// Lives
// Adding trap after "win level" Done?
// 
