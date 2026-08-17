(function () {
  "use strict";
  var items = FAQ_SEED.slice();

  var tableBody = document.getElementById("tableBody");
  var resultCount = document.getElementById("resultCount");
  var checkAll = document.getElementById("checkAll");
  var keywordInput = document.getElementById("searchKeyword");
  var visibleSelect = document.getElementById("searchVisible");

  function getFiltered() {
    var kw = keywordInput.value.trim().toLowerCase();
    var vis = visibleSelect.value;
    var list = items.filter(function (it) {
      var okVis = vis === "" || (vis === "1" ? it.visible : !it.visible);
      var okKw = !kw || it.question.toLowerCase().includes(kw) || it.answer.toLowerCase().includes(kw);
      return okVis && okKw;
    });
    list.sort(function (a, b) { return a.order - b.order; });
    return list;
  }

  function render() {
    var list = getFiltered();
    resultCount.textContent = list.length;
    checkAll.checked = false;
    if (!list.length) {
      tableBody.innerHTML = '<tr class="a-empty-row"><td colspan="7">등록된 FAQ가 없습니다.</td></tr>';
      return;
    }
    tableBody.innerHTML = list.map(function (it, idx) {
      return (
        "<tr>" +
        '<td><input type="checkbox" class="row-check" data-id="' + it.id + '"></td>' +
        "<td>" + (list.length - idx) + "</td>" +
        "<td>" + it.order + "</td>" +
        '<td class="a-td-left">' + Admin.escapeHtml(it.question) + "</td>" +
        "<td>" + (it.visible ? '<span class="a-status-pill a-status-on">노출</span>' : '<span class="a-status-pill a-status-off">숨김</span>') + "</td>" +
        "<td>" + Admin.escapeHtml(it.createdAt) + "</td>" +
        "<td>" +
        '<button type="button" class="a-btn a-btn-sm edit-btn" data-id="' + it.id + '">수정</button> ' +
        '<button type="button" class="a-btn a-btn-sm a-btn-danger del-btn" data-id="' + it.id + '">삭제</button>' +
        "</td>" +
        "</tr>"
      );
    }).join("");
  }

  function resetForm() {
    document.getElementById("faqForm").reset();
    document.getElementById("faqId").value = "";
    document.getElementById("fOrder").value = items.length + 1;
    document.getElementById("faqModalTitle").textContent = "FAQ 등록";
  }

  document.getElementById("searchBtn").addEventListener("click", render);
  keywordInput.addEventListener("keydown", function (e) { if (e.key === "Enter") render(); });
  document.getElementById("resetBtn").addEventListener("click", function () {
    keywordInput.value = "";
    visibleSelect.value = "";
    render();
  });

  checkAll.addEventListener("change", function () {
    tableBody.querySelectorAll(".row-check").forEach(function (cb) { cb.checked = checkAll.checked; });
  });

  document.getElementById("bulkDeleteBtn").addEventListener("click", function () {
    var ids = Array.prototype.slice.call(tableBody.querySelectorAll(".row-check:checked")).map(function (cb) { return cb.dataset.id; });
    if (!ids.length) { alert("삭제할 FAQ를 선택해 주세요."); return; }
    if (!confirm(ids.length + "건을 삭제하시겠습니까?")) return;
    items = items.filter(function (it) { return ids.indexOf(it.id) === -1; });
    render();
  });

  tableBody.addEventListener("click", function (e) {
    var editBtn = e.target.closest(".edit-btn");
    var delBtn = e.target.closest(".del-btn");
    if (editBtn) {
      var it = items.find(function (p) { return p.id === editBtn.dataset.id; });
      if (!it) return;
      document.getElementById("faqId").value = it.id;
      document.getElementById("fQuestion").value = it.question;
      document.getElementById("fAnswer").value = it.answer;
      document.getElementById("fOrder").value = it.order;
      document.getElementById("fVisible").value = it.visible ? "1" : "0";
      document.getElementById("faqModalTitle").textContent = "FAQ 수정";
      Admin.openModal("faqModal");
    } else if (delBtn) {
      if (!confirm("이 FAQ를 삭제하시겠습니까?")) return;
      items = items.filter(function (p) { return p.id !== delBtn.dataset.id; });
      render();
    }
  });

  document.querySelector('[data-modal-open="faqModal"]').addEventListener("click", resetForm);

  document.getElementById("faqForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var id = document.getElementById("faqId").value;
    var data = {
      question: document.getElementById("fQuestion").value.trim(),
      answer: document.getElementById("fAnswer").value.trim(),
      order: parseInt(document.getElementById("fOrder").value, 10) || 1,
      visible: document.getElementById("fVisible").value === "1"
    };
    if (id) {
      var it = items.find(function (p) { return p.id === id; });
      Object.assign(it, data);
    } else {
      data.id = Admin.uid("f");
      data.createdAt = Admin.todayStr();
      items.unshift(data);
    }
    Admin.closeModal("faqModal");
    render();
  });

  render();

  /* SB screenshots: ?modal=register / ?modal=edit auto-opens the modal */
  var sbModal = new URLSearchParams(location.search).get("modal");
  if (sbModal === "register") {
    resetForm();
    Admin.openModal("faqModal");
  } else if (sbModal === "edit") {
    var sbEditBtn = document.querySelector(".edit-btn");
    if (sbEditBtn) sbEditBtn.click();
  }
})();
