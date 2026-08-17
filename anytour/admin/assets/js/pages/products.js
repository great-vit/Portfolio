(function () {
  "use strict";
  var STORAGE_KEY = "admin_products_session";
  var PER_PAGE = 10;
  var currentPage = 1;

  var items = Admin.getList(STORAGE_KEY, PRODUCTS_SEED);

  var tableBody = document.getElementById("tableBody");
  var resultCount = document.getElementById("resultCount");
  var checkAll = document.getElementById("checkAll");
  var keywordInput = document.getElementById("searchKeyword");
  var categorySelect = document.getElementById("searchCategory");
  var dateFromInput = document.getElementById("searchDateFrom");
  var dateToInput = document.getElementById("searchDateTo");
  var pagination = document.getElementById("productsPagination");

  function getFiltered() {
    var kw = keywordInput.value.trim().toLowerCase();
    var cat = categorySelect.value;
    var from = dateFromInput.value;
    var to = dateToInput.value;
    return items.filter(function (it) {
      var okCat = !cat || it.category === cat;
      var okKw = !kw || it.title.toLowerCase().includes(kw) || it.region.toLowerCase().includes(kw);
      var d = it.createdAt.slice(0, 10);
      var okFrom = !from || d >= from;
      var okTo = !to || d <= to;
      return okCat && okKw && okFrom && okTo;
    });
  }

  function render() {
    var list = getFiltered();
    resultCount.textContent = list.length;
    checkAll.checked = false;

    var totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * PER_PAGE;
    var pageItems = list.slice(start, start + PER_PAGE);

    if (!pageItems.length) {
      tableBody.innerHTML = '<tr class="a-empty-row"><td colspan="8">등록된 상품이 없습니다.</td></tr>';
    } else {
      tableBody.innerHTML = pageItems.map(function (it, idx) {
        return (
          "<tr>" +
          '<td><input type="checkbox" class="row-check" data-id="' + it.id + '"></td>' +
          "<td>" + (list.length - start - idx) + "</td>" +
          "<td>" + Admin.escapeHtml(CATEGORY_LABELS[it.category] || it.category) + "</td>" +
          '<td class="a-td-left">' + Admin.escapeHtml(it.title) + "</td>" +
          "<td>" + Admin.escapeHtml(it.region) + "</td>" +
          "<td>" + Admin.escapeHtml(it.price) + "원~</td>" +
          "<td>" + Admin.escapeHtml(it.createdAt) + "</td>" +
          "<td>" +
          '<a class="a-btn a-btn-sm" href="product-form.html?id=' + it.id + '">수정</a> ' +
          '<button type="button" class="a-btn a-btn-sm a-btn-danger del-btn" data-id="' + it.id + '">삭제</button>' +
          "</td>" +
          "</tr>"
        );
      }).join("");
    }

    Admin.renderPagination(pagination, totalPages, currentPage, function (p) {
      currentPage = p;
      render();
    });
  }

  document.getElementById("searchBtn").addEventListener("click", function () { currentPage = 1; render(); });
  keywordInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { currentPage = 1; render(); } });
  document.getElementById("resetBtn").addEventListener("click", function () {
    keywordInput.value = "";
    categorySelect.value = "";
    dateFromInput.value = "";
    dateToInput.value = "";
    currentPage = 1;
    render();
  });

  checkAll.addEventListener("change", function () {
    tableBody.querySelectorAll(".row-check").forEach(function (cb) { cb.checked = checkAll.checked; });
  });

  document.getElementById("bulkDeleteBtn").addEventListener("click", function () {
    var ids = Array.prototype.slice.call(tableBody.querySelectorAll(".row-check:checked")).map(function (cb) { return cb.dataset.id; });
    if (!ids.length) { alert("삭제할 상품을 선택해 주세요."); return; }
    if (!confirm(ids.length + "건을 삭제하시겠습니까?")) return;
    items = items.filter(function (it) { return ids.indexOf(it.id) === -1; });
    Admin.saveList(STORAGE_KEY, items);
    render();
  });

  tableBody.addEventListener("click", function (e) {
    var delBtn = e.target.closest(".del-btn");
    if (!delBtn) return;
    if (!confirm("이 상품을 삭제하시겠습니까?")) return;
    items = items.filter(function (p) { return p.id !== delBtn.dataset.id; });
    Admin.saveList(STORAGE_KEY, items);
    render();
  });

  render();
})();
