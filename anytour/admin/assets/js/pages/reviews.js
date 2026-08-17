(function () {
  "use strict";
  var items = REVIEWS_SEED.slice();

  var tableBody = document.getElementById("tableBody");
  var resultCount = document.getElementById("resultCount");
  var checkAll = document.getElementById("checkAll");
  var keywordInput = document.getElementById("searchKeyword");
  var categorySelect = document.getElementById("searchCategory");
  var ratingSelect = document.getElementById("searchRating");

  function getFiltered() {
    var kw = keywordInput.value.trim().toLowerCase();
    var cat = categorySelect.value;
    var rating = ratingSelect.value;
    return items.filter(function (it) {
      var okCat = !cat || it.category === cat;
      var okRating = !rating || String(it.rating) === rating;
      var okKw = !kw || it.title.toLowerCase().includes(kw);
      return okCat && okRating && okKw;
    });
  }

  function render() {
    var list = getFiltered();
    resultCount.textContent = list.length;
    checkAll.checked = false;
    if (!list.length) {
      tableBody.innerHTML = '<tr class="a-empty-row"><td colspan="7">등록된 리뷰가 없습니다.</td></tr>';
      return;
    }
    tableBody.innerHTML = list.map(function (it, idx) {
      return (
        "<tr>" +
        '<td><input type="checkbox" class="row-check" data-id="' + it.id + '"></td>' +
        "<td>" + (list.length - idx) + "</td>" +
        "<td>★ " + it.rating + "</td>" +
        '<td class="a-td-left">' + Admin.escapeHtml(it.title) + "</td>" +
        "<td>" + Admin.escapeHtml(CATEGORY_LABELS[it.category] || it.category) + "</td>" +
        "<td>" + Admin.escapeHtml(it.createdAt) + "</td>" +
        '<td><button type="button" class="a-btn a-btn-sm view-btn" data-id="' + it.id + '">상세보기</button></td>' +
        "</tr>"
      );
    }).join("");
  }

  document.getElementById("searchBtn").addEventListener("click", render);
  keywordInput.addEventListener("keydown", function (e) { if (e.key === "Enter") render(); });
  document.getElementById("resetBtn").addEventListener("click", function () {
    keywordInput.value = "";
    categorySelect.value = "";
    ratingSelect.value = "";
    render();
  });

  checkAll.addEventListener("change", function () {
    tableBody.querySelectorAll(".row-check").forEach(function (cb) { cb.checked = checkAll.checked; });
  });

  document.getElementById("bulkDeleteBtn").addEventListener("click", function () {
    var ids = Array.prototype.slice.call(tableBody.querySelectorAll(".row-check:checked")).map(function (cb) { return cb.dataset.id; });
    if (!ids.length) { alert("삭제할 리뷰를 선택해 주세요."); return; }
    if (!confirm(ids.length + "건을 삭제하시겠습니까?")) return;
    items = items.filter(function (it) { return ids.indexOf(it.id) === -1; });
    render();
  });

  var vRating = document.getElementById("vRating");
  var vCategory = document.getElementById("vCategory");
  var vTitle = document.getElementById("vTitle");
  var vContent = document.getElementById("vContent");
  var editToggleBtn = document.getElementById("editToggleBtn");
  var saveBtn = document.getElementById("saveBtn");
  var currentItem = null;

  function setEditMode(on) {
    vRating.disabled = !on;
    vCategory.disabled = !on;
    vTitle.readOnly = !on;
    vContent.readOnly = !on;
    editToggleBtn.style.display = on ? "none" : "";
    saveBtn.style.display = on ? "" : "none";
  }

  tableBody.addEventListener("click", function (e) {
    var viewBtn = e.target.closest(".view-btn");
    if (!viewBtn) return;
    var it = items.find(function (p) { return p.id === viewBtn.dataset.id; });
    if (!it) return;
    currentItem = it;
    vRating.value = it.rating;
    vCategory.value = it.category;
    vTitle.value = it.title;
    vContent.value = it.content || "";
    document.getElementById("vCreatedAt").value = it.createdAt;
    document.getElementById("vPhoto").src = it.photo || "";
    setEditMode(false);
    Admin.openModal("reviewModal");
  });

  editToggleBtn.addEventListener("click", function () { setEditMode(true); });

  saveBtn.addEventListener("click", function () {
    if (!vTitle.value.trim() || !vContent.value.trim()) { alert("제목과 내용을 입력해 주세요."); return; }
    currentItem.rating = Number(vRating.value);
    currentItem.category = vCategory.value;
    currentItem.title = vTitle.value.trim();
    currentItem.content = vContent.value.trim();
    setEditMode(false);
    render();
  });

  render();

  /* SB screenshots: ?modal=detail auto-opens the first row's detail modal */
  if (new URLSearchParams(location.search).get("modal") === "detail") {
    var sbViewBtn = document.querySelector(".view-btn");
    if (sbViewBtn) sbViewBtn.click();
  }
})();
