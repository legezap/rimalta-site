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
        <div style="display:flex;align-items:center;gap:16px;">
          <a class="btn btn-ghost-amber" href="${root}/index.html#brief" id="nav-cta" style="display:none;">↗ Talk to us</a>
          <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="nav-overlay" id="nav-overlay">
      ${buildNavLinks(root, currentPage)}
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

function initShell() {
  const root = getRootPath();
  const currentPage = document.body.dataset.page || "";

  const headerSlot = document.querySelector("[data-site-header]");
  if (headerSlot) headerSlot.innerHTML = buildNav(root, currentPage);

  const footerSlot = document.querySelector("[data-site-footer]");
  if (footerSlot) footerSlot.innerHTML = buildFooter(root);
}

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
  }, { threshold: 0.1 });

  els.forEach((el) => io.observe(el));
}

function initGSAP() {
  if (typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
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

  // Staggered card reveals
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

function initBriefForm() {
  const form = document.getElementById("brief-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent("Rimalta — property brief");
    const body = encodeURIComponent(
      Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n")
    );
    window.location.href = `mailto:${SITE_CONFIG.advisoryEmail}?subject=${subject}&body=${body}`;
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
