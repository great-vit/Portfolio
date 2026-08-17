(function () {
  "use strict";

  var PER_PAGE = 12;

  var params = new URLSearchParams(location.search);
  var query = (params.get("q") || "").trim();

  var titleEl = document.getElementById("searchTitle");
  var countEl = document.getElementById("searchCount");
  var gridEl = document.getElementById("searchGrid");
  var paginationEl = document.getElementById("searchPagination");
  var emptyEl = document.getElementById("searchEmpty");

  if (titleEl) titleEl.textContent = query ? "“" + query + "” 검색결과" : "검색결과";

  var catalog = window.AnytourCatalog;
  if (!catalog || !gridEl) return;

  var keyword = query.toLowerCase();
  var results = [];

  if (keyword) {
    results = catalog.getProductsFor("all").filter(function (item) {
      var haystack = [item.title, item.meta].concat(item.tags || []).join(" ").toLowerCase();
      return haystack.indexOf(keyword) !== -1;
    });
  }

  if (countEl) countEl.textContent = "총 " + results.length + "개";
  if (emptyEl) emptyEl.hidden = results.length > 0;

  var currentPage = 1;

  function renderPage() {
    var totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * PER_PAGE;
    gridEl.innerHTML = results.slice(start, start + PER_PAGE).map(catalog.productCard).join("");
    catalog.renderPagination(paginationEl, totalPages, currentPage, function (p) {
      currentPage = p;
      renderPage();
      gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  renderPage();
})();
