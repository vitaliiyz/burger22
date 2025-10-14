// Translation system for Burger 22
const translations = {
    pl: {
        tagline: 'Menu',
        nav: {
            burgers: '🍔 Burgery',
            sides: '🍟 Frytki i dodatki',
            sauces: '🧂 Sosy',
            drinks: '🥤 Napoje',
            extras: '🥓 Dodatki do burgera'
        },
        sections: {
            burgers: 'Burgery',
            sides: 'Frytki i dodatki',
            sauces: 'Sosy na wybór',
            drinks: 'Napoje',
            extras: '🥓 Dodatki do burgera'
        },
        burgers: {
            classic: {
                name: 'Klasyczny',
                desc: 'Bułeczka brioche • Kotlet wołowy • Sałata • Ogórek kiszony • Cebula • Pomidor • Cheddar • Ketchup • Musztarda'
            },
            bbq: {
                name: 'BBQ',
                desc: 'Bułeczka brioche • Kotlet wołowy • Bekon • Cebula • Ogórek kiszony • Rukola • Pomidor • Cheddar • Sos BBQ'
            },
            spicy: {
                name: 'Ostry',
                desc: 'Bułeczka brioche • Kotlet wołowy • Bekon • Cebula smażona • Sałata • Ogórek kiszony • Jalapeño • Cheddar • Sos chilli słodki • Sos amerykański'
            },
            cheese: {
                name: 'Serowy',
                desc: 'Bułeczka brioche • Kotlet wołowy • Rukola • Cebula smażona • Ogórek kiszony • Pomidor • Cheddar ×2 • Mozzarella • Sos serowy'
            },
            chicken: {
                name: 'Kurczak',
                desc: 'Bułeczka brioche • Polędwiczki z kurczaka • Sałata • Cebula • Pomidor • Cheddar • Ketchup • Sos majonez'
            },
            egg: {
                name: 'Jaja',
                desc: 'Bułeczka brioche • Kotlet wołowy • Bekon • Cebula smażona • Jajko • Sałata • Ogórek kiszony • Sos majonez • Sos BBQ'
            }
        },
        sides: {
            friesSmall: '🍟 Frytki 150g',
            friesLarge: '🍟 Frytki 300g',
            onionRingsSmall: '🧅 Krążki cebulowe 6 szt',
            onionRingsLarge: '🧅 Krążki cebulowe 12 szt',
            nuggetsSmall: '🍗 Nuggetsy 6 szt',
            nuggetsLarge: '🍗 Nuggetsy 12 szt',
            extraSauce: '🧂 Sos dodatkowy'
        },
        sauceIncluded: 'sos w cenie',
        combo: 'zestaw: burger + frytki + sos',
        sauces: {
            ketchup: '🍅 Ketchup',
            bbq: '🍖 BBQ',
            chili: '🌶️ Chili',
            american: '🔥 Amerykański (hot)',
            cheese: '🧀 Serowy',
            mayo: '🥚 Majonez',
            sweetSour: '🍯 Kwaśno-słodki',
            garlic: '🧄 Czosnkowy',
            mustard: '🌭 Musztarda'
        },
        drinks: {
            cola: '🥤 Pepsi',
            colaZero: '🥤 Pepsi (zero)',
            sprite: '🥤 Sprite',
            fanta: '🥤 Fanta',
            orangeJuice: '🍊 Sok pomarańczowy',
            appleJuice: '🍎 Sok jabłkowy',
            multiJuice: '🍹 Sok multiwitamina',
            tomatoJuice: '🍅 Sok pomidorowy',
            waterStill: '💧 Woda niegazowana',
            waterSparkling: '💦 Woda gazowana',
            beerNonAlcoholic: '🍺 Piwo bezalkoholowe'
        },
        extras: {
            meat: '🥩 Mięso',
            bacon: '🥓 Boczek',
            cheese: '🧀 Ser',
            jalapeno: '🌶️ Jalapeño',
            vegetables: '🥗 Warzywa'
        }
    },
    en: {
        tagline: 'Menu',
        nav: {
            burgers: '🍔 Burgers',
            sides: '🍟 Fries & Sides',
            sauces: '🧂 Sauces',
            drinks: '🥤 Drinks',
            extras: '🥓 Burger Extras'
        },
        sections: {
            burgers: 'Burgers',
            sides: 'Fries & Sides',
            sauces: 'Choice of Sauces',
            drinks: 'Drinks',
            extras: '🥓 Burger Extras'
        },
        burgers: {
            classic: {
                name: 'Classic',
                desc: 'Brioche bun • Beef patty • Lettuce • Pickled cucumber • Onion • Tomato • Cheddar • Ketchup • Mustard'
            },
            bbq: {
                name: 'BBQ',
                desc: 'Brioche bun • Beef patty • Bacon • Onion • Pickled cucumber • Arugula • Tomato • Cheddar • BBQ sauce'
            },
            spicy: {
                name: 'Spicy',
                desc: 'Brioche bun • Beef patty • Bacon • Fried onion • Lettuce • Pickled cucumber • Jalapeño • Cheddar • Sweet chilli sauce • American sauce'
            },
            cheese: {
                name: 'Cheesy',
                desc: 'Brioche bun • Beef patty • Arugula • Fried onion • Pickled cucumber • Tomato • Cheddar ×2 • Mozzarella • Cheese sauce'
            },
            chicken: {
                name: 'Chicken',
                desc: 'Brioche bun • Chicken tenderloins • Lettuce • Onion • Tomato • Cheddar • Ketchup • Mayo sauce'
            },
            egg: {
                name: 'Egg',
                desc: 'Brioche bun • Beef patty • Bacon • Fried onion • Egg • Lettuce • Pickled cucumber • Mayo sauce • BBQ sauce'
            }
        },
        sides: {
            friesSmall: '🍟 Fries 150g',
            friesLarge: '🍟 Fries 300g',
            onionRingsSmall: '🧅 Onion Rings 6 pcs',
            onionRingsLarge: '🧅 Onion Rings 12 pcs',
            nuggetsSmall: '🍗 Nuggets 6 pcs',
            nuggetsLarge: '🍗 Nuggets 12 pcs',
            extraSauce: '🧂 Extra Sauce'
        },
        sauceIncluded: 'sauce included',
        combo: 'combo: burger + fries + sauce',
        sauces: {
            ketchup: '🍅 Ketchup',
            bbq: '🍖 BBQ',
            chili: '🌶️ Chili',
            american: '🔥 American (hot)',
            cheese: '🧀 Cheese',
            mayo: '🥚 Mayonnaise',
            sweetSour: '🍯 Sweet & Sour',
            garlic: '🧄 Garlic',
            mustard: '🌭 Mustard'
        },
        drinks: {
            cola: '🥤 Pepsi',
            colaZero: '🥤 Pepsi (zero)',
            sprite: '🥤 Sprite',
            fanta: '🥤 Fanta',
            orangeJuice: '🍊 Orange Juice',
            appleJuice: '🍎 Apple Juice',
            multiJuice: '🍹 Multivitamin Juice',
            tomatoJuice: '🍅 Tomato Juice',
            waterStill: '💧 Still Water',
            waterSparkling: '💦 Sparkling Water',
            beerNonAlcoholic: '🍺 Non-Alcoholic Beer'
        },
        extras: {
            meat: '🥩 Meat',
            bacon: '🥓 Bacon',
            cheese: '🧀 Cheese',
            jalapeno: '🌶️ Jalapeño',
            vegetables: '🥗 Vegetables'
        }
    }
};

// Get or set default language
let currentLang = localStorage.getItem('language') || 'pl';

// Function to get nested translation
function getTranslation(key, lang) {
    const keys = key.split('.');
    let result = translations[lang];
    for (let k of keys) {
        result = result[k];
        if (!result) return key;
    }
    return result;
}

// Function to translate the page
function translatePage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Update HTML lang attribute for CSS styling
    document.documentElement.setAttribute('lang', lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = getTranslation(key, lang);
    });

    // Update burger items
    const burgerItems = document.querySelectorAll('#burgery .menu-item');
    const burgerKeys = ['classic', 'cheese', 'chicken', 'bbq', 'spicy', 'egg'];
    burgerItems.forEach((item, index) => {
        if (burgerKeys[index]) {
            const nameEl = item.querySelector('.item-name');
            const descEl = item.querySelector('.item-description');
            const comboEl = item.querySelector('.zestaw-label');

            if (nameEl) nameEl.textContent = translations[lang].burgers[burgerKeys[index]].name;
            if (descEl) descEl.textContent = translations[lang].burgers[burgerKeys[index]].desc;
            if (comboEl) comboEl.textContent = `(${translations[lang].combo})`;
        }
    });

    // Update sides
    const sideItems = document.querySelectorAll('#dodatki .menu-item');
    const sideKeys = ['friesSmall', 'friesLarge', 'onionRingsSmall', 'onionRingsLarge', 'nuggetsSmall', 'nuggetsLarge', 'extraSauce'];
    sideItems.forEach((item, index) => {
        if (sideKeys[index]) {
            const nameEl = item.querySelector('.item-name');
            const noteEl = item.querySelector('.addon-note');

            if (nameEl) nameEl.textContent = translations[lang].sides[sideKeys[index]];
            if (noteEl) noteEl.textContent = translations[lang].sauceIncluded;
        }
    });

    // Update sauces
    const sauceItems = document.querySelectorAll('#sosy .sauce-item');
    const sauceKeys = ['ketchup', 'bbq', 'chili', 'american', 'cheese', 'mayo', 'sweetSour', 'garlic', 'mustard'];
    sauceItems.forEach((item, index) => {
        if (sauceKeys[index]) {
            item.textContent = translations[lang].sauces[sauceKeys[index]];
        }
    });

    // Update drinks
    const drinkItems = document.querySelectorAll('#napoje .menu-item');
    const drinkKeys = ['cola', 'colaZero', 'sprite', 'fanta', 'orangeJuice', 'appleJuice', 'multiJuice', 'tomatoJuice', 'waterStill', 'waterSparkling', 'beerNonAlcoholic'];
    drinkItems.forEach((item, index) => {
        if (drinkKeys[index]) {
            const nameEl = item.querySelector('.item-name');
            if (nameEl) nameEl.textContent = translations[lang].drinks[drinkKeys[index]];
        }
    });

    // Update extras
    const extraItems = document.querySelectorAll('#dodatki-burgera .menu-item');
    const extraKeys = ['meat', 'bacon', 'cheese', 'jalapeno', 'vegetables'];
    extraItems.forEach((item, index) => {
        if (extraKeys[index]) {
            const nameEl = item.querySelector('.item-name');
            if (nameEl) nameEl.textContent = translations[lang].extras[extraKeys[index]];
        }
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Initialize translation system when DOM is ready
function initTranslations() {
    // Language switcher event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            translatePage(lang);
        });
    });

    // Initialize translation on page load
    translatePage(currentLang);
}

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslations);
} else {
    initTranslations();
}
