document.addEventListener('DOMContentLoaded', () => {
  searchCompany();
});

function searchCompany() {
  const searchButton = document.getElementById('search-input');
  searchButton.addEventListener('click', () => {
    const input = document.getElementById('tags').value;
    localStorage.setItem('search', `${input}`);
    return window.location.href = '/search';
  });
}
  
$(() => {
  const companies = [
    "McDonald's",
    'No Frills',
    'Real Canadian Superstore',
    'Winners',
    "Shopper's Drug Mart",
  ];
  $('#tags').autocomplete({
    source: companies,
  });
});
