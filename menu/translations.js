// Translation system for Burger 22 Menu
const translations = {
    pl: {
        tagline: 'Menu',
        categoryNavLabel: 'Kategorie menu',
        orderLabel: 'Zamówienie',
        combo: 'zestaw: burger + frytki + sos',
        comboTitle: 'Zestaw:',
        comboClassicOption: 'Klasyczne frytki z sosem:+10zł',
        comboWedgesOption: 'Łódeczki ziemniaczane z sosem:+14zł',
        sauceIncluded: 'sos w cenie',
        sugarIncluded: 'cukier w cenie',
        withLemon: 'z cytryną',
        newItem: 'NOWOŚĆ',
        popular1: '⭐ #1',
        popular2: '⭐ #2',
        popular3: '⭐ #3',
        packagingNotice: 'Cena nie zawiera opakowania na wynos (+1 zł)',
        cupNotice: 'Cena nie zawiera opakowania na wynos (+0,50 zł)',
        depositNotice: 'Cena nie zawiera kaucji za butelkę zwrotną (+0,50 zł)',
        sauceExtraNote: 'Sos dodatkowy: od 3 zł',
        disclaimer: 'Wygląd potrawy może się różnić od zdjęcia',
        takeaway: {
            title: 'Złóż przedzamówienie',
            desc: 'Zadzwoń i złóż zamówienie. Przygotujemy je przed Twoim przyjściem!',
            trouble: '+48 573 256 526',
            copy: 'Kopiuj',
            copied: 'Skopiowano',
            call: 'Zadzwoń',
            or: 'lub',
            preorder: 'Zrób przedzamówienie',
            preorderNote: 'Wybierz „na wynos” i dopisz w komentarzu: „na miejscu”.'
        },
        nav: {
            burgers: 'Burgery',
            sides: 'Frytki i dodatki',
            sauces: 'Sosy',
            hotDrinks: 'Napoje gorące',
            drinks: 'Napoje',
            extras: 'Dodatki do burgera'
        },
        sections: {
            burgers: 'Burgery',
            sides: 'Frytki i dodatki',
            sauces: 'Sosy na wybór',
            hotDrinks: 'Napoje gorące',
            drinks: 'Napoje',
            drinksCold: 'Napoje zimne',
            extras: 'Dodatki do burgera'
        },
        sauces: {
            ketchup: 'Ketchup',
            bbq: 'BBQ',
            chili: 'Słodki Chili',
            cheddarTopiony: 'Cheddar Topiony',
            mayo: 'Majonez',
            garlic: 'Czosnkowy'
        },
        extras: {
            meat: 'Mięso',
            friedCamembert: 'Ser Camembert Smażony',
            bacon: 'Bekon / Bekon x2',
            cheese: 'Ser',
            jalapeno: 'Jalapeño',
            vegetables: 'Warzywa'
        },
        sides: {
            fries: 'Frytki S/L',
            friesPrice: '14/18 zł',
            friesNote: '150g/250g · sos w cenie',
            onionRings: 'Krążki cebulowe S/L',
            onionRingsPrice: '13/19 zł',
            onionRingsNote: '6/12 szt · sos w cenie',
            nuggets: 'Nuggetsy S/L',
            nuggetsPrice: '17/25 zł',
            nuggetsNote: '6/12 szt · sos w cenie',
            potatoWedges: 'Łódeczki ziemniaczane ze skórką',
            potatoWedgesDesc: 'Grube frytki ziemniaczane ze skórką - miękkie w środku, złociste na zewnątrz.',
            potatoWedgesPrice: '17 zł',
            potatoWedgesNote: 'sos w cenie',
            friesSmall: 'Frytki S',
            friesLarge: 'Frytki L',
            onionRingsSmall: 'Krążki cebulowe S',
            onionRingsLarge: 'Krążki cebulowe L',
            nuggetsSmall: 'Nuggetsy S',
            nuggetsLarge: 'Nuggetsy L',
            friesSmallNote: '150g · sos w cenie',
            friesLargeNote: '250g · sos w cenie',
            onionRingsSmallNote: '6 szt · sos w cenie',
            onionRingsLargeNote: '12 szt · sos w cenie',
            nuggetsSmallNote: '6 szt · sos w cenie',
            nuggetsLargeNote: '12 szt · sos w cenie',
            extraSauce: 'Sos dodatkowy'
        },
        hotDrinks: {
            greenTea: 'Herbata zielona',
            americano: 'Americano',
            espresso: 'Espresso',
            doubleEspresso: 'Podwójne Espresso',
            cappuccino: 'Cappuccino',
            latte: 'Latte'
        },
        drinks: {
            sodaMix: 'Pepsi/Cola/Sprite',
            juiceMix: 'Sok',
            juiceOptionOrange: 'pomarańczowy',
            juiceOptionApple: 'jabłkowy',
            juiceOptionMulti: 'multiwitamina',
            waterMix: 'Woda',
            waterOptionStill: 'niegazowana',
            waterOptionSparkling: 'gazowana',
            zeroBeerMix: 'Piwo 0%',
            zeroBeerOptionClassic: 'klasyczne',
            zeroBeerOptionFlavored: 'smakowe',
            sodaMixNote: '330 ml',
            juiceMixNote: '300 ml',
            waterMixNote: '500 ml',
            zeroBeerMixNote: '330 ml'
        }
    },
    en: {
        tagline: 'Menu',
        categoryNavLabel: 'Menu categories',
        orderLabel: 'Ordering',
        combo: 'combo: burger + fries + sauce',
        comboTitle: 'Combo (for burger):',
        comboClassicOption: 'Classic fries with sauce:+10 PLN',
        comboWedgesOption: 'Potato wedges with skin + sauce:+14 PLN',
        sauceIncluded: 'sauce included',
        sugarIncluded: 'sugar included',
        withLemon: 'with lemon',
        newItem: 'NEW',
        popular1: '⭐ #1',
        popular2: '⭐ #2',
        popular3: '⭐ #3',
        packagingNotice: 'Prices do not include takeaway packaging (+1 PLN)',
        cupNotice: 'Prices do not include takeaway packaging (+0.50 PLN)',
        depositNotice: 'Prices do not include the refundable bottle deposit (+0.50 PLN)',
        sauceExtraNote: 'Extra sauce: from 3 PLN',
        disclaimer: 'Actual product may differ from image',
        takeaway: {
            title: 'Place Pre-order',
            desc: 'Call us to place your order. We\'ll have it ready before you arrive!',
            trouble: '+48 573 256 526',
            copy: 'Copy',
            copied: 'Copied',
            call: 'Call',
            or: 'or',
            preorder: 'Place pre-order',
            preorderNote: 'Choose “takeaway” and add in comment: “on-site”.'
        },
        nav: {
            burgers: 'Burgers',
            sides: 'Fries & Sides',
            sauces: 'Sauces',
            hotDrinks: 'Hot Drinks',
            drinks: 'Drinks',
            extras: 'Burger Extras'
        },
        sections: {
            burgers: 'Burgers',
            sides: 'Fries & Sides',
            sauces: 'Choice of Sauces',
            hotDrinks: 'Hot Drinks',
            drinks: 'Drinks',
            drinksCold: 'Cold Drinks',
            extras: 'Burger Extras'
        },
        sauces: {
            ketchup: 'Ketchup',
            bbq: 'BBQ',
            chili: 'Sweet Chili',
            cheddarTopiony: 'Melted Cheddar',
            mayo: 'Mayo',
            garlic: 'Garlic'
        },
        extras: {
            meat: 'Meat',
            friedCamembert: 'Fried Camembert Cheese',
            bacon: 'Bacon / Bacon x2',
            cheese: 'Cheese',
            jalapeno: 'Jalapeño',
            vegetables: 'Vegetables'
        },
        sides: {
            fries: 'Fries S/L',
            friesPrice: '14/18 PLN',
            friesNote: '150g/250g · sauce included',
            onionRings: 'Onion Rings S/L',
            onionRingsPrice: '13/19 PLN',
            onionRingsNote: '6/12 pcs · sauce included',
            nuggets: 'Nuggets S/L',
            nuggetsPrice: '17/25 PLN',
            nuggetsNote: '6/12 pcs · sauce included',
            potatoWedges: 'Potato wedges with skin',
            potatoWedgesDesc: 'Thick skin-on potato fries - soft inside, golden on the outside.',
            potatoWedgesPrice: '17 PLN',
            potatoWedgesNote: 'sauce included',
            friesSmall: 'Fries S',
            friesLarge: 'Fries L',
            onionRingsSmall: 'Onion Rings S',
            onionRingsLarge: 'Onion Rings L',
            nuggetsSmall: 'Nuggets S',
            nuggetsLarge: 'Nuggets L',
            friesSmallNote: '150g · sauce included',
            friesLargeNote: '250g · sauce included',
            onionRingsSmallNote: '6 pcs · sauce included',
            onionRingsLargeNote: '12 pcs · sauce included',
            nuggetsSmallNote: '6 pcs · sauce included',
            nuggetsLargeNote: '12 pcs · sauce included',
            extraSauce: 'Extra Sauce'
        },
        hotDrinks: {
            greenTea: 'Green Tea',
            americano: 'Americano',
            espresso: 'Espresso',
            doubleEspresso: 'Double Espresso',
            cappuccino: 'Cappuccino',
            latte: 'Latte'
        },
        drinks: {
            sodaMix: 'Pepsi/Cola/Sprite',
            juiceMix: 'Juice',
            juiceOptionOrange: 'orange',
            juiceOptionApple: 'apple',
            juiceOptionMulti: 'multivitamin',
            waterMix: 'Water',
            waterOptionStill: 'still',
            waterOptionSparkling: 'sparkling',
            zeroBeerMix: 'Beer 0%',
            zeroBeerOptionClassic: 'classic',
            zeroBeerOptionFlavored: 'flavored',
            sodaMixNote: '330 ml',
            juiceMixNote: '300 ml',
            waterMixNote: '500 ml',
            zeroBeerMixNote: '330 ml'
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
    const pageLabels = translations[window.CommonUtils.currentLang];
    document.getElementById('menuNav').setAttribute('aria-label', pageLabels.categoryNavLabel);
    document.querySelector('.menu-order').setAttribute('aria-label', pageLabels.orderLabel);
}

// Listen for language changes
window.addEventListener('languageChanged', () => {
    applyAllTranslations();
});

window.addEventListener('commonReady', applyAllTranslations);
