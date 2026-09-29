// Translation system for Burger 22 Menu
const translations = {
    pl: {
        metadata: {
            title: 'Menu — Burger 22 Wrocław',
            description: 'Menu Burger 22 we Wrocławiu: burgery, dodatki, sosy i napoje. Sprawdź menu i zamów online.'
        },
        tagline: 'Menu',
        categoryNavLabel: 'Kategorie menu',
        orderLabel: 'Zamówienie',
        comboTitle: 'Zestaw:',
        comboClassicOption: 'Klasyczne frytki z sosem:+10zł',
        comboWedgesOption: 'Łódeczki ziemniaczane z sosem:+14zł',
        withLemon: 'z cytryną',
        newItem: 'NOWOŚĆ',
        packagingNotice: 'Cena nie zawiera opakowania na wynos (+1 zł)',
        cupNotice: 'Opakowanie na wynos, jeśli jest potrzebne: +0,50 zł',
        depositNotice: 'Kaucja za butelkę zwrotną, jeśli dotyczy: +0,50 zł',
        sauceExtraNote: 'Sos dodatkowy: od 3 zł',
        disclaimer: 'Wygląd potrawy może się różnić od zdjęcia',
        takeaway: {
            title: 'Złóż przedzamówienie',
            desc: 'Zadzwoń i złóż zamówienie. Przygotujemy je przed Twoim przyjściem!',
            trouble: '+48 573 256 526',
            copy: 'Kopiuj numer',
            copied: 'Skopiowano',
            call: 'Zadzwoń',
            preorderNote: 'Wybierz „na wynos” i dopisz w komentarzu: „na miejscu”.'
        },
        nav: {
            burgers: 'Burgery',
            sides: 'Frytki i dodatki',
            sauces: 'Sosy',
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
            alcoholBeer: 'Piwo alkoholowe · 18+',
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
            potatoWedgesPrice: '17 zł',
            potatoWedgesNote: 'sos w cenie'
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
            alcoholAgeNotice: 'Sprzedaż alkoholu osobom poniżej 18 lat jest zabroniona.',
            alcoholOrderNotice: 'Tych piw nie można zamówić online ani w przedzamówieniu.',
            cherryAleStrength: '4,1% obj.',
            ipaStrength: '5,4% obj.',
            wiedenskiLagerStrength: '4,9% obj.',
            sodaMixNote: '330 ml',
            juiceMixNote: '300 ml',
            waterMixNote: '500 ml',
            zeroBeerMixNote: '330 ml'
        }
    },
    en: {
        metadata: {
            title: 'Menu — Burger 22 Wrocław',
            description: 'Burger 22 menu in Wrocław: burgers, sides, sauces and drinks. View the menu and order online.'
        },
        tagline: 'Menu',
        categoryNavLabel: 'Menu categories',
        orderLabel: 'Ordering',
        comboTitle: 'Combo (for burger):',
        comboClassicOption: 'Classic fries with sauce:+10 PLN',
        comboWedgesOption: 'Potato wedges with skin + sauce:+14 PLN',
        withLemon: 'with lemon',
        newItem: 'NEW',
        packagingNotice: 'Prices do not include takeaway packaging (+1 PLN)',
        cupNotice: 'Takeaway packaging, if needed: +0.50 PLN',
        depositNotice: 'Refundable bottle deposit, where applicable: +0.50 PLN',
        sauceExtraNote: 'Extra sauce: from 3 PLN',
        disclaimer: 'Actual product may differ from image',
        takeaway: {
            title: 'Place Pre-order',
            desc: 'Call us to place your order. We\'ll have it ready before you arrive!',
            trouble: '+48 573 256 526',
            copy: 'Copy number',
            copied: 'Copied',
            call: 'Call',
            preorderNote: 'Choose “takeaway” and add in comment: “on-site”.'
        },
        nav: {
            burgers: 'Burgers',
            sides: 'Fries & Sides',
            sauces: 'Sauces',
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
            alcoholBeer: 'Alcoholic beer · 18+',
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
            potatoWedgesPrice: '17 PLN',
            potatoWedgesNote: 'sauce included'
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
            alcoholAgeNotice: 'Sale of alcohol to anyone under 18 is prohibited.',
            alcoholOrderNotice: 'These beers cannot be ordered online or by pre-order.',
            cherryAleStrength: '4.1% ABV',
            ipaStrength: '5.4% ABV',
            wiedenskiLagerStrength: '4.9% ABV',
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
    window.CommonUtils.updatePageMetadata(pageLabels.metadata.title, pageLabels.metadata.description);
    document.getElementById('menuNav').setAttribute('aria-label', pageLabels.categoryNavLabel);
    document.querySelector('.menu-order').setAttribute('aria-label', pageLabels.orderLabel);
}

// Listen for language changes
window.addEventListener('languageChanged', () => {
    applyAllTranslations();
});

window.addEventListener('commonReady', applyAllTranslations);
