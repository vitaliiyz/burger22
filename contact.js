// Contact page specific logic - Burger 22

// Page-specific translations
const pageTranslations = {
    pl: {
        tagline: 'Kontakt',
        contact: {
            phone: 'Telefon',
            email: 'Email',
            address: 'Adres',
            map: 'Mapa',
            'map-desc': 'Jak do nas dojechać',
            location: 'Nasza Lokalizacja',
            'hours-title': 'Godziny otwarcia'
        }
    },
    en: {
        tagline: 'Contact',
        contact: {
            phone: 'Phone',
            email: 'Email',
            address: 'Address',
            map: 'Map',
            'map-desc': 'How to get here',
            location: 'Our Location',
            'hours-title': 'Opening Hours'
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

// Copy to clipboard functionality
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Store original emoji
        const originalEmoji = button.textContent;

        // Change button appearance
        button.classList.add('copied');
        button.textContent = '';

        // Reset after 1.5 seconds
        setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = originalEmoji;
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
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

    // Add copy button listeners
    document.querySelectorAll('.copy-icon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            const textToCopy = btn.getAttribute('data-copy');
            copyToClipboard(textToCopy, btn);
        });
    });
});
