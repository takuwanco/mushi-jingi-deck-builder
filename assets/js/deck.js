const deck = [];

function addToDeck(card) {
  if (deck.length >= 40) {
    alert("デッキは最大40枚までです");
    return;
  }
  deck.push(card);
  renderDeck();
}

function renderDeck() {
  const deckElement = document.getElementById('deck');
  deckElement.innerHTML = '';
  deck.forEach(card => {
    const li = document.createElement('li');
    li.textContent = `${card.name} (${card.type})`;
    deckElement.appendChild(li);
  });
}