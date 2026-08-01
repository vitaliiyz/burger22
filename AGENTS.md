# Repository Guidelines

## Project Overview

Burger 22 is a bilingual (Polish/English), mobile-first static website for the Burger 22 restaurant in Wrocław. It uses plain HTML, CSS, and JavaScript without a frontend build step.

The public pages are:

- `/` — landing page, Google review excerpts, and online-order options.
- `/menu/` — menu, prices, takeaway information, and section navigation.
- `/contact.html` — opening hours, contact details, social links, and map.
- `/order/` — redirect to the external ordering service at `order.site/burger-22`.

A Cloudflare Worker remains in the repository for Telegram order handling, but the current public UI sends customers to the external ordering service. Do not reintroduce the removed cart or make the Worker the primary ordering flow unless explicitly requested.

## Project Structure

- `index.html`, `styles.css`, `home.js` — landing page and delivery modal.
- `reviews-data.js` — manually verified Google rating and selected review excerpts displayed on the landing page.
- `menu/index.html`, `menu/styles.css`, `menu/app.js`, `menu/translations.js` — menu page.
- `contact.html`, `contact-styles.css`, `contact.js` — contact page.
- `common/common.js`, `common/common.css` — shared config, translations, generated header/footer, navigation, and styles.
- `common/images/`, `menu/images/` — shared and menu assets.
- `order/index.html`, `_redirects` — browser and hosting redirects to the external ordering service.
- `cloudflare-worker.js`, `wrangler.toml` — legacy/currently non-primary Telegram order endpoint.
- `.github/workflows/deploy-worker.yml` — Worker deployment workflow.

The shared header and footer are generated directly by `common/common.js`. There are no `common/header.html` or `common/footer.html` templates.

## Development Commands

- No install or build step is required.
- Run the site locally from the repository root:
  `python3 -m http.server 8000`
- Open `http://localhost:8000/` and test page navigation over HTTP; opening HTML files directly does not represent production behavior reliably.
- Optional Worker development: `wrangler dev` (requires Wrangler and a local `.dev.vars`).

## Coding Conventions

- Use 4-space indentation in HTML, CSS, and frontend JavaScript. Preserve a file's existing style in Worker code.
- Keep the frontend dependency-free and compatible with modern mobile Safari and Chrome.
- Treat responsive behavior as a primary requirement. Validate narrow, medium, and large mobile widths plus desktop.
- Use `data-i18n` for user-facing Polish/English text. Keep both languages in sync.
- Shared restaurant data belongs in `common/common.js`; page-specific translations stay in `home.js`, `contact.js`, or `menu/translations.js`.
- Wrap `localStorage` access in `try/catch`.
- Prefer safe DOM APIs such as `textContent` for untrusted or externally maintained content. Only use `innerHTML` for controlled translations that intentionally contain markup.
- Keep external links using `target="_blank"` paired with `rel="noopener noreferrer"`.

## Important Data Flows

- Language is stored under `burgerLang`; default language is Polish.
- `window.CommonUtils` owns shared config, translation helpers, header/footer rendering, and language switching.
- `languageChanged` notifies page scripts to reapply their translations.
- Direct-order links use `https://order.site/burger-22`. Keep `home.js`, `menu/index.html`, `order/index.html`, and `_redirects` consistent when changing it.
- Google review content is rendered from `window.BURGER22_GOOGLE_REVIEWS` in `reviews-data.js`. Update `lastVerified`, rating, count, URL, and excerpts only from a newly checked public source.

## Cache Busting

Mobile Safari and other browsers may keep stale CSS and JavaScript aggressively. After changing a visible stylesheet, translation file, data file, or script, update its `?v=...` query in every HTML file that loads it. Shared `common/common.css` and `common/common.js` versions must stay aligned across all pages.

## Validation Checklist

There are no automated tests. For relevant changes, manually verify:

- Home, menu, contact, and `/order/` routes load without console errors.
- PL/EN switching updates the current page and persists across navigation.
- Header, footer, mobile menu, phone/copy actions, and external links work.
- Landing-page review cards and the delivery modal render correctly.
- Menu section navigation, prices, translations, and images match.
- Layout has no overflow at narrow, medium, and large mobile widths.
- Changed assets are cache-busted in the corresponding HTML.

Also run `git diff --check` before committing.

## Git and Deployment

- Preserve unrelated working-tree changes.
- Use short imperative English commit messages.
- Include screenshots for visible UI changes and mention translation/assets updates in PR descriptions.
- The Worker workflow deploys on changes to its source/config on the branches listed in `.github/workflows/deploy-worker.yml`; verify the workflow before describing deployment behavior.
- The static site's hosting/deployment pipeline is not configured in this repository, so do not claim a specific host without external confirmation.

## Security

- Never commit secrets. Store local Worker secrets in `.dev.vars` and deployment secrets in the configured CI/Cloudflare secret store.
- Preserve the Worker's origin checks, validation, escaping, and rate limiting unless a task explicitly changes them.
- Do not expose Telegram or Cloudflare credentials in documentation, code, logs, or screenshots.
