const tagFilters = document.querySelectorAll('.filter-bar button');
const cards = document.querySelectorAll('.card');
const allBtn = document.querySelector('[data-filter="all"]');

tagFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    if (filter === 'all') {
      tagFilters.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
    } else {
      allBtn.setAttribute('aria-pressed', 'false');

      const isActive = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(isActive));

      const anyActive = [...tagFilters].some(
        b => b.dataset.filter !== 'all' && b.getAttribute('aria-pressed') === 'true'
      );
      if (!anyActive) allBtn.setAttribute('aria-pressed', 'true');
    }

    applyFilters();
  });
});

function applyFilters() {
  const activeFilters = [...tagFilters]
    .filter(b => b.dataset.filter !== 'all' && b.getAttribute('aria-pressed') === 'true')
    .map(b => b.dataset.filter);

  cards.forEach(card => {
    const matches = activeFilters.length === 0 ||
      activeFilters.some(filter => card.querySelector('.tag--' + filter));
    card.hidden = !matches;
  });
}
