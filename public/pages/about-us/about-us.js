document.addEventListener("DOMContentLoaded", () => {
    searchCompany();
})

function searchCompany() {
    var searchButton = document.getElementById("search-input");
    searchButton.addEventListener("click", () => {
      var input = document.getElementById("tags").value;
      localStorage.setItem("search", `${input}`);
      return window.location.href = "/search";
    });
  }
  
  $(function() {
    var companies = [
      "McDonald's",
      "No Frills",
      "Real Canadian Superstore",
      "Winners",
      "Shopper's Drug Mart"
    ];
    $("#tags").autocomplete({
      source: companies
    });
  });