const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:4173';
const pages = [
    { path: '/', name: 'homepage' },
    { path: '/menu/', name: 'menu' }
];
const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
];
const languages = [
    { code: 'pl', contact: 'Kontakt', order: 'Zamów online' },
    { code: 'en', contact: 'Contact', order: 'Order online' }
];

test.beforeEach(async ({ page }) => {
    await page.route('**/*', async (route) => {
        if (new URL(route.request().url()).origin === BASE_URL) {
            await route.continue();
            return;
        }
        await route.abort();
    });
});

async function expectContactClearOfHeader(page, isMenuPage) {
    await expect.poll(() => page.evaluate((checkMenuNav) => {
        const section = document.getElementById('kontakt');
        const headerBottom = document.getElementById('common-header').getBoundingClientRect().bottom;
        const menuBottom = checkMenuNav ? document.getElementById('menuNav').getBoundingClientRect().bottom : 0;
        const sectionTop = section.getBoundingClientRect().top;
        return sectionTop >= Math.max(headerBottom, menuBottom) - 2
            && section.querySelector('#location-title').getBoundingClientRect().top < window.innerHeight;
    }, isMenuPage)).toBe(true);
}

for (const pageUnderTest of pages) {
    for (const viewport of viewports) {
        for (const language of languages) {
            test(`${pageUnderTest.name} ${viewport.name} ${language.code}: contact stays on page`, async ({ page }) => {
                await page.setViewportSize(viewport);
                await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });
                await expect(page.locator('#kontakt')).toBeAttached();

                await page.locator(`#common-header .lang-btn[data-lang="${language.code}"]`).click();
                await expect(page.locator('html')).toHaveAttribute('lang', language.code);

                const mobile = viewport.name === 'mobile';
                if (mobile) {
                    await page.locator('#burgerMenuBtn').click();
                    await expect(page.locator('#burgerMenuOverlay')).toHaveClass(/\bactive\b/);
                }

                const contactLink = mobile
                    ? page.locator('#burgerMenuOverlay a:has([data-i18n="burger.contact"])')
                    : page.locator('.site-header__nav [data-i18n="burger.contact"]');
                if (mobile) {
                    await expect(contactLink.locator('[data-i18n="burger.contact"]')).toHaveText(language.contact);
                } else {
                    await expect(contactLink).toHaveText(language.contact);
                }
                await expect(contactLink).toHaveAttribute('href', '#kontakt');
                await contactLink.click();

                await expect(page).toHaveURL(`${BASE_URL}${pageUnderTest.path}#kontakt`);
                await expect(page.locator('#kontakt [data-i18n="location.contactLabel"]')).toHaveText(language.contact);
                await expectContactClearOfHeader(page, pageUnderTest.path === '/menu/');

                if (mobile) {
                    await expect(page.locator('#burgerMenuOverlay')).not.toHaveClass(/\bactive\b/);
                    await expect.poll(() => page.locator('body').evaluate(body => body.style.overflow)).toBe('');
                }

                const orderLink = mobile
                    ? page.locator('.mobile-order-cta')
                    : page.locator('.site-header__order');
                await expect(orderLink).toHaveText(language.order);
                await expect(orderLink).toHaveAttribute('href', 'https://order.site/burger-22');

                if (mobile) {
                    await page.locator('#burgerMenuBtn').click();
                }
                const menuLink = mobile
                    ? page.locator('#burgerMenuOverlay a:has([data-i18n="burger.menu"])')
                    : page.locator('.site-header__nav [data-i18n="burger.menu"]');
                await menuLink.click();
                await expect(page).toHaveURL(`${BASE_URL}/menu/index.html`);
                await expect(page.locator('html')).toHaveAttribute('lang', language.code);
            });
        }
    }

    test(`${pageUnderTest.name}: direct contact hash works after shared section loads`, async ({ page }) => {
        await page.goto(`${pageUnderTest.path}#kontakt`, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('#kontakt')).toBeAttached();
        await expectContactClearOfHeader(page, pageUnderTest.path === '/menu/');
    });
}
