let allCards = [];

document.addEventListener('DOMContentLoaded', async () => {
  allCards = await loadCards();
  renderCards(allCards);

  document.getElementById('search-button').addEventListener('click', () => {
    const keyword = document.getElementById('search-box').value.trim().toLowerCase();
    const filtered = allCards.filter(card =>
      card.name.toLowerCase().includes(keyword) ||
      (card.type && card.type.toLowerCase().includes(keyword))
    );
    renderCards(filtered);
  });
});

function renderCards(cards) {
  const container = document.getElementById('card-list');
  container.innerHTML = '';
  cards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `
      <img class="card-image" src="assets/img/${card.image}" alt="${card.name}">
      <p>${card.name}</p>
      <button onclick="addToDeck('${card.id}')">追加</button>
    `;
    container.appendChild(cardEl);
  });
}

function addToDeck(cardId) {
  if (deck.includes(cardId)) return;
  deck.push(cardId);
  renderDeck();
}
