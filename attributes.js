document.querySelectorAll('.table-group-btn, .category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

const tooltipBtns = document.querySelectorAll('.tooltip-btn');

function closeAllTooltips() {
  tooltipBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
}

tooltipBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllTooltips();
});

document.addEventListener('click', e => {
  if (!e.target.closest('.tooltip-btn') && !e.target.closest('.category-btn')) closeAllTooltips();
});

const searchInput = document.getElementById('attr-search-input');
const searchResults = document.getElementById('attr-search-results');

function closeAll() {
  document.querySelectorAll('.category-btn').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  document.querySelectorAll('.table-group-btn').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
}

function openMatchingAccordions() {
  document.querySelectorAll('.table-group-btn').forEach(btn => {
    const tbody = btn.closest('tbody');
    const hasVisible = [...tbody.querySelectorAll('tr:has(td)')].some(row => !row.hidden);
    btn.setAttribute('aria-expanded', String(hasVisible));
  });

  document.querySelectorAll('.category-btn').forEach(btn => {
    const table = btn.closest('.table-accordion').querySelector('.table');
    const hasVisible = [...table.querySelectorAll('tbody tr:has(td)')].some(row => !row.hidden);
    btn.setAttribute('aria-expanded', String(hasVisible));
  });
}

function performSearch() {
  const query = searchInput.value.toLowerCase().trim();

  document.querySelectorAll('.table tbody tr:has(td)').forEach(row => {
    const nameText = [...row.querySelectorAll('td')].slice(0, 2).map(td => td.textContent).join(' ').toLowerCase();
    row.hidden = Boolean(query) && !nameText.includes(query);
  });

  if (query) {
    closeAll();
    openMatchingAccordions();
    const count = [...document.querySelectorAll('.table tbody tr:has(td)')].filter(row => !row.hidden).length;
    searchResults.textContent = count + ' results';
  } else {
    searchResults.textContent = '';
  }
}

searchInput.addEventListener('input', () => {
  if (searchInput.value === '') {
    document.querySelectorAll('.table tbody tr:has(td)').forEach(row => row.hidden = false);
    searchResults.textContent = '';
  }
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
});

document.getElementById('search-btn').addEventListener('click', performSearch);
