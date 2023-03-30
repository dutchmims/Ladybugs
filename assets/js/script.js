// retrieve card (cell) element
const card = document.querySelectorAll('.cell');

// retrieve front element
const front = document.querySelectorAll('.front');

// retrieve container element
const container = document.querySelector('.container');

// retrieve score element
const score = document.querySelector('.score span');

// shuffle cards 
suffleImage();
clicking();
function suffleImage() {
  card.forEach((c) => {
    const num = [...Array(card.length).keys()];
    const random = Math.floor(Math.random() * card.length);

    c.style.order = num[random];
  });
}

function clicking() {
  for (let i = 0; i < card.length; i++) {
    front[i].classList.add('show');

    setInterval(() => {
      front[i].classList.remove('show');
    }, 2000);

// count moves
    card[i].addEventListener('click', () => {
      front[i].classList.add('flip');
      const filppedCard = document.querySelectorAll('.flip');

      if (filppedCard.length == 2) {
        container.style.pointerEvents = 'none';

        setInterval(() => {
          container.style.pointerEvents = 'all';
        }, 1000);

        match(filppedCard[0], filppedCard[1]);
      }
    });
  }
}

// find matching cards
function match(cardOne, cardTwo) {
  if (cardOne.dataset.index == cardTwo.dataset.index) {
    score.innerHTML = parseInt(score.innerHTML) + 1;

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
