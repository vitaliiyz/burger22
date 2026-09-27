const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:4173';

const pages = [
    {
        name: 'home page',
        path: '/',
        content: '.home-hero h1'
    },
    {
        name: 'menu page',
        path: '/menu/',
        content: '#burgery .menu-grid'
    }
];

test.beforeEach(async ({ page }) => {
    await page.route('**/*', async (route) => {
        const requestUrl = new URL(route.request().url());

        if (requestUrl.origin === BASE_URL) {
            await route.continue();
            return;
        }

        await route.abort();
    });
});

for (const pageUnderTest of pages) {
    test(`${pageUnderTest.name} renders local content and shared components`, async ({ page }) => {
        await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });

        await expect(page.locator(pageUnderTest.content)).toBeVisible();
        await expect(page.locator('#common-header .site-header')).toBeVisible();
        await expect(page.locator('#common-footer .footer')).toBeVisible();
    });
}

test('legacy contact page redirects to the shared homepage section', async ({ page }) => {
    await page.goto('/contact.html', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(`${BASE_URL}/#kontakt`);
    await expect(page.locator('#kontakt')).toBeVisible();
});
