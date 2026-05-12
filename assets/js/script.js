/* ============================================================
   FLORENCIA – script.js
   Všetok JavaScript pre celý projekt
   ============================================================ */

/* ── 1. NAVBAR – zmena štýlu pri scrollovaní ── */
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  function handleScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // spustiť hneď pri načítaní
})();


/* ── 2. DARK MODE – prepínanie tmavého režimu ── */
(function () {
  const btn = document.getElementById('darkModeToggle');
  if (!btn) return;

  // Načítaj uložené nastavenie
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    document.body.classList.add('dark-mode');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark-mode');
    btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
  });
})();


/* ── 3. FADE-IN ANIMÁCIA – sekcie sa zjavia pri scrollovaní ── */
(function () {
  // Pridaj triedu fade-in-section na všetky hlavné sekcie
  const sections = document.querySelectorAll(
    'main section, .custom-card, .contact-form-wrap, .contact-info-wrap'
  );

  sections.forEach(function (el) {
    el.classList.add('fade-in-section');
  });

  // Intersection Observer – spusti animáciu keď sekcia vstúpi do viewportu
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animuj iba raz
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ── 4. KONTAKTNÝ FORMULÁR – validácia a Toast ── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const toastEl = document.getElementById('successToast');

  // Zobraziť toast notifikáciu po úspešnom odoslaní
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Bootstrap validácia
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Simuluj odosielanie (loading stav)
    submitBtn.disabled = true;
    submitBtn.textContent = 'Odosielam…';

    setTimeout(function () {
      // Zobraziť Bootstrap Toast
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
        toast.show();
      }

      // Reset formulára
      form.reset();
      form.classList.remove('was-validated');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Odoslať správu';
    }, 1200);
  });

  // Live validácia – zvýrazni pole keď používateľ odíde z neho
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value.trim() !== '') {
        input.classList.add('touched');
      }
    });
  });
})();


/* ── 5. NAVBAR ACTIVE LINK – podľa aktuálnej stránky ── */
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    }
  });
})();


/* ── 6. CAROUSEL – automatické spustenie a pauza pri hover ── */
(function () {
  const carouselEl = document.getElementById('florenceCarousel');
  if (!carouselEl) return;

  const carousel = new bootstrap.Carousel(carouselEl, {
    interval: 5000,
    ride: 'carousel',
    wrap: true
  });

  // Pozastaviť pri hover
  carouselEl.addEventListener('mouseenter', function () { carousel.pause(); });
  carouselEl.addEventListener('mouseleave', function () { carousel.cycle(); });
})();


/* ── 7. SMOOTH SCROLL – pre kotviace odkazy ── */
(function () {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ── 8. POČÍTADLO SLOV v textarea (kontaktný formulár) ── */
(function () {
  const textarea = document.getElementById('sprava');
  if (!textarea) return;

  // Vytvor počítadlo znakov
  const counter = document.createElement('div');
  counter.style.cssText = 'font-size:0.8rem; color: var(--ink-light); text-align:right; margin-top:0.25rem;';
  counter.textContent = '0 znakov';
  textarea.parentNode.insertBefore(counter, textarea.nextSibling);

  textarea.addEventListener('input', function () {
    const count = textarea.value.length;
    counter.textContent = count + ' znakov';
    counter.style.color = count >= 10 ? 'var(--olive)' : 'var(--terra)';
  });
})();