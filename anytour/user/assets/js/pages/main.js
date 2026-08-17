var timeDealChips = document.getElementById('timeDealChips');
var timeDealGrid = document.getElementById('timeDealGrid');
if (timeDealChips && timeDealGrid) {
  var timeDealCards = timeDealGrid.querySelectorAll('.product-card');

  function filterTimeDealCards(tag) {
    timeDealCards.forEach(function (card) {
      var cardTags = (card.dataset.tags || '').split(',');
      card.style.display = cardTags.indexOf(tag) !== -1 ? '' : 'none';
    });
  }

  timeDealChips.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      timeDealChips.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      filterTimeDealCards(chip.dataset.tag);
    });
  });

  var initialChip = timeDealChips.querySelector('.chip.active');
  if (initialChip) filterTimeDealCards(initialChip.dataset.tag);
}

var heroSlider = document.getElementById('heroSlider');
if (heroSlider) {
  var heroSlides = heroSlider.querySelectorAll('.hero-slide');
  var heroCurrent = document.getElementById('heroCurrent');
  var heroIndex = 0;
  var heroTimer;

  function showHeroSlide(i) {
    heroIndex = (i + heroSlides.length) % heroSlides.length;
    heroSlides.forEach(function (s, idx) { s.classList.toggle('is-active', idx === heroIndex); });
    if (heroCurrent) heroCurrent.textContent = heroIndex + 1;
  }

  function resetHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(function () { showHeroSlide(heroIndex + 1); }, 6000);
  }

  document.getElementById('heroPrev').addEventListener('click', function () { showHeroSlide(heroIndex - 1); resetHeroTimer(); });
  document.getElementById('heroNext').addEventListener('click', function () { showHeroSlide(heroIndex + 1); resetHeroTimer(); });
  resetHeroTimer();
}
