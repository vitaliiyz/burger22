# Repository Guidelines

## Project Structure & Module Organization
- `index.html`, `styles.css`, `home.js`: main landing page and entry navigation.
- `menu/`: primary menu experience (`index.html`, `app.js`, `styles.css`, `translations.js`).
- `common/`: shared UI and logic (`common.js`, `common.css`, `header.html`, `footer.html`, `images/`).
- `cloudflare-worker.js` and `wrangler.toml`: serverless order handler (Telegram integration).
- Assets: product photos in `menu/images/`; shared hero, logo, and icons in `common/images/`.

## Build, Test, and Development Commands
- No build step is required; this is a static site.
- Local preview (static): `python3 -m http.server` from the repo root.
- Worker development (optional): `wrangler dev` (requires Wrangler installed and `.dev.vars` for secrets).

## Coding Style & Naming Conventions
- Indentation: 4 spaces in HTML/CSS/JS.
- JavaScript: vanilla ES6+, event-driven patterns, globals exposed on `window`.
- CSS: BEM-like class naming (e.g., `.nav-item`, `.burger-menu-btn`), mobile-first.
- i18n: all translatable strings use `data-i18n` and page-specific `translations.js`.
- Storage: `localStorage` access should be wrapped in `try/catch`.
- Constants: UPPERCASE for configuration values.
- Photos: use descriptive English filenames and WebP. Menu-card photos should include
  `loading="lazy"` and `decoding="async"`; keep PNG only for logos and icons where appropriate.

## Testing Guidelines
- There are no automated tests in this repo.
- Manual checks:
  - Switch PL/EN and validate translations.
  - Open the home, menu, contact, and `/order/` pages through a local HTTP server.
  - Verify menu photos load, the hero background renders, and public order links open
    `https://order.site/burger-22`.
  - Test the Worker separately only when Worker code or configuration changes.

## Responsive Design Priority
- Responsive behavior is critical for this project: most users visit from mobile devices with different screen sizes.
- Treat mobile UX as a primary requirement for every UI change.
- Validate layouts on small, medium, and large mobile widths (including narrow screens) and ensure no text, buttons, or prices overflow the viewport.

## Commit & Pull Request Guidelines
- Commit messages are short, imperative English (e.g., “Add …”, “Remove …”).
- PRs should include a clear summary and screenshots for UI changes.
- Note any updates to translations and assets in the PR description.

## Operational Notes
- The public ordering flow uses `https://order.site/burger-22` as the primary CTA. The Cloudflare
  Worker remains in the repository but is not the primary ordering UI.
- This is a static site and Safari/mobile browsers may keep stale CSS/JS aggressively. When changing visible UI, translations, or frontend logic, update the corresponding asset version query in HTML (`styles.css?v=...`, `translations.js?v=...`, `app.js?v=...`, shared `common/*.css/js`) so users reliably receive fresh files without manual cache clearing.
- Active photos use WebP. The supported browser baseline therefore excludes Internet Explorer and
  Safari 13 or older; current Chrome, Edge, Firefox, Safari, and Opera are supported.

## Security & Configuration Tips
- Do not commit secrets. Use `.dev.vars` locally and Cloudflare/Wrangler secrets in production.
- Ensure allowed origins and rate limits remain intact in `cloudflare-worker.js`.
