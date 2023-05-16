// retrieve all Elements with class attr of "card"
const cards = document.querySelectorAll('.card');

// retrieve move counter element
const moveCounter = document.getElementById("move-counter");

// retrieve score element
const scoreEl = document.getElementById("score");

// retrieve best score element
const bestScoreEl = document.getElementById("best-score");

// manage flip state
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

// store elapsed time from timer
let timerInterval;
// second counter for score calculation
let secCounter = 0;
// store number of moves
let numMoves = 0;
// count matches to determine when game is finished
let matchCounter = 0;

// store scores
let bestScores = [];


// calculate scores
function calcScore() {
    let score = Math.round((10000 - numMoves) / secCounter);
    // display current score 
    scoreEl.innerHTML = score;
    // store all scores in bestScore array
    bestScores.push(score);

    getBestScore();
}

// get and display highest number from bestScores array
function getBestScore() {
    // get highest value from bestScores array
    let maxScore = Math.max(...bestScores);

    bestScoreEl.innerHTML = maxScore;
}


/* MEMORY GAME FUNCTIONALITY
    source: https://medium.com/free-code-camp/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae
*/

function flipCard() {
    // count moves
    numMoves++;
    moveCounter.innerHTML = numMoves;

    // prevent more than 2 cards from flipping at the same time
    if (lockBoard) return;
    // check if current clicked card is equal to first card
    if (this === firstCard) return;

    // this refers to respective div.card element
    this.classList.add('flip'); // append class of "flip" to all items of cards array

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second click
        secondCard = this;

        checkForMatch();
    }
}
// find matching cards
function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        // cards match
        matchCounter += 1;
        disableCards();
        if (matchCounter === (cards.length / 2)) {
            stopGame();
        }
    } else {
        // cards don't match
        unflipCards();
    }
}

// prevent matched cards from unflipping
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//turn unmatching cards back after 1.5s
function unflipCards() {

    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

// reset firstCard and secondCard after each round
function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

// shuffle cards 
function shuffle() {
    for (let card of cards) {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    }
}

// render entire game
function startGame() {
    // shuffle cards
    shuffle();


    // render player name
    if (playerNameInput.value === "") {
        playerName.innerHTML = "Your";
    } else {
        playerName.innerHTML = `${playerNameInput.value}'s`;
    }

    closeModal();

    startTimer();

    // add event listener to each item of cards array
    for (let card of cards) {
        card.addEventListener('click', flipCard);
    }
    // reset move counter to 0
    numMoves = 0;
    moveCounter.innerHTML = numMoves;
}

// restart game

function restartGame() {
    // storing bestScores array in local storage
    localStorage.setItem("bestScores", JSON.stringify(bestScores)); // not working!!!

    //hide restart button
    restartBtn.style.display = "none";

    // flip all cards back again
    cards.forEach(card => card.classList.remove('flip'));

    // set matching cards to 0
    matchCounter = 0;

    // reset score to 0
    scoreEl.innerHTML = 0;
    startGame();
}

// restart game button restarts game without reloading the page
restartBtn.addEventListener("click", restartGame);
