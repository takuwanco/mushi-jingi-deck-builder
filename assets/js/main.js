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
  const cardList = document.getElementById('card-list');
  cardList.innerHTML = '';
  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="assets/img/${card.image}" alt="${card.name}" class="card-image" />
      <strong>${card.name}</strong><br/>
      タイプ: ${card.type}<br/>
      コスト: ${card.cost}<br/>
      ${card.power ? `パワー: ${card.power}<br/>` : ''}
      ${card.effect ? `効果: ${card.effect}<br/>` : ''}
      <button onclick='addToDeck(${JSON.stringify(card)})'>追加</button>
    `;
    cardList.appendChild(div);
  });
}