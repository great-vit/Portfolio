(function () {
  "use strict";
  var admin = ADMINS_SEED[0]; // 데모: 현재 로그인한 관리자 계정 고정

  document.getElementById("fLoginId").value = admin.loginId;
  document.getElementById("fName").value = admin.name;
  document.getElementById("fPhone").value = admin.phone || "";
  document.getElementById("fEmail").value = admin.email;

  document.getElementById("adminEditForm").addEventListener("submit", function (e) {
    e.preventDefault();
    admin.loginId = document.getElementById("fLoginId").value.trim();
    admin.name = document.getElementById("fName").value.trim();
    admin.phone = document.getElementById("fPhone").value.trim();
    admin.email = document.getElementById("fEmail").value.trim();
    var pw = document.getElementById("fPw").value;
    if (pw) admin.password = pw;
    document.getElementById("fPw").value = "";
    alert("관리자 정보가 수정되었습니다.");
  });
})();
