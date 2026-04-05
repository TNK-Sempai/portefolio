// ─── CURSOR ───
const cur = document.getElementById('cur'), ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function tick() {
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    rx += (mx - rx) * .11; ry += (my - ry) * .11;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
})();

// ─── NAV SCROLL ───
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

// ─── NAV ACTIVE PAGE ───
(function () {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
        if (a.dataset.page === page) a.classList.add('active');
    });
})();

// ─── REVEAL ON SCROLL ───
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const sibs = [...e.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        e.target.style.transitionDelay = (sibs.indexOf(e.target) * 0.09) + 's';
        e.target.classList.add('visible');
        io.unobserve(e.target);
    });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ─── SKILL BARS ───
const skillCats = document.querySelectorAll('.skill-cat');
if (skillCats.length) {
    const bio = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.bar-inner').forEach((b, i) => {
                setTimeout(() => { b.style.width = b.dataset.w + '%'; }, i * 80);
            });
            bio.unobserve(e.target);
        });
    }, { threshold: .25 });
    skillCats.forEach(c => bio.observe(c));
}

// ─── PROJECT STRIP ARROWS ───
const strip = document.getElementById('projStrip');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
if (strip && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => strip.scrollBy({ left: -460, behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => strip.scrollBy({ left: 460, behavior: 'smooth' }));
}
