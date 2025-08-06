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
            }, 50 * (i + j))
        }
    }
//    setTimeout(() => {
//        for (let j = 1;j<=13;j++) {
//            for (let i = 1;i<=4;i++) {
//                setTimeout(() => {
//                    document.getElementById("r" + i + "c" + j).className = "letterSpace";
//                }, 80 * (i + j))
//            }
//        }
//    }, 500)
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

function wrongCounterWipe() {
    for (let i = 1;i<=4;i++) {
        setTimeout(() => {
            document.getElementById("wrong"+i).className = "lit_wrong_square";
        }, 400 * i)
    }
}

function animateTiles() {
    const variation = Math.floor(Math.random() * 3);
    switch (variation) {
        case 0:
            horizWipe();
            break;
        case 1:
            diagWipe1();
            break;
        case 2:
            verticWipe();
            break;
    }
}