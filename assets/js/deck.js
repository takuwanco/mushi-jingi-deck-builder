const deck = {}; // cardId: count

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
  if (!deck[cardId]) {
    deck[cardId] = 1;
  } else if (deck[cardId] < 2) {
    deck[cardId]++;
  } else {
    // alert('このカードは2枚までしか追加できません');
    return;
  }
  renderDeck();
}

function removeFromDeck(cardId) {
  if (deck[cardId]) {
    deck[cardId]--;
    if (deck[cardId] <= 0) {
      delete deck[cardId];
    }
    renderDeck();
  }
}

function renderDeck() {
  const container = document.getElementById('deck');
  container.innerHTML = '';
  Object.entries(deck).forEach(([cardId, count]) => {
    const card = allCards.find(c => c.id === cardId);
    if (!card) return;
    for (let i = 0; i < count; i++) {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.innerHTML = `
        <img class="card-image" src="assets/img/${card.image}" alt="${card.name}">
        <p>${card.name} (${i + 1})</p>
        <button onclick="removeFromDeck('${card.id}')">削除</button>
      `;
      container.appendChild(cardEl);
    }
  });
}

function saveDeck() {
  localStorage.setItem('savedDeck', JSON.stringify(deck));
  alert('デッキを保存しました');
}

function loadDeck() {
  const saved = localStorage.getItem('savedDeck');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.keys(deck).forEach(k => delete deck[k]); // クリア
    Object.assign(deck, parsed);
    renderDeck();
    alert('保存されたデッキを復元しました');
  } else {
    alert('保存されたデッキはありません');
  }
}

function clearDeck() {
  Object.keys(deck).forEach(k => delete deck[k]);
  localStorage.removeItem('savedDeck');
  renderDeck();
  alert('デッキをリセットしました');
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('savedDeck');
  if (saved) {
    Object.assign(deck, JSON.parse(saved));
    renderDeck();
  }
});