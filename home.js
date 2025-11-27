// Home page specific logic - Burger 22

// Page-specific translations
const pageTranslations = {
    pl: {
        tagline: 'Prawdziwy smak burgera',
        badge: {
            new: 'NOWOŚĆ'
        },
        nav: {
            delivery: 'Zamów do domu',
            'delivery-desc': 'Wybierz serwis dostawy',
            menu: 'Menu',
            'menu-desc': 'Zobacz naszą ofertę burgerów',
            contact: 'Kontakt'
        },
        modal: {
            title: 'Wybierz serwis dostawy',
            description: 'Zamów nasze burgery z dostawą do domu',
            'uber-desc': 'Szybka dostawa przez Uber',
            'glovo-desc': 'Szybka dostawa przez Glovo',
            'wolt-desc': 'Szybka dostawa przez Wolt',
            'pyszne-desc': 'Szybka dostawa przez Pyszne',
            'bolt-desc': 'Szybka dostawa przez Bolt',
            disclaimer: '* Ceny w zewnętrznych serwisach dostawy mogą różnić się od cen w restauracji'
        }
    },
    en: {
        tagline: 'Real burger taste',
        badge: {
            new: 'NEW'
        },
        nav: {
            delivery: 'Order for delivery',
            'delivery-desc': 'Choose delivery service',
            menu: 'Menu',
            'menu-desc': 'Check out our burger selection',
            contact: 'Contact'
        },
        modal: {
            title: 'Choose delivery service',
            description: 'Order our burgers with home delivery',
            'uber-desc': 'Fast delivery via Uber',
            'glovo-desc': 'Fast delivery via Glovo',
            'wolt-desc': 'Fast delivery via Wolt',
            'pyszne-desc': 'Fast delivery via Pyszne',
            'bolt-desc': 'Fast delivery via Bolt',
            disclaimer: '* Prices in third-party delivery services may differ from restaurant prices'
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

        // Initialize delivery modal
        initDeliveryModal();
    }, 100);
});

// Delivery modal functionality
function initDeliveryModal() {
    const deliveryBtn = document.getElementById('deliveryBtn');
    const modal = document.getElementById('deliveryModal');
    const closeBtn = document.querySelector('.modal-close');

    if (!deliveryBtn || !modal || !closeBtn) return;

    // Open modal
    deliveryBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal via close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
