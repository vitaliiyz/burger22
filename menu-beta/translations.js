// Translation system for Burger 22 Menu
const translations = {
    pl: {
        tagline: 'Menu',
        combo: 'zestaw: burger + frytki + sos',
        sauceIncluded: 'sos w cenie',
        sugarIncluded: 'cukier w cenie',
        withLemon: 'z cytryną',
        packagingNotice: '📦 Cena nie zawiera opakowania na wynos (+1 zł)',
        cupNotice: '📦 Cena nie zawiera opakowania na wynos (+0,50 zł)',
        extrasNotice: 'Dodatki dostępne przy zamawianiu burgera',
        takeaway: {
            title: 'Złóż przedzamówienie',
            desc: 'Dodaj produkty do koszyka i wyślij zamówienie. Przygotujemy je przed Twoim przyjściem!',
            trouble: 'Lub zadzwoń: +48 573 256 526',
            copy: 'Kopiuj',
            call: 'Zadzwoń'
        },
        doneness: {
            title: 'Personalizuj swojego burgera',
            medium: 'Medium',
            wellDone: 'Well done',
            addToCart: 'Dodaj do koszyka',
            comboOption: 'Z frytkami i sosem (+9 zł)',
            comboShort: 'Zestaw'
        },
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
            chili: '🌶️ Słodki Chili',
            american: '🇺🇸 Amerykański',
            cheese: '🧀 Serowy',
            cheddarTopiony: '🧀 Cheddar Topiony',
            spicy: '🔥 Ostry',
            mayo: '🥚 Majonez',
            thousandIsland: '🥗 Tysiąc wysp',
            garlic: '🧄 Czosnkowy',
            mustard: '🌭 Musztarda'
        },
        burgers: {
            classic: {
                name: 'Klasyczny Burger',
                desc: 'Bułeczka brioche, 100% mięsa wołowego, ser cheddar, cebula, pomidor, sałata, ogórek kiszony, musztarda, ketchup'
            },
            cheese: {
                name: 'Serowy Burger',
                desc: 'Bułeczka brioche, 100% mięsa wołowego, 2x cheddar topiony, ser mozzarella, 2x sos serowy, chrupiący bekon, cebula prażona, rukola, pomidor, ogórek kiszony'
            },
            chicken: {
                name: 'Kurczak Burger',
                desc: 'Bułeczka brioche, polędwiczki z kurczaka, ser cheddar, cebula, pomidor, sałata, ketchup, majonez'
            },
            bbq: {
                name: 'BBQ Burger',
                desc: 'Bułeczka brioche, 100% mięsa wołowego, 2x sos BBQ, ser cheddar, chrupiący bekon, cebula, pomidor, rukola, ogórek kiszony'
            },
            spicy: {
                name: 'Ostry Burger',
                desc: 'Bułeczka brioche, 100% mięsa wołowego, chrupiący bekon, ser cheddar, jalapeno, smażona cebula, sałata, ogórek kiszony, sos słodki chili, sos ostry'
            },
            egg: {
                name: 'Jaja Burger',
                desc: 'Bułeczka brioche, 100% mięsa wołowego, chrupiący bekon, jajko sadzone, smażona cebula, sałata, ogórek kiszony, sos majonez, sos BBQ'
            }
        },
        extras: {
            meat: '🥩 Mięso',
            bacon: '🥓 Bekon',
            cheese: '🧀 Ser',
            jalapeno: '🌶️ Jalapeño',
            vegetables: '🥗 Warzywa'
        },
        sides: {
            friesSmall: '🍟 Frytki 150g',
            friesLarge: '🍟 Frytki 300g',
            onionRingsSmall: '🧅 Krążki cebulowe 6 szt',
            onionRingsLarge: '🧅 Krążki cebulowe 12 szt',
            chickenStripsSmall: '🍗 Stripsy z kurczaka 3 szt',
            chickenStripsLarge: '🍗 Stripsy z kurczaka 6 szt',
            nuggetsSmall: '🍗 Nuggetsy 6 szt',
            nuggetsLarge: '🍗 Nuggetsy 12 szt',
            extraSauce: '🧂 Sos dodatkowy'
        },
        hotDrinks: {
            greenTea: '☕ Herbata zielona',
            americano: '☕ Americano',
            espresso: '☕ Espresso',
            doubleEspresso: '☕ Podwójne Espresso',
            cappuccino: '☕ Cappuccino',
            latte: '☕ Latte'
        },
        drinks: {
            cola: '🥤 Pepsi 0,33 l',
            colaZero: '🥤 Pepsi (zero) 0,33 l',
            sprite: '🥤 Sprite 0,33 l',
            fanta: '🥤 Fanta',
            orangeJuice: '🍊 Sok pomarańczowy 0,3 l',
            appleJuice: '🍎 Sok jabłkowy 0,3 l',
            multiJuice: '🍹 Sok multiwitamina 0,3 l',
            tomatoJuice: '🍅 Sok pomidorowy 0,3 l',
            waterStill: '💧 Woda niegazowana 0,33 l',
            waterSparkling: '💦 Woda gazowana 0,33 l',
            beerNonAlcoholic: '🍺 Piwo bezalkoholowe'
        }
    },
    en: {
        tagline: 'Menu',
        combo: 'combo: burger + fries + sauce',
        sauceIncluded: 'sauce included',
        sugarIncluded: 'sugar included',
        withLemon: 'with lemon',
        packagingNotice: '📦 Prices do not include takeaway packaging (+1 PLN)',
        cupNotice: '📦 Prices do not include takeaway packaging (+0.50 PLN)',
        extrasNotice: 'Extras available when ordering a burger',
        takeaway: {
            title: 'Place Pre-order',
            desc: 'Add items to cart and send your order. We\'ll have it ready before you arrive!',
            trouble: 'Or call us: +48 573 256 526',
            copy: 'Copy',
            call: 'Call'
        },
        doneness: {
            title: 'Customize your burger',
            medium: 'Medium',
            wellDone: 'Well done',
            addToCart: 'Add to Cart',
            comboOption: 'With fries and sauce (+9 zł)',
            comboShort: 'Combo'
        },
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
            chili: '🌶️ Sweet Chili',
            american: '🇺🇸 American',
            cheese: '🧀 Cheese',
            cheddarTopiony: '🧀 Melted Cheddar',
            spicy: '🔥 Spicy',
            mayo: '🥚 Mayo',
            thousandIsland: '🥗 Thousand Island',
            garlic: '🧄 Garlic',
            mustard: '🌭 Mustard'
        },
        burgers: {
            classic: {
                name: 'Classic Burger',
                desc: 'Brioche bun, 100% beef, cheddar cheese, onion, tomato, lettuce, pickled cucumber, mustard, ketchup'
            },
            cheese: {
                name: 'Cheesy Burger',
                desc: 'Brioche bun, 100% beef, 2x melted cheddar, mozzarella cheese, 2x cheese sauce, crispy bacon, roasted onion, arugula, tomato, pickled cucumber'
            },
            chicken: {
                name: 'Chicken Burger',
                desc: 'Brioche bun, chicken tenders, cheddar cheese, onion, tomato, lettuce, ketchup, mayo'
            },
            bbq: {
                name: 'BBQ Burger',
                desc: 'Brioche bun, 100% beef, 2x BBQ sauce, cheddar cheese, crispy bacon, onion, tomato, arugula, pickled cucumber'
            },
            spicy: {
                name: 'Spicy Burger',
                desc: 'Brioche bun, 100% beef, crispy bacon, cheddar cheese, jalapeño, fried onion, lettuce, pickled cucumber, sweet chili sauce, spicy sauce'
            },
            egg: {
                name: 'Egg Burger',
                desc: 'Brioche bun, 100% beef, crispy bacon, fried egg, fried onion, lettuce, pickled cucumber, mayo sauce, BBQ sauce'
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
            chickenStripsSmall: '🍗 Chicken Strips 3 pcs',
            chickenStripsLarge: '🍗 Chicken Strips 6 pcs',
            nuggetsSmall: '🍗 Nuggets 6 pcs',
            nuggetsLarge: '🍗 Nuggets 12 pcs',
            extraSauce: '🧂 Extra Sauce'
        },
        hotDrinks: {
            greenTea: '☕ Green Tea',
            americano: '☕ Americano',
            espresso: '☕ Espresso',
            doubleEspresso: '☕ Double Espresso',
            cappuccino: '☕ Cappuccino',
            latte: '☕ Latte'
        },
        drinks: {
            cola: '🥤 Pepsi 0.33 l',
            colaZero: '🥤 Pepsi (zero) 0.33 l',
            sprite: '🥤 Sprite 0.33 l',
            fanta: '🥤 Fanta',
            orangeJuice: '🍊 Orange Juice 0.3 l',
            appleJuice: '🍎 Apple Juice 0.3 l',
            multiJuice: '🍹 Multivitamin Juice 0.3 l',
            tomatoJuice: '🍅 Tomato Juice 0.3 l',
            waterStill: '💧 Still Water 0.33 l',
            waterSparkling: '💦 Sparkling Water 0.33 l',
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
