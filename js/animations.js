/* ═══════════════════════════════════════
   TANUKI CORPORATION — GSAP ANIMATIONS
   ═══════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─── HERO ENTRANCE (index.html uniquement) ─── */
const heroElements = document.querySelectorAll('[data-gsap="hero"]');
if (heroElements.length) {
  gsap.from(heroElements, {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.3
  });
}

/* ─── NAVBAR SCROLL EFFECT ─── */
const navbar = document.getElementById('navbar');
if (navbar) {
  ScrollTrigger.create({
    start: 'top -80',
    lazy: false,
    invalidateOnRefresh: true,
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled')
  });
}

/* ─── FADE UP ON SCROLL ─── */
document.querySelectorAll('[data-gsap="fade-up"]').forEach(el => {
  gsap.from(el, {
    immediateRender: false,
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none',
      lazy: false,
      invalidateOnRefresh: true
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out'
  });
});

/* ─── FADE LEFT ─── */
document.querySelectorAll('[data-gsap="fade-left"]').forEach(el => {
  gsap.from(el, {
    immediateRender: false,
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none',
      lazy: false,
      invalidateOnRefresh: true
    },
    x: -60,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out'
  });
});

/* ─── FADE RIGHT ─── */
document.querySelectorAll('[data-gsap="fade-right"]').forEach(el => {
  gsap.from(el, {
    immediateRender: false,
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none',
      lazy: false,
      invalidateOnRefresh: true
    },
    x: 60,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out'
  });
});

/* ─── STAGGER CARDS ─── */
document.querySelectorAll('[data-gsap="stagger"]').forEach(container => {
  const children = container.children;
  gsap.from(children, {
    immediateRender: false,
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      toggleActions: 'play none none none',
      lazy: false,
      invalidateOnRefresh: true
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out'
  });
});

/* ─── TITLE REVEAL (clip-path) ─── */
document.querySelectorAll('.section-title').forEach(title => {
  gsap.from(title, {
    immediateRender: false,
    scrollTrigger: {
      trigger: title,
      start: 'top 90%',
      toggleActions: 'play none none none',
      lazy: false,
      invalidateOnRefresh: true
    },
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.1,
    ease: 'power4.out'
  });
});

/* ─── SKILL BARS (skills page) ─── */
document.querySelectorAll('.skill-bar-fill').forEach(bar => {
  const width = bar.getAttribute('data-width') || '80%';
  gsap.from(bar, {
    immediateRender: false,
    scrollTrigger: {
      trigger: bar,
      start: 'top 90%',
      toggleActions: 'play none none none',
      lazy: false,
      invalidateOnRefresh: true
    },
    width: 0,
    duration: 1.2,
    ease: 'power3.out'
  });
  bar.style.width = width;
});

/* ─── GOLDEN LINE DRAW (séparateurs) ─── */
document.querySelectorAll('.line-draw').forEach(line => {
  gsap.from(line, {
    immediateRender: false,
    scrollTrigger: {
      trigger: line,
      start: 'top 92%',
      toggleActions: 'play none none none',
      lazy: false,
      invalidateOnRefresh: true
    },
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 1.0,
    ease: 'power3.out'
  });
});

/* ─── NAVBAR MOBILE TOGGLE ─── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    gsap.from('.nav-links.open li', {
      x: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out'
    });
  });
}

/* ─── PAGE TRANSITION ENTER ─── */
gsap.from('body', {
  opacity: 0,
  duration: 0.5,
  ease: 'power1.out'
});

/* ─── CURSOR CUSTOM (pages principales) ─── */
const cursor = document.getElementById('cur');
const cursorRing = document.getElementById('cur-ring');
if (cursor && cursorRing) {
  document.addEventListener('mousemove', e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(cursorRing, { x: e.clientX, y: e.clientY, duration: 0.35 });
  });
}

/* ─── FORCE RECALCUL POSITIONS ─── */
ScrollTrigger.refresh();
