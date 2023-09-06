// Agrega este código al archivo "js/carrusel.js"

const cardCarousel = document.querySelector('.card-carousel');
const cards = Array.from(document.querySelectorAll('.card'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentCard = 0;

function showCard(index) {
  cards.forEach((card, idx) => {
    if (idx === index) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

prevBtn.addEventListener('click', () => {
  currentCard = (currentCard - 1 + cards.length) % cards.length;
  showCard(currentCard);
});

nextBtn.addEventListener('click', () => {
  currentCard = (currentCard + 1) % cards.length;
  showCard(currentCard);
});

showCard(currentCard);
