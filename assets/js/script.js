/* ══════════════════════════════════════════
   FLORENCIA — script.js
   ══════════════════════════════════════════ */

/* ── Custom Cursor ── */
const dot  = document.querySelector('.cur-dot');
const ring = document.querySelector('.cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function trackCursor() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(trackCursor);
})();

document.querySelectorAll('a, button, .g-card, .tip-card, .stat-cell, .btn-primary, .btn-ghost').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ── Hero cinematic open ── */
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  if (hero) setTimeout(() => hero.classList.add('open'), 100);
});

/* ── Nav on scroll ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('up'), i * 90);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ── Hero parallax ── */
const heroBg = document.querySelector('.hero-bg img');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const y = window.scrollY;
  heroBg.style.transform = `scale(1) translateY(${y * 0.3}px)`;
});

/* ── Draggable gallery ── */
const galleryWrap = document.querySelector('.gallery-scroll-wrap');
if (galleryWrap) {
  let isDown = false, startX = 0, scrollLeft = 0;

  galleryWrap.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - galleryWrap.offsetLeft;
    scrollLeft = galleryWrap.scrollLeft;
  });
  galleryWrap.addEventListener('mouseleave', () => isDown = false);
  galleryWrap.addEventListener('mouseup', () => isDown = false);
  galleryWrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - galleryWrap.offsetLeft;
    const walk = (x - startX) * 1.8;
    galleryWrap.scrollLeft = scrollLeft - walk;
  });

  /* touch */
  let touchStartX = 0, touchScrollLeft = 0;
  galleryWrap.addEventListener('touchstart', e => {
    touchStartX     = e.touches[0].pageX;
    touchScrollLeft = galleryWrap.scrollLeft;
  });
  galleryWrap.addEventListener('touchmove', e => {
    const dx = touchStartX - e.touches[0].pageX;
    galleryWrap.scrollLeft = touchScrollLeft + dx;
  });
}

/* ── Animated stat counters ── */
const statNums = document.querySelectorAll('.stat-number');
const statObs  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.val || el.textContent.replace(/[^\d.]/g, '');
      const end = parseFloat(raw);
      const isFloat = raw.includes('.');
      const suffix  = el.dataset.suffix || '';
      let start = 0, dur = 1800, step = 16;
      const steps = dur / step;
      const inc = end / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += inc;
        if (current >= end) { current = end; clearInterval(timer); }
        el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      }, step);
      statObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => {
  const raw = el.textContent.trim();
  el.dataset.val = raw.replace(/[^\d.]/g, '');
  el.dataset.suffix = raw.replace(/[\d.]/g, '');
  statObs.observe(el);
});