// Translation system for Burger 22 Menu
const translations = {
    pl: {
        tagline: 'Menu',
        combo: 'zestaw: burger + frytki + sos',
        sauceIncluded: 'sos w cenie',
        sugarIncluded: 'cukier w cenie',
        withLemon: 'z cytryną',
        nav: {
            burgers: '🍔 Burgery',
            sides: '🍟 Frytki i dodatki',
            sauces: '🧂 Sosy',
            hotDrinks: '☕ Napoje gorące',
            drinks: '🥤 Napoje zimne',
            extras: '🥓 Dodatki do burgera'
        },
        sections: {
            burgers: 'Burgery',
            sides: 'Frytki i dodatki',
            sauces: 'Sosy na wybór',
            hotDrinks: 'Napoje gorące',
            drinks: 'Napoje zimne',
            extras: '🥓 Dodatki do burgera'
        },
        sauces: {
            ketchup: '🍅 Ketchup',
            bbq: '🍖 BBQ',
            chili: '🌶️ Chili',
            american: '🔥 Amerykański (hot)',
            cheese: '🧀 Serowy',
            mayo: '🥚 Majonez',
            thousandIsland: '🥗 Tysiąc wysp',
            garlic: '🧄 Czosnkowy',
            mustard: '🌭 Musztarda'
        },
        burgers: {
            classic: {
                name: 'Klasyczny Burger',
                desc: 'Bułeczka brioche, musztarda, cebula, pomidor, cheddar, wołowina, sałata, ogórek kiszony, ketchup'
            },
            cheese: {
                name: 'Serowy Burger',
                desc: 'Bułeczka brioche, sos serowy x2, cebula prażona, pomidor, bekon smażony, mozzarella, cheddar topiony x2, wołowina, ogórek kiszony'
            },
            chicken: {
                name: 'Kurczak Burger',
                desc: 'Bułeczka brioche, ketchup, cebula, pomidor, cheddar, kurczak, sałata, majonez'
            },
            bbq: {
                name: 'BBQ Burger',
                desc: 'Bułeczka brioche, sos BBQ x2, cebula, pomidor, bekon smażony, cheddar, wołowina, sałata, ogórek kiszony'
            },
            spicy: {
                name: 'Ostry Burger',
                desc: 'Bułeczka brioche, sos chili, jalapeño, bekon smażony, cheddar, wołowina, sałata, ogórek kiszony, smażona cebula, ostry sos'
            },
            egg: {
                name: 'Jaja Burger',
                desc: 'Bułeczka brioche, majonez, bekon smażony, jajko, wołowina, ogórek kiszony, sałata, smażona cebula, sos BBQ'
            }
        },
        extras: {
            meat: '🥩 Mięso',
            bacon: '🥓 Boczek',
            cheese: '🧀 Ser',
            jalapeno: '🌶️ Jalapeño',
            vegetables: '🥗 Warzywa'
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
        hotDrinks: {
            greenTea: '☕ Herbata zielona'
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
        }
    },
    en: {
        tagline: 'Menu',
        combo: 'combo: burger + fries + sauce',
        sauceIncluded: 'sauce included',
        sugarIncluded: 'sugar included',
        withLemon: 'with lemon',
        nav: {
            burgers: '🍔 Burgers',
            sides: '🍟 Fries & Sides',
            sauces: '🧂 Sauces',
            hotDrinks: '☕ Hot Drinks',
            drinks: '🥤 Cold Drinks',
            extras: '🥓 Burger Extras'
        },
        sections: {
            burgers: 'Burgers',
            sides: 'Fries & Sides',
            sauces: 'Choice of Sauces',
            hotDrinks: 'Hot Drinks',
            drinks: 'Cold Drinks',
            extras: '🥓 Burger Extras'
        },
        sauces: {
            ketchup: '🍅 Ketchup',
            bbq: '🍖 BBQ',
            chili: '🌶️ Chili',
            american: '🔥 American (hot)',
            cheese: '🧀 Cheese',
            mayo: '🥚 Mayo',
            thousandIsland: '🥗 Thousand Island',
            garlic: '🧄 Garlic',
            mustard: '🌭 Mustard'
        },
        burgers: {
            classic: {
                name: 'Classic Burger',
                desc: 'Brioche bun, mustard, onion, tomato, cheddar, beef, lettuce, pickled cucumber, ketchup'
            },
            cheese: {
                name: 'Cheesy Burger',
                desc: 'Brioche bun, cheese sauce x2, roasted onion, tomato, fried bacon, mozzarella, melted cheddar x2, beef, pickled cucumber'
            },
            chicken: {
                name: 'Chicken Burger',
                desc: 'Brioche bun, ketchup, onion, tomato, cheddar, chicken, lettuce, mayo'
            },
            bbq: {
                name: 'BBQ Burger',
                desc: 'Brioche bun, BBQ sauce x2, onion, tomato, fried bacon, cheddar, beef, lettuce, pickled cucumber'
            },
            spicy: {
                name: 'Spicy Burger',
                desc: 'Brioche bun, chili sauce, jalapeño, fried bacon, cheddar, beef, lettuce, pickled cucumber, fried onion, hot sauce'
            },
            egg: {
                name: 'Egg Burger',
                desc: 'Brioche bun, mayo, fried bacon, egg, beef, pickled cucumber, lettuce, fried onion, BBQ sauce'
            }
        },
        extras: {
            meat: '🥩 Meat',
            bacon: '🥓 Bacon',
            cheese: '🧀 Cheese',
            jalapeno: '🌶️ Jalapeño',
            vegetables: '🥗 Vegetables'
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
        hotDrinks: {
            greenTea: '☕ Green Tea'
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
        }
    }
};

// Merge common and page-specific translations
function getMergedTranslations() {
    const common = window.CommonUtils.commonTranslations;
    return {
        pl: { ...common.pl, ...translations.pl },
        en: { ...common.en, ...translations.en }
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
    }, 100);
});
