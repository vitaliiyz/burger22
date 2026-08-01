// Home page specific logic - Burger 22

const commonPhoneNational = window.CommonUtils.config.phone.display.replace(/^\+48\s*/, '');
const DIRECT_ORDER_URL = 'https://order.site/burger-22';

// Page-specific translations
const pageTranslations = {
    pl: {
        tagline: 'Prawdziwy smak burgera',
        hero: {
            title: 'Burgery na Probusa 11',
            subtitle: 'Soczysta wołowina, bułka brioche i autorskie kompozycje smaków. Na miejscu, na wynos i z dostawą.',
            'cta-order': 'Zamów online',
            'cta-menu': 'Zobacz menu',
            phone: `Zadzwoń i odbierz: ${commonPhoneNational}`
        },
        balance: {
            title: 'Wyważony smak od pierwszego kęsa',
            description: 'Każdy burger jest dopracowany tak, by soczyste mięso, świeże warzywa, odpowiednia bułka i sosy grały razem. Składniki są na swoim miejscu, a smak rozwija się harmonijnie — od pierwszego kęsa do ostatniego.',
            bullets: {
                beef: '100% wołowiny',
                proportions: 'Właściwe proporcje składników',
                balance: 'Zbalansowany smak',
                simple: 'Nic zbędnego',
                tested: 'Każdy burger dopracowany i przetestowany'
            }
        },
        reviews: {
            title: 'Co mówią nasi goście',
            summary: 'Krótkie fragmenty prawdziwych opinii opublikowanych w Google.',
            button: 'Zobacz opinie w Google',
            rating: 'w Google',
            count: 'opinii',
            translation: ''
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
            'other-services': 'Inne opcje zamówienia:',
            'direct-title': 'Zamów bezpośrednio',
            'restaurant-price': 'Ceny jak w lokalu',
            'uber-desc': 'Szybka dostawa przez Uber',
            'glovo-desc': 'Szybka dostawa przez Glovo',
            'wolt-desc': 'Szybka dostawa przez Wolt',
            'pyszne-desc': 'Szybka dostawa przez Pyszne',
            'bolt-desc': 'Szybka dostawa przez Bolt',
            disclaimer: '* Ceny w zewnętrznych serwisach dostawy mogą różnić się od cen w restauracji'
        },
        'mobile-order': 'Zamów online'
    },
    en: {
        tagline: 'Real burger taste',
        hero: {
            title: 'Burgers at Probusa 11',
            subtitle: 'Juicy beef, brioche buns, and original flavor combinations. Dine in, takeaway, or delivery.',
            'cta-order': 'Order online',
            'cta-menu': 'View menu',
            phone: `Call and collect: ${commonPhoneNational}`
        },
        balance: {
            title: 'Balanced flavor from the first bite',
            description: 'Each burger is tested so juicy beef, fresh vegetables, the right bun, and sauces work together instead of competing. Every ingredient has its place, and the flavor opens up from the first bite to the last.',
            bullets: {
                beef: '100% beef',
                proportions: 'Right ingredient proportions',
                balance: 'Balanced taste',
                simple: 'Nothing extra',
                tested: 'Every burger refined and tested'
            }
        },
        reviews: {
            title: 'What our guests say',
            summary: 'Short excerpts from real reviews published on Google.',
            button: 'See reviews on Google',
            rating: 'on Google',
            count: 'reviews',
            translation: 'Translated from Polish'
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
            'other-services': 'Other ordering options:',
            'direct-title': 'Order directly',
            'restaurant-price': 'Same prices as in-store',
            'uber-desc': 'Fast delivery via Uber',
            'glovo-desc': 'Fast delivery via Glovo',
            'wolt-desc': 'Fast delivery via Wolt',
            'pyszne-desc': 'Fast delivery via Pyszne',
            'bolt-desc': 'Fast delivery via Bolt',
            disclaimer: '* Prices in third-party delivery services may differ from restaurant prices'
        },
        'mobile-order': 'Order online'
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
    renderGoogleReviews();
}

function renderGoogleReviews() {
    const reviewsData = window.BURGER22_GOOGLE_REVIEWS;
    if (!reviewsData) return;

    const lang = window.CommonUtils.currentLang === 'en' ? 'en' : 'pl';
    const translations = pageTranslations[lang].reviews;
    const locale = lang === 'pl' ? 'pl-PL' : 'en-GB';
    const rating = reviewsData.rating.toLocaleString(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });
    const reviewCount = reviewsData.reviewCount.toLocaleString(locale);

    document.querySelectorAll('[data-google-reviews-link]').forEach((link) => {
        link.href = reviewsData.reviewsUrl;
    });

    document.querySelectorAll('[data-google-rating]').forEach((element) => {
        element.textContent = `${rating} ${translations.rating}`;
    });

    document.querySelectorAll('[data-google-review-count]').forEach((element) => {
        element.textContent = `${reviewCount} ${translations.count}`;
    });

    const ratingLine = document.querySelector('.google-rating-line');
    if (ratingLine) {
        ratingLine.setAttribute('aria-label', `${rating} ${translations.rating}, ${reviewCount} ${translations.count}`);
    }

    const cards = document.querySelector('[data-google-review-cards]');
    if (!cards) return;

    cards.replaceChildren();
    reviewsData.reviews.forEach((review) => {
        const article = document.createElement('article');
        article.className = 'review-card';

        const stars = document.createElement('div');
        stars.className = 'review-stars';
        stars.setAttribute('aria-label', `${review.rating} / 5`);
        stars.textContent = '★★★★★';

        const quote = document.createElement('blockquote');
        quote.className = 'review-quote';
        quote.textContent = review.text[lang];

        const author = document.createElement('p');
        author.className = 'review-author';
        author.textContent = review.author;

        article.append(stars, quote, author);

        if (translations.translation) {
            const note = document.createElement('p');
            note.className = 'review-translation-note';
            note.textContent = translations.translation;
            article.append(note);
        }

        cards.append(article);
    });
}

// Listen for language changes
window.addEventListener('languageChanged', () => {
    applyAllTranslations();
});

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-direct-order]').forEach((link) => {
        link.href = DIRECT_ORDER_URL;
    });

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
    const heroOrderBtn = document.querySelector('[data-delivery-open]');
    const modal = document.getElementById('deliveryModal');
    const closeBtn = document.querySelector('.modal-close');

    if (!heroOrderBtn || !modal || !closeBtn) return;

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Open modal
    heroOrderBtn.addEventListener('click', openModal);

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
