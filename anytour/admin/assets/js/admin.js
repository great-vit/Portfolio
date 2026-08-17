(function (global) {
  "use strict";

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function uid(prefix) {
    return (prefix || "id") + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function todayStr() {
    var d = new Date();
    function pad(n) { return String(n).padStart(2, "0"); }
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  /* ---- Generic modal open/close: any element with [data-modal-open="modalId"] /
     [data-modal-close] inside .a-modal-overlay#modalId ---- */
  function initModals() {
    document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-modal-open");
        var overlay = document.getElementById(id);
        if (overlay) overlay.classList.add("is-open");
      });
    });
    document.querySelectorAll(".a-modal-overlay").forEach(function (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target.hasAttribute("data-modal-close")) {
          overlay.classList.remove("is-open");
        }
      });
    });
  }

  function openModal(id) {
    var overlay = document.getElementById(id);
    if (overlay) overlay.classList.add("is-open");
  }

  function closeModal(id) {
    var overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove("is-open");
  }

  /* ---- Session-scoped list storage: lets a register/edit page (separate
     navigation) hand data back to a list page without a real backend.
     Falls back to the static seed array; cleared when the tab closes. ---- */
  function getList(key, seed) {
    try {
      var raw = sessionStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return seed.slice();
  }

  function saveList(key, list) {
    try { sessionStorage.setItem(key, JSON.stringify(list)); } catch (e) {}
  }

  function renderPagination(container, totalPages, currentPage, onChange) {
    if (!container) return;
    if (totalPages <= 1) { container.innerHTML = ""; return; }
    var html = '<button type="button" data-page="prev"' + (currentPage === 1 ? " disabled" : "") + ">‹</button>";
    for (var p = 1; p <= totalPages; p++) {
      html += '<button type="button" class="' + (p === currentPage ? "is-active" : "") + '" data-page="' + p + '">' + p + "</button>";
    }
    html += '<button type="button" data-page="next"' + (currentPage === totalPages ? " disabled" : "") + ">›</button>";
    container.innerHTML = html;
    container.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.dataset.page;
        onChange(val === "prev" ? currentPage - 1 : val === "next" ? currentPage + 1 : parseInt(val, 10));
      });
    });
  }

  function initLogout() {
    var link = document.getElementById("logoutLink");
    if (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "login.html";
      });
    }
  }

  /* admin.js loads dynamically after the header fetch completes, so
     DOMContentLoaded has already fired by the time this runs -- call
     directly instead of waiting on an event that already happened. */
  initModals();
  initLogout();

  global.Admin = {
    escapeHtml: escapeHtml,
    uid: uid,
    todayStr: todayStr,
    openModal: openModal,
    closeModal: closeModal,
    initModals: initModals,
    getList: getList,
    saveList: saveList,
    renderPagination: renderPagination
  };
})(window);
