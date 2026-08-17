// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('mobile-nav');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Instant jump to #download (smooth-scroll crawls through the long pinned sections)
(function () {
  document.querySelectorAll('a[href$="#download"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById('download');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      history.pushState(null, '', '#download');
    });
  });
})();

// Header divider line: hidden at the very top, appears once scrolled
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function update() {
    header.classList.toggle('is-scrolled', window.scrollY > 4);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Scroll reveal
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
})();

// Scroll-pinned step-through (page pauses, only the caption/image change)
(function () {
  const pins = document.querySelectorAll('.pin-feature');
  if (!pins.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  function update() {
    pins.forEach((pin) => {
      const steps = parseInt(pin.dataset.steps, 10) || 1;
      const track = pin.querySelector('.pin-feature__track');
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      let progress = scrollable > 0 ? -rect.top / scrollable : 0;
      progress = Math.max(0, Math.min(1, progress));
      const step = Math.min(steps - 1, Math.floor(progress * steps));

      pin.style.setProperty('--scroll-progress', progress);

      pin.querySelectorAll('[data-i]').forEach((el) => {
        el.classList.toggle('is-active', Number(el.dataset.i) === step);
      });
    });
  }

  let lastRun = 0;
  window.addEventListener(
    'scroll',
    () => {
      const now = Date.now();
      if (now - lastRun < 16) return;
      lastRun = now;
      update();
    },
    { passive: true }
  );
  update();
})();
