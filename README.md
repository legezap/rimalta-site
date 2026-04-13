# Rimalta Public Site

This repository contains the public-facing `Rimalta` website only.

## Scope

Current pages:

- `index.html`
- `projects.html`
- `owners.html`
- `invest.html`
- `about.html`
- `projects/skai.html`
- `projects/nura.html`

## Implementation Notes

- static HTML/CSS/JS for a fast first deploy
- shared navigation and footer rendered from `scripts/site.js`
- project imagery sourced from the approved `SKAI` and `Nura` asset packs
- forms currently open a pre-filled advisory email for first-release handling

## Important Placeholder

The current advisory destination email is configured in:

- `scripts/site.js`

Current placeholder:

- `hello@rimalta.ae`

Replace it before public launch if a different address should receive website inquiries.

## GitHub Pages

This repository is ready for GitHub Pages via:

- `.nojekyll`
- `.github/workflows/deploy-site.yml`

Once `Pages -> Source` is set to `GitHub Actions`, pushes to `main` can deploy the site.
