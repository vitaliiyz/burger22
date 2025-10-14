// Translation system for Burger 22
const translations = {
    pl: {
        tagline: 'Menu',
        nav: {
            burgers: '🍔 Burgery',
            sides: '🍟 Dodatki',
            sauces: '🧂 Sosy',
            drinks: '🥤 Napoje'
        },
        sections: {
            burgers: 'Burgery',
            sides: 'Dodatki',
            sauces: 'Sosy na wybór',
            drinks: 'Napoje'
        },
        burgers: {
            classic: {
                name: 'Klasyczny',
                desc: 'Bułeczka brioche, musztarda, cebula, pomidor, cheddar, wołowina, sałata, ogórek kiszony, ketchup'
            },
            bbq: {
                name: 'BBQ',
                desc: 'Bułeczka brioche, sos BBQ x2, cebula, pomidor, bekon smażony, cheddar, wołowina, sałata, ogórek kiszony'
            },
            spicy: {
                name: 'Ostry',
                desc: 'Bułeczka brioche, sos chili, jalapeño, bekon smażony, cheddar, wołowina, sałata, ogórek kiszony, smażona cebula, ostry sos'
            },
            cheese: {
                name: 'Serowy',
                desc: 'Bułeczka brioche, sos serowy x2, cebula, pomidor, bekon smażony, mozzarella, cheddar topiony x2, wołowina, ogórek kiszony'
            },
            chicken: {
                name: 'Kurczak',
                desc: 'Bułeczka brioche, ketchup, cebula, pomidor, cheddar, kurczak, sałata, majonez'
            },
            egg: {
                name: 'Jaja Burger',
                desc: 'Bułeczka brioche, majonez, bekon smażony, jajko, wołowina, ogórek kiszony, sałata, smażona cebula, sos algierski'
            }
        },
        sides: {
            friesSmall: '🍟 Frytki małe',
            friesLarge: '🍟 Frytki duże',
            onionRingsSmall: '🧅 Krążki cebulowe małe',
            onionRingsLarge: '🧅 Krążki cebulowe duże',
            nuggetsSmall: '🍗 Nuggetsy małe',
            nuggetsLarge: '🍗 Nuggetsy duże',
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
            cola: '🥤 Cola/Pepsi',
            colaZero: '🥤 Cola/Pepsi (zero)',
            sprite: '🥤 Sprite',
            fanta: '🥤 Fanta',
            orangeJuice: '🍊 Sok pomarańczowy',
            appleJuice: '🍎 Sok jabłkowy',
            multiJuice: '🍹 Sok multiwitamina',
            tomatoJuice: '🍅 Sok pomidorowy',
            waterStill: '💧 Woda niegazowana',
            waterSparkling: '💦 Woda gazowana',
            beerNonAlcoholic: '🍺 Piwo bezalkoholowe'
        }
    },
    en: {
        tagline: 'Menu',
        nav: {
            burgers: '🍔 Burgers',
            sides: '🍟 Sides',
            sauces: '🧂 Sauces',
            drinks: '🥤 Drinks'
        },
        sections: {
            burgers: 'Burgers',
            sides: 'Sides',
            sauces: 'Choice of Sauces',
            drinks: 'Drinks'
        },
        burgers: {
            classic: {
                name: 'Classic',
                desc: 'Brioche bun, mustard, onion, tomato, cheddar, beef, lettuce, pickled cucumber, ketchup'
            },
            bbq: {
                name: 'BBQ',
                desc: 'Brioche bun, BBQ sauce x2, onion, tomato, fried bacon, cheddar, beef, lettuce, pickled cucumber'
            },
            spicy: {
                name: 'Spicy',
                desc: 'Brioche bun, chili sauce, jalapeño, fried bacon, cheddar, beef, lettuce, pickled cucumber, fried onion, hot sauce'
            },
            cheese: {
                name: 'Cheesy',
                desc: 'Brioche bun, cheese sauce x2, onion, tomato, fried bacon, mozzarella, melted cheddar x2, beef, pickled cucumber'
            },
            chicken: {
                name: 'Chicken',
                desc: 'Brioche bun, ketchup, onion, tomato, cheddar, chicken, lettuce, mayo'
            },
            egg: {
                name: 'Egg Burger',
                desc: 'Brioche bun, mayo, fried bacon, egg, beef, pickled cucumber, lettuce, fried onion, algerian sauce'
            }
        },
        sides: {
            friesSmall: '🍟 Small Fries',
            friesLarge: '🍟 Large Fries',
            onionRingsSmall: '🧅 Small Onion Rings',
            onionRingsLarge: '🧅 Large Onion Rings',
            nuggetsSmall: '🍗 Small Nuggets',
            nuggetsLarge: '🍗 Large Nuggets',
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
            cola: '🥤 Cola/Pepsi',
            colaZero: '🥤 Cola/Pepsi (zero)',
            sprite: '🥤 Sprite',
            fanta: '🥤 Fanta',
            orangeJuice: '🍊 Orange Juice',
            appleJuice: '🍎 Apple Juice',
            multiJuice: '🍹 Multivitamin Juice',
            tomatoJuice: '🍅 Tomato Juice',
            waterStill: '💧 Still Water',
            waterSparkling: '💦 Sparkling Water',
            beerNonAlcoholic: '🍺 Non-Alcoholic Beer'
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
