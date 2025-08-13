function swingOut() {
    lettergrid.classList.add('moved');
    keyboard.classList.add('moved');
}

function swingIn() {
    lettergrid.classList.remove('moved');
    keyboard.classList.remove('moved');
}

function diagWipe1() {
    for (let j = 1;j<=13;j++) {
        for (let i = 1;i<=4;i++) {
            setTimeout(() => {
                document.getElementById("r" + i + "c" + j).className = "litLetterSpace";
            }, 50 * (i + j));
        }
    }    
}


function diagWipe2() {
    for (let j = 1;j<=13;j++) {
        for (let i = 1;i<=4;i++) {
            setTimeout(() => {
                document.getElementById("r" + i + "c" + j).className = "litLetterSpace";
            }, 65 * (17 - i - j))
        }
    }
}

function horizWipe() {
    for (let j = 1;j<=13;j++) {
        for (let i = 1;i<=4;i++) {
            setTimeout(() => {
                document.getElementById("r" + i + "c" + j).className = "litLetterSpace";
            }, 65 * j)
        }
    }
}

function verticWipe() {
    for (let j = 1;j<=13;j++) {
        for (let i = 1;i<=4;i++) {
            setTimeout(() => {
                document.getElementById("r" + i + "c" + j).className = "litLetterSpace";
            }, 120 * i)
        }
    }
}

function tileSnake() {

}

function revealTiles() {
    for (let j = 1;j<=13;j++) {
        for (let i = 1;i<=4;i++) {
            const space = document.getElementById("r"+i+"c"+j);
            setTimeout(() => {
                if (space.innerHTML === '') {
                    space.className = 'letterSpace';
                } else if (space.innerHTML === "'" || space.innerHTML === ',' || space.innerHTML === '-') {
                    space.className = 'solvedLetterSpace';
                } else {
                    space.className = 'activeLetterSpace';
                }
            }, 50 * (i + j));
        }
    }
}

function wrongCounterWipe() {
    for (let i=1;i<=wrongGuessThreshold;i++) {
        setTimeout(() => {
            document.getElementById("wrong"+ (wrongGuessThreshold + 1 - i)).className = "wrong_square";
        }, 100 * i);
    }
}

function regressWinCounter() {
    for (let i=1;i<=winThreshold;i++) {
        setTimeout(() => {
            document.getElementById("win"+(winThreshold + 1 - i)).className = "win_square";
        }, 100 * i)
    }
}

function lossAnim() {
    for (let j = 1;j<=13;j++) {
        for (let i = 1;i<=4;i++) {
            setTimeout(() => {
                document.getElementById("r" + i + "c" + j).className = "redLetterSpace";
            }, 120 * i)
        }
    }
}

function animateTiles() {
    diagWipe1();
}

function catNameAnim() {
    let winText = document.getElementById('niceJob');
    let chooseText = Math.floor(Math.random() * 3);
    switch (chooseText) {
        case 0:
            winText.innerHTML = 'GREAT JOB!'
            break;
        case 1:
            winText.innerHTML = 'NICE ONE!'
            break;
        case 2:
            winText.innerHTML = 'DAMN, SON!'
            break;
    }
    setTimeout(() => {document.getElementById('bowlingStuf').classList.add('moved');}, 500);
    if (wins < winThreshold) {
        setTimeout(() => {document.getElementById('bowlingStuf').classList.remove('moved');}, 3000);
    }
}