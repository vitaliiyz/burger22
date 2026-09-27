const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:4173';

const pages = [
    {
        name: 'home page',
        path: '/',
        expectedPaths: {
            home: 'index.html',
            menu: 'menu/index.html',
            contact: 'contact.html'
        },
        currentLink: 'home'
    },
    {
        name: 'menu page',
        path: '/menu/',
        expectedPaths: {
            home: '../index.html',
            menu: 'index.html',
            contact: '../contact.html'
        },
        currentLink: 'menu'
    },
    {
        name: 'contact page',
        path: '/contact.html',
        expectedPaths: {
            home: 'index.html',
            menu: 'menu/index.html',
            contact: 'contact.html'
        },
        currentLink: 'contact'
    }
];

const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/burger22.pl'
    },
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/share/14Jwx2EtbrD'
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

function getHeaderLink(header, translationKey) {
    return header.locator(`a:has([data-i18n="burger.${translationKey}"])`);
}

async function expectMenuOpen(page) {
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveClass(/\bactive\b/);
    await expect(page.locator('#burgerMenuOverlay')).toHaveClass(/\bactive\b/);
    await expect(page.locator('#burgerMenuOverlay')).toBeVisible();
    await expect.poll(() => page.locator('body').evaluate((body) => body.style.overflow)).toBe('hidden');
}

async function expectMenuClosed(page) {
    await expect(page.getByRole('button', { name: 'Menu' })).not.toHaveClass(/\bactive\b/);
    await expect(page.locator('#burgerMenuOverlay')).not.toHaveClass(/\bactive\b/);
    await expect(page.locator('#burgerMenuOverlay')).toBeHidden();
    await expect.poll(() => page.locator('body').evaluate((body) => body.style.overflow)).toBe('');
}

for (const pageUnderTest of pages) {
    test.describe(pageUnderTest.name, () => {
        test('loads the shared header and footer dynamically', async ({ page }) => {
            const headerResponse = page.waitForResponse((response) =>
                response.url().endsWith('/common/header.html')
            );
            const footerResponse = page.waitForResponse((response) =>
                response.url().endsWith('/common/footer.html')
            );

            await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });

            await expect((await headerResponse).ok()).toBe(true);
            await expect((await footerResponse).ok()).toBe(true);
            await expect(page.locator('#common-header').getByRole('button', { name: 'Menu' })).toBeVisible();
            await expect(page.locator('#common-footer').locator('footer')).toBeVisible();
        });

        test('replaces header path placeholders and uses the expected links', async ({ page }) => {
            await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });

            const header = page.locator('#common-header');
            await expect(header.getByRole('button', { name: 'Menu' })).toBeVisible();

            await expect(getHeaderLink(header, 'home')).toHaveAttribute(
                'href',
                pageUnderTest.expectedPaths.home
            );
            await expect(getHeaderLink(header, 'menu')).toHaveAttribute(
                'href',
                pageUnderTest.expectedPaths.menu
            );
            await expect(getHeaderLink(header, 'contact')).toHaveAttribute(
                'href',
                pageUnderTest.expectedPaths.contact
            );
            expect(await header.innerHTML()).not.toMatch(/INDEX_PATH|MENU_PATH|CONTACT_PATH/);
        });

        test('opens and closes the burger menu through every supported action', async ({ page }) => {
            await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });

            const burgerButton = page.getByRole('button', { name: 'Menu' });
            const overlay = page.locator('#burgerMenuOverlay');
            await expect(burgerButton).toBeVisible();
            await expectMenuClosed(page);

            await burgerButton.click();
            await expectMenuOpen(page);

            await burgerButton.click();
            await expectMenuClosed(page);

            await burgerButton.click();
            await expectMenuOpen(page);

            await overlay.click({ position: { x: 10, y: 100 } });
            await expectMenuClosed(page);

            await burgerButton.click();
            await expectMenuOpen(page);

            const currentPageLink = getHeaderLink(
                page.locator('#common-header'),
                pageUnderTest.currentLink
            );
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                currentPageLink.click()
            ]);
            await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
            await expectMenuClosed(page);
        });

        test('uses safe attributes on footer social links', async ({ page }) => {
            await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });

            const footer = page.locator('#common-footer');
            await expect(footer.locator('footer')).toBeVisible();

            for (const socialLink of socialLinks) {
                const link = footer.getByRole('link', { name: socialLink.name });
                await expect(link).toHaveAttribute('href', socialLink.href);
                await expect(link).toHaveAttribute('target', '_blank');
                await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            }
        });
    });
}
