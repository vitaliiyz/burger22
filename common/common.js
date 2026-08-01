// Common JavaScript for all pages - Burger 22

const commonConfig = {
    phone: {
        display: '+48 573 256 526',
        href: 'tel:+48573256526'
    },
    email: 'burger22.wroclaw@gmail.com',
    address: {
        street: 'Henryka Probusa 11',
        postalCity: '50-242 Wrocław',
        footer: 'Henryka Probusa 11, Wrocław',
        copy: 'Henryka Probusa 11, 50-242 Wrocław'
    },
    hours: {
        pl: 'Pn-Nd: 12:00 - 22:00',
        en: 'Mon-Sun: 12:00 PM - 10:00 PM'
    },
    social: {
        instagram: {
            label: '@burger22.pl',
            url: 'https://www.instagram.com/burger22.pl'
        },
        facebook: {
            label: 'Burger 22',
            url: 'https://www.facebook.com/share/14Jwx2EtbrD'
        }
    },
    pages: {
        home: 'index.html',
        menu: 'menu/index.html',
        contact: 'contact.html'
    },
    copyright: '2025 Burger 22'
};

const commonTranslations = {
    pl: {
        notice: {
            title: 'Czwartek 8 stycznia — nieczynne',
            message: 'W czwartek 8 stycznia lokal jest zamknięty. Przepraszamy za utrudnienia.'
        },
        burger: {
            home: 'Strona główna',
            menu: 'Menu',
            contact: 'Kontakt'
        },
        footer: {
            hours: 'Godziny otwarcia',
            'hours-info': commonConfig.hours.pl,
            contact: 'Kontakt',
            social: 'Znajdź nas',
            rights: 'Wszelkie prawa zastrzeżone'
        }
    },
    en: {
        notice: {
            title: 'Thursday, January 8 — Closed',
            message: 'We are closed on Thursday, January 8. Sorry for the inconvenience.'
        },
        burger: {
            home: 'Home',
            menu: 'Menu',
            contact: 'Contact'
        },
        footer: {
            hours: 'Opening Hours',
            'hours-info': commonConfig.hours.en,
            contact: 'Contact',
            social: 'Find Us',
            rights: 'All rights reserved'
        }
    }
};

function getStoredLanguage() {
    try {
        return localStorage.getItem('burgerLang') || 'pl';
    } catch (error) {
        return 'pl';
    }
}

let currentLang = getStoredLanguage();

function getPagePaths() {
    const isInMenuFolder = window.location.pathname.includes('/menu/');
    if (!isInMenuFolder) return commonConfig.pages;

    return {
        home: '../index.html',
        menu: 'index.html',
        contact: '../contact.html'
    };
}

function renderHeader() {
    const header = document.getElementById('common-header');
    if (!header) return;

    const paths = getPagePaths();
    header.innerHTML = `
        <button class="burger-menu-btn" id="burgerMenuBtn" aria-label="Menu">
            <span></span><span></span><span></span>
        </button>
        <div class="burger-menu-overlay" id="burgerMenuOverlay">
            <nav class="burger-menu-nav">
                <a href="${paths.home}" class="burger-menu-item">
                    <span class="burger-menu-icon">🏠</span>
                    <span data-i18n="burger.home">Strona główna</span>
                </a>
                <a href="${paths.menu}" class="burger-menu-item">
                    <span class="burger-menu-icon">📖</span>
                    <span data-i18n="burger.menu">Menu</span>
                </a>
                <a href="${paths.contact}" class="burger-menu-item">
                    <span class="burger-menu-icon">📞</span>
                    <span data-i18n="burger.contact">Kontakt</span>
                </a>
            </nav>
        </div>`;
}

function renderFooter() {
    const footer = document.getElementById('common-footer');
    if (!footer) return;

    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 data-i18n="footer.hours">Godziny otwarcia</h3>
                    <p data-i18n="footer.hours-info">${commonConfig.hours.pl}</p>
                </div>
                <div class="footer-section">
                    <h3 data-i18n="footer.contact">Kontakt</h3>
                    <p><a href="${commonConfig.phone.href}">${commonConfig.phone.display}</a></p>
                    <p><a href="mailto:${commonConfig.email}">${commonConfig.email}</a></p>
                    <p>${commonConfig.address.footer}</p>
                </div>
                <div class="footer-section">
                    <h3 data-i18n="footer.social">Znajdź nas</h3>
                    <div class="social-links">
                        <a href="${commonConfig.social.instagram.url}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                        <a href="${commonConfig.social.facebook.url}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>${commonConfig.copyright}. <span data-i18n="footer.rights">Wszelkie prawa zastrzeżone</span>.</p>
            </div>
        </footer>`;
}

function applyCommonConfig() {
    const values = {
        phone: commonConfig.phone.display,
        email: commonConfig.email,
        address: `${commonConfig.address.street}<br>${commonConfig.address.postalCity}`,
        instagramLabel: commonConfig.social.instagram.label,
        facebookLabel: commonConfig.social.facebook.label
    };
    const hrefs = {
        phone: commonConfig.phone.href,
        email: `mailto:${commonConfig.email}`,
        instagram: commonConfig.social.instagram.url,
        facebook: commonConfig.social.facebook.url
    };
    const copies = {
        phone: commonConfig.phone.display,
        email: commonConfig.email,
        address: commonConfig.address.copy,
        instagram: commonConfig.social.instagram.url,
        facebook: commonConfig.social.facebook.url
    };

    document.querySelectorAll('[data-common-value]').forEach(element => {
        const value = values[element.dataset.commonValue];
        if (value !== undefined) element.innerHTML = value;
    });
    document.querySelectorAll('[data-common-href]').forEach(element => {
        const href = hrefs[element.dataset.commonHref];
        if (href !== undefined) element.setAttribute('href', href);
    });
    document.querySelectorAll('[data-common-copy]').forEach(element => {
        const value = copies[element.dataset.commonCopy];
        if (value !== undefined) element.dataset.copy = value;
    });
}

function getTranslation(key, lang, translations) {
    const keys = key.split('.');
    let result = translations[lang];
    for (const part of keys) {
        result = result?.[part];
        if (!result) return key;
    }
    return result;
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getTranslation(key, currentLang, translations);
        if (value && value !== key) {
            if (element.classList.contains('item-description') || element.classList.contains('announcement-banner-message')) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        }
    });
    document.documentElement.setAttribute('lang', currentLang);
}

function switchLanguage(lang) {
    currentLang = lang;
    try {
        localStorage.setItem('burgerLang', lang);
    } catch (error) {
        // The language still switches for this page when storage is unavailable.
    }

    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-lang') === lang);
    });
    applyTranslations(commonTranslations);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function initBurgerMenu() {
    const burgerBtn = document.getElementById('burgerMenuBtn');
    const burgerOverlay = document.getElementById('burgerMenuOverlay');
    if (!burgerBtn || !burgerOverlay) return;

    const closeMenu = () => {
        burgerBtn.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        burgerOverlay.classList.toggle('active');
        document.body.style.overflow = burgerOverlay.classList.contains('active') ? 'hidden' : '';
    });
    burgerOverlay.querySelectorAll('.burger-menu-item').forEach(item => item.addEventListener('click', closeMenu));
    burgerOverlay.addEventListener('click', event => {
        if (event.target === burgerOverlay) closeMenu();
    });
}

function initLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-lang') === currentLang);
        if (button._langListenerAdded) return;
        button.addEventListener('click', () => switchLanguage(button.getAttribute('data-lang')));
        button._langListenerAdded = true;
    });
}

function initCommon() {
    renderHeader();
    renderFooter();
    applyCommonConfig();
    initBurgerMenu();
    applyTranslations(commonTranslations);
}

window.CommonUtils = {
    get currentLang() { return currentLang; },
    config: commonConfig,
    getTranslation,
    applyTranslations,
    commonTranslations,
    switchLanguage,
    initLanguageButtons,
    renderHeader,
    renderFooter,
    applyCommonConfig
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
} else {
    initCommon();
}
