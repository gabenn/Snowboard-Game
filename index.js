(() => {
    //links
    const playerDown = './assets/playerDown.png';
    const playerLeft = './assets/playerLeft.png';
    const playerRight = './assets/playerRight.png';
    //DOM
    const favIcon = document.querySelector("#favIcon");
    const playerCharacter = document.querySelector("#playerCharacter");
    const scoreBox = document.querySelector("#scoreBox");
    const jumpCounter = document.querySelector("#jumpCounter");
    //modal
    const modalBox = document.querySelector(".modalBox");
    const modalHighScore = document.querySelector("#modalHighScore");
    const modalScore = document.querySelector("#modalScore");
    //arrays
    const traps = [];
    const bonusPoints = [];
    //variables
    const intervalTime = 15;
    const moveLength = 3;
    const prodMode = false;
    const trapsStart = 40;
    let gameScore = 0;
    let bonusGameScore = 0
    let jumpQuantity = 3;
    //intervals
    let intervalLeft, intervalDown, intervalRight, intervalUp;


    if (localStorage.getItem('highScoreLS') == undefined) localStorage.setItem('highScoreLS', 0);

    const highScore = parseInt(localStorage.getItem('highScoreLS'));

    function loseWin() {
        for (let i = 0; i < traps.length; i++) {
            if (traps[i].offsetTop < 0) { //changing position when trap is unvisible 
                const trapXY = setTrapXY();

                traps[i].style.left = `${trapXY[0]}px`; // setting trap x coordinate
                traps[i].style.top = `${trapXY[1]}px`; // setting trap y coordinate

                if (traps[traps.length - 1].offsetTop < 50) {
                    createTrap(trapXY[0], trapXY[1]); // adding new element after "win"

                    if (gameScore > 5) {
                        const trapXY = setTrapXY();
                        if (trapXY[0] < window.innerWidth * 0.2) trapXY[0] += 400;
                        if (trapXY[0] > window.innerWidth * 0.8) trapXY[0] -= 400;
                        createBonusPoint(trapXY[0], trapXY[1]);
                    }
                }
                gameScore = traps.length - trapsStart + bonusGameScore; //score
                scoreBox.innerHTML = `Score ${gameScore}`;
            }
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
                document.removeEventListener('keydown', listeners);

            } //end of hitbox if
        } //end of for new traps, bonus points
        if (gameScore > 5) {
            for (let i = 0; i < bonusPoints.length; i++) {
                if (bonusPoints[i].offsetTop < 20) {
                    document.body.removeChild(bonusPoints[i]);
                    bonusPoints.splice(i, 1);
                    break;
                } //end of if bonusPoint is invisible
                if (bonusPoints[i].offsetTop < playerCharacter.offsetTop + 32 &&
                    bonusPoints[i].offsetTop > playerCharacter.offsetTop - 32 &&
                    bonusPoints[i].offsetLeft < playerCharacter.offsetLeft + 32 &&
                    bonusPoints[i].offsetLeft > playerCharacter.offsetLeft - 32
                ) {
                    bonusGameScore += 1;
                    gameScore = traps.length - trapsStart + bonusGameScore;
                    scoreBox.innerHTML = `Score ${gameScore}`;
                    document.body.removeChild(bonusPoints[i]);
                    bonusPoints.splice(i, 1);
                } //end of if hitbox bonusPoint
            }
        } //end of if gamescore>5
    } //end of losewin

    function moveUp() {
        intervalUp =
            setInterval(function () {
                traps.forEach(trap => {
                    trap.style.top = `${trap.offsetTop+moveLength}px`;
                });
                bonusPoints.forEach(point => {
                    point.style.top = `${point.offsetTop+moveLength}px`;
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
                bonusPoints.forEach(point => {
                    point.style.top = `${point.offsetTop-moveLength}px`;
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
                bonusPoints.forEach(point => {
                    point.style.top = `${point.offsetTop-moveLength}px`;
                    point.style.left = `${point.offsetLeft-moveLength}px`;
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
                bonusPoints.forEach(point => {
                    point.style.top = `${point.offsetTop-moveLength}px`;
                    point.style.left = `${point.offsetLeft+moveLength}px`;
                });
                loseWin();
            }, intervalTime)
    }

    function jump() {
        if (jumpQuantity > 0) {
            jumpQuantity -= 1;
            for (let i = 0; i < 50; i++) {
                traps.forEach(trap => {
                    setTimeout(() => {
                        trap.style.top = `${trap.offsetTop-moveLength}px`;
                    }, intervalTime)
                });
                bonusPoints.forEach(point => {
                    setTimeout(() => {
                        point.style.top = `${point.offsetTop-moveLength}px`;
                    }, intervalTime)
                });
            }
        }
        scoreBox.textContent = jumpQuantity;
        moveDown();
    }

    function createTrap(trapX, trapY) {
        //create trap
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

    function createBonusPoint(trapX, trapY) {
        const bonusPoint = document.createElement('div');
        bonusPoint.className = "bonusPoints";
        bonusPoint.id = "bonusPoint";
        bonusPoint.style.left = `${trapX}px`;
        bonusPoint.style.top = `${trapY}px`;
        bonusPoint.style.backgroundImage = "url('./assets/point.png')";
        //create trap
        document.body.appendChild(bonusPoint);
        //pushing bonusPoint to array
        bonusPoints.push(bonusPoint);
    }

    function clearIntervals() {
        clearInterval(intervalDown);
        clearInterval(intervalRight);
        clearInterval(intervalLeft);
        clearInterval(intervalUp);
    }
    const listeners = (e) => {
        if (e.key == " ") { //space stop game
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
        if (e.key == 'Shift') {
            clearIntervals();
            jump();
        }
    }


    function setTrapXY() {
        let trapX, trapY;
        const trapXY = [];

        trapX = Math.floor(Math.random() * window.innerWidth);

        if (trapX < 65) trapX += 64; //min x coordinate=64
        if (trapX > innerWidth - 65) trapX -= 64; //max x coordinate=window width-64

        trapY = Math.floor(Math.random() * window.innerHeight + 600); //min Y coordinate =600

        trapXY[0] = trapX; //trap X coordinate
        trapXY[1] = trapY; //trap Y coordinate
        return trapXY;
    }

    function init() {
        for (let i = 0; i < trapsStart; i++) {
            const trapXY = setTrapXY();
            createTrap(trapXY[0], trapXY[1]);
        }
    }
    init();

    document.addEventListener("keydown", listeners)
})();