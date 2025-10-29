// Home page specific logic - Burger 22

// Page-specific translations
const pageTranslations = {
    pl: {
        tagline: 'Prawdziwy smak burgera',
        nav: {
            menu: 'Menu',
            'menu-desc': 'Zobacz naszą ofertę burgerów',
            'takeaway-badge': '🛍️ Zamów wcześniej!',
            contact: 'Kontakt'
        }
    },
    en: {
        tagline: 'Real burger taste',
        nav: {
            menu: 'Menu',
            'menu-desc': 'Check out our burger selection',
            'takeaway-badge': '🛍️ Order ahead!',
            contact: 'Contact'
        }
    }
};

// Merge common and page-specific translations
function getMergedTranslations() {
    const common = window.CommonUtils.commonTranslations;
    return {
        pl: { ...common.pl, ...pageTranslations.pl },
        en: { ...common.en, ...pageTranslations.en }
    };
}

// Apply all translations
function applyAllTranslations() {
    const mergedTranslations = getMergedTranslations();
    window.CommonUtils.applyTranslations(mergedTranslations);
}

// Listen for language changes
window.addEventListener('languageChanged', () => {
    applyAllTranslations();
});

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Apply translations after a short delay to ensure common components are loaded
    setTimeout(() => {
        applyAllTranslations();

        // Initialize language buttons
        if (window.CommonUtils && window.CommonUtils.initLanguageButtons) {
            window.CommonUtils.initLanguageButtons();
        }
    }, 100);
});
