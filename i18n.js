// ═══════════════════════════════════════════════════
//  TANUKI CORP — i18n.js
//  i18next vanilla · FR / EN · localStorage
//  Usage : ajouter data-i18n="clé.sous_clé" sur
//  n'importe quel élément HTML
// ═══════════════════════════════════════════════════

// ─── CONFIG ─────────────────────────────────────────
const I18N_DEFAULT_LANG = 'fr';
const I18N_SUPPORTED    = ['fr', 'en'];
const I18N_LOCALES_PATH = '/locales'; // chemin vers fr.json / en.json

// ─── ÉTAT ───────────────────────────────────────────
let currentLang = localStorage.getItem('tnk-lang') || I18N_DEFAULT_LANG;
let translations = {};

// ─── CHARGEMENT JSON ────────────────────────────────
async function loadTranslations(lang) {
  if (!I18N_SUPPORTED.includes(lang)) lang = I18N_DEFAULT_LANG;
  try {
    const res  = await fetch(`${I18N_LOCALES_PATH}/${lang}.json`);
    const data = await res.json();
    translations = data;
    currentLang  = lang;
    localStorage.setItem('tnk-lang', lang);
    document.documentElement.lang = lang;
  } catch (e) {
    console.warn(`[i18n] Impossible de charger ${lang}.json`, e);
  }
}

// ─── RÉSOLUTION DE CLÉ ──────────────────────────────
// Supporte les clés imbriquées : "about.timeline.chessbot_title"
function t(key) {
  const parts  = key.split('.');
  let   result = translations;
  for (const part of parts) {
    if (result && typeof result === 'object' && part in result) {
      result = result[part];
    } else {
      console.warn(`[i18n] Clé introuvable : "${key}"`);
      return key; // retourne la clé brute si manquante
    }
  }
  return result;
}

// ─── APPLICATION DOM ────────────────────────────────
// Parcourt tous les éléments [data-i18n] et remplace le contenu
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key   = el.getAttribute('data-i18n');
    const value = t(key);
    if (typeof value !== 'string') return;

    // data-i18n-html="true" → innerHTML (pour les balises <em>, <strong>)
    if (el.getAttribute('data-i18n-html') === 'true') {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  // Attributs : placeholder, aria-label, title, alt
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
  });

  // Met à jour l'UI du sélecteur
  updateLangSwitcher();
}

// ─── SWITCH DE LANGUE ───────────────────────────────
async function switchLang(lang) {
  if (lang === currentLang) return;
  await loadTranslations(lang);
  applyTranslations();
}

// ─── SÉLECTEUR UI ───────────────────────────────────
// Injecte automatiquement un switcher FR / EN dans la nav
function injectLangSwitcher() {
  // Évite la double injection
  if (document.getElementById('lang-switcher')) return;

  const switcher = document.createElement('div');
  switcher.id = 'lang-switcher';
  switcher.style.cssText = `
    display: flex;
    align-items: center;
    gap: .4rem;
    margin-left: 1.5rem;
  `;

  I18N_SUPPORTED.forEach(lang => {
    const btn = document.createElement('button');
    btn.textContent    = lang.toUpperCase();
    btn.dataset.lang   = lang;
    btn.className      = 'lang-btn';
    btn.style.cssText  = `
      font-family: 'DM Mono', monospace;
      font-size: .62rem;
      letter-spacing: .16em;
      text-transform: uppercase;
      background: transparent;
      border: 1px solid rgba(255,255,255,.1);
      color: var(--muted);
      padding: .25rem .6rem;
      border-radius: 2px;
      cursor: pointer;
      transition: all .2s;
    `;
    btn.addEventListener('click', () => switchLang(lang));
    btn.addEventListener('mouseenter', () => {
      if (btn.dataset.lang !== currentLang) {
        btn.style.borderColor = 'rgba(200,240,96,.35)';
        btn.style.color       = 'var(--accent)';
      }
    });
    btn.addEventListener('mouseleave', () => {
      updateLangSwitcher();
    });
    switcher.appendChild(btn);
  });

  // Injecte dans .nav-container avant le bouton toggle
  const navContainer = document.querySelector('.nav-container');
  const toggle       = document.getElementById('navToggle');
  if (navContainer && toggle) {
    navContainer.insertBefore(switcher, toggle);
  }
}

function updateLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === currentLang;
    btn.style.borderColor = isActive
      ? 'rgba(200,240,96,.4)'
      : 'rgba(255,255,255,.1)';
    btn.style.color = isActive ? 'var(--accent)' : 'var(--muted)';
  });
}

// ─── INIT ────────────────────────────────────────────
// Détecte la langue du navigateur si pas de préférence sauvegardée
function detectBrowserLang() {
  if (localStorage.getItem('tnk-lang')) return;
  const browserLang = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  if (I18N_SUPPORTED.includes(browserLang)) currentLang = browserLang;
}

async function initI18n() {
  detectBrowserLang();
  await loadTranslations(currentLang);
  injectLangSwitcher();
  applyTranslations();
}

// Lance l'init dès que le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}

// Export pour usage manuel dans d'autres scripts
window.i18n = { t, switchLang, currentLang: () => currentLang };