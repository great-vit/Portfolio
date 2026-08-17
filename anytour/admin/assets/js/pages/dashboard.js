(function () {
  "use strict";
  var stats = [
    { label: "전체 상품", value: PRODUCTS_SEED.length, unit: "건", href: "products.html" },
    { label: "공지사항", value: NOTICES_SEED.length, unit: "건", href: "notices.html" },
    { label: "FAQ", value: FAQ_SEED.length, unit: "건", href: "faq.html" },
    { label: "등록된 리뷰", value: REVIEWS_SEED.length, unit: "건", href: "reviews.html" },
    { label: "대기중 문의", value: INQUIRIES_SEED.filter(function (q) { return q.status === "대기"; }).length, unit: "건", href: "inquiries.html" }
  ];

  var grid = document.getElementById("statGrid");
  grid.innerHTML = stats.map(function (s) {
    return (
      '<a class="a-stat-card" href="' + s.href + '">' +
      '<div class="a-stat-label">' + s.label + "</div>" +
      '<div class="a-stat-value">' + s.value + " <small>" + s.unit + "</small></div>" +
      "</a>"
    );
  }).join("");
})();
