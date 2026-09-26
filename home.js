// Homepage translations and language handling
const pageTranslations = {
    pl: {
        hero: {
            eyebrow: 'Henryka Probusa 11 · Wrocław',
            title: 'Prawdziwy smak burgera.'
        },
        actions: {
            order: 'Zamów online',
            menu: 'Zobacz menu',
            allBurgers: 'Wszystkie burgery',
            fullMenu: 'Zobacz całe menu',
            map: 'Otwórz mapę'
        },
        popular: {
            eyebrow: 'Wybierz swojego',
            title: 'Polecamy'
        },
        menuTeaser: {
            eyebrow: 'Pełne menu',
            title: 'Wybierz dokładnie to, na co masz ochotę.'
        },
        categories: {
            burgers: 'Burgery',
            sides: 'Dodatki',
            sauces: 'Sosy',
            drinks: 'Napoje'
        },
        order: {
            eyebrow: 'Bez zbędnych kroków',
            title: 'Burger 22 prosto do Ciebie.',
            description: 'Zamów z dostawą lub wybierz odbiór osobisty.',
            alternatives: 'Dostępni jesteśmy także tutaj',
            note: 'Ceny w zewnętrznych serwisach mogą różnić się od cen w restauracji.'
        },
        location: {
            eyebrow: 'Nasz lokal',
            hoursLabel: 'Godziny',
            contactLabel: 'Kontakt'
        }
    },
    en: {
        hero: {
            eyebrow: 'Henryka Probusa 11 · Wrocław',
            title: 'The real taste of a burger.'
        },
        actions: {
            order: 'Order online',
            menu: 'See the menu',
            allBurgers: 'All burgers',
            fullMenu: 'See the full menu',
            map: 'Open map'
        },
        popular: {
            eyebrow: 'Pick yours',
            title: 'Recommended'
        },
        menuTeaser: {
            eyebrow: 'Full menu',
            title: 'Choose exactly what you are craving.'
        },
        categories: {
            burgers: 'Burgers',
            sides: 'Sides',
            sauces: 'Sauces',
            drinks: 'Drinks'
        },
        order: {
            eyebrow: 'No extra steps',
            title: 'Burger 22 straight to you.',
            description: 'Order delivery or choose takeaway.',
            alternatives: 'You can also find us here',
            note: 'Prices on third-party delivery platforms may differ from restaurant prices.'
        },
        location: {
            eyebrow: 'Our restaurant',
            hoursLabel: 'Hours',
            contactLabel: 'Contact'
        }
    }
};

const FEATURED_BURGER_IDS = ['classic', 'cheese', 'berryGood', 'jalapenoBacon'];

function renderFeaturedBurgers() {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;

    const burgers = window.MenuData.burgers;
    const lang = window.CommonUtils.currentLang;
    grid.replaceChildren(...FEATURED_BURGER_IDS.map(id => {
        const burger = burgers.find(item => item.id === id);
        const copy = burger.text[lang];
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <a class="product-card__image" href="menu/index.html#burgery">
                <img loading="lazy" decoding="async">
            </a>
            <div class="product-card__heading">
                <h3></h3>
                <p class="product-card__price"></p>
            </div>
            <p class="product-card__description"></p>`;
        const link = card.querySelector('a');
        link.setAttribute('aria-label', burger.featuredLinkLabel || burger.featuredAlt);
        const image = card.querySelector('img');
        image.src = burger.image;
        image.alt = burger.featuredAlt;
        card.querySelector('h3').textContent = copy.featuredName;
        card.querySelector('.product-card__price').textContent = burger.price;
        card.querySelector('.product-card__description').textContent = copy.featuredDescription;
        return card;
    }));
}

function getMergedTranslations() {
    const common = window.CommonUtils.commonTranslations;
    return {
        pl: { ...common.pl, ...pageTranslations.pl },
        en: { ...common.en, ...pageTranslations.en }
    };
}

function applyHomeTranslations() {
    window.CommonUtils.applyTranslations(getMergedTranslations());
    document.title = window.CommonUtils.currentLang === 'en'
        ? 'Burger 22 — Wrocław'
        : 'Burger 22 — Wrocław';
}

let homeInitialized = false;

function initHome() {
    const siteHeader = document.querySelector('.site-header');
    if (homeInitialized || !siteHeader) {
        return;
    }

    homeInitialized = true;
    siteHeader.hidden = false;
    renderFeaturedBurgers();
    applyHomeTranslations();
    window.CommonUtils.initLanguageButtons();

    const hero = document.querySelector('.home-hero');
    const mobileOrderCta = document.querySelector('.mobile-order-cta');
    if (hero && mobileOrderCta && 'IntersectionObserver' in window) {
        mobileOrderCta.classList.add('is-waiting');
        const observer = new IntersectionObserver(([entry]) => {
            mobileOrderCta.classList.toggle('is-waiting', entry.isIntersecting);
        });
        observer.observe(hero);
    }
}

window.addEventListener('languageChanged', () => {
    renderFeaturedBurgers();
    applyHomeTranslations();
});
window.addEventListener('commonReady', initHome, { once: true });

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome, { once: true });
} else {
    initHome();
}
