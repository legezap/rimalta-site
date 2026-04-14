/* ─────────────────────────────────────────────
   RIMALTA SITE — site.js
   Nav · Mobile menu · Scroll nav · GSAP · WhatsApp
   ───────────────────────────────────────────── */

const SITE_CONFIG = {
  advisoryEmail: "hello@rimalta.ae",
  whatsapp: "971XXXXXXXXXX", // TODO: replace with real WhatsApp number
  phone: "+971 XX XXX XXXX",  // TODO: replace with real phone
};

function getRootPath() {
  const depth = Number(document.body.dataset.depth || "0");
  return depth > 0 ? ".." : ".";
}

// Nav order: Owners first (commercial hierarchy)
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
        <div class="nav-links">
          ${buildNavLinks(root, currentPage)}
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <a class="btn btn-ghost-amber nav-cta-wa" href="https://wa.me/${SITE_CONFIG.whatsapp}" target="_blank" rel="noopener" id="nav-cta" style="display:none;">↗ Talk to us</a>
          <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="nav-overlay" id="nav-overlay">
      ${buildNavLinks(root, currentPage)}
      <a class="btn btn-primary" href="https://wa.me/${SITE_CONFIG.whatsapp}" target="_blank" rel="noopener" style="font-size:11px;">↗ Talk to us on WhatsApp</a>
      <a class="btn btn-ghost-white" href="${root}/index.html#brief" style="font-size:11px;">Leave a brief</a>
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
          <a class="footer-link" href="https://wa.me/${SITE_CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
        <div class="footer-meta">Ras Al Khaimah · UAE · © ${year} Rimalta</div>
      </div>
    </footer>
  `;
}

// Floating WhatsApp button (always visible)
function buildFloatingWA() {
  return `
    <a class="floating-wa" href="https://wa.me/${SITE_CONFIG.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span>WhatsApp</span>
    </a>
  `;
}

function initShell() {
  const root = getRootPath();
  const currentPage = document.body.dataset.page || "";

  const headerSlot = document.querySelector("[data-site-header]");
  if (headerSlot) headerSlot.innerHTML = buildNav(root, currentPage);

  const footerSlot = document.querySelector("[data-site-footer]");
  if (footerSlot) footerSlot.innerHTML = buildFooter(root);

  // Inject floating WhatsApp button
  const waBtn = document.createElement("div");
  waBtn.innerHTML = buildFloatingWA();
  document.body.appendChild(waBtn.firstElementChild);
}

function initMobileMenu() {
  const hamburger = document.getElementById("nav-hamburger");
  const overlay = document.getElementById("nav-overlay");
  if (!hamburger || !overlay) return;

  hamburger.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.tagName === "A" || e.target.closest("a")) {
      document.body.classList.remove("menu-open");
    }
  });
}

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
  }, { threshold: 0.08 });

  els.forEach((el) => io.observe(el));
}

function initGSAP() {
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  const heroDisplay = document.querySelector(".hero-display");
  const heroBody    = document.querySelector(".hero-body");
  const heroActions = document.querySelector(".hero-actions");

  if (heroDisplay) gsap.from(heroDisplay, { opacity: 0, y: 36, duration: 1.3, ease: "power3.out" });
  if (heroBody)    gsap.from(heroBody,    { opacity: 0, y: 20, duration: 1.1, ease: "power3.out", delay: 0.25 });
  if (heroActions) gsap.from(heroActions, { opacity: 0, y: 16, duration: 1.0, ease: "power3.out", delay: 0.45 });

  // Stat card in hero
  const heroStat = document.querySelector(".hero-stat");
  if (heroStat) gsap.from(heroStat, { opacity: 0, y: 16, duration: 0.9, ease: "power2.out", delay: 0.7 });

  // Staggered card/grid reveals
  document.querySelectorAll(".cards-row, .path-grid, .project-cards, .gallery-grid").forEach((container) => {
    const cards = container.querySelectorAll(":scope > *");
    if (!cards.length) return;
    gsap.from(cards, {
      opacity: 0,
      y: 28,
      stagger: 0.1,
      duration: 0.85,
      ease: "power2.out",
      scrollTrigger: { trigger: container, start: "top 82%", toggleActions: "play none none none" },
    });
  });
}

function initBriefForm() {
  document.querySelectorAll(".brief-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const subject = encodeURIComponent("Rimalta — property brief");
      const body = encodeURIComponent(
        Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n")
      );
      window.open(`mailto:${SITE_CONFIG.advisoryEmail}?subject=${subject}&body=${body}`, "_self");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initShell();
  initMobileMenu();
  initNavScroll();
  initReveal();
  initGSAP();
  initBriefForm();
});
