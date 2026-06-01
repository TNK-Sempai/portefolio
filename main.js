// ═══════════════════════════════════════════════════════
//  TANUKI SEMPAÏ — main.js  v3
//  Text scramble · Clip-path reveal
//  3D tilt cards · Count-up stats · Nav underline slide
//  (Cursor et nav-toggle gérés par animations.js / GSAP)
// ═══════════════════════════════════════════════════════

// ─── NAV SCROLL ───────────────────────────────────────
const nav = document.getElementById('navbar') || document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 60);
  });
}

// ─── NAV ACTIVE PAGE ──────────────────────────────────
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page], .nav-mobile a[data-page]')
    .forEach(a => { if (a.dataset.page === page) a.classList.add('active'); });
})();

// ─── NAV UNDERLINE SLIDE ──────────────────────────────
// Underline animée qui suit le lien survolé
(function () {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const underline = document.createElement('div');
  underline.style.cssText = `
    position:absolute; bottom:-4px; height:1px;
    background:#c8f060; transition:left .3s cubic-bezier(.25,.46,.45,.94),
    width .3s cubic-bezier(.25,.46,.45,.94); pointer-events:none; opacity:0;
  `;
  navLinks.style.position = 'relative';
  navLinks.appendChild(underline);

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', () => {
      const r  = a.getBoundingClientRect();
      const nr = navLinks.getBoundingClientRect();
      underline.style.left    = (r.left - nr.left) + 'px';
      underline.style.width   = r.width + 'px';
      underline.style.opacity = '1';
    });
  });
  navLinks.addEventListener('mouseleave', () => {
    underline.style.opacity = '0';
  });
})();

// ─── TEXT SCRAMBLE (hero title) ───────────────────────
// Lettres aléatoires qui se fixent une à une — effet terminal
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function scrambleText(el, finalText, duration = 900) {
  let frame = 0;
  const totalFrames = Math.round(duration / 16);
  const orig = finalText.split('');

  const tick = () => {
    const progress = frame / totalFrames;
    el.textContent = orig.map((ch, i) => {
      if (ch === ' ') return ' ';
      // Les premières lettres se fixent en premier
      if (i / orig.length < progress * 1.4) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    frame++;
    if (frame <= totalFrames) requestAnimationFrame(tick);
    else el.textContent = finalText;
  };
  tick();
}

// Applique le scramble sur .ht-accent dès que la page charge
window.addEventListener('load', () => {
  const accentEl = document.querySelector('.ht-accent');
  if (!accentEl) return;
  const final = accentEl.textContent.trim();
  // Attend la fin de l'animation CSS d'entrée (~1s) avant de scrambler
  setTimeout(() => scrambleText(accentEl, final, 1000), 1200);
});

// ─── CLIP-PATH REVEAL ─────────────────────────────────
// Les .section-h se démasquent de gauche à droite
// Ajoute une classe CSS qui est définie dynamiquement
const clipStyle = document.createElement('style');
clipStyle.textContent = `
  .clip-reveal {
    clip-path: inset(0 100% 0 0);
    transition: clip-path .9s cubic-bezier(.77,0,.18,1);
  }
  .clip-reveal.clip-visible {
    clip-path: inset(0 0% 0 0);
  }
`;
document.head.appendChild(clipStyle);

// ─── REVEAL ON SCROLL (unifié) ────────────────────────
// Gère .reveal (fade+translate) ET .section-h (clip-path)
const ioReveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;

    // Stagger sur les siblings .reveal
    if (e.target.classList.contains('reveal')) {
      const sibs = [...e.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      e.target.style.transitionDelay = (sibs.indexOf(e.target) * 0.09) + 's';
      e.target.classList.add('visible');
    }

    // Clip-path sur les titres de section
    if (e.target.classList.contains('clip-reveal')) {
      e.target.classList.add('clip-visible');
    }

    ioReveal.unobserve(e.target);
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach(el => ioReveal.observe(el));

// Applique clip-reveal aux section-h (sauf hero)
document.querySelectorAll('.section-h').forEach(el => {
  if (!el.closest('#hero')) {
    el.classList.add('clip-reveal');
    ioReveal.observe(el);
  }
});

// ─── SKILL BARS ───────────────────────────────────────
const skillCats = document.querySelectorAll('.skill-cat');
if (skillCats.length) {
  const bioBars = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.bar-inner').forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, i * 80);
      });
      bioBars.unobserve(e.target);
    });
  }, { threshold: .25 });
  skillCats.forEach(c => bioBars.observe(c));
}

// ─── COUNT-UP (stats about) ───────────────────────────
// Anime les chiffres .pstat-n au scroll
function countUp(el, target, duration = 1200) {
  const start = performance.now();
  // Garde le sup s'il existe
  const sup = el.querySelector('sup');
  const suffix = sup ? sup.outerHTML : '';

  const tick = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const val  = Math.round(ease * target);
    el.innerHTML = val + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const bioStats = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const numEl = e.target.querySelector('.pstat-n');
    if (!numEl) return;
    // Extrait le nombre (ignore le sup)
    const raw = numEl.childNodes[0]?.textContent?.replace(/\D/g, '');
    if (raw) countUp(numEl, parseInt(raw), 1400);
    bioStats.unobserve(e.target);
  });
}, { threshold: .5 });

document.querySelectorAll('.pstat').forEach(el => bioStats.observe(el));

// ─── 3D TILT CARDS ────────────────────────────────────
// Inclinaison perspective sur proj-card et widget-card au hover
const TILT_MAX = 8; // degrés max

function initTilt(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) / (r.width  / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = -dy * TILT_MAX;
      const ry =  dx * TILT_MAX;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      card.style.transition = 'transform .1s ease';
      // Déplace légèrement le thumb pour un effet parallax
      const thumb = card.querySelector('.proj-thumb img, .proj-thumb-bg');
      if (thumb) {
        thumb.style.transform = `translate(${dx * 6}px, ${dy * 6}px) scale(1.06)`;
        thumb.style.transition = 'transform .1s ease';
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform   = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition  = 'transform .5s cubic-bezier(.25,.46,.45,.94)';
      const thumb = card.querySelector('.proj-thumb img, .proj-thumb-bg');
      if (thumb) {
        thumb.style.transform  = '';
        thumb.style.transition = 'transform .5s ease';
      }
    });
  });
}

initTilt('.proj-card');
initTilt('.widget-card');

// ─── PROJECT STRIP ARROWS ─────────────────────────────
const strip   = document.getElementById('projStrip');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
if (strip && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => strip.scrollBy({ left: -460, behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => strip.scrollBy({ left:  460, behavior: 'smooth' }));
}

// ─── MAGNETIC BUTTONS (CTA) ───────────────────────────
// Les boutons CTA attirent légèrement le curseur — effet magnétique subtil
document.querySelectorAll('.nav-cta, .hero-cta-link, .c-btn.primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) * .18;
    const dy = (e.clientY - cy) * .18;
    btn.style.transform   = `translate(${dx}px, ${dy}px)`;
    btn.style.transition  = 'transform .15s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform  = 'translate(0,0)';
    btn.style.transition = 'transform .4s cubic-bezier(.25,.46,.45,.94)';
  });
});

// ─── MARQUEE PAUSE ON HOVER ───────────────────────────
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const marqueeWrap = marqueeTrack.parentElement;
  marqueeWrap.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeWrap.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}
