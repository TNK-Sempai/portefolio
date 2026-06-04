/* ═══════════════════════════════════════
   TANUKI CORPORATION — GSAP ANIMATIONS
   ═══════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─── HERO ENTRANCE (index.html uniquement) ─── */
const heroElements = document.querySelectorAll('[data-gsap="hero"]');
if (heroElements.length) {
  gsap.fromTo(heroElements,
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.3
    }
  );
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
  gsap.fromTo(el,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
        lazy: false,
        invalidateOnRefresh: true
      }
    }
  );
});

/* ─── FADE LEFT ─── */
document.querySelectorAll('[data-gsap="fade-left"]').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: -60 },
    {
      opacity: 1, x: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
        lazy: false,
        invalidateOnRefresh: true
      }
    }
  );
});

/* ─── FADE RIGHT ─── */
document.querySelectorAll('[data-gsap="fade-right"]').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, x: 60 },
    {
      opacity: 1, x: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
        lazy: false,
        invalidateOnRefresh: true
      }
    }
  );
});

/* ─── STAGGER CARDS ─── */
document.querySelectorAll('[data-gsap="stagger"]').forEach(container => {
  const children = container.children;
  gsap.fromTo(children,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
        lazy: false,
        invalidateOnRefresh: true
      }
    }
  );
});

/* ─── TITLE REVEAL (clip-path) ─── */
document.querySelectorAll('.section-title').forEach(title => {
  gsap.fromTo(title,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        toggleActions: 'play none none none',
        lazy: false,
        invalidateOnRefresh: true
      }
    }
  );
});

/* ─── SKILL BARS (skills page) ─── */
document.querySelectorAll('.skill-bar-fill').forEach(bar => {
  const width = bar.getAttribute('data-width') || '80%';
  bar.style.width = width;
  gsap.fromTo(bar,
    { width: 0 },
    {
      width: width,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        toggleActions: 'play none none none',
        lazy: false,
        invalidateOnRefresh: true
      }
    }
  );
});

/* ─── GOLDEN LINE DRAW (séparateurs) ─── */
document.querySelectorAll('.line-draw').forEach(line => {
  gsap.fromTo(line,
    { scaleX: 0 },
    {
      scaleX: 1,
      transformOrigin: 'left center',
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 92%',
        toggleActions: 'play none none none',
        lazy: false,
        invalidateOnRefresh: true
      }
    }
  );
});

/* ─── NAVBAR MOBILE TOGGLE ─── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    gsap.fromTo('.nav-links.open li',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
    );
  });
}

/* ─── PAGE TRANSITION ENTER ─── */
gsap.fromTo('body',
  { opacity: 0 },
  { opacity: 1, duration: 0.5, ease: 'power1.out' }
);

/* ─── CURSOR CUSTOM (pages principales) ─── */
const isTouchOnly = window.matchMedia('(pointer:coarse)').matches && !window.matchMedia('(pointer:fine)').matches;
if (!isTouchOnly) {
  const cursor = document.getElementById('cur');
  const cursorRing = document.getElementById('cur-ring');
  if (cursor && cursorRing) {
    document.addEventListener('mousemove', e => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorRing, { x: e.clientX, y: e.clientY, duration: 0.35 });
    });
  }
}

/* ─── FORCE RECALCUL POSITIONS ─── */
ScrollTrigger.refresh();
