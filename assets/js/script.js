// Retrieve card (cell) elements
const cards = Array.from(document.querySelectorAll('.cell'));
const fronts = Array.from(document.querySelectorAll('.front'));
const container = document.querySelector('.container');
const score = document.querySelector('.score span');

// Shuffle cards 
shuffleImages();
setupClickHandlers();

function shuffleImages() {
  if (!Array.isArray(cards) || cards.length === 0) {
    console.error('No cards found or invalid cards array.');
    return;
  }

  cards.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
  });
}

function setupClickHandlers() {
  if (!Array.isArray(cards) || cards.length === 0 || !Array.isArray(fronts) || fronts.length === 0 || !container || !score) {
    console.error('Required elements not found or invalid arrays.');
    return;
  }

  cards.forEach((card, index) => {
    if (!fronts[index]) {
      console.error(`Front element not found for card at index ${index}.`);
      return;
    }

    fronts[index].classList.add('show');

    setTimeout(() => {
      fronts[index].classList.remove('show');
    }, 2000);

    card.addEventListener('click', () => {
      if (!fronts[index]) {
        console.error(`Front element not found for card at index ${index}.`);
        return;
      }

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

  if (!cardOne.dataset || !cardTwo.dataset || !cardOne.dataset.index || !cardTwo.dataset.index) {
    console.error('Card elements missing dataset or dataset index.');
    return;
  }

  if (cardOne.dataset.index === cardTwo.dataset.index) {
    if (!score) {
      console.error('Score element not found.');
      return;
    }

    if (!score.textContent) {
      console.error('Score element has no text content.');
      return;
    }

    const currentScore = parseInt(score.textContent);

    if (isNaN(currentScore)) {
      console.error('Score is not a valid number.');
      return;
    }

    score.textContent = currentScore + 1;

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