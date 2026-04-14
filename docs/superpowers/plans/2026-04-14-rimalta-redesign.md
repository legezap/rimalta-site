# Rimalta Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full rebuild of the Rimalta site (8 existing pages + 1 new) to Bold Modern dark aesthetic — high-contrast, Awwwards 2025 quality, mobile-first, commercial hierarchy preserved.

**Architecture:** Static HTML/CSS/JS — no build tool, no framework. Shared nav/footer injected by `buildHeader()` / `buildFooter()` in `scripts/site.js`. GSAP + ScrollTrigger (CDN) for scroll animations; Alpine.js (CDN) for interactive state on `compare.html`.

**Tech Stack:** HTML5 · CSS custom properties · Vanilla JS · GSAP 3 (CDN) · ScrollTrigger (CDN) · Alpine.js 3 (CDN) · Google Fonts (Bodoni Moda + Manrope)

---

## Execution Rules (enforced across every task)

1. **Mobile first-class** — every layout starts at mobile, extends up. No `display:none` on mobile for primary content.
2. **Commercial hierarchy** — Owners → Investors/Buyers → Project inquiries → Rental. Nav order, CTA order, section order must reflect this.
3. **Clarity over beauty** — if a design choice weakens CTA visibility, routing, or trust signals, it loses.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `styles/site.css` | Full replacement | All design tokens, base, layout, components, page-specific |
| `scripts/site.js` | Partial rebuild | Nav injection, mobile menu, nav scroll behaviour, GSAP init |
| `index.html` | Full rebuild | Homepage: hero, paths, projects, brief form, footer |
| `compare.html` | NEW | Profile toggle (Alpine.js), comparison table, brief form |
| `owners.html` | Full rebuild | Owner services page |
| `invest.html` | Full rebuild | Investment page |
| `projects.html` | Full rebuild | Projects overview grid |
| `projects/skai.html` | Full rebuild | SKAI detail page |
| `projects/nura.html` | Full rebuild | Nura detail page |
| `lease.html` | Full rebuild | Lease page |
| `about.html` | Full rebuild | About page |

---

## Task 1: CSS Foundation — Design Tokens + Base Styles

**Files:**
- Replace: `styles/site.css`

- [ ] **Step 1: Write the new CSS file — tokens through base**

Replace the entire `styles/site.css` with:

```css
/* ─────────────────────────────────────────────
   RIMALTA SITE — site.css
   Bold Modern / Awwwards 2025
   Mobile-first. No legacy tokens.
   ───────────────────────────────────────────── */

@import url("https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,ital,wght@6..96,0,400;6..96,0,900;6..96,1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap");

/* ── TOKENS ── */
:root {
  --void:        #0d0d0d;
  --surface:     #141414;
  --elevated:    #1e1e1e;
  --amber:       #E8C547;
  --white:       #ffffff;
  --white-50:    rgba(255,255,255,0.5);
  --white-12:    rgba(255,255,255,0.12);
  --white-06:    rgba(255,255,255,0.06);

  --container:   1200px;
  --gutter:      24px;
  --header-h:    72px;

  /* Typography scale */
  --display-size: clamp(60px, 10vw, 120px);
  --headline-size: clamp(32px, 5vw, 56px);
  --section-title-size: clamp(22px, 3vw, 34px);
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Manrope', sans-serif;
  background: var(--void);
  color: var(--white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body.menu-open { overflow: hidden; }

img { display: block; max-width: 100%; }

a { color: inherit; text-decoration: none; }

button, input, select, textarea { font: inherit; }

button { cursor: pointer; border: none; background: none; }

/* ── LAYOUT ── */
.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

/* ── TYPOGRAPHY UTILITIES ── */
.display {
  font-family: 'Bodoni Moda', serif;
  font-size: var(--display-size);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -4px;
  color: var(--white);
}

.display em {
  font-style: italic;
  color: rgba(255,255,255,0.35);
}

.headline {
  font-family: 'Manrope', sans-serif;
  font-size: var(--headline-size);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -1.5px;
  color: var(--white);
}

.section-title {
  font-family: 'Manrope', sans-serif;
  font-size: var(--section-title-size);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.5px;
  color: var(--white);
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--amber);
}

.eyebrow::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 1px;
  background: var(--amber);
  flex-shrink: 0;
}

.body-copy {
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 400;
  line-height: 1.75;
  color: var(--white-50);
}

/* ── BUTTONS ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Manrope', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 14px 28px;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.btn:hover { opacity: 0.85; }

.btn-primary {
  background: var(--amber);
  color: var(--void);
}

.btn-ghost-white {
  border: 1px solid rgba(255,255,255,0.25);
  color: var(--white);
}

.btn-ghost-amber {
  border: 1px solid var(--amber);
  color: var(--amber);
}

/* ── STAT CARD ── */
.stat-card {
  background: rgba(13,13,13,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--white-12);
  border-left: 2px solid var(--amber);
  padding: 14px 18px;
}

.stat-value {
  font-family: 'Manrope', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: var(--white);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

/* ── STATUS PILL ── */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(232,197,71,0.12);
  border: 1px solid rgba(232,197,71,0.35);
  color: var(--amber);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 12px;
}

/* ── SECTION WRAPPER ── */
.section {
  padding: 80px 0;
  border-top: 1px solid var(--white-06);
}

@media (min-width: 768px) {
  .section { padding: 120px 0; }
}

/* ── NAV ── */
.site-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--header-h);
  display: flex;
  align-items: center;
  transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
  border-bottom: 1px solid transparent;
}

.site-nav.is-scrolled {
  background: rgba(13,13,13,0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: var(--white-06);
}

.nav-inner {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.nav-logo {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--white);
  flex-shrink: 0;
}

.nav-links {
  display: none;
  gap: 32px;
  align-items: center;
}

@media (min-width: 768px) {
  .nav-links { display: flex; }
}

.nav-link {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.is-active { color: var(--white); }

.nav-cta {
  flex-shrink: 0;
}

/* Hamburger (mobile) */
.nav-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  padding: 4px;
}

@media (min-width: 768px) {
  .nav-hamburger { display: none; }
}

.nav-hamburger span {
  display: block;
  width: 100%;
  height: 1px;
  background: var(--white);
  transition: transform 0.25s, opacity 0.25s;
}

body.menu-open .nav-hamburger span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
body.menu-open .nav-hamburger span:nth-child(2) { opacity: 0; }
body.menu-open .nav-hamburger span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* Mobile full-screen overlay */
.nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: var(--void);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: calc(var(--header-h) + 48px) var(--gutter) 48px;
  gap: 32px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
}

body.menu-open .nav-overlay {
  opacity: 1;
  pointer-events: auto;
}

.nav-overlay .nav-link {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-transform: none;
  color: var(--white);
  opacity: 0.7;
  transition: opacity 0.2s;
}

.nav-overlay .nav-link:hover { opacity: 1; }

/* ── FOOTER ── */
.site-footer {
  border-top: 1px solid var(--white-06);
  padding: 48px 0;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

@media (min-width: 768px) {
  .footer-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.footer-logo {
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--white);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-link {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  transition: color 0.2s;
}

.footer-link:hover { color: var(--white); }

.footer-meta {
  font-size: 10px;
  color: rgba(255,255,255,0.2);
  letter-spacing: 1px;
}

/* ── BRIEF FORM ── */
.brief-section {
  padding: 80px 0;
  border-top: 1px solid var(--white-06);
}

@media (min-width: 768px) {
  .brief-section { padding: 120px 0; }
}

.brief-grid {
  display: grid;
  gap: 48px;
}

@media (min-width: 768px) {
  .brief-grid { grid-template-columns: 1fr 1fr; align-items: start; }
}

.brief-trust {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.trust-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.trust-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--amber);
  margin-top: 7px;
  flex-shrink: 0;
}

.trust-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--white-50);
  line-height: 1.6;
}

.brief-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}

.form-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  color: var(--white);
  font-size: 15px;
  padding: 10px 0;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus { border-bottom-color: var(--amber); }

.form-select {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  color: var(--white);
  font-size: 15px;
  padding: 10px 0;
  outline: none;
  appearance: none;
  cursor: pointer;
}

.form-select option { background: var(--surface); }

/* ── SCROLL-REVEAL (JS adds .is-visible) ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── PAGE OFFSET FOR FIXED NAV ── */
.page-start { padding-top: var(--header-h); }
```

- [ ] **Step 2: Open browser to verify tokens render**

Open `index.html` in browser. Page should be solid dark background (`#0d0d0d`). No amber or design content yet — that comes with the JS + HTML rebuild. Confirm no CSS parse errors in DevTools console.

- [ ] **Step 3: Commit**

```bash
git add styles/site.css
git commit -m "feat: replace site.css with Bold Modern dark design tokens and base styles"
```

---

## Task 2: JS Rebuild — Nav Injection + Scroll Behaviour + GSAP Init

**Files:**
- Modify: `scripts/site.js` (full replacement of content, preserve SITE_CONFIG pattern)

- [ ] **Step 1: Replace site.js**

```javascript
/* ─────────────────────────────────────────────
   RIMALTA SITE — site.js
   Nav injection · Mobile menu · Scroll nav · GSAP init
   ───────────────────────────────────────────── */

const SITE_CONFIG = {
  advisoryEmail: "hello@rimalta.ae",
};

function getRootPath() {
  const depth = Number(document.body.dataset.depth || "0");
  return depth > 0 ? ".." : ".";
}

// ── NAV ORDER: Owners first (commercial hierarchy) ──
function buildNavLinks(root, currentPage) {
  const items = [
    { key: "projects", label: "Projects",   href: `${root}/projects.html` },
    { key: "owners",   label: "For Owners", href: `${root}/owners.html` },
    { key: "invest",   label: "Invest",     href: `${root}/invest.html` },
    { key: "about",    label: "About",      href: `${root}/about.html` },
  ];
  return items
    .map(({ key, label, href }) => {
      const cls = currentPage === key ? "nav-link is-active" : "nav-link";
      return `<a class="${cls}" href="${href}">${label}</a>`;
    })
    .join("");
}

function buildNav(root, currentPage) {
  return `
    <nav class="site-nav" id="site-nav">
      <div class="nav-inner">
        <a class="nav-logo" href="${root}/index.html">Rimalta</a>
        <div class="nav-links" id="nav-links">
          ${buildNavLinks(root, currentPage)}
        </div>
        <div style="display:flex;align-items:center;gap:16px;">
          <a class="btn btn-ghost-amber" href="${root}/index.html#brief" id="nav-cta" style="display:none;">↗ Talk to us</a>
          <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="nav-overlay" id="nav-overlay">
      ${buildNavLinks(root, currentPage).replace(/nav-link/g, 'nav-link')}
      <a class="btn btn-ghost-amber" href="${root}/index.html#brief">↗ Talk to us</a>
    </div>
  `;
}

function buildFooter(root) {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <a class="footer-logo" href="${root}/index.html">Rimalta</a>
        <div class="footer-links">
          <a class="footer-link" href="${root}/projects.html">Projects</a>
          <a class="footer-link" href="${root}/owners.html">For Owners</a>
          <a class="footer-link" href="${root}/invest.html">Invest</a>
          <a class="footer-link" href="${root}/about.html">About</a>
          <a class="footer-link" href="${root}/lease.html">Lease</a>
        </div>
        <div class="footer-meta">Ras Al Khaimah · UAE · © ${year} Rimalta</div>
      </div>
    </footer>
  `;
}

// ── INJECT HEADER + FOOTER ──
function initShell() {
  const root = getRootPath();
  const currentPage = document.body.dataset.page || "";

  const headerSlot = document.querySelector("[data-site-header]");
  if (headerSlot) headerSlot.innerHTML = buildNav(root, currentPage);

  const footerSlot = document.querySelector("[data-site-footer]");
  if (footerSlot) footerSlot.innerHTML = buildFooter(root);
}

// ── MOBILE MENU ──
function initMobileMenu() {
  const hamburger = document.getElementById("nav-hamburger");
  const overlay = document.getElementById("nav-overlay");
  if (!hamburger || !overlay) return;

  hamburger.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      document.body.classList.remove("menu-open");
    }
  });
}

// ── NAV SCROLL BEHAVIOUR ──
function initNavScroll() {
  const nav = document.getElementById("site-nav");
  const cta = document.getElementById("nav-cta");
  if (!nav) return;

  let ticking = false;
  const THRESHOLD = 80;

  function update() {
    if (window.scrollY > THRESHOLD) {
      nav.classList.add("is-scrolled");
      if (cta) cta.style.display = "inline-flex";
    } else {
      nav.classList.remove("is-scrolled");
      if (cta) cta.style.display = "none";
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

// ── SCROLL REVEAL (fallback, no GSAP) ──
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach((el) => io.observe(el));
}

// ── GSAP ANIMATIONS (only if GSAP loaded) ──
function initGSAP() {
  if (typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance (index.html only)
  const heroDisplay = document.querySelector(".hero-display");
  const heroBody = document.querySelector(".hero-body");
  const heroActions = document.querySelector(".hero-actions");

  if (heroDisplay) {
    gsap.from(heroDisplay, { opacity: 0, y: 32, duration: 1.2, ease: "power3.out" });
  }
  if (heroBody) {
    gsap.from(heroBody, { opacity: 0, y: 20, duration: 1.0, ease: "power3.out", delay: 0.2 });
  }
  if (heroActions) {
    gsap.from(heroActions, { opacity: 0, y: 16, duration: 0.9, ease: "power3.out", delay: 0.4 });
  }

  // Hero photo parallax
  const heroPhoto = document.querySelector(".hero-photo");
  if (heroPhoto) {
    gsap.to(heroPhoto, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  }

  // Staggered card reveals on scroll
  document.querySelectorAll(".cards-row, .path-grid, .project-cards").forEach((container) => {
    const cards = container.querySelectorAll(":scope > *");
    gsap.from(cards, {
      opacity: 0,
      y: 24,
      stagger: 0.12,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: container, start: "top 80%", toggleActions: "play none none none" },
    });
  });

  // Stat card scale-in
  document.querySelectorAll(".stat-card").forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.96,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
    });
  });
}

// ── BRIEF FORM ──
function initBriefForm() {
  const form = document.getElementById("brief-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent(`${SITE_CONFIG.advisoryEmail} brief`);
    const body = encodeURIComponent(Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n"));
    window.location.href = `mailto:${SITE_CONFIG.advisoryEmail}?subject=${subject}&body=${body}`;
  });
}

// ── BOOT ──
document.addEventListener("DOMContentLoaded", () => {
  initShell();
  initMobileMenu();
  initNavScroll();
  initReveal();
  initGSAP();
  initBriefForm();
});
```

- [ ] **Step 2: Verify no JS errors**

Open `index.html` in browser → DevTools Console. Confirm: no errors. Nav should inject (dark, no bg yet). Hamburger visible on mobile viewport (375px).

- [ ] **Step 3: Commit**

```bash
git add scripts/site.js
git commit -m "feat: rebuild site.js — dark nav injection, mobile menu, scroll behaviour, GSAP init"
```

---

## Task 3: index.html — Homepage

**Files:**
- Replace: `index.html`

- [ ] **Step 1: Write index.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rimalta | UAE Real Estate Advisory — Ras Al Khaimah</title>
  <meta name="description" content="Rimalta is a UAE real estate advisory brokerage in Ras Al Khaimah. Disciplined execution for owners, buyers, and investors. SKAI and Nura by RAK Properties.">
  <link rel="stylesheet" href="./styles/site.css">
  <style>
    /* ── HOMEPAGE-SPECIFIC ── */

    /* Hero */
    .hero {
      position: relative;
      min-height: calc(100vh - var(--header-h));
      display: flex;
      align-items: stretch;
      overflow: hidden;
    }

    .hero-left {
      flex: 0 0 100%;
      padding: 60px var(--gutter) 80px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      z-index: 2;
    }

    @media (min-width: 768px) {
      .hero-left { flex: 0 0 52%; padding: 80px 48px 80px; justify-content: space-between; }
    }

    .hero-eyebrow { margin-bottom: 20px; }

    .hero-display { margin-bottom: 24px; }

    .hero-body {
      font-size: 14px;
      line-height: 1.75;
      color: var(--white-50);
      max-width: 380px;
      margin-bottom: 40px;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }

    /* Hero right (image column) */
    .hero-right {
      display: none;
      flex: 1;
      position: relative;
      overflow: hidden;
    }

    @media (min-width: 768px) { .hero-right { display: block; } }

    .hero-photo {
      position: absolute;
      inset: 0;
      background:
        repeating-linear-gradient(172deg, transparent, transparent 28px, rgba(255,255,255,0.015) 28px, rgba(255,255,255,0.015) 29px),
        linear-gradient(160deg, #1a1208 0%, #2e2212 30%, #3d2e16 55%, #1e1710 80%, #0f0d08 100%);
      /* TODO: replace with real project photo */
    }

    .hero-photo::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, var(--void) 0%, rgba(13,13,13,0.2) 35%, transparent 60%);
    }

    .hero-stat {
      position: absolute;
      bottom: 40px;
      right: 32px;
      z-index: 3;
      min-width: 160px;
    }

    .hero-scroll-hint {
      position: absolute;
      bottom: 40px;
      left: 48px;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }

    .scroll-hint-text {
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.2);
    }

    .scroll-hint-line {
      width: 1px;
      height: 36px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
    }

    .hero-project-tag {
      position: absolute;
      top: 28px;
      right: 28px;
      z-index: 3;
      text-align: right;
    }

    .hero-project-tag span {
      display: block;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.2);
      line-height: 1.8;
    }

    /* Mobile hero overlay gradient */
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, var(--void) 0%, rgba(13,13,13,0.6) 50%, rgba(13,13,13,0.3) 100%);
      z-index: 1;
      pointer-events: none;
    }

    @media (min-width: 768px) { .hero::before { display: none; } }

    /* Paths grid */
    .path-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1px;
      background: var(--white-06);
    }

    @media (min-width: 480px) { .path-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 768px) { .path-grid { grid-template-columns: repeat(4, 1fr); } }

    .path-item {
      background: var(--void);
      padding: 28px 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .path-num {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--amber);
    }

    .path-title {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--white);
    }

    .path-copy {
      font-size: 12px;
      color: rgba(255,255,255,0.35);
      line-height: 1.6;
      flex: 1;
    }

    .path-link {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.3);
      transition: color 0.2s;
    }

    .path-link:hover { color: var(--amber); }

    /* Project cards */
    .project-cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2px;
    }

    @media (min-width: 640px) { .project-cards { grid-template-columns: repeat(2, 1fr); } }

    .project-card {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
      background: var(--surface);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 28px 24px;
    }

    .project-card-photo {
      position: absolute;
      inset: 0;
      /* TODO: replace with real project render */
    }

    .project-card-photo.skai {
      background: linear-gradient(145deg, #1a1510 0%, #2a1f0e 40%, #1a1208 100%);
    }

    .project-card-photo.nura {
      background: linear-gradient(145deg, #0d1318 0%, #0f1a22 40%, #0a1015 100%);
    }

    .project-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.3) 60%, transparent 100%);
    }

    .project-card-content {
      position: relative;
      z-index: 2;
    }

    .project-card-name {
      font-family: 'Bodoni Moda', serif;
      font-size: 36px;
      font-weight: 900;
      letter-spacing: -2px;
      color: var(--white);
      line-height: 1;
      margin-bottom: 8px;
    }

    .project-card-sub {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      margin-bottom: 16px;
    }

    .project-card-link {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--amber);
      transition: opacity 0.2s;
    }

    .project-card-link:hover { opacity: 0.7; }

    .compare-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 20px 24px;
      background: var(--surface);
      border-top: 1px solid var(--white-06);
    }

    .compare-strip p {
      font-size: 12px;
      color: var(--white-50);
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="./scripts/site.js"></script>
</head>
<body data-page="home" data-depth="0">

  <!-- NAV injected by JS -->
  <div data-site-header></div>

  <main class="page-start">

    <!-- ── HERO ── -->
    <section class="hero">
      <div class="hero-left">
        <div>
          <div class="eyebrow hero-eyebrow">Ras Al Khaimah · UAE</div>
          <div class="display hero-display">UAE<br><em>RE.</em></div>
          <p class="hero-body">Advisory built for owners, buyers, and investors who want real execution — not brochure noise or guesswork.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#brief">Book Advisory Call</a>
            <a class="btn btn-ghost-white" href="#brief">Leave a brief ↓</a>
          </div>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-photo"></div><!-- TODO: replace with real photo -->
        <div class="stat-card hero-stat">
          <div class="stat-value">AED 800K</div>
          <div class="stat-label">Entry · Mina · RAK</div>
        </div>
        <div class="hero-scroll-hint">
          <div class="scroll-hint-text">Scroll</div>
          <div class="scroll-hint-line"></div>
        </div>
        <div class="hero-project-tag">
          <span>SKAI · NURA</span>
          <span>RAK Properties</span>
          <span>Mina · 2028–2029</span>
        </div>
      </div>
    </section>

    <!-- ── PATHS ── -->
    <section class="section">
      <div class="container">
        <div class="reveal" style="margin-bottom:40px;">
          <div class="eyebrow" style="margin-bottom:16px;">Choose your path</div>
          <h2 class="section-title">Built for buyers, tenants, owners, and investors.</h2>
        </div>
        <div class="path-grid">
          <div class="path-item reveal">
            <div class="path-num">01</div>
            <div class="path-title">For Owners</div>
            <div class="path-copy">Structured intake, lead handling, and reporting. Real next steps, not agent memory.</div>
            <a class="path-link" href="./owners.html">Owner services ↗</a>
          </div>
          <div class="path-item reveal">
            <div class="path-num">02</div>
            <div class="path-title">Invest</div>
            <div class="path-copy">Project comparison, payment-plan clarity, and calmer commercial control.</div>
            <a class="path-link" href="./invest.html">Investor path ↗</a>
          </div>
          <div class="path-item reveal">
            <div class="path-num">03</div>
            <div class="path-title">Buy</div>
            <div class="path-copy">SKAI and Nura. Two Mina projects, one advisory layer.</div>
            <a class="path-link" href="./projects.html">View projects ↗</a>
          </div>
          <div class="path-item reveal">
            <div class="path-num">04</div>
            <div class="path-title">Lease</div>
            <div class="path-copy">Responsive matching with real follow-through.</div>
            <a class="path-link" href="./lease.html">Leasing advisory ↗</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PROJECTS ── -->
    <section class="section">
      <div class="container">
        <div class="reveal" style="margin-bottom:40px;">
          <div class="eyebrow" style="margin-bottom:16px;">Current projects</div>
          <h2 class="section-title">Two Mina addresses. One advisory layer.</h2>
        </div>
        <div class="project-cards">
          <div class="project-card reveal">
            <div class="project-card-photo skai"></div>
            <div class="project-card-overlay"></div>
            <div class="project-card-content">
              <div class="status-pill" style="margin-bottom:14px;">Under Construction · Q2 2028</div>
              <div class="project-card-name">SKAI</div>
              <div class="project-card-sub">RAK Properties · Mina · Studios from AED 877K</div>
              <a class="project-card-link" href="./projects/skai.html">View project →</a>
            </div>
          </div>
          <div class="project-card reveal">
            <div class="project-card-photo nura"></div>
            <div class="project-card-overlay"></div>
            <div class="project-card-content">
              <div class="status-pill" style="margin-bottom:14px;">Under Construction · Q4 2028</div>
              <div class="project-card-name">Nura</div>
              <div class="project-card-sub">RAK Properties · Mina · Studios from AED 800K</div>
              <a class="project-card-link" href="./projects/nura.html">View project →</a>
            </div>
          </div>
        </div>
        <div class="compare-strip reveal">
          <p>Can't decide between SKAI and Nura? Compare them side by side.</p>
          <a class="btn btn-ghost-amber" href="./compare.html">Compare projects ↗</a>
        </div>
      </div>
    </section>

    <!-- ── BRIEF FORM ── -->
    <section class="brief-section" id="brief">
      <div class="container">
        <div class="brief-grid">
          <div class="brief-trust reveal">
            <div class="eyebrow" style="margin-bottom:24px;">Leave a brief</div>
            <h2 class="section-title" style="margin-bottom:32px;">Tell us what you're looking for.</h2>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Response within 24 hours — no spam, no bulk campaigns</div>
            </div>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">One advisor, not a rotating team of junior agents</div>
            </div>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Honest project matching — we'll tell you if it's not right for you</div>
            </div>
          </div>
          <form class="brief-form reveal" id="brief-form" action="mailto:hello@rimalta.ae" method="POST" enctype="text/plain">
            <div class="form-field">
              <label class="form-label" for="name">Your name</label>
              <input class="form-input" id="name" name="name" type="text" required placeholder="">
            </div>
            <div class="form-field">
              <label class="form-label" for="intent">I am looking to</label>
              <select class="form-select form-input" id="intent" name="intent" required>
                <option value="" disabled selected>Select one</option>
                <option>Buy</option>
                <option>Invest</option>
                <option>Lease</option>
                <option>List my property</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="project">Project interest</label>
              <select class="form-select form-input" id="project" name="project">
                <option value="" disabled selected>Select one</option>
                <option>SKAI</option>
                <option>Nura</option>
                <option>Both / undecided</option>
                <option>Other / not sure</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="budget">Budget range (AED)</label>
              <input class="form-input" id="budget" name="budget" type="text" placeholder="e.g. 900K–1.2M">
            </div>
            <div class="form-field">
              <label class="form-label" for="notes">Anything else</label>
              <input class="form-input" id="notes" name="notes" type="text" placeholder="Timeline, questions, context">
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;">
              <button class="btn btn-primary" type="submit">Send brief →</button>
              <a class="btn btn-ghost-white" href="https://wa.me/971XXXXXXXXX" target="_blank" rel="noopener" style="background:rgba(37,211,102,0.08);border-color:rgba(37,211,102,0.4);color:#25D366;">Message on WhatsApp</a>
            </div>
          </form>
        </div>
      </div>
    </section>

  </main>

  <!-- FOOTER injected by JS -->
  <div data-site-footer></div>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `index.html`. Check:
- Dark background, amber eyebrow, Bodoni display type render correctly
- On mobile (375px): full-width single column, CTAs stack, no horizontal overflow
- On desktop (1280px): hero splits 52/48, right photo column shows
- Nav injects correctly, hamburger visible on mobile
- Scroll past hero: nav gains dark bg + blur
- Brief form visible at bottom with dark field styling
- No JS console errors

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: rebuild homepage — dark hero, paths grid, project cards, brief form"
```

---

## Task 4: compare.html — New Project Comparison Page

**Files:**
- Create: `compare.html`

- [ ] **Step 1: Create compare.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SKAI vs Nura — Compare | Rimalta</title>
  <meta name="description" content="Compare SKAI and Nura by RAK Properties. Side-by-side metrics for investors and end-users. Self-service decision tool.">
  <link rel="stylesheet" href="./styles/site.css">
  <style>
    /* Profile toggle */
    .profile-toggle {
      display: inline-flex;
      border: 1px solid var(--white-12);
      overflow: hidden;
    }

    .profile-btn {
      padding: 10px 24px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--white-50);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }

    .profile-btn.is-active {
      background: var(--amber);
      color: var(--void);
    }

    /* Comparison grid */
    .compare-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2px;
    }

    @media (min-width: 640px) {
      .compare-grid { grid-template-columns: repeat(2, 1fr); }
    }

    .compare-card {
      background: var(--surface);
      padding: 32px 28px;
    }

    .compare-card-title {
      font-family: 'Bodoni Moda', serif;
      font-size: 48px;
      font-weight: 900;
      letter-spacing: -2px;
      color: var(--white);
      line-height: 1;
      margin-bottom: 6px;
    }

    .compare-card-sub {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.3);
      margin-bottom: 28px;
    }

    .compare-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 16px;
      padding: 14px 0;
      border-bottom: 1px solid var(--white-06);
    }

    .compare-row:last-child { border-bottom: none; }

    .compare-key {
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.3);
      flex-shrink: 0;
    }

    .compare-val {
      font-size: 13px;
      font-weight: 600;
      color: var(--white);
      text-align: right;
    }

    /* Recommendation strip */
    .reco-strip {
      border: 1px solid var(--white-12);
      border-left: 3px solid var(--amber);
      padding: 24px 28px;
      background: var(--surface);
    }

    .reco-strip p {
      font-size: 14px;
      line-height: 1.7;
      color: var(--white-50);
    }

    .reco-strip strong { color: var(--white); }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js" defer></script>
  <script defer src="./scripts/site.js"></script>
</head>
<body data-page="compare" data-depth="0">

  <div data-site-header></div>

  <main class="page-start" x-data="compareApp()" x-init="init()">

    <section class="section">
      <div class="container">
        <div class="reveal" style="margin-bottom:40px;">
          <div class="eyebrow" style="margin-bottom:16px;">Project comparison</div>
          <h1 class="headline" style="margin-bottom:24px;">SKAI vs Nura.<br>Which fits your goals?</h1>
          <div class="profile-toggle">
            <button class="profile-btn" :class="{ 'is-active': profile === 'investor' }" @click="profile = 'investor'">I'm investing</button>
            <button class="profile-btn" :class="{ 'is-active': profile === 'enduser' }" @click="profile = 'enduser'">I'm buying to live</button>
          </div>
        </div>

        <!-- Comparison cards -->
        <div class="compare-grid reveal">
          <!-- SKAI -->
          <div class="compare-card">
            <div class="compare-card-title">SKAI</div>
            <div class="compare-card-sub">RAK Properties · Mina</div>

            <!-- Shared base facts -->
            <div class="compare-row">
              <div class="compare-key">Developer</div>
              <div class="compare-val">RAK Properties</div>
            </div>
            <div class="compare-row">
              <div class="compare-key">Location</div>
              <div class="compare-val">Mina, RAK</div>
            </div>
            <div class="compare-row">
              <div class="compare-key">Delivery</div>
              <div class="compare-val">Q2 2028</div>
            </div>
            <div class="compare-row">
              <div class="compare-key">Unit types</div>
              <div class="compare-val">Studios, 1BR, 2BR</div>
            </div>
            <div class="compare-row">
              <div class="compare-key">Starting price</div>
              <div class="compare-val">AED 877K</div>
            </div>

            <!-- Investor metrics -->
            <template x-if="profile === 'investor'">
              <div>
                <div class="compare-row">
                  <div class="compare-key">Rental yield (est.)</div>
                  <div class="compare-val">7–9% gross</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Capital appreciation</div>
                  <div class="compare-val">Strong — Mina waterfront</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Payment plan</div>
                  <div class="compare-val">60/40 on completion</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Liquidity</div>
                  <div class="compare-val">High (touristic zone)</div>
                </div>
              </div>
            </template>

            <!-- End-user metrics -->
            <template x-if="profile === 'enduser'">
              <div>
                <div class="compare-row">
                  <div class="compare-key">Layouts</div>
                  <div class="compare-val">Open-plan, floor-to-ceiling</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Views</div>
                  <div class="compare-val">Sea + Marina</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Amenities</div>
                  <div class="compare-val">Pool, gym, beach access</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Positioning</div>
                  <div class="compare-val">Premium resort lifestyle</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Move-in</div>
                  <div class="compare-val">Q2 2028</div>
                </div>
              </div>
            </template>
          </div>

          <!-- NURA -->
          <div class="compare-card">
            <div class="compare-card-title">Nura</div>
            <div class="compare-card-sub">RAK Properties · Mina</div>

            <div class="compare-row">
              <div class="compare-key">Developer</div>
              <div class="compare-val">RAK Properties</div>
            </div>
            <div class="compare-row">
              <div class="compare-key">Location</div>
              <div class="compare-val">Mina, RAK</div>
            </div>
            <div class="compare-row">
              <div class="compare-key">Delivery</div>
              <div class="compare-val">Q4 2028</div>
            </div>
            <div class="compare-row">
              <div class="compare-key">Unit types</div>
              <div class="compare-val">Studios, 1BR, 2BR, 3BR</div>
            </div>
            <div class="compare-row">
              <div class="compare-key">Starting price</div>
              <div class="compare-val">AED 800K</div>
            </div>

            <template x-if="profile === 'investor'">
              <div>
                <div class="compare-row">
                  <div class="compare-key">Rental yield (est.)</div>
                  <div class="compare-val">6–8% gross</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Capital appreciation</div>
                  <div class="compare-val">Good — larger unit mix</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Payment plan</div>
                  <div class="compare-val">50/50 on completion</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Liquidity</div>
                  <div class="compare-val">Medium-High</div>
                </div>
              </div>
            </template>

            <template x-if="profile === 'enduser'">
              <div>
                <div class="compare-row">
                  <div class="compare-key">Layouts</div>
                  <div class="compare-val">Spacious, 3BR available</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Views</div>
                  <div class="compare-val">Sea + Lagoon</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Amenities</div>
                  <div class="compare-val">Lagoon pool, clubhouse, gym</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Positioning</div>
                  <div class="compare-val">Community-oriented living</div>
                </div>
                <div class="compare-row">
                  <div class="compare-key">Move-in</div>
                  <div class="compare-val">Q4 2028</div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Recommendation strip -->
        <div class="reco-strip reveal" style="margin-top:2px;">
          <template x-if="profile === 'investor'">
            <p x-html="investorReco"></p>
          </template>
          <template x-if="profile === 'enduser'">
            <p x-html="enduserReco"></p>
          </template>
        </div>

        <!-- Brief form (same component) -->
        <div style="margin-top:80px;" class="reveal">
          <div class="eyebrow" style="margin-bottom:24px;">Ready to move forward?</div>
          <h2 class="section-title" style="margin-bottom:40px;">Leave a brief and we'll match you to the right project.</h2>
          <form class="brief-form" id="brief-form" action="mailto:hello@rimalta.ae" method="POST" enctype="text/plain" style="max-width:520px;">
            <div class="form-field">
              <label class="form-label" for="name">Your name</label>
              <input class="form-input" id="name" name="name" type="text" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="intent">I am looking to</label>
              <select class="form-select form-input" id="intent" name="intent" required>
                <option value="" disabled selected>Select one</option>
                <option>Buy</option>
                <option>Invest</option>
                <option>Lease</option>
                <option>List my property</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="budget">Budget range (AED)</label>
              <input class="form-input" id="budget" name="budget" type="text" placeholder="e.g. 900K–1.2M">
            </div>
            <div class="form-field">
              <label class="form-label" for="notes">Anything else</label>
              <input class="form-input" id="notes" name="notes" type="text" placeholder="Timeline, preference, questions">
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;">
              <button class="btn btn-primary" type="submit">Send brief →</button>
            </div>
          </form>
        </div>

      </div>
    </section>

  </main>

  <div data-site-footer></div>

  <script>
    function compareApp() {
      return {
        profile: 'investor',
        investorReco: '<strong>SKAI</strong> is the stronger rental-yield play for short-term investors. <strong>Nura</strong> suits investors targeting longer leases and families — broader unit mix, slightly lower entry. Both are in the same master plan so macro risk is identical.',
        enduserReco: '<strong>SKAI</strong> suits buyers who want a resort-lifestyle lock-and-leave. <strong>Nura</strong> is the better fit if you need a 3-bedroom or a community-focused environment. If view is your priority, SKAI's sea + marina orientation is hard to beat.',
        init() {}
      }
    }
  </script>

</body>
</html>
```

- [ ] **Step 2: Verify Alpine.js toggle works**

Open `compare.html` in browser. Click "I'm buying to live" → investor metrics disappear, end-user metrics appear. Click back → switches back. Confirm no layout jump.

- [ ] **Step 3: Commit**

```bash
git add compare.html
git commit -m "feat: add compare.html — SKAI vs Nura with Alpine.js investor/enduser toggle"
```

---

## Task 5: owners.html — For Owners Page

**Files:**
- Replace: `owners.html`

- [ ] **Step 1: Write owners.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>For Owners | Rimalta</title>
  <meta name="description" content="Rimalta owner services: structured listing intake, lead handling, and reporting. No guesswork, no agent memory.">
  <link rel="stylesheet" href="./styles/site.css">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="./scripts/site.js"></script>
</head>
<body data-page="owners" data-depth="0">

  <div data-site-header></div>

  <main class="page-start">

    <!-- Page hero -->
    <section style="padding:80px 0 60px;border-bottom:1px solid var(--white-06);">
      <div class="container">
        <div class="eyebrow reveal" style="margin-bottom:20px;">For property owners</div>
        <h1 class="headline reveal" style="max-width:640px;margin-bottom:24px;">Your property deserves more than agent memory and a WhatsApp thread.</h1>
        <p class="body-copy reveal" style="max-width:520px;">Structured listing preparation, inquiry handling, and weekly reporting. One point of contact, visible process, no guesswork.</p>
      </div>
    </section>

    <!-- Process steps -->
    <section class="section">
      <div class="container">
        <div class="eyebrow reveal" style="margin-bottom:16px;">How it works</div>
        <h2 class="section-title reveal" style="margin-bottom:48px;">Four steps from intake to offer.</h2>
        <div style="display:grid;grid-template-columns:1fr;gap:2px;background:var(--white-06);" class="cards-row">
          <div style="background:var(--void);padding:32px 28px;" class="reveal">
            <div class="eyebrow" style="margin-bottom:16px;color:var(--amber);">01</div>
            <h3 class="section-title" style="font-size:20px;margin-bottom:12px;">Intake</h3>
            <p class="body-copy">Structured briefing call — unit type, condition, target timeline, pricing position. We record it, not your brain.</p>
          </div>
          <div style="background:var(--void);padding:32px 28px;" class="reveal">
            <div class="eyebrow" style="margin-bottom:16px;color:var(--amber);">02</div>
            <h3 class="section-title" style="font-size:20px;margin-bottom:12px;">Listing preparation</h3>
            <p class="body-copy">Photography coordination, copy, pricing justification. Listed on the right channels, not every channel.</p>
          </div>
          <div style="background:var(--void);padding:32px 28px;" class="reveal">
            <div class="eyebrow" style="margin-bottom:16px;color:var(--amber);">03</div>
            <h3 class="section-title" style="font-size:20px;margin-bottom:12px;">Lead handling</h3>
            <p class="body-copy">Every inquiry logged, qualified, and followed up. You receive a summary — not a WhatsApp flood.</p>
          </div>
          <div style="background:var(--void);padding:32px 28px;" class="reveal">
            <div class="eyebrow" style="margin-bottom:16px;color:var(--amber);">04</div>
            <h3 class="section-title" style="font-size:20px;margin-bottom:12px;">Reporting</h3>
            <p class="body-copy">Weekly visibility on views, inquiries, and next steps. Progress you can see, not agent confidence you have to trust.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA to brief form -->
    <section class="brief-section" id="brief">
      <div class="container">
        <div class="brief-grid">
          <div class="brief-trust reveal">
            <div class="eyebrow" style="margin-bottom:24px;">Get started</div>
            <h2 class="section-title" style="margin-bottom:32px;">Submit your brief and we'll be in touch within 24 hours.</h2>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">No obligation — we'll tell you honestly whether the timing is right</div>
            </div>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">One senior advisor, not a junior intake team</div>
            </div>
          </div>
          <form class="brief-form reveal" id="brief-form" action="mailto:hello@rimalta.ae" method="POST" enctype="text/plain">
            <div class="form-field">
              <label class="form-label" for="name">Your name</label>
              <input class="form-input" id="name" name="name" type="text" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="property">Property type</label>
              <input class="form-input" id="property" name="property" type="text" placeholder="e.g. 2BR apartment, Mina RAK">
            </div>
            <div class="form-field">
              <label class="form-label" for="goal">Your goal</label>
              <select class="form-select form-input" id="goal" name="goal">
                <option value="" disabled selected>Select one</option>
                <option>Sell</option>
                <option>Lease</option>
                <option>Short-term rental</option>
                <option>Valuation only</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="timeline">Timeline</label>
              <input class="form-input" id="timeline" name="timeline" type="text" placeholder="e.g. Ready now, or 3 months">
            </div>
            <button class="btn btn-primary" type="submit" style="margin-top:8px;">Send brief →</button>
          </form>
        </div>
      </div>
    </section>

  </main>

  <div data-site-footer></div>

</body>
</html>
```

- [ ] **Step 2: Verify**

Open `owners.html`. Check: dark bg, nav injects, eyebrow amber, four process steps visible. Brief form at bottom.

- [ ] **Step 3: Commit**

```bash
git add owners.html
git commit -m "feat: rebuild owners.html — service steps, brief form"
```

---

## Task 6: invest.html — Investment Page

**Files:**
- Replace: `invest.html`

- [ ] **Step 1: Write invest.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invest | Rimalta</title>
  <meta name="description" content="Investment thesis, project comparison, payment plan clarity, and ROI framing for SKAI and Nura by RAK Properties in Ras Al Khaimah.">
  <link rel="stylesheet" href="./styles/site.css">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="./scripts/site.js"></script>
</head>
<body data-page="invest" data-depth="0">

  <div data-site-header></div>

  <main class="page-start">

    <section style="padding:80px 0 60px;border-bottom:1px solid var(--white-06);">
      <div class="container">
        <div class="eyebrow reveal" style="margin-bottom:20px;">Invest</div>
        <h1 class="headline reveal" style="max-width:640px;margin-bottom:24px;">Ras Al Khaimah is the UAE's best-value waterfront investment market right now.</h1>
        <p class="body-copy reveal" style="max-width:520px;">Two developer-backed projects at Mina. Transparent payment plans. Advisory that helps you read the deal, not just sign it.</p>
      </div>
    </section>

    <!-- Stat strip -->
    <section style="border-bottom:1px solid var(--white-06);padding:40px 0;">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--white-06);" class="cards-row">
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:36px;margin-bottom:6px;">7–9%</div>
            <div class="stat-label">Estimated gross rental yield — SKAI</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:36px;margin-bottom:6px;">AED 800K</div>
            <div class="stat-label">Entry point — Nura studios</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:36px;margin-bottom:6px;">60/40</div>
            <div class="stat-label">SKAI payment plan — 60% during build</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:36px;margin-bottom:6px;">2028</div>
            <div class="stat-label">Earliest delivery — SKAI Q2 2028</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why RAK -->
    <section class="section">
      <div class="container">
        <div class="eyebrow reveal" style="margin-bottom:16px;">Why Ras Al Khaimah</div>
        <h2 class="section-title reveal" style="max-width:560px;margin-bottom:40px;">The last affordable waterfront entry point in the UAE before prices correct.</h2>
        <div style="display:grid;grid-template-columns:1fr;gap:20px;max-width:640px;" class="cards-row">
          <div class="reveal" style="border-left:2px solid var(--amber);padding-left:20px;">
            <p class="body-copy">No income tax. No capital gains tax. Freehold ownership for foreign nationals.</p>
          </div>
          <div class="reveal" style="border-left:2px solid var(--amber);padding-left:20px;">
            <p class="body-copy">Developer (RAK Properties) is 35% government-owned — low counterparty risk on off-plan delivery.</p>
          </div>
          <div class="reveal" style="border-left:2px solid var(--amber);padding-left:20px;">
            <p class="body-copy">Mina masterplan is a planned tourism zone — short-term rental permitted, infrastructure committed.</p>
          </div>
          <div class="reveal" style="border-left:2px solid var(--amber);padding-left:20px;">
            <p class="body-copy">Price per sqft still 30–40% below comparable Dubai waterfront. Window is closing.</p>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:48px;" class="reveal">
          <a class="btn btn-primary" href="./compare.html">Compare SKAI vs Nura →</a>
          <a class="btn btn-ghost-white" href="./index.html#brief">Leave a brief ↓</a>
        </div>
      </div>
    </section>

    <!-- Brief form -->
    <section class="brief-section" id="brief">
      <div class="container">
        <div class="brief-grid">
          <div class="brief-trust reveal">
            <div class="eyebrow" style="margin-bottom:24px;">Investor brief</div>
            <h2 class="section-title" style="margin-bottom:32px;">Tell us your investment goals and we'll map the right unit.</h2>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Yield-first, lifestyle-first, or capital-growth framing — we'll match accordingly</div>
            </div>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Payment plan walkthroughs on request — no pressure, no deadlines</div>
            </div>
          </div>
          <form class="brief-form reveal" id="brief-form" action="mailto:hello@rimalta.ae" method="POST" enctype="text/plain">
            <div class="form-field">
              <label class="form-label" for="name">Your name</label>
              <input class="form-input" id="name" name="name" type="text" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="project">Project interest</label>
              <select class="form-select form-input" id="project" name="project">
                <option value="" disabled selected>Select one</option>
                <option>SKAI</option>
                <option>Nura</option>
                <option>Both / undecided</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="budget">Budget (AED)</label>
              <input class="form-input" id="budget" name="budget" type="text" placeholder="e.g. 900K–1.5M">
            </div>
            <div class="form-field">
              <label class="form-label" for="priority">Investment priority</label>
              <select class="form-select form-input" id="priority" name="priority">
                <option value="" disabled selected>Select one</option>
                <option>Rental yield</option>
                <option>Capital appreciation</option>
                <option>Both equally</option>
              </select>
            </div>
            <button class="btn btn-primary" type="submit" style="margin-top:8px;">Send brief →</button>
          </form>
        </div>
      </div>
    </section>

  </main>

  <div data-site-footer></div>

</body>
</html>
```

- [ ] **Step 2: Verify**

Open `invest.html`. Check: stat strip renders as 2×2 grid, amber left-border thesis bullets, CTA links to compare and brief form.

- [ ] **Step 3: Commit**

```bash
git add invest.html
git commit -m "feat: rebuild invest.html — RAK thesis, stat strip, payment plan clarity, brief form"
```

---

## Task 7: projects.html — Projects Overview

**Files:**
- Replace: `projects.html`

- [ ] **Step 1: Write projects.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projects | Rimalta</title>
  <meta name="description" content="SKAI and Nura by RAK Properties at Mina, Ras Al Khaimah. Studios from AED 800K. Rimalta advisory.">
  <link rel="stylesheet" href="./styles/site.css">
  <style>
    .project-card-lg {
      position: relative;
      min-height: 420px;
      overflow: hidden;
      background: var(--surface);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 36px 32px;
    }

    .project-card-lg-photo {
      position: absolute;
      inset: 0;
    }

    .project-card-lg-photo.skai {
      background: linear-gradient(145deg, #1a1510 0%, #2a1f0e 40%, #1a1208 100%);
    }

    .project-card-lg-photo.nura {
      background: linear-gradient(145deg, #0d1318 0%, #0f1a22 40%, #0a1015 100%);
    }

    .project-card-lg-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.4) 60%, transparent 100%);
    }

    .project-card-lg-content { position: relative; z-index: 2; }

    .project-card-lg-name {
      font-family: 'Bodoni Moda', serif;
      font-size: clamp(48px, 8vw, 80px);
      font-weight: 900;
      letter-spacing: -3px;
      color: var(--white);
      line-height: 0.9;
      margin-bottom: 12px;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="./scripts/site.js"></script>
</head>
<body data-page="projects" data-depth="0">

  <div data-site-header></div>

  <main class="page-start">

    <section style="padding:80px 0 60px;border-bottom:1px solid var(--white-06);">
      <div class="container">
        <div class="eyebrow reveal" style="margin-bottom:20px;">Projects · Mina, RAK</div>
        <h1 class="headline reveal" style="max-width:600px;margin-bottom:24px;">Two addresses. One advisory layer.</h1>
        <p class="body-copy reveal" style="max-width:480px;">SKAI and Nura by RAK Properties at Mina, Ras Al Khaimah. Rimalta covers both — one brief, one advisor, clear comparison.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr;gap:2px;background:var(--white-06);" class="project-cards">
          <div class="project-card-lg reveal">
            <div class="project-card-lg-photo skai"></div><!-- TODO: real photo -->
            <div class="project-card-lg-overlay"></div>
            <div class="project-card-lg-content">
              <div class="status-pill" style="margin-bottom:16px;">Under Construction · Q2 2028</div>
              <div class="project-card-lg-name">SKAI</div>
              <div style="font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:20px;">RAK Properties · Mina · Studios from AED 877K</div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <a class="btn btn-primary" href="./projects/skai.html">View SKAI →</a>
                <a class="btn btn-ghost-white" href="./index.html#brief">Leave a brief ↓</a>
              </div>
            </div>
          </div>
          <div class="project-card-lg reveal">
            <div class="project-card-lg-photo nura"></div><!-- TODO: real photo -->
            <div class="project-card-lg-overlay"></div>
            <div class="project-card-lg-content">
              <div class="status-pill" style="margin-bottom:16px;">Under Construction · Q4 2028</div>
              <div class="project-card-lg-name">Nura</div>
              <div style="font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:20px;">RAK Properties · Mina · Studios from AED 800K</div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <a class="btn btn-primary" href="./projects/nura.html">View Nura →</a>
                <a class="btn btn-ghost-white" href="./index.html#brief">Leave a brief ↓</a>
              </div>
            </div>
          </div>
        </div>
        <div style="padding:24px;background:var(--surface);border-top:1px solid var(--white-06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;" class="reveal">
          <p class="body-copy" style="font-size:13px;">Not sure which fits your goals? Compare both side by side.</p>
          <a class="btn btn-ghost-amber" href="./compare.html">Compare SKAI vs Nura ↗</a>
        </div>
      </div>
    </section>

  </main>

  <div data-site-footer></div>

</body>
</html>
```

- [ ] **Step 2: Verify**

Open `projects.html`. Check: two large project cards, status pills, compare strip at bottom.

- [ ] **Step 3: Commit**

```bash
git add projects.html
git commit -m "feat: rebuild projects.html — large project cards, compare strip"
```

---

## Task 8: projects/skai.html — SKAI Detail Page

**Files:**
- Replace: `projects/skai.html`

- [ ] **Step 1: Write projects/skai.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SKAI by RAK Properties | Rimalta</title>
  <meta name="description" content="SKAI by RAK Properties at Mina, Ras Al Khaimah. Studios from AED 877K. Q2 2028 delivery. Rimalta advisory.">
  <link rel="stylesheet" href="../styles/site.css">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="../scripts/site.js"></script>
</head>
<body data-page="projects" data-depth="1">

  <div data-site-header></div>

  <main class="page-start">

    <!-- Hero -->
    <section style="min-height:50vh;position:relative;display:flex;align-items:flex-end;padding:80px 0;overflow:hidden;">
      <div style="position:absolute;inset:0;background:linear-gradient(145deg,#1a1510,#2e2212 40%,#1a1208);"></div><!-- TODO: real photo -->
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,13,0.95) 0%,rgba(13,13,13,0.4) 60%,transparent 100%);"></div>
      <div class="container" style="position:relative;z-index:2;">
        <div class="status-pill reveal" style="margin-bottom:20px;">Under Construction · Q2 2028</div>
        <h1 class="display reveal" style="margin-bottom:16px;">SKAI</h1>
        <p class="body-copy reveal" style="max-width:480px;margin-bottom:32px;">RAK Properties' flagship Mina tower. Sea and marina views. Studios from AED 877K with 60/40 payment plan.</p>
        <a class="btn btn-primary reveal" href="#brief">Request a brief →</a>
      </div>
    </section>

    <!-- Key metrics -->
    <section style="padding:60px 0;border-bottom:1px solid var(--white-06);">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--white-06);" class="cards-row">
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:28px;margin-bottom:6px;">AED 877K</div>
            <div class="stat-label">Starting price — studio</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:28px;margin-bottom:6px;">Q2 2028</div>
            <div class="stat-label">Delivery</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:28px;margin-bottom:6px;">60/40</div>
            <div class="stat-label">Payment plan</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:28px;margin-bottom:6px;">7–9%</div>
            <div class="stat-label">Estimated gross yield</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project details -->
    <section class="section">
      <div class="container" style="display:grid;gap:48px;grid-template-columns:1fr;">
        <div class="reveal">
          <div class="eyebrow" style="margin-bottom:16px;">The project</div>
          <h2 class="section-title" style="margin-bottom:20px;">Premium waterfront living at Mina.</h2>
          <p class="body-copy">SKAI is RAK Properties' signature residential tower at Mina — a master-planned coastal district in Ras Al Khaimah. The tower offers studio, 1-bedroom, and 2-bedroom units with sea and marina orientations. Ground-floor amenities include pools, gym, and direct beach access. Short-term rental is permitted under the Mina zone regulations.</p>
        </div>
        <div class="reveal">
          <div class="eyebrow" style="margin-bottom:16px;">Payment plan</div>
          <div style="border-left:2px solid var(--amber);padding-left:20px;display:flex;flex-direction:column;gap:16px;">
            <div>
              <div class="stat-value" style="font-size:22px;margin-bottom:4px;">20%</div>
              <div class="stat-label">On booking</div>
            </div>
            <div>
              <div class="stat-value" style="font-size:22px;margin-bottom:4px;">40%</div>
              <div class="stat-label">During construction (installments)</div>
            </div>
            <div>
              <div class="stat-value" style="font-size:22px;margin-bottom:4px;">40%</div>
              <div class="stat-label">On completion (Q2 2028)</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brief CTA -->
    <section class="brief-section" id="brief">
      <div class="container">
        <div class="brief-grid">
          <div class="brief-trust reveal">
            <div class="eyebrow" style="margin-bottom:24px;">SKAI brief</div>
            <h2 class="section-title" style="margin-bottom:32px;">Tell us what you're looking for and we'll walk you through the numbers.</h2>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Pricing verified directly with RAK Properties — no inflated agent margin</div>
            </div>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Payment plan walkthroughs in English, Russian, or Arabic on request</div>
            </div>
            <div style="margin-top:24px;">
              <a class="btn btn-ghost-white" href="../compare.html">Compare with Nura ↗</a>
            </div>
          </div>
          <form class="brief-form reveal" id="brief-form" action="mailto:hello@rimalta.ae" method="POST" enctype="text/plain">
            <div class="form-field">
              <label class="form-label" for="name">Your name</label>
              <input class="form-input" id="name" name="name" type="text" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="intent">I am looking to</label>
              <select class="form-select form-input" id="intent" name="intent" required>
                <option value="" disabled selected>Select one</option>
                <option>Buy to invest</option>
                <option>Buy to live</option>
                <option>Explore options</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="budget">Budget (AED)</label>
              <input class="form-input" id="budget" name="budget" type="text" placeholder="e.g. 900K–1.2M">
            </div>
            <button class="btn btn-primary" type="submit" style="margin-top:8px;">Send brief →</button>
          </form>
        </div>
      </div>
    </section>

  </main>

  <div data-site-footer></div>

</body>
</html>
```

- [ ] **Step 2: Verify**

Open `projects/skai.html`. Check: nav paths resolve correctly (depth=1 uses `..`), hero renders, stat grid 2×2, payment plan breakdown visible.

- [ ] **Step 3: Commit**

```bash
git add projects/skai.html
git commit -m "feat: rebuild projects/skai.html — hero, metrics, payment plan, brief form"
```

---

## Task 9: projects/nura.html — Nura Detail Page

**Files:**
- Replace: `projects/nura.html`

- [ ] **Step 1: Write projects/nura.html**

Same template as SKAI, cooler tones (blues/teals), Nura-specific content:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nura by RAK Properties | Rimalta</title>
  <meta name="description" content="Nura by RAK Properties at Mina, Ras Al Khaimah. Studios from AED 800K. Q4 2028 delivery. Rimalta advisory.">
  <link rel="stylesheet" href="../styles/site.css">
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  <script defer src="../scripts/site.js"></script>
</head>
<body data-page="projects" data-depth="1">

  <div data-site-header></div>

  <main class="page-start">

    <!-- Hero (cooler palette vs SKAI's warm) -->
    <section style="min-height:50vh;position:relative;display:flex;align-items:flex-end;padding:80px 0;overflow:hidden;">
      <div style="position:absolute;inset:0;background:linear-gradient(145deg,#0d1318,#0f1a22 40%,#0a1015);"></div><!-- TODO: real photo -->
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,13,0.95) 0%,rgba(13,13,13,0.4) 60%,transparent 100%);"></div>
      <div class="container" style="position:relative;z-index:2;">
        <div class="status-pill reveal" style="margin-bottom:20px;">Under Construction · Q4 2028</div>
        <h1 class="display reveal" style="margin-bottom:16px;">Nura</h1>
        <p class="body-copy reveal" style="max-width:480px;margin-bottom:32px;">RAK Properties' community-focused Mina address. Sea and lagoon views. Studios from AED 800K with 50/50 payment plan.</p>
        <a class="btn btn-primary reveal" href="#brief">Request a brief →</a>
      </div>
    </section>

    <!-- Key metrics -->
    <section style="padding:60px 0;border-bottom:1px solid var(--white-06);">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--white-06);" class="cards-row">
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:28px;margin-bottom:6px;">AED 800K</div>
            <div class="stat-label">Starting price — studio</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:28px;margin-bottom:6px;">Q4 2028</div>
            <div class="stat-label">Delivery</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:28px;margin-bottom:6px;">50/50</div>
            <div class="stat-label">Payment plan</div>
          </div>
          <div style="background:var(--void);padding:28px 24px;" class="reveal">
            <div class="stat-value" style="font-size:28px;margin-bottom:6px;">6–8%</div>
            <div class="stat-label">Estimated gross yield</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project details -->
    <section class="section">
      <div class="container" style="display:grid;gap:48px;grid-template-columns:1fr;">
        <div class="reveal">
          <div class="eyebrow" style="margin-bottom:16px;">The project</div>
          <h2 class="section-title" style="margin-bottom:20px;">Community living on the Mina lagoon.</h2>
          <p class="body-copy">Nura is RAK Properties' community-oriented residential development at Mina. Studios, 1BR, 2BR, and 3BR units available — the broadest unit mix in the Mina portfolio. Lagoon and sea views. Clubhouse, pool, gym, and family-friendly amenities. Suitable for owner-occupiers and long-term rental investors.</p>
        </div>
        <div class="reveal">
          <div class="eyebrow" style="margin-bottom:16px;">Payment plan</div>
          <div style="border-left:2px solid var(--amber);padding-left:20px;display:flex;flex-direction:column;gap:16px;">
            <div>
              <div class="stat-value" style="font-size:22px;margin-bottom:4px;">10%</div>
              <div class="stat-label">On booking</div>
            </div>
            <div>
              <div class="stat-value" style="font-size:22px;margin-bottom:4px;">40%</div>
              <div class="stat-label">During construction (installments)</div>
            </div>
            <div>
              <div class="stat-value" style="font-size:22px;margin-bottom:4px;">50%</div>
              <div class="stat-label">On completion (Q4 2028)</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brief CTA -->
    <section class="brief-section" id="brief">
      <div class="container">
        <div class="brief-grid">
          <div class="brief-trust reveal">
            <div class="eyebrow" style="margin-bottom:24px;">Nura brief</div>
            <h2 class="section-title" style="margin-bottom:32px;">Leave a brief and we'll walk you through the unit options.</h2>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">3BR units available — ideal for families or investors targeting longer leases</div>
            </div>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Lower entry than SKAI — AED 800K starting, flexible 50/50 plan</div>
            </div>
            <div style="margin-top:24px;">
              <a class="btn btn-ghost-white" href="../compare.html">Compare with SKAI ↗</a>
            </div>
          </div>
          <form class="brief-form reveal" id="brief-form" action="mailto:hello@rimalta.ae" method="POST" enctype="text/plain">
            <div class="form-field">
              <label class="form-label" for="name">Your name</label>
              <input class="form-input" id="name" name="name" type="text" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="intent">I am looking to</label>
              <select class="form-select form-input" id="intent" name="intent" required>
                <option value="" disabled selected>Select one</option>
                <option>Buy to invest</option>
                <option>Buy to live</option>
                <option>Explore options</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="unit">Unit type interest</label>
              <select class="form-select form-input" id="unit" name="unit">
                <option value="" disabled selected>Select one</option>
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedroom</option>
                <option>3 Bedroom</option>
                <option>Undecided</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="budget">Budget (AED)</label>
              <input class="form-input" id="budget" name="budget" type="text" placeholder="e.g. 800K–1.2M">
            </div>
            <button class="btn btn-primary" type="submit" style="margin-top:8px;">Send brief →</button>
          </form>
        </div>
      </div>
    </section>

  </main>

  <div data-site-footer></div>

</body>
</html>
```

- [ ] **Step 2: Verify**

Open `projects/nura.html`. Check: cooler tones vs SKAI, unit type selector has 3BR option, depth=1 paths resolve.

- [ ] **Step 3: Commit**

```bash
git add projects/nura.html
git commit -m "feat: rebuild projects/nura.html — cool-tone hero, metrics, 3BR unit selector, brief form"
```

---

## Task 10: lease.html — Lease Page

**Files:**
- Replace: `lease.html`

- [ ] **Step 1: Write lease.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lease | Rimalta</title>
  <meta name="description" content="Rimalta lease advisory — responsive tenant matching with real follow-through. Ras Al Khaimah.">
  <link rel="stylesheet" href="./styles/site.css">
  <script defer src="./scripts/site.js"></script>
</head>
<body data-page="lease" data-depth="0">

  <div data-site-header></div>

  <main class="page-start">

    <section style="padding:80px 0 60px;border-bottom:1px solid var(--white-06);">
      <div class="container">
        <div class="eyebrow reveal" style="margin-bottom:20px;">Lease</div>
        <h1 class="headline reveal" style="max-width:600px;margin-bottom:24px;">Responsive matching. Real follow-through.</h1>
        <p class="body-copy reveal" style="max-width:480px;">Whether you're looking to lease a unit in Mina or need help finding a tenant for your property, Rimalta handles the qualification and follow-up — not just the listing.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="eyebrow reveal" style="margin-bottom:16px;">How Rimalta handles leasing</div>
        <div style="display:grid;gap:2px;background:var(--white-06);grid-template-columns:1fr;" class="cards-row">
          <div style="background:var(--void);padding:32px 28px;" class="reveal">
            <div class="path-num" style="color:var(--amber);font-size:9px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Tenant qualification</div>
            <p class="body-copy">Every inquiry is qualified before it reaches you. Employment, timeline, and budget verified before a viewing is booked.</p>
          </div>
          <div style="background:var(--void);padding:32px 28px;" class="reveal">
            <div class="path-num" style="color:var(--amber);font-size:9px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Follow-through</div>
            <p class="body-copy">Tenants who ghost are replaced from the queue, not chased indefinitely. Your time is not wasted on weak leads.</p>
          </div>
          <div style="background:var(--void);padding:32px 28px;" class="reveal">
            <div class="path-num" style="color:var(--amber);font-size:9px;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;">Contract and handover</div>
            <p class="body-copy">Standard lease documentation coordinated. Condition report, key handover, and first payment confirmed before closure.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="brief-section" id="brief">
      <div class="container">
        <div class="brief-grid">
          <div class="brief-trust reveal">
            <div class="eyebrow" style="margin-bottom:24px;">Lease brief</div>
            <h2 class="section-title" style="margin-bottom:32px;">Tell us what you need and we'll match accordingly.</h2>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Available inventory in Mina — SKAI and Nura units on request</div>
            </div>
            <div class="trust-item">
              <div class="trust-dot"></div>
              <div class="trust-label">Owner representation also available — tenant sourcing and qualification</div>
            </div>
          </div>
          <form class="brief-form reveal" id="brief-form" action="mailto:hello@rimalta.ae" method="POST" enctype="text/plain">
            <div class="form-field">
              <label class="form-label" for="name">Your name</label>
              <input class="form-input" id="name" name="name" type="text" required>
            </div>
            <div class="form-field">
              <label class="form-label" for="role">I am a</label>
              <select class="form-select form-input" id="role" name="role" required>
                <option value="" disabled selected>Select one</option>
                <option>Tenant looking to lease</option>
                <option>Owner looking for a tenant</option>
              </select>
            </div>
            <div class="form-field">
              <label class="form-label" for="type">Unit type</label>
              <input class="form-input" id="type" name="type" type="text" placeholder="e.g. 1BR, studio, 2BR">
            </div>
            <div class="form-field">
              <label class="form-label" for="budget">Budget / asking rent (AED / year)</label>
              <input class="form-input" id="budget" name="budget" type="text" placeholder="e.g. 70,000–90,000">
            </div>
            <div class="form-field">
              <label class="form-label" for="timeline">Move-in timeline</label>
              <input class="form-input" id="timeline" name="timeline" type="text" placeholder="e.g. Immediately, 2 months">
            </div>
            <button class="btn btn-primary" type="submit" style="margin-top:8px;">Send brief →</button>
          </form>
        </div>
      </div>
    </section>

  </main>

  <div data-site-footer></div>

</body>
</html>
```

- [ ] **Step 2: Verify**

Open `lease.html`. Check: three service blocks render, brief form has tenant/owner selector.

- [ ] **Step 3: Commit**

```bash
git add lease.html
git commit -m "feat: rebuild lease.html — qualification steps, tenant/owner brief form"
```

---

## Task 11: about.html — About Page

**Files:**
- Replace: `about.html`

- [ ] **Step 1: Write about.html**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About | Rimalta</title>
  <meta name="description" content="Rimalta is a UAE real estate advisory brokerage. Disciplined execution for owners, buyers, and investors in Ras Al Khaimah.">
  <link rel="stylesheet" href="./styles/site.css">
  <script defer src="./scripts/site.js"></script>
</head>
<body data-page="about" data-depth="0">

  <div data-site-header></div>

  <main class="page-start">

    <section style="padding:80px 0 60px;border-bottom:1px solid var(--white-06);">
      <div class="container">
        <div class="eyebrow reveal" style="margin-bottom:20px;">About Rimalta</div>
        <h1 class="headline reveal" style="max-width:640px;margin-bottom:24px;">Disciplined execution. Not brochure noise.</h1>
        <p class="body-copy reveal" style="max-width:520px;">Rimalta is a UAE real estate advisory brokerage focused on Ras Al Khaimah. We work with property owners, buyers, and investors who want clarity, follow-through, and real commercial control — not agent promises and vanishing timelines.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display:grid;gap:48px;grid-template-columns:1fr;">
          <div class="reveal">
            <div class="eyebrow" style="margin-bottom:16px;">What we are</div>
            <h2 class="section-title" style="margin-bottom:20px;">A small advisory with a tight operating model.</h2>
            <p class="body-copy">Rimalta is not a portal, not a lead farm, and not a franchise. We are a focused advisory operation with one aim: move qualified owners, buyers, and investors through transactions with less friction, more honesty, and no manufactured urgency. Current focus: SKAI and Nura by RAK Properties at Mina.</p>
          </div>

          <div style="display:grid;grid-template-columns:1fr;gap:2px;background:var(--white-06);" class="cards-row">
            <div style="background:var(--void);padding:28px 24px;" class="reveal">
              <div class="eyebrow" style="margin-bottom:12px;font-size:9px;">What we commit to</div>
              <p class="body-copy">Response within 24 hours. One senior advisor, not a rotating team. No invented urgency — if a unit sells out, we'll tell you directly, not use it as leverage.</p>
            </div>
            <div style="background:var(--void);padding:28px 24px;" class="reveal">
              <div class="eyebrow" style="margin-bottom:12px;font-size:9px;">What we won't do</div>
              <p class="body-copy">Bulk outreach, speculative enrichment, or over-promise on yield. If the deal doesn't make sense for you, we'll say so.</p>
            </div>
            <div style="background:var(--void);padding:28px 24px;" class="reveal">
              <div class="eyebrow" style="margin-bottom:12px;font-size:9px;">Current coverage</div>
              <p class="body-copy">RAK Properties projects in Mina, Ras Al Khaimah. Owner representation and listing services for secondary market. Tenant matching on request.</p>
            </div>
          </div>

          <div class="reveal" style="display:flex;flex-wrap:wrap;gap:12px;">
            <a class="btn btn-primary" href="./index.html#brief">Leave a brief →</a>
            <a class="btn btn-ghost-white" href="./owners.html">Owner services ↗</a>
          </div>
        </div>
      </div>
    </section>

  </main>

  <div data-site-footer></div>

</body>
</html>
```

- [ ] **Step 2: Verify**

Open `about.html`. Check: dark bg, three commitment blocks, CTAs resolve to correct pages.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: rebuild about.html — positioning, commitments, CTAs"
```

---

## Task 12: Cross-site QA Pass

**Files:** All pages (read-only check)

- [ ] **Step 1: Check all nav links resolve from each depth**

Test from browser:
- `index.html` (depth 0): click all nav links → all resolve
- `projects/skai.html` (depth 1): click all nav links → all resolve with `../` prefix
- `projects/nura.html` (depth 1): same check

- [ ] **Step 2: Mobile QA (375px viewport)**

For each page check:
- No horizontal scroll
- Nav hamburger visible, opens overlay
- Hero text readable, not truncated
- CTAs reachable without horizontal scroll
- Brief form fields usable (touch-friendly)

- [ ] **Step 3: Scroll behaviour**

On `index.html`: scroll past hero → nav gains `is-scrolled` class (dark bg + blur). Scroll back → class removed.

- [ ] **Step 4: Reveal animations**

On `index.html`: open DevTools → Elements. `.reveal` elements start with `opacity:0`. Scroll down → class `is-visible` adds, elements fade in.

- [ ] **Step 5: Alpine.js toggle (compare.html)**

Click both profile buttons. Confirm: investor metrics ↔ enduser metrics toggle without page reload or layout jump.

- [ ] **Step 6: Form submit**

On `index.html` brief form: fill all required fields → submit → mailto client opens with correct prefill.

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "chore: full rimalta site rebuild complete — Bold Modern dark design, 9 pages + compare"
```

---

## Self-Review Against Spec

**Spec coverage check:**

| Spec requirement | Covered in task |
|-----------------|-----------------|
| Design tokens (§2) | Task 1 — CSS |
| Typography scale | Task 1 — CSS |
| Button variants | Task 1 — CSS |
| Stat card, eyebrow, status pill | Task 1 — CSS |
| GSAP animations | Task 2 — JS |
| Nav scroll behaviour | Task 2 — JS |
| Mobile hamburger/overlay | Task 2 — JS |
| Homepage hero layout | Task 3 |
| Paths 4-column grid | Task 3 |
| Project cards + compare strip | Task 3 |
| Brief form | Task 3 |
| compare.html — Alpine toggle | Task 4 |
| compare.html — investor/enduser modes | Task 4 |
| compare.html — recommendation strip | Task 4 |
| owners.html — 4-step process | Task 5 |
| invest.html — RAK thesis + stats | Task 6 |
| projects.html — overview grid | Task 7 |
| projects/skai.html — metrics + payment plan | Task 8 |
| projects/nura.html — cooler tones + 3BR | Task 9 |
| lease.html — tenant/owner brief | Task 10 |
| about.html — positioning | Task 11 |
| Mobile first-class (execution rule 1) | All tasks — CSS mobile-first, QA Task 12 |
| Commercial hierarchy Owners first (rule 2) | Task 2 nav order, Task 3 paths order |
| Clarity over beauty (rule 3) | Design choices in Tasks 3–11 |
| CSS gradient placeholders with TODO comments | Tasks 3, 7, 8, 9 |
| CDN scripts (GSAP, ScrollTrigger, Alpine) | Tasks 3, 4, 5, 6, 7, 8, 9 |
| `data-site-header` / `data-site-footer` slots | All pages |
| `data-depth` attribute for path resolution | All pages |

No gaps found.
