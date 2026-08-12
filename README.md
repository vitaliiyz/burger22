# Burger 22

Static bilingual website for Burger 22 in Wrocław. It contains the landing page, menu, contact
page, and redirects visitors to the public online-ordering service.

The frontend uses HTML, CSS, and vanilla JavaScript. It has no build step or frontend package
installation.

## Project structure

```text
.
├── index.html                  # Landing page
├── styles.css
├── home.js
├── contact.html                # Contact page and map
├── contact-styles.css
├── contact.js
├── common/
│   ├── common.js              # Shared header/footer loading and translations
│   ├── common.css
│   ├── header.html
│   ├── footer.html
│   └── images/                # Shared hero, logos, and icons
├── menu/
│   ├── index.html              # Menu content and prices
│   ├── translations.js         # Polish and English menu copy
│   ├── app.js
│   ├── styles.css
│   └── images/                # Optimized WebP product photos
├── order/index.html            # Browser redirect to the ordering service
├── _redirects                   # Hosting redirect for /order
├── cloudflare-worker.js         # Separate Telegram order endpoint
├── wrangler.toml
└── .github/workflows/deploy-worker.yml
```

## Local preview

Run from the repository root:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000/](http://localhost:8000/). Use an HTTP server instead of opening
HTML files directly because shared header and footer fragments are loaded with `fetch`.

## Content and translations

- Landing-page text: `home.js`
- Menu items and prices: `menu/index.html`
- Polish and English menu text: `menu/translations.js`
- Contact-page text: `contact.js`
- Shared navigation, footer translations, hours, and contact details: `common/common.js` and the
  shared HTML fragments

The selected language is stored in `localStorage` under `burgerLang`. Translatable elements use
`data-i18n`, and page scripts react to the shared `languageChanged` event.

When changing menu content, keep the Polish and English variants synchronized. Prices are normally
stored in `menu/index.html`, while translated names and descriptions are stored in
`menu/translations.js`.

## Images

Active photographs use WebP:

- the shared hero image is `common/images/header.webp`;
- menu product photos are in `menu/images/`;
- menu-card images use `loading="lazy"` and `decoding="async"`.

Use descriptive English filenames for new photos. Resize unnecessarily large sources before
committing them, update the corresponding HTML or CSS reference, and remove the replaced source
asset after verifying that no references remain. PNG remains appropriate for logos and icons.

WebP is supported by current Chrome, Edge, Firefox, Safari, and Opera. The site does not provide a
legacy image fallback for Internet Explorer or Safari 13 and older.

## Ordering and Worker

The primary public order URL is `https://order.site/burger-22`. It is linked from the landing page
and menu, while `/order/` redirects there through both `_redirects` and `order/index.html`.

`cloudflare-worker.js` is retained as a separate Telegram order endpoint. To run it locally, install
Wrangler and create an uncommitted `.dev.vars` file containing the required secrets, for example:

```text
TELEGRAM_BOT_TOKEN=YOUR_TOKEN
```

Never commit tokens or other secrets. The GitHub workflow deploys only the Worker-related files;
static-site deployment is not defined in this repository.

## Cache busting

Safari and mobile browsers may cache frontend assets aggressively. After changing visible CSS,
JavaScript, translations, or shared assets, update the relevant query version in every HTML page
that consumes the file:

```html
<link rel="stylesheet" href="styles.css?v=YYYYMMDD-N">
<script src="translations.js?v=YYYYMMDD-N"></script>
```

Keep shared `common/common.css` and `common/common.js` versions synchronized across the landing,
menu, and contact pages.

## Verification

Before committing frontend changes:

1. Preview the site through a local HTTP server.
2. Open the landing, menu, contact, and `/order/` pages.
3. Switch PL/EN and verify translated content.
4. Check menu images, prices, hero backgrounds, navigation, footer, and order links.
5. Test narrow mobile, medium/tablet, and desktop widths with no horizontal overflow.
6. Confirm changed assets have updated cache versions.
7. Run syntax and whitespace checks relevant to the change, including `git diff --check`.

There are currently no automated frontend tests.
