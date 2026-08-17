(function () {
  "use strict";
  var items = NOTICES_SEED.slice();

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
      var okKw = !kw || it.title.toLowerCase().includes(kw) || it.content.toLowerCase().includes(kw);
      return okVis && okKw;
    });
    list.sort(function (a, b) {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return 0;
    });
    return list;
  }

  function render() {
    var list = getFiltered();
    resultCount.textContent = list.length;
    checkAll.checked = false;
    if (!list.length) {
      tableBody.innerHTML = '<tr class="a-empty-row"><td colspan="8">등록된 공지사항이 없습니다.</td></tr>';
      return;
    }
    tableBody.innerHTML = list.map(function (it, idx) {
      return (
        "<tr>" +
        '<td><input type="checkbox" class="row-check" data-id="' + it.id + '"></td>' +
        "<td>" + (list.length - idx) + "</td>" +
        '<td class="a-td-left">' + Admin.escapeHtml(it.title) + "</td>" +
        "<td>" + (it.pinned ? '<span class="a-status-pill a-status-wait">고정</span>' : "일반") + "</td>" +
        "<td>" + (it.visible ? '<span class="a-status-pill a-status-on">노출</span>' : '<span class="a-status-pill a-status-off">숨김</span>') + "</td>" +
        "<td>" + it.views + "</td>" +
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
    document.getElementById("noticeForm").reset();
    document.getElementById("noticeId").value = "";
    document.getElementById("noticeModalTitle").textContent = "공지사항 등록";
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
    if (!ids.length) { alert("삭제할 공지사항을 선택해 주세요."); return; }
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
      document.getElementById("noticeId").value = it.id;
      document.getElementById("fTitle").value = it.title;
      document.getElementById("fContent").value = it.content;
      document.getElementById("fPinned").checked = it.pinned;
      document.getElementById("fVisible").value = it.visible ? "1" : "0";
      document.getElementById("noticeModalTitle").textContent = "공지사항 수정";
      Admin.openModal("noticeModal");
    } else if (delBtn) {
      if (!confirm("이 공지사항을 삭제하시겠습니까?")) return;
      items = items.filter(function (p) { return p.id !== delBtn.dataset.id; });
      render();
    }
  });

  document.querySelector('[data-modal-open="noticeModal"]').addEventListener("click", resetForm);

  document.getElementById("noticeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var id = document.getElementById("noticeId").value;
    var data = {
      title: document.getElementById("fTitle").value.trim(),
      content: document.getElementById("fContent").value.trim(),
      pinned: document.getElementById("fPinned").checked,
      visible: document.getElementById("fVisible").value === "1"
    };
    if (id) {
      var it = items.find(function (p) { return p.id === id; });
      Object.assign(it, data);
    } else {
      data.id = Admin.uid("n");
      data.views = 0;
      data.createdAt = Admin.todayStr();
      items.unshift(data);
    }
    Admin.closeModal("noticeModal");
    render();
  });

  render();

  /* SB screenshots: ?modal=register / ?modal=edit auto-opens the modal */
  var sbModal = new URLSearchParams(location.search).get("modal");
  if (sbModal === "register") {
    resetForm();
    Admin.openModal("noticeModal");
  } else if (sbModal === "edit") {
    var sbEditBtn = document.querySelector(".edit-btn");
    if (sbEditBtn) sbEditBtn.click();
  }
})();
