# Repository Guidelines

## Project Structure & Module Organization
- `index.html`, `styles.css`, `home.js`: main landing page and entry navigation.
- `menu/`: primary menu experience (`index.html`, `app.js`, `styles.css`, `translations.js`).
- `menu-beta/`: beta menu with online ordering enhancements; content should mirror `menu/`.
- `cart/`: cart and checkout flow (`index.html`, `app.js`, `styles.css`, `translations.js`).
- `common/`: shared UI and logic (`common.js`, `cart.js`, `common.css`, `header.html`, `footer.html`, `images/`).
- `cloudflare-worker.js` and `wrangler.toml`: serverless order handler (Telegram integration).
- Assets: product and brand images in `menu/images/` and `common/images/`.

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

## Testing Guidelines
- There are no automated tests in this repo.
- Manual checks:
  - Add/remove items in cart and verify totals.
  - Switch PL/EN and validate translations.
  - Submit a test order via the Worker (if configured).

## Responsive Design Priority
- Responsive behavior is critical for this project: most users visit from mobile devices with different screen sizes.
- Treat mobile UX as a primary requirement for every UI change.
- Validate layouts on small, medium, and large mobile widths (including narrow screens) and ensure no text, buttons, or prices overflow the viewport.

## Commit & Pull Request Guidelines
- Commit messages are short, imperative English (e.g., “Add …”, “Remove …”).
- PRs should include a clear summary and screenshots for UI changes.
- Note any updates to translations and assets in the PR description.

## Operational Notes
- Online ordering via the site is not production-ready yet. Do not make it the primary CTA until it is tested and validated.
- Keep `menu-beta/` products, descriptions, and base styles in sync with `menu/`; update both when menu content changes.

## Security & Configuration Tips
- Do not commit secrets. Use `.dev.vars` locally and Cloudflare/Wrangler secrets in production.
- Ensure allowed origins and rate limits remain intact in `cloudflare-worker.js`.
