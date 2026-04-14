# Rimalta Site Redesign — Design Spec
**Date:** 2026-04-14
**Status:** Approved
**Scope:** Full rebuild of rimalta-site (all 8 existing pages + 1 new page)

---

## 1. Design Direction

**Style:** Bold Modern — dark, high-contrast, Awwwards 2025 aesthetic.
Disciplined editorial typography, generous whitespace, amber accent on near-black.
No decorative gradients. No stock photo clichés. Real execution over brochure noise.

---

## 2. Design Tokens

### Colours
| Token | Value | Role |
|-------|-------|------|
| `--void` | `#0d0d0d` | Page background |
| `--surface` | `#141414` | Cards, panels |
| `--elevated` | `#1e1e1e` | Hover states |
| `--amber` | `#E8C547` | Primary accent, CTAs, eyebrows |
| `--white` | `#ffffff` | Primary text |
| `--white-50` | `rgba(255,255,255,0.5)` | Secondary text |
| `--white-12` | `rgba(255,255,255,0.12)` | Borders, dividers |

### Typography
| Role | Font | Weight | Size | Letter-spacing |
|------|------|--------|------|----------------|
| Display | Bodoni Moda | 900 | 96–140px | -4px |
| Headline | Manrope | 800 | 40–56px | -1.5px |
| Section Title | Manrope | 700 | 28–34px | -0.5px |
| Eyebrow | Manrope | 600 | 10px | +4px, uppercase, amber |
| Body | Manrope | 400 | 15–16px | normal, 1.7 line-height, white-50 |
| UI / Nav | Manrope | 500 | 11px | +2px, uppercase |

Google Fonts load: `Bodoni+Moda:opsz,ital,wght@6..96,0,400;6..96,0,900;6..96,1,400` + `Manrope:wght@300;400;500;600;700;800`

### Buttons
| Variant | Style |
|---------|-------|
| Primary | `background: #E8C547; color: #0d0d0d` — filled amber |
| Ghost white | `border: 1px solid rgba(255,255,255,0.25); color: #fff` |
| Ghost amber | `border: 1px solid #E8C547; color: #E8C547` |

### UI Components
- **Stat card:** `border-left: 2px solid #E8C547`, backdrop-filter blur, `rgba(13,13,13,0.85)` bg
- **Eyebrow line:** `::before` pseudo-element, 20px amber line + 10px gap
- **Status pill:** amber tint bg + amber border, 8px uppercase
- **Form fields:** borderless inputs, 1px rgba bottom divider, label as 8px uppercase above

---

## 3. Animations

**Library:** GSAP + ScrollTrigger (CDN)
**Interactive state:** Alpine.js (CDN)

| Element | Animation |
|---------|-----------|
| Hero display text | Fade up + slight translate, 1.2s ease, on load |
| Hero body + CTAs | Staggered fade-in, 0.2s delay each |
| Hero right photo | Slow parallax 0.3x on scroll |
| Section cards | Staggered reveal on ScrollTrigger enter, fade + translate-y 24px |
| Stat cards | Fade in with slight scale (0.96 → 1) |
| Nav | Backdrop blur + border-bottom appear on scroll past hero |

No bounce, no spin. Slow, majestic, intentional.

---

## 4. Navigation

**Structure:** Sticky, minimal.
- Left: `RIMALTA` wordmark — Manrope 700, 12px, 5px letter-spacing
- Centre: `Projects · For Owners · Invest · About` — 10px, 2px letter-spacing, white-40
- Right: `↗ Talk to us` — ghost amber button
- Behaviour: transparent over hero → `rgba(13,13,13,0.9)` + `backdrop-filter: blur(20px)` + bottom border on scroll

Mobile: logo left + hamburger right, full-screen overlay menu.

---

## 5. Pages

### 5.1 index.html — Homepage

**Section order:**

1. **Nav** (sticky, see §4)

2. **Hero** — Editorial Minimal layout
   - Left 52%: amber eyebrow `Ras Al Khaimah · UAE`, display type `UAE` + italic `RE.` (Bodoni 900, ~100px, "RE." at 35% opacity), body copy, two CTAs (`Book Advisory Call` amber filled + `Leave a brief ↓` ghost white)
   - Right 48%: project photo (real photo replaces CSS simulation), floating stat card bottom-right (`AED 800K / Entry · Mina · RAK`), scroll hint bottom-left, project tag top-right
   - Height: 580px

3. **Paths** — "Choose your path" 4-column grid
   - Numbered 01–04: Owners / Invest / Buy / Lease
   - Amber number label, title, 2-line copy, arrow link
   - Separated by 1px `rgba(255,255,255,0.06)` grid lines

4. **Projects** — SKAI + Nura side-by-side (see §5.9 for card spec)
   - Below cards: compare strip → `/compare` page

5. **Brief form** — 2-column layout (left: heading + trust signals; right: form)
   - Form fields: Name, I am looking to (Buy/Invest/Lease/List), Project interest (SKAI/Nura/Both), Budget range, Anything else
   - CTA: `Send brief →` amber filled
   - Alt: `Message on WhatsApp` button (green tint)

6. **Footer** — minimal: wordmark, nav links, location tag, copyright

---

### 5.2 projects.html — Projects overview
Grid of project cards (SKAI + Nura + future projects placeholder). Intro heading. Link to compare.

### 5.3 projects/skai.html — SKAI detail
Full project page: hero with real render, key metrics, payment plan breakdown, floor plan previews, location map section, brief CTA.

### 5.4 projects/nura.html — Nura detail
Same template as SKAI, different content and photo palette (cooler tones for Nura vs warm for SKAI).

### 5.5 owners.html — For Owners
Service description, structured intake process, lead handling, reporting. CTA to brief form.

### 5.6 invest.html — Invest
Investment thesis, project comparison summary, payment plan clarity, ROI framing. CTA to `/compare` and brief form.

### 5.7 lease.html — Lease
Responsive matching, follow-through process. CTA to brief form.

### 5.8 about.html — About
Rimalta positioning, team/advisory model, trust signals. No fluff.

### 5.9 compare.html — Project Comparison (NEW)

**Purpose:** Self-service decision tool for investors and end-users choosing between SKAI and Nura.

**Structure:**
1. Eyebrow + heading: "SKAI vs Nura. Which fits your goals?"
2. **Profile toggle** (Alpine.js): `Я инвестирую` / `Я покупаю для себя` — switches metric priority
3. **Comparison table / side-by-side cards:**
   - Shared base facts: Developer, Location, Delivery date, Unit types, Starting price
   - Investor mode adds: Expected rental yield, Capital appreciation outlook, Payment plan structure, Liquidity rating
   - End-user mode adds: Unit layouts, View types, Community amenities, Lifestyle positioning, Move-in readiness
4. **Recommendation strip:** based on selected profile, a short advisory note nudges toward the right project
5. **Brief form** embedded at bottom (same component as homepage)

---

## 6. File Structure Changes

```
rimalta-site/
├── index.html              ← full rebuild
├── projects.html           ← rebuild
├── owners.html             ← rebuild
├── invest.html             ← rebuild
├── lease.html              ← rebuild
├── about.html              ← rebuild
├── compare.html            ← NEW
├── projects/
│   ├── skai.html           ← rebuild
│   └── nura.html           ← rebuild
├── styles/
│   └── site.css            ← full replacement
└── scripts/
    └── site.js             ← partial rebuild (add GSAP init, Alpine data, nav scroll behaviour)
```

CDN dependencies added to all pages:
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js" defer></script>
```

---

## 7. Implementation Approach

**Full rebuild** — complete replacement of `site.css`, full HTML rebuild page by page.
No backwards-compatibility shims. Old design tokens removed entirely.

Build order (recommended):
1. `site.css` — design tokens + base styles + nav + buttons + typography utilities
2. `index.html` — homepage (validates the full system)
3. `compare.html` — new page, most logic
4. Remaining 7 pages using established patterns

Photos: CSS gradient simulations used in mockups are replaced with real project renders/photos when available. Until then, CSS simulations remain as placeholders with `<!-- TODO: replace with real photo -->` comments.

---

## 8. Execution Rules

These rules govern all implementation decisions:

**Mobile is first-class.** Every layout, component, and interaction must be fully designed for mobile — not adapted from desktop. Mobile experience is not allowed to be worse than desktop in any respect: hierarchy, readability, CTA accessibility, or visual quality.

**Commercial hierarchy must be preserved through the redesign:**
1. Owners first — owner services are the primary business relationship
2. Investors / buyers second
3. Project inquiries third
4. Rental path must not dilute the premium advisory positioning

**Awards-level design is a quality target, not a design excuse.** Visual ambition must not weaken:
- Clarity of routing (user always knows where to go next)
- Trust signals (credentials, process, response commitment)
- CTA architecture (primary action is always visible and unambiguous)
- Commercial hierarchy (see above)

If a design choice makes the site more beautiful but less clear or less converting, the design choice loses.

---

## 9. Out of Scope

- Backend / form submission logic (form submits to existing handler or mailto, no change)
- CMS or dynamic content
- Multi-language (English only for now)
- Analytics/tracking setup
