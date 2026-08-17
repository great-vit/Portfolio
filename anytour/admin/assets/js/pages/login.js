(function () {
  "use strict";
  var form = document.getElementById("loginForm");
  var error = document.getElementById("loginError");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = document.getElementById("loginId").value.trim();
    var pw = document.getElementById("loginPw").value.trim();
    if (!id || !pw) {
      error.classList.add("is-visible");
      return;
    }
    error.classList.remove("is-visible");
    window.location.href = "index.html";
  });
})();
