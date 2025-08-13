// Setup Variables

const category = document.getElementById("category");
const letters = document.getElementById("letters");
const keyboard = document.getElementById("keyboard");
const lettergrid = document.getElementById("lettergrid");
const content = document.getElementById("content");
let correct = new Set();
let answerKey = new Set();
let chosenWords = new Set();
let wrongGuesses = 0;
let wins = 0;
let winThreshold = 10;
let wrongGuessThreshold = 4;

for (let i = 1; i<=4; i++) {
  for (let j = 1; j<=13; j++) {
    const row = document.getElementById("r" + i);
    const space = document.createElement("td");
    row.appendChild(space);
    space.className = "letterSpace";
    space.id = "r" + i + "c" + j;
  }
}

for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  const key = document.createElement("td");
  if (i<78) {
    document.getElementById('keyr1').append(key);
  } else {
    document.getElementById('keyr2').append(key);
  }
  key.className = "key";
  key.id=String.fromCharCode(i);
  key.innerHTML = letter;
}

for (let i = 1; i <= wrongGuessThreshold; i++) {
  const wrongGuess = document.createElement("td");
  document.getElementById("wrongGuessRow").append(wrongGuess);
  wrongGuess.className = "wrong_square";
  wrongGuess.id = "wrong" + i;
}

for (let i = 1; i<= winThreshold; i++) {
  const win = document.createElement("td");
  document.getElementById("winRow").append(win);
  win.className = "win_square";
  win.id = "win" + i;
}

// Gamemode Toggles

function enableNormalMode() {
  winThreshold = 10;
  wrongGuessThreshold = 4;
  document.getElementById('skin').href="page.css";
}

function enableHardMode() {
  winThreshold = 20;
  wrongGuessThreshold = 3;
  document.getElementById('skin').href="hardmode.css";
  document.getElementById('wrong4').className = "disabled_wrong_square";
}

// Setup Methods

function areSetsEqual(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }
  for (const item of setA) {
    if (!setB.has(item)) {
      return false;
    }
  }
  return true;
}

function handleKeyDown(event) {
  if (event.key.toUpperCase() >= 'A' && event.key.toUpperCase() <= 'Z') {
    const press = document.getElementById(event.key.toUpperCase());
    press.click();
  }
}

let catName = '';
let word = '';
function chooseWord() {
  const catNumber = Math.floor(Math.random() * categories.length);
  catName = categories[catNumber].category;
  const wordNumber = Math.floor(Math.random() * categories[catNumber].words.length);
  word = categories[catNumber].words[wordNumber];
  const wordId = catNumber + "." + wordNumber; 
  if (chosenWords.has(wordId)) {
    chooseWord();
  }
  else {
    document.getElementById("catName").innerHTML = catName;
    chosenWords.add(wordId);
  }
}

function fitAnswerToGrid() {
  const griddy = word.split(' ');
  console.log(griddy);
  let n = 0;
  let pos = 0;
  let i = 1;
  for (let j = 1; j<=14; j++) {
    if (n < griddy.length && pos < griddy[n].length) {
      document.getElementById("r" + i + "c" + j).innerHTML = griddy[n].charAt(pos);
      pos++;
    } else {
      n++;
      pos = 0;
      if (n < griddy.length && (13-j) < griddy[n].length) {
        i++;
        j=0;
      }
    } 
  }
  word = word.replaceAll("'",'');
  word = word.replaceAll("-",'');
  word = word.replaceAll(",",'');
  word = word.replaceAll(" ",'');
  answerKey = new Set(word);
}

function resetWrongCounter() {
  wrongGuesses=0;
}

function redrawWrongCounter() {
  for (let i=1;i<=temp;i++) {
    document.getElementById('wrong'+i).remove();
  }
  for (let i=1;i<=wrongGuessThreshold;i++) {
    const wrongGuess = document.createElement("td");
    document.getElementById("wrongGuessRow").append(wrongGuess);
    wrongGuess.className = "wrong_square";
    wrongGuess.id = "wrong" + i;
  }
}

function guessLetter() {
  this.className = "disabledKey";
  this.removeEventListener('click', guessLetter);
  if (answerKey.has(this.innerHTML)) {
    for (let i = 1; i<=4; i++) {
      for (let j = 1; j<=13; j++) {
        if (document.getElementById("r" + i + "c" + j).innerHTML === this.innerHTML) {
          document.getElementById("r" + i + "c" + j).className = 'solvedLetterSpace';
          correct.add(this.innerHTML);
        }
      }
    }
  } else {
    wrongGuesses++;
    console.log(wrongGuesses);
    document.getElementById("wrong" + wrongGuesses).className = "active_wrong_square";
  }
  if (wrongGuesses >= wrongGuessThreshold) {
    clearEventListeners();
    wins=0;
    chosenWords = new Set();
    for (let i = 1; i<=4; i++) {
      for (let j = 1; j<=13; j++) {
        if (document.getElementById("r" + i + "c" + j).innerHTML != '') {
          document.getElementById("r" + i + "c" + j).className = 'solvedLetterSpace';
        }
      }
    }
    setTimeout(lossAnim, 1500);
    setTimeout(drawLoseScreen, 3500);
  }
  if (areSetsEqual(correct,answerKey)) {
    wins++;
    console.log('You win!');
    clearEventListeners();
    catNameAnim();
    setTimeout(() => {document.getElementById("win" + wins).className = "active_win_square";},2000);
    if (wins < winThreshold) {
      setTimeout(startRound, 1000);
    } else {
      wins=0;
      chosenWords = new Set();
      setTimeout(animateTiles, 1000);
      setTimeout(winScreen,2000);
    }
  }
}

function addEventListeners() {
  document.addEventListener('keypress', handleKeyDown);
  for (let i = 65; i <= 90; i++) {
    const key = document.getElementById(String.fromCharCode(i));
    key.className="key";
    key.addEventListener('click', guessLetter);
  }
}

function clearEventListeners() {
  document.removeEventListener('keypress', handleKeyDown);
  for (let i = 65; i <= 90; i++) {
    const key = document.getElementById(String.fromCharCode(i));
    key.removeEventListener('click', guessLetter);
  }
}

function clearBoard() {
  for (let i = 1; i<=4; i++) {
    for (let j = 1; j<=13; j++) {
      document.getElementById("r" + i + "c" + j).innerHTML = '';
    }
  }
}

//Methods That Run Game

function init() {
  setTimeout(() => {
    const load_screen = document.getElementById('load_screen');
    load_screen.replaceChildren();
    load_screen.remove();
    startRound();
  }, 5192)
}

function startRound() {
  if (wins <= 0) {
    clearBoard();
    correct = new Set();
    answerKey = new Set();
    resetWrongCounter();
    chooseWord();
    fitAnswerToGrid();
    setTimeout(revealTiles, 500);
    setTimeout(addEventListeners, 1000);
  } else {
    resetWrongCounter();
    animateTiles();
    wrongCounterWipe();
    setTimeout(() => {
      clearBoard();
      correct = new Set();
      answerKey = new Set();
      chooseWord();
      fitAnswerToGrid();
      setTimeout(revealTiles, 1000);
      setTimeout(addEventListeners, 2000);
    }, 1000)
  }
}

function drawLoseScreen() {
  const screen = document.createElement("div");
  screen.className = "screen";
  screen.id="lose_screen";
  const window = document.createElement("div");
  window.className = "window";
  window.id = "lose_window";
  const retry = document.createElement("div");
  retry.className = "window_button";
  retry.id = "retry_button";
  retry.innerHTML = "RETRY";
  const menu = document.createElement("div");
  menu.className = "window_button";
  menu.id = "menu_button";
  menu.innerHTML = "MENU";
  content.appendChild(screen);
  screen.appendChild(window);
  window.appendChild(menu);
  window.appendChild(retry);
  retry.addEventListener('click', () => {
    screen.replaceChildren();
    screen.remove();
    wrongCounterWipe();
    regressWinCounter();
    clearBoard();
    startRound();
  })
}
 
function winScreen() {
  const screen = document.createElement("div");
  screen.className = "screen";
  screen.id="win_screen";
  const window = document.createElement("div");
  window.className = "window";
  window.id="win_window";
  const playagain = document.createElement("div");
  playagain.className = "window_button";
  playagain.id = "retry_button";
  playagain.innerHTML = "PLAY AGAIN";
  const menu = document.createElement("div");
  menu.className = "window_button";
  menu.id = "menu_button";
  menu.innerHTML = "MENU";
  content.appendChild(screen);
  screen.appendChild(window);
  window.appendChild(menu);
  window.appendChild(playagain);
  playagain.addEventListener('click', () => {
    screen.replaceChildren();
    screen.remove();
    for (let i=1;i<=wrongGuessThreshold;i++) {
      document.getElementById("wrong"+i).className = "wrong_square";
    }
    regressWinCounter();
    clearBoard();
    startRound();
    setTimeout(() => {document.getElementById('bowlingStuf').classList.remove('moved');}, 0)
  })
}

