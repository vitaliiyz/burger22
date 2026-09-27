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
    return header.locator(`.burger-menu-nav a:has([data-i18n="burger.${translationKey}"])`);
}

const MOBILE_VIEWPORT = { width: 390, height: 844 };

async function expectMenuOpen(page) {
    await expect(page.locator('#common-header #burgerMenuBtn')).toHaveClass(/\bactive\b/);
    await expect(page.locator('#burgerMenuOverlay')).toHaveClass(/\bactive\b/);
    await expect(page.locator('#burgerMenuOverlay')).toBeVisible();
    await expect.poll(() => page.locator('body').evaluate((body) => body.style.overflow)).toBe('hidden');
}

async function expectMenuClosed(page) {
    await expect(page.locator('#common-header #burgerMenuBtn')).not.toHaveClass(/\bactive\b/);
    await expect(page.locator('#burgerMenuOverlay')).not.toHaveClass(/\bactive\b/);
    await expect(page.locator('#burgerMenuOverlay')).toBeHidden();
    await expect.poll(() => page.locator('body').evaluate((body) => body.style.overflow)).toBe('');
}

for (const pageUnderTest of pages) {
    test.describe(pageUnderTest.name, () => {
        test('loads the shared header and footer dynamically', async ({ page }) => {
            const headerResponse = page.waitForResponse((response) => {
                const url = new URL(response.url());
                return url.pathname.endsWith('/common/header.html') && url.searchParams.has('v');
            });
            const footerResponse = page.waitForResponse((response) => {
                const url = new URL(response.url());
                return url.pathname.endsWith('/common/footer.html') && url.searchParams.has('v');
            });

            await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });

            await expect((await headerResponse).ok()).toBe(true);
            await expect((await footerResponse).ok()).toBe(true);
            if (pageUnderTest.path === '/contact.html') {
                await expect(page.locator('#common-header #burgerMenuBtn')).toBeVisible();
            } else {
                await expect(page.locator('#common-header .site-header')).toBeVisible();
            }
            await expect(page.locator('#common-footer').locator('footer')).toBeVisible();
        });

        test('replaces header path placeholders and uses the expected links', async ({ page }) => {
            await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });

            const header = page.locator('#common-header');
            if (pageUnderTest.path === '/contact.html') {
                await expect(header.locator('#burgerMenuBtn')).toBeVisible();
            } else {
                await expect(header.locator('.site-header')).toBeVisible();
            }

            const desktopNav = header.locator('.site-header__nav');
            if (pageUnderTest.path !== '/contact.html') {
                await expect(desktopNav).toBeVisible();
                await expect(header.locator('#burgerMenuBtn')).toBeHidden();
            }

            await expect(header.locator('.site-header__logo')).toHaveAttribute(
                'href',
                pageUnderTest.expectedPaths.home
            );
            await expect(desktopNav.locator('[data-i18n="burger.menu"]')).toHaveAttribute(
                'href',
                pageUnderTest.expectedPaths.menu
            );
            await expect(desktopNav.locator('[data-i18n="burger.contact"]')).toHaveAttribute(
                'href',
                pageUnderTest.expectedPaths.contact
            );

            await page.setViewportSize(MOBILE_VIEWPORT);
            await expect(header.locator('#burgerMenuBtn')).toBeVisible();
            if (pageUnderTest.path !== '/contact.html') {
                await expect(desktopNav).toBeHidden();
            }

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
            await page.setViewportSize(MOBILE_VIEWPORT);
            await page.goto(pageUnderTest.path, { waitUntil: 'domcontentloaded' });

            const burgerButton = page.locator('#common-header #burgerMenuBtn');
            const overlay = page.locator('#burgerMenuOverlay');
            await expect(burgerButton).toBeVisible();
            await expectMenuClosed(page);

            await burgerButton.click();
            await expectMenuOpen(page);

            await burgerButton.click();
            await expectMenuClosed(page);

            await burgerButton.click();
            await expectMenuOpen(page);

            await overlay.click({ position: { x: 10, y: 10 } });
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
            await expect(page.locator('#common-header #burgerMenuBtn')).toBeVisible();
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
