// retrieve card (cell) elements
const cards = Array.from(document.querySelectorAll('.cell'));
const fronts = Array.from(document.querySelectorAll('.front'));
const container = document.querySelector('.container');
const score = document.querySelector('.score span');

// shuffle cards 
shuffleImages();
setupClickHandlers();

function shuffleImages() {
  if (!cards.length) {
    console.error('No cards found.');
    return;
  }

  cards.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
  });
}

function setupClickHandlers() {
  if (!cards.length || !fronts.length || !container || !score) {
    console.error('Required elements not found.');
    return;
  }

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
  if (!cardOne || !cardTwo) {
    console.error('Invalid card elements.');
    return;
  }

  if (cardOne.dataset.index === cardTwo.dataset.index) {
    if (!score) {
      console.error('Score element not found.');
      return;
    }

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

