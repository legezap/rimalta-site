const SITE_CONFIG = {
  advisoryEmail: "hello@rimalta.ae",
  advisorySubjectPrefix: "Rimalta",
};

function getRootPath() {
  const depth = Number(document.body.dataset.depth || "0");
  return depth > 0 ? ".." : ".";
}

function buildNav(root, currentPage) {
  const items = [
    { key: "buy", label: "Buy", href: `${root}/projects.html` },
    { key: "lease", label: "Lease", href: `${root}/index.html#paths` },
    { key: "sell", label: "Sell", href: `${root}/owners.html#valuation` },
    { key: "owners", label: "For Owners", href: `${root}/owners.html` },
    { key: "invest", label: "Invest", href: `${root}/invest.html` },
    { key: "about", label: "About", href: `${root}/about.html` },
    { key: "insights", label: "Insights", href: `${root}/index.html#insights` },
  ];

  return items
    .map((item) => {
      const activeClass = currentPage === item.key ? "is-active" : "";
      return `<a class="${activeClass}" href="${item.href}">${item.label}</a>`;
    })
    .join("");
}

function buildHeader(root, currentPage) {
  return `
    <header class="site-header" data-site-header-inner>
      <div class="header-inner">
        <a class="brand" href="${root}/index.html" aria-label="Rimalta home">
          <span class="brand-mark">R</span>
          <span class="brand-copy">
            <strong>RIMALTA</strong>
            <span>Premium UAE property execution</span>
          </span>
        </a>
        <nav class="nav-links" aria-label="Primary navigation">
          ${buildNav(root, currentPage)}
        </nav>
        <div class="header-actions">
          <a class="button-secondary hidden-mobile" href="${root}/owners.html#valuation">Request Valuation</a>
          <a class="button" href="#lead-form">Book Advisory Call</a>
          <button class="menu-toggle" type="button" aria-label="Open menu" data-menu-toggle>
            <span></span>
          </button>
        </div>
      </div>
      <div class="mobile-panel" data-mobile-panel>
        ${buildNav(root, currentPage)}
        <a class="button-secondary" href="${root}/owners.html#valuation">Request Valuation</a>
      </div>
    </header>
  `;
}

function buildFooter(root) {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-card surface">
          <div class="footer-top">
            <div class="stack">
              <a class="brand" href="${root}/index.html" aria-label="Rimalta home">
                <span class="brand-mark">R</span>
                <span class="brand-copy">
                  <strong>RIMALTA</strong>
                  <span>Built for speed, control, and trust.</span>
                </span>
              </a>
              <p class="micro-copy">Premium advisory, disciplined execution, and a sharper operating system for owners, buyers, tenants, and investors across the UAE.</p>
            </div>
            <div class="footer-links">
              <a href="${root}/projects.html">Projects</a>
              <a href="${root}/owners.html">For Owners</a>
              <a href="${root}/invest.html">Invest</a>
              <a href="${root}/about.html">About</a>
              <a href="${root}/index.html#insights">Insights</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${year} Rimalta. First deploy marketing site v1.</span>
            <span>Advisory requests route through the lead form below.</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function mountChrome() {
  const root = getRootPath();
  const currentPage = document.body.dataset.page || "";
  const headerMount = document.querySelector("[data-site-header]");
  const footerMount = document.querySelector("[data-site-footer]");

  if (headerMount) headerMount.innerHTML = buildHeader(root, currentPage);
  if (footerMount) footerMount.innerHTML = buildFooter(root);
}

function initHeaderBehavior() {
  const header = document.querySelector("[data-site-header-inner]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-mobile-panel]");

  if (header) {
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      });
    });
  }
}

function initReveal() {
  const items = document.querySelectorAll(".section-reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((item) => observer.observe(item));
}

function initLeadForms() {
  const forms = document.querySelectorAll("[data-mail-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const subject = `${SITE_CONFIG.advisorySubjectPrefix}: ${data.get("interest") || "Website inquiry"}`;
      const lines = [
        `Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Interest: ${data.get("interest") || ""}`,
        `Budget: ${data.get("budget") || ""}`,
        "",
        `${data.get("message") || ""}`,
      ];
      const body = encodeURIComponent(lines.join("\n"));
      const status = form.querySelector("[data-form-status]");

      if (status) {
        status.textContent = "Opening your mail client with a pre-filled advisory request.";
      }

      window.location.href = `mailto:${SITE_CONFIG.advisoryEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountChrome();
  initHeaderBehavior();
  initReveal();
  initLeadForms();
});
