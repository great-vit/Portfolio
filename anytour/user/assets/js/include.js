(function () {
  "use strict";

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  function markCurrentNavLink() {
    var current = location.pathname.split("/").pop() || "main.html";
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      if (link.getAttribute("href") === current) {
        link.classList.add("is-current");
      }
    });
  }

  var mounts = Array.prototype.slice.call(document.querySelectorAll("[data-include]"));

  Promise.all(
    mounts.map(function (el) {
      var name = el.getAttribute("data-include");
      return fetch("components/" + name + ".html")
        .then(function (res) { return res.text(); })
        .then(function (html) { el.outerHTML = html; });
    })
  )
    .then(function () {
      markCurrentNavLink();
      return loadScript("assets/js/common.js");
    })
    .then(function () {
      var pageScript = document.body.getAttribute("data-page-script");
      if (pageScript) return loadScript(pageScript);
    });
})();
