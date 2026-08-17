var itineraryTabs = document.getElementById("itineraryTabs");
if (itineraryTabs) {
  var tabButtons = itineraryTabs.querySelectorAll("button");
  var panels = document.querySelectorAll(".itinerary-panel");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var day = btn.getAttribute("data-day");
      tabButtons.forEach(function (b) { b.classList.toggle("active", b === btn); });
      panels.forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-day") === day); });
    });
  });
}

var shareBtn = document.getElementById("detailShare");
if (shareBtn) {
  shareBtn.addEventListener("click", function () {
    var original = shareBtn.innerHTML;
    shareBtn.textContent = "링크가 복사되었습니다";
    setTimeout(function () { shareBtn.innerHTML = original; }, 1800);
  });
}
