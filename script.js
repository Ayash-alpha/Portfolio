/* ============================================================
   MOHAMED AYAS — PORTFOLIO SCRIPT
   Loader, theme toggle, nav, typing fx, counters, skill bars,
   portfolio filter + modal, testimonial slider, reveals,
   contact form validation, back-to-top.
   No external libraries.
   ============================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     0. UTILITIES
  --------------------------------------------------------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initThemeToggle();
    initCustomCursor();
    initNav();
    initSmoothAnchors();
    initTypingHero();
    initScrollReveals();
    initCounters();
    initSkillBars();
    initPortfolioFilter();
    initPortfolioModal();
    initTestimonialSlider();
    initContactForm();
    initBackToTop();
    $('#year') && ($('#year').textContent = new Date().getFullYear());
  });

  /* ---------------------------------------------------------
     1. LOADING SCREEN
  --------------------------------------------------------- */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    const hide = () => loader.classList.add('loaded');
    window.addEventListener('load', () => setTimeout(hide, 400));
    // Safety net in case 'load' is delayed by slow assets
    setTimeout(hide, 2500);
  }

  /* ---------------------------------------------------------
     2. DARK / LIGHT MODE TOGGLE
  --------------------------------------------------------- */
  function initThemeToggle() {
    const toggle = $('#themeToggle');
    const root = document.documentElement;
    const saved = localStorageGet('ayas-theme');

    if (saved === 'light') root.setAttribute('data-theme', 'light');

    toggle && toggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) {
        root.removeAttribute('data-theme');
        localStorageSet('ayas-theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorageSet('ayas-theme', 'light');
      }
    });
  }

  // Guarded localStorage helpers (works in normal browser context;
  // fails silently in sandboxed/private contexts rather than throwing)
  function localStorageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function localStorageSet(key, val) {
    try { window.localStorage.setItem(key, val); } catch (e) { /* no-op */ }
  }

  /* ---------------------------------------------------------
     3. CUSTOM CURSOR DOT (decorative, desktop only)
  --------------------------------------------------------- */
  function initCustomCursor() {
    const dot = $('#cursorDot');
    if (!dot || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    window.addEventListener('mousemove', (e) => {
      dot.style.opacity = '1';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    });

    $$('a, button, .portfolio-card, .skill-card').forEach((el) => {
      el.addEventListener('mouseenter', () => dot.style.transform = 'translate(-50%,-50%) scale(2.2)');
      el.addEventListener('mouseleave', () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
    });
  }

  /* ---------------------------------------------------------
     4. STICKY NAV + ACTIVE LINK + MOBILE BURGER
  --------------------------------------------------------- */
  function initNav() {
    const nav = $('#nav');
    const burger = $('#navBurger');
    const links = $('#navLinks');
    const navLinkEls = $$('.nav-link');
    const sections = $$('main section[id]');

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
      updateBackToTop();
      updateActiveLink();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    burger && burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navLinkEls.forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    function updateActiveLink() {
      let current = sections[0];
      const offset = 140;
      sections.forEach((sec) => {
        if (window.scrollY + offset >= sec.offsetTop) current = sec;
      });
      navLinkEls.forEach((link) => {
        link.classList.toggle('active-link', current && link.getAttribute('href') === '#' + current.id);
      });
    }
  }

  /* ---------------------------------------------------------
     5. SMOOTH SCROLL FOR ANCHOR LINKS (CSS handles most of it;
        this adds a header-offset correction)
  --------------------------------------------------------- */
  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 84;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---------------------------------------------------------
     6. TYPING ANIMATION (hero accent word cycles)
  --------------------------------------------------------- */
  function initTypingHero() {
    const el = $('.hero-title-accent');
    if (!el || prefersReducedMotion) return;

    const words = ['Growth', 'Strategy', 'Engagement', 'Revenue'];
    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = false;

    function tick() {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex++;
        if (charIndex > word.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 1) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, 400);
          return;
        }
      }
      el.textContent = word.slice(0, charIndex);
      setTimeout(tick, deleting ? 55 : 95);
    }
    setTimeout(tick, 2600); // let the page-load sequence settle first
  }

  /* ---------------------------------------------------------
     7. SCROLL REVEAL ANIMATIONS
  --------------------------------------------------------- */
  function initScrollReveals() {
    const targets = $$(
      '.section-head, .about-photo, .about-content, .skill-card, .service-card, ' +
      '.portfolio-card, .timeline-item, .contact-info, .contact-form, .achievement-card'
    );
    targets.forEach((el) => el.classList.add('reveal'));

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // simple stagger within a grid based on DOM order
          const delay = Math.min(Array.prototype.indexOf.call(entry.target.parentNode.children, entry.target), 6) * 70;
          setTimeout(() => entry.target.classList.add('in'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------
     8. ANIMATED COUNTERS (hero stats + achievements)
  --------------------------------------------------------- */
  function initCounters() {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (prefersReducedMotion) { el.textContent = target; return; }

      const duration = 1400;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      }
      requestAnimationFrame(frame);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach((c) => observer.observe(c));
  }

  /* ---------------------------------------------------------
     9. ANIMATED SKILL PERCENTAGE BARS
  --------------------------------------------------------- */
  function initSkillBars() {
    const bars = $$('.skill-bar-fill');
    if (!bars.length) return;

    const fill = (bar) => { bar.style.width = bar.getAttribute('data-width') + '%'; };

    if (!('IntersectionObserver' in window)) {
      bars.forEach(fill);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach((b) => observer.observe(b));
  }

  /* ---------------------------------------------------------
     10. PORTFOLIO FILTERING
  --------------------------------------------------------- */
  function initPortfolioFilter() {
    const buttons = $$('.filter-btn');
    const cards = $$('.portfolio-card');
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');
        cards.forEach((card) => {
          const match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('hide', !match);
        });
      });
    });
  }

  /* ---------------------------------------------------------
     11. PORTFOLIO PROJECT MODAL
  --------------------------------------------------------- */
  function initPortfolioModal() {
    const overlay = $('#modalOverlay');
    const closeBtn = $('#modalClose');
    const titleEl = $('#modalTitle');
    const descEl = $('#modalDesc');
    const tagEl = $('#modalTag');
    const tagsWrap = $('#modalTags');
    if (!overlay) return;

    $$('.portfolio-card').forEach((card) => {
      card.addEventListener('click', () => {
        titleEl.textContent = card.getAttribute('data-title') || '';
        descEl.innerHTML = card.getAttribute('data-desc') || '';
        const category = card.getAttribute('data-category') || '';
        tagEl.textContent = category.charAt(0).toUpperCase() + category.slice(1);

        tagsWrap.innerHTML = '';
        (card.getAttribute('data-tags') || '').split(',').forEach((tag) => {
          tag = tag.trim();
          if (!tag) return;
          const span = document.createElement('span');
          span.textContent = tag;
          tagsWrap.appendChild(span);
        });

        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const close = () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    closeBtn && closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ---------------------------------------------------------
     12. TESTIMONIAL SLIDER
  --------------------------------------------------------- */
  function initTestimonialSlider() {
    const track = $('#testimonialTrack');
    const dotsWrap = $('#testimonialDots');
    if (!track) return;

    const slides = $$('.testimonial-slide', track);
    let index = 0;
    let timer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = $$('button', dotsWrap);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
    }

    function next() { goTo(index + 1); }

    function startAuto() {
      if (prefersReducedMotion) return;
      stopAuto();
      timer = setInterval(next, 5500);
    }
    function stopAuto() { if (timer) clearInterval(timer); }

    const slider = $('.testimonial-slider');
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  /* ---------------------------------------------------------
     13. CONTACT FORM VALIDATION (client-side only — no backend)
  --------------------------------------------------------- */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;
    const successMsg = $('#formSuccess');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      $$('.form-field', form).forEach((field) => {
        const input = $('input, textarea', field);
        if (!input) return;
        let fieldValid = input.value.trim().length > 1;
        if (input.type === 'email') {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }
        field.classList.toggle('error', !fieldValid);
        if (!fieldValid) valid = false;
      });

      if (!valid) {
        successMsg.classList.remove('show');
        return;
      }

      successMsg.classList.add('show');
      form.reset();
      $$('.form-field', form).forEach((f) => f.classList.remove('error'));

      setTimeout(() => successMsg.classList.remove('show'), 6000);
    });

    // Clear error state as the user types
    $$('input, textarea', form).forEach((input) => {
      input.addEventListener('input', () => {
        const field = input.closest('.form-field');
        if (field) field.classList.remove('error');
      });
    });
  }

  /* ---------------------------------------------------------
     14. BACK TO TOP BUTTON
  --------------------------------------------------------- */
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  function updateBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;
    btn.classList.toggle('show', window.scrollY > 600);
  }

})();
