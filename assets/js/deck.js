const deck = [];

function renderCards(cards) {
  const container = document.getElementById('card-list');
  container.innerHTML = '';
  cards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `
      <img src="assets/img/${card.image}" alt="${card.name}">
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

function removeFromDeck(cardId) {
  const index = deck.indexOf(cardId);
  if (index !== -1) {
    deck.splice(index, 1);
    renderDeck();
  }
}

function renderDeck() {
  const container = document.getElementById('deck'); // ← 修正済み
  container.innerHTML = '';
  deck.forEach(cardId => {
    const card = allCards.find(c => c.id === cardId);
    if (!card) return;
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `
      <img src="assets/img/${card.image}" alt="${card.name}">
      <p>${card.name}</p>
      <button onclick="removeFromDeck('${card.id}')">削除</button>
    `;
    container.appendChild(cardEl);
  });
}

function saveDeck() {
  localStorage.setItem('savedDeck', JSON.stringify(deck));
  alert('デッキを保存しました');
}

function loadDeck() {
  const saved = localStorage.getItem('savedDeck');
  if (saved) {
    deck.length = 0; // 現在のデッキをクリア
    deck.push(...JSON.parse(saved));
    renderDeck();
    alert('保存されたデッキを復元しました');
  } else {
    alert('保存されたデッキはありません');
  }
}

function clearDeck() {
  deck.length = 0;
  localStorage.removeItem('savedDeck');
  renderDeck();
  alert('デッキをリセットしました');
}