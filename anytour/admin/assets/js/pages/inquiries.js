(function () {
  "use strict";
  var items = INQUIRIES_SEED.slice();

  var tableBody = document.getElementById("tableBody");
  var resultCount = document.getElementById("resultCount");
  var checkAll = document.getElementById("checkAll");
  var keywordInput = document.getElementById("searchKeyword");
  var statusSelect = document.getElementById("searchStatus");

  function getFiltered() {
    var kw = keywordInput.value.trim().toLowerCase();
    var status = statusSelect.value;
    return items.filter(function (it) {
      var okStatus = !status || it.status === status;
      var okKw = !kw || it.name.toLowerCase().includes(kw) || it.phone.includes(kw) || it.email.toLowerCase().includes(kw);
      return okStatus && okKw;
    });
  }

  function statusPillClass(status) {
    if (status === "완료") return "a-status-done";
    if (status === "처리중") return "a-status-progress";
    return "a-status-wait";
  }

  function render() {
    var list = getFiltered();
    resultCount.textContent = list.length;
    checkAll.checked = false;
    if (!list.length) {
      tableBody.innerHTML = '<tr class="a-empty-row"><td colspan="9">접수된 문의가 없습니다.</td></tr>';
      return;
    }
    tableBody.innerHTML = list.map(function (it, idx) {
      return (
        "<tr>" +
        '<td><input type="checkbox" class="row-check" data-id="' + it.id + '"></td>' +
        "<td>" + (list.length - idx) + "</td>" +
        "<td>" + Admin.escapeHtml(it.name) + "</td>" +
        "<td>" + Admin.escapeHtml(it.phone) + "</td>" +
        "<td>" + Admin.escapeHtml(it.type) + "</td>" +
        '<td class="a-td-left" style="max-width:280px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' + Admin.escapeHtml(it.message) + "</td>" +
        '<td><span class="a-status-pill ' + statusPillClass(it.status) + '">' + it.status + "</span></td>" +
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
    statusSelect.value = "";
    render();
  });

  checkAll.addEventListener("change", function () {
    tableBody.querySelectorAll(".row-check").forEach(function (cb) { cb.checked = checkAll.checked; });
  });

  document.getElementById("bulkDeleteBtn").addEventListener("click", function () {
    var ids = Array.prototype.slice.call(tableBody.querySelectorAll(".row-check:checked")).map(function (cb) { return cb.dataset.id; });
    if (!ids.length) { alert("삭제할 문의를 선택해 주세요."); return; }
    if (!confirm(ids.length + "건을 삭제하시겠습니까?")) return;
    items = items.filter(function (it) { return ids.indexOf(it.id) === -1; });
    render();
  });

  tableBody.addEventListener("click", function (e) {
    var viewBtn = e.target.closest(".view-btn");
    if (!viewBtn) return;
    var it = items.find(function (p) { return p.id === viewBtn.dataset.id; });
    if (!it) return;
    document.getElementById("inquiryId").value = it.id;
    document.getElementById("vName").value = it.name;
    document.getElementById("vPhone").value = it.phone;
    document.getElementById("vEmail").value = it.email;
    document.getElementById("vType").value = it.type;
    document.getElementById("vMessage").value = it.message;
    document.getElementById("fStatus").value = it.status;
    Admin.openModal("inquiryModal");
  });

  document.getElementById("inquiryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var id = document.getElementById("inquiryId").value;
    var it = items.find(function (p) { return p.id === id; });
    if (it) it.status = document.getElementById("fStatus").value;
    Admin.closeModal("inquiryModal");
    render();
  });

  render();
})();
