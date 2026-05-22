document.querySelectorAll('.table-group-btn, .table caption button').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

const searchInput = document.getElementById('attr-search-input');
const searchResults = document.getElementById('attr-search-results');
let announceTimeout;

function closeAll() {
  document.querySelectorAll('.table caption button').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  document.querySelectorAll('.table-group-btn').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
}

function openMatchingAccordions() {
  document.querySelectorAll('.table-group-btn').forEach(btn => {
    const tbody = btn.closest('tbody');
    const hasVisible = [...tbody.querySelectorAll('tr:has(td)')].some(row => !row.hidden);
    btn.setAttribute('aria-expanded', String(hasVisible));
  });

  document.querySelectorAll('.table caption button').forEach(btn => {
    const table = btn.closest('table');
    const hasVisible = [...table.querySelectorAll('tbody tr:has(td)')].some(row => !row.hidden);
    btn.setAttribute('aria-expanded', String(hasVisible));
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();

  document.querySelectorAll('.table tbody tr:has(td)').forEach(row => {
    const nameText = [...row.querySelectorAll('td')].slice(0, 2).map(td => td.textContent).join(' ').toLowerCase();
    row.hidden = Boolean(query) && !nameText.includes(query);
  });

  if (query) {
    openMatchingAccordions();
    const count = [...document.querySelectorAll('.table tbody tr:has(td)')].filter(row => !row.hidden).length;
    clearTimeout(announceTimeout);
    announceTimeout = setTimeout(() => {
      searchResults.textContent = '';
      searchResults.textContent = count + ' results';
    }, 500);
  } else {
    clearTimeout(announceTimeout);
    searchResults.textContent = '';
    closeAll();
  }
});
