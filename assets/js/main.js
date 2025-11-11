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
