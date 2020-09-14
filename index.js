(() => {
    //links
    const playerDown = './assets/playerDown.png';
    const playerLeft = './assets/playerLeft.png';
    const playerRight = './assets/playerRight.png';
    //
    const favIcon = document.querySelector("#favIcon");
    const playerCharacter = document.querySelector("#playerCharacter");
    const score = document.querySelector("#score");
    const modalBox = document.querySelector(".modalBox");
    const modalHighScore = document.querySelector("#modalHighScore");
    const modalScore = document.querySelector("#modalScore");
    const modalPlay = document.querySelector(".modalPlay");
    //variables
    const traps = [];
    const intervalTime = 15;
    const moveLength = 3;
    const prodMode = false;
    const trapsStart = 40;
    let intervalLeft, intervalDown, intervalRight, intervalUp, gameScore = 0;


    if (localStorage.getItem('highScoreLS') == undefined) localStorage.setItem('highScoreLS', 0);

    const highScore = parseInt(localStorage.getItem('highScoreLS'));

    function loseWin() {
        for (let i = 0; i < traps.length; i++) {
            if (traps[i].offsetTop < 0) { //changing position when trap is unvisible 
                traps[i].style.top = `${Math.floor(Math.random() * window.innerHeight)+600}px`;
                let trapX, trapY;
                trapX = Math.floor(Math.random() * window.innerWidth);

                if (trapX < 65) trapX += 64;
                if (trapX > innerWidth - 65) trapX -= 64;

                traps[i].style.left = `${trapX}px`;

                if (i % traps.length == 0) createTrap(trapX, trapY); // adding new element after 

                gameScore = traps.length - trapsStart; //score
                score.innerHTML = `Score ${gameScore}`;
            }
            //hitboxes
            if (traps[i].offsetTop < playerCharacter.offsetTop + 32 &&
                traps[i].offsetTop > playerCharacter.offsetTop - 32 &&
                traps[i].offsetLeft < playerCharacter.offsetLeft + 32 &&
                traps[i].offsetLeft > playerCharacter.offsetLeft - 64
            ) {
                if (highScore == undefined || highScore < gameScore) localStorage.setItem('highScoreLS', gameScore);

                clearIntervals();
                setTimeout(() => {
                    modalBox.style.zIndex = 3;
                    modalHighScore.value = localStorage.getItem('highScoreLS');
                    modalScore.value = gameScore;
                }, 500);
                document.addEventListener("keydown",(e)=>{
                    if(e.key="Enter"){
                        location.reload();
                    }
                });
                document.removeEventListener('keydown', listeners);
            }
        }
    }

    function moveUp() { //"dev" function :D           
        intervalUp =
            setInterval(function () {
                traps.forEach(trap => {
                    trap.style.top = `${trap.offsetTop+moveLength}px`;
                });
                loseWin();
            }, intervalTime)
    }

    function moveDown() {
        intervalDown =
            setInterval(function () {
                traps.forEach(trap => {
                    trap.style.top = `${trap.offsetTop-moveLength}px`;
                });
                loseWin();
            }, intervalTime)
    }

    function moveRight() {
        intervalRight =
            setInterval(function () {
                traps.forEach(trap => {
                    trap.style.top = `${trap.offsetTop-moveLength}px`;
                    trap.style.left = `${trap.offsetLeft-moveLength}px`;
                });
                loseWin();
            }, intervalTime)
    }

    function moveLeft() {
        intervalLeft =
            setInterval(function () {
                traps.forEach(trap => {
                    trap.style.top = `${trap.offsetTop-moveLength}px`;
                    trap.style.left = `${trap.offsetLeft+moveLength}px`;
                });
                loseWin();
            }, intervalTime)
    }

    function createTrap(trapX, trapY) {
        // trap styles
        const treeTrap = document.createElement('div');
        treeTrap.className = "traps";
        treeTrap.id = "deadTree";
        treeTrap.style.left = `${trapX}px`;
        treeTrap.style.top = `${trapY}px`;
        treeTrap.style.backgroundImage = "url('assets/deadTree.png')";
        //create trap
        document.body.appendChild(treeTrap);
        //pushing trap to array
        traps.push(treeTrap);
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
    const listeners = (e) => {
        if (e.key == " ") { //space
            if (prodMode === true) {
                clearIntervals();
                usingDevFunction();
            }
        }
        if (e.key == "ArrowUp" || e.key == "w") { //up
            if (prodMode === true) {
                clearIntervals();
                moveUp();
                usingDevFunction();
            }
        }
        if (e.key == "ArrowLeft" || e.key == "a") { //left
            clearIntervals();
            moveLeft();
            playerCharacter.style.backgroundImage = `url("${playerLeft}")`;
            favIcon.href = playerLeft;
        }

        if (e.key == "ArrowRight" || e.key == "d") { //right
            clearIntervals();
            moveRight();
            playerCharacter.style.backgroundImage = `url("${playerRight}")`;
            favIcon.href = playerRight;
        }

        if (e.key == "ArrowDown" || e.key == "s") { //down
            clearIntervals();
            moveDown();
            playerCharacter.style.backgroundImage = `url("${playerDown}")`;
            favIcon.href = playerDown;
        }
    }
    document.addEventListener("keydown", listeners)
    



    function init() {
        for (let i = 0; i < trapsStart; i++) { // Traps quantity
            let trapX, trapY;
            trapX = Math.floor(Math.random() * window.innerWidth);

            if (trapX < 65) trapX += 64;
            if (trapX > innerWidth - 65) trapX -= 64;

            trapY = Math.floor(Math.random() * window.innerHeight)

            while (trapY < window.innerHeight * 0.5) {
                trapY = Math.floor(Math.random() * window.innerHeight);
            }
            createTrap(trapX, trapY);
        }
    }
    init();
})();