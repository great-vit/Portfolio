(function () {
  "use strict";
  var STORAGE_KEY = "admin_products_session";
  var items = Admin.getList(STORAGE_KEY, PRODUCTS_SEED);

  var id = new URLSearchParams(location.search).get("id");
  var editing = id ? items.find(function (p) { return p.id === id; }) : null;

  if (editing) {
    document.title = "상품 수정 | 애니투어 ADMIN";
    document.getElementById("formTitle").textContent = "상품 수정";
    document.getElementById("formModeLabel").textContent = "상품 수정";
    document.getElementById("submitBtn").textContent = "수정하기";
    document.getElementById("productId").value = editing.id;
    document.getElementById("fCategory").value = editing.category;
    document.getElementById("fTitle").value = editing.title;
    document.getElementById("fRegion").value = editing.region;
    document.getElementById("fPrice").value = editing.price;
    document.getElementById("fTags").value = editing.tags;
    document.getElementById("fDetail").value = editing.detail || "";
  }

  /* ---------------- 핵심 방문지 (이미지 + 텍스트 반복 입력) ---------------- */
  var destList = document.getElementById("destList");
  var destRows = (editing && editing.destinations && editing.destinations.length)
    ? editing.destinations.map(function (d) { return { desc: d.desc || "", name: d.name || "", photo: d.photo || "" }; })
    : [{ desc: "", name: "", photo: "" }];

  function renderDest() {
    destList.innerHTML = destRows.map(function (row, i) {
      return (
        '<div class="a-repeat-row" data-idx="' + i + '">' +
        '<input type="file" class="dest-photo" accept="image/*">' +
        '<input type="text" class="a-input dest-desc" placeholder="설명 (예: 반려동물 동반 가능 해변)" value="' + Admin.escapeHtml(row.desc) + '">' +
        '<input type="text" class="a-input dest-name" placeholder="장소명 (예: 협재해수욕장)" value="' + Admin.escapeHtml(row.name) + '">' +
        '<button type="button" class="a-btn a-btn-sm a-btn-danger remove-dest">삭제</button>' +
        "</div>"
      );
    }).join("");
  }

  function syncDestFromDom() {
    destList.querySelectorAll(".a-repeat-row").forEach(function (rowEl, i) {
      destRows[i].desc = rowEl.querySelector(".dest-desc").value;
      destRows[i].name = rowEl.querySelector(".dest-name").value;
      var file = rowEl.querySelector(".dest-photo").files[0];
      if (file) destRows[i].photo = file.name;
    });
  }

  destList.addEventListener("click", function (e) {
    var btn = e.target.closest(".remove-dest");
    if (!btn) return;
    syncDestFromDom();
    destRows.splice(parseInt(btn.closest(".a-repeat-row").dataset.idx, 10), 1);
    renderDest();
  });
  document.getElementById("addDestBtn").addEventListener("click", function () {
    syncDestFromDom();
    destRows.push({ desc: "", name: "", photo: "" });
    renderDest();
  });
  renderDest();

  /* ---------------- 일정 안내 (일차별 소제목 + 항목 반복 입력) ---------------- */
  var itineraryList = document.getElementById("itineraryList");
  var itineraryDays = (editing && editing.itinerary && editing.itinerary.length)
    ? editing.itinerary.map(function (d) { return { title: d.title || "", items: (d.items && d.items.length ? d.items.slice() : [""]) }; })
    : [{ title: "", items: [""] }];

  function renderItinerary() {
    itineraryList.innerHTML = itineraryDays.map(function (day, di) {
      var itemsHtml = day.items.map(function (item) {
        return (
          '<div class="a-itin-item-row">' +
          '<input type="text" class="a-input item-text" placeholder="일정 항목" value="' + Admin.escapeHtml(item) + '">' +
          '<button type="button" class="a-btn a-btn-sm a-btn-danger remove-item">삭제</button>' +
          "</div>"
        );
      }).join("");
      return (
        '<div class="a-itin-day" data-day-idx="' + di + '">' +
        '<div class="a-itin-day-head"><strong>' + (di + 1) + '일차</strong><button type="button" class="a-btn a-btn-sm a-btn-danger remove-day">일차 삭제</button></div>' +
        '<input type="text" class="a-input a-w-full day-title" placeholder="소제목 (예: 제주공항 도착 → 독채 펜션 체크인)" value="' + Admin.escapeHtml(day.title) + '">' +
        '<div class="day-items">' + itemsHtml + "</div>" +
        '<button type="button" class="a-btn a-btn-sm add-item">+ 항목 추가</button>' +
        "</div>"
      );
    }).join("");
  }

  function syncItineraryFromDom() {
    itineraryList.querySelectorAll(".a-itin-day").forEach(function (dayEl, di) {
      itineraryDays[di].title = dayEl.querySelector(".day-title").value;
      itineraryDays[di].items = Array.prototype.map.call(dayEl.querySelectorAll(".item-text"), function (input) { return input.value; });
    });
  }

  itineraryList.addEventListener("click", function (e) {
    var dayEl = e.target.closest(".a-itin-day");
    if (!dayEl) return;
    var di = parseInt(dayEl.dataset.dayIdx, 10);
    if (e.target.closest(".remove-day")) {
      syncItineraryFromDom();
      itineraryDays.splice(di, 1);
      renderItinerary();
    } else if (e.target.closest(".add-item")) {
      syncItineraryFromDom();
      itineraryDays[di].items.push("");
      renderItinerary();
    } else if (e.target.closest(".remove-item")) {
      syncItineraryFromDom();
      var itemIdx = Array.prototype.indexOf.call(dayEl.querySelectorAll(".item-text"), e.target.closest(".a-itin-item-row").querySelector(".item-text"));
      itineraryDays[di].items.splice(itemIdx, 1);
      renderItinerary();
    }
  });
  document.getElementById("addDayBtn").addEventListener("click", function () {
    syncItineraryFromDom();
    itineraryDays.push({ title: "", items: [""] });
    renderItinerary();
  });
  renderItinerary();

  document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();
    syncDestFromDom();
    syncItineraryFromDom();
    var data = {
      category: document.getElementById("fCategory").value,
      title: document.getElementById("fTitle").value.trim(),
      region: document.getElementById("fRegion").value.trim(),
      price: document.getElementById("fPrice").value.trim(),
      tags: document.getElementById("fTags").value.trim(),
      detail: document.getElementById("fDetail").value.trim(),
      destinations: destRows.filter(function (d) { return d.desc || d.name; }),
      itinerary: itineraryDays
        .map(function (d) { return { title: d.title, items: d.items.filter(function (t) { return t; }) }; })
        .filter(function (d) { return d.title || d.items.length; })
    };
    if (editing) {
      Object.assign(editing, data);
    } else {
      data.id = Admin.uid("p");
      data.createdAt = Admin.todayStr();
      items.unshift(data);
    }
    Admin.saveList(STORAGE_KEY, items);
    location.href = "products.html";
  });
})();
