// Common JavaScript for all pages - Burger 22

// Common translations (burger menu and footer)
const commonTranslations = {
    pl: {
        burger: {
            home: 'Strona główna',
            menu: 'Menu',
            cart: 'Koszyk',
            contact: 'Kontakt'
        },
        footer: {
            hours: 'Godziny otwarcia',
            'hours-info': 'Wt-Nd: 12:00 - 22:00',
            contact: 'Kontakt',
            social: 'Znajdź nas',
            rights: 'Wszelkie prawa zastrzeżone'
        }
    },
    en: {
        burger: {
            home: 'Home',
            menu: 'Menu',
            cart: 'Cart',
            contact: 'Contact'
        },
        footer: {
            hours: 'Opening Hours',
            'hours-info': 'Tue-Sun: 12:00 PM - 10:00 PM',
            contact: 'Contact',
            social: 'Find Us',
            rights: 'All rights reserved'
        }
    }
};

// Get current language from localStorage or default to Polish
let currentLang = localStorage.getItem('burgerLang') || 'pl';

// Function to load HTML component
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component ${filePath}:`, error);
    }
}

// Function to fix paths in header based on current page
function fixHeaderPaths() {
    const currentPath = window.location.pathname;
    const isInMenuFolder = currentPath.includes('/menu/');
    const isInCartFolder = currentPath.includes('/cart/');

    const header = document.getElementById('common-header');
    if (!header) return;

    // Set correct paths based on location
    if (isInMenuFolder) {
        header.innerHTML = header.innerHTML
            .replace(/INDEX_PATH/g, '../index.html')
            .replace(/MENU_PATH/g, 'index.html')
            .replace(/CONTACT_PATH/g, '../contact.html')
            .replace(/CART_PATH/g, '../cart/index.html');
    } else if (isInCartFolder) {
        header.innerHTML = header.innerHTML
            .replace(/INDEX_PATH/g, '../index.html')
            .replace(/MENU_PATH/g, '../menu/index.html')
            .replace(/CONTACT_PATH/g, '../contact.html')
            .replace(/CART_PATH/g, 'index.html');
    } else {
        header.innerHTML = header.innerHTML
            .replace(/INDEX_PATH/g, 'index.html')
            .replace(/MENU_PATH/g, 'menu/index.html')
            .replace(/CONTACT_PATH/g, 'contact.html')
            .replace(/CART_PATH/g, 'cart/index.html');
    }
}

// Function to update cart count badge
function updateCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    if (!cartCountEl) return;

    if (window.BurgerCart) {
        const count = window.BurgerCart.getTotalCount();
        cartCountEl.textContent = count;

        if (count > 0) {
            cartCountEl.classList.add('visible');
        } else {
            cartCountEl.classList.remove('visible');
        }
    }
}

// Function to get nested translation
function getTranslation(key, lang, translations) {
    const keys = key.split('.');
    let result = translations[lang];
    for (let k of keys) {
        result = result?.[k];
        if (!result) return key;
    }
    return result;
}

// Function to apply translations
function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getTranslation(key, currentLang, translations);
        if (value && value !== key) {
            element.textContent = value;
        }
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', currentLang);
}

// Function to switch language
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('burgerLang', lang);

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Apply common translations immediately
    applyTranslations(commonTranslations);

    // Trigger custom event for page-specific translations
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Initialize burger menu
function initBurgerMenu() {
    const burgerBtn = document.getElementById('burgerMenuBtn');
    const burgerOverlay = document.getElementById('burgerMenuOverlay');

    if (burgerBtn && burgerOverlay) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            burgerOverlay.classList.toggle('active');
            document.body.style.overflow = burgerOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        burgerOverlay.querySelectorAll('.burger-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                burgerOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking on overlay background
        burgerOverlay.addEventListener('click', (e) => {
            if (e.target === burgerOverlay) {
                burgerBtn.classList.remove('active');
                burgerOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize language buttons
function initLanguageButtons() {
    const buttons = document.querySelectorAll('.lang-btn');

    buttons.forEach((btn) => {
        // Set initial active state
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }

        // Skip if already initialized
        if (btn._langListenerAdded) {
            return;
        }

        // Add event listener
        btn.addEventListener('click', function() {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });

        btn._langListenerAdded = true;
    });
}

// Main initialization function
async function initCommon() {
    // Determine paths based on current location
    const currentPath = window.location.pathname;
    const isInMenuFolder = currentPath.includes('/menu/');
    const isInCartFolder = currentPath.includes('/cart/');
    const basePath = isInMenuFolder || isInCartFolder ? '../common/' : 'common/';

    // Load header and footer
    await loadComponent('common-header', basePath + 'header.html');
    await loadComponent('common-footer', basePath + 'footer.html');

    // Fix header paths after loading
    fixHeaderPaths();

    // Initialize burger menu
    initBurgerMenu();

    // Initialize cart counter
    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    // NOTE: Language buttons are initialized by page-specific scripts
    // to avoid conflicts and ensure proper timing

    // Apply common translations
    applyTranslations(commonTranslations);
}

// Export functions for use in page-specific scripts
window.CommonUtils = {
    get currentLang() { return currentLang; },
    getTranslation,
    applyTranslations,
    commonTranslations,
    switchLanguage,
    initLanguageButtons
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
} else {
    initCommon();
}
