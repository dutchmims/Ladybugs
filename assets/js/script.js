// retrieve card (cell) elements
const cards = Array.from(document.querySelectorAll('.cell'));

// retrieve front elements
const fronts = Array.from(document.querySelectorAll('.front'));

// retrieve container element
const container = document.querySelector('.container');

// retrieve score element
const score = document.querySelector('.score span');

// shuffle cards 
shuffleImages();
setupClickHandlers();

function shuffleImages() {
  cards.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
  });
}

function setupClickHandlers() {
  cards.forEach((card, index) => {
    fronts[index].classList.add('show');

    setTimeout(() => {
      fronts[index].classList.remove('show');
    }, 2000);

    card.addEventListener('click', () => {
      fronts[index].classList.add('flip');
      const flippedCards = document.querySelectorAll('.flip');

      if (flippedCards.length === 2) {
        container.style.pointerEvents = 'none';

        setTimeout(() => {
          container.style.pointerEvents = 'all';
        }, 1000);

        matchCards(flippedCards[0], flippedCards[1]);
      }
    });
  });
}

function matchCards(cardOne, cardTwo) {
  if (cardOne.dataset.index === cardTwo.dataset.index) {
    score.textContent = parseInt(score.textContent) + 1;

    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');

    cardOne.classList.add('match');
    cardTwo.classList.add('match');
  } else {
    setTimeout(() => {
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
    }, 1000);
  }
}
