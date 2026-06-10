const cards = document.querySelectorAll('.card');

document.querySelectorAll('.filter-bar input').forEach(input => {
  input.addEventListener('change', () => {
    cards.forEach(card => {
      card.hidden = input.value !== 'all' && !card.querySelector('.tag--' + input.value);
    });
  });
});
