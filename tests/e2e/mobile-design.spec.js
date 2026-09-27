const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:4173';
const MOBILE_WIDTHS = [320, 390, 768];

test.beforeEach(async ({ page }) => {
    await page.route('**/*', async (route) => {
        if (new URL(route.request().url()).origin === BASE_URL) {
            await route.continue();
            return;
        }

        await route.abort();
    });
});

async function expectNoPageOverflow(page) {
    await expect.poll(() => page.evaluate(() =>
        document.documentElement.scrollWidth <= document.documentElement.clientWidth
    )).toBe(true);
}

async function expectWithinViewport(page, locator) {
    await expect(locator).toBeVisible();
    await locator.scrollIntoViewIfNeeded();
    const bounds = await locator.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds.width).toBeGreaterThan(0);
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width);
}

for (const width of MOBILE_WIDTHS) {
    test(`${width}px: content, navigation and language stay usable`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        const heroMenu = page.getByRole('link', { name: 'Zobacz menu' });
        const heroOrder = page.locator('.home-hero__actions [data-i18n="actions.order"]');
        await expect(page.locator('.home-hero h1')).toHaveText('Prawdziwy smak burgera.');
        await expectWithinViewport(page, heroMenu);
        await expectWithinViewport(page, heroOrder);
        await expect(heroOrder).toHaveAccessibleName('Zamów online');
        await expect(heroOrder).toHaveAttribute('href', 'https://order.site/burger-22');
        await expectWithinViewport(page, page.locator('.product-card__price').first());
        await expect(page.locator('.product-card__price').first()).toContainText('zł');
        await expectNoPageOverflow(page);

        const english = page.locator('#common-header .lang-btn[data-lang="en"]');
        await expectWithinViewport(page, english);
        await english.click();
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await expect(page.locator('.home-hero h1')).toHaveText('The real taste of a burger.');
        await expect.poll(() => page.evaluate(() => localStorage.getItem('burgerLang'))).toBe('en');
        await expectNoPageOverflow(page);

        await page.getByRole('link', { name: 'See the menu' }).click();
        await expect(page).toHaveURL(/\/menu\/index\.html$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await expect(page.locator('#menuNav [data-section="burgery"]')).toHaveText('Burgers');
        await expect(page.locator('#burgerGrid .menu-item')).toHaveCount(8);
        await expectWithinViewport(page, page.locator('#burgerGrid .item-price').first());
        await expect(page.locator('#burgerGrid .item-price').first()).toContainText('zł');
        await expectWithinViewport(page, page.locator('.extras-list .row-price').first());
        await expect(page.locator('.extras-list .row-price').first()).toContainText('zł');
        await expectWithinViewport(page, page.locator('.mobile-order-cta'));
        await expect(page.locator('.mobile-order-cta')).toHaveAccessibleName('Order online');
        await expect(page.locator('.mobile-order-cta')).toHaveAttribute('href', 'https://order.site/burger-22');
        await expectNoPageOverflow(page);

        const burgerButton = page.locator('#burgerMenuBtn');
        await expectWithinViewport(page, burgerButton);
        await burgerButton.click();
        const contactLink = page.locator('#burgerMenuOverlay a:has([data-i18n="burger.contact"])');
        await expectWithinViewport(page, contactLink);
        await contactLink.click();
        await expect(page).toHaveURL(/\/menu\/index\.html#kontakt$/);
        await expect(page.locator('#burgerMenuOverlay')).toBeHidden();
        await expect(page.locator('#kontakt')).toBeInViewport();
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await expect(page.locator('#kontakt [data-i18n="location.contactLabel"]')).toHaveText('Contact');
        await expectWithinViewport(page, page.locator('#common-header .lang-btn[data-lang="pl"]'));

        await page.locator('#common-header .lang-btn[data-lang="pl"]').click();
        await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
        await expect(page.locator('#kontakt [data-i18n="location.contactLabel"]')).toHaveText('Kontakt');
        await burgerButton.click();
        await page.locator('#burgerMenuOverlay a:has([data-i18n="burger.home"])').click();
        await expect(page).toHaveURL(/\/index\.html$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
        await expect(page.locator('.home-hero h1')).toHaveText('Prawdziwy smak burgera.');
    });
}
