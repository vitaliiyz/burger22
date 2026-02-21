// Translation system for Burger 22 Menu
const translations = {
    pl: {
        tagline: 'Menu',
        combo: 'zestaw: burger + frytki + sos',
        sauceIncluded: 'sos w cenie',
        sugarIncluded: 'cukier w cenie',
        withLemon: 'z cytryną',
        newItem: 'NOWOŚĆ',
        popular1: '⭐ #1',
        popular2: '⭐ #2',
        popular3: '⭐ #3',
        packagingNotice: '📦 Cena nie zawiera opakowania na wynos (+1 zł)',
        cupNotice: '📦 Cena nie zawiera opakowania na wynos (+0,50 zł)',
        depositNotice: '♻️ Cena nie zawiera kaucji za butelkę zwrotną (+0,50 zł)',
        sauceExtraNote: '🧂 Sos dodatkowy: od 3 zł',
        disclaimer: 'Wygląd potrawy może się różnić od zdjęcia',
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
            drinks: '🥤 Napoje',
            extras: '🥓 Dodatki do burgera'
        },
        sections: {
            burgers: 'Burgery',
            sides: 'Frytki i dodatki',
            sauces: 'Sosy na wybór',
            hotDrinks: 'Napoje gorące',
            drinks: 'Napoje',
            drinksCold: 'Napoje zimne',
            extras: '🥓 Dodatki do burgera'
        },
        sauces: {
            ketchup: '🍅 Ketchup',
            bbq: '🍖 BBQ',
            chili: '🌶️ Słodki Chili',
            cheese: '🧀 Serowy',
            cheddarTopiony: '🧀 Cheddar Topiony',
            spicy: '🔥 Ostry',
            mayo: '🥚 Majonez',
            garlic: '🧄 Czosnkowy',
            mustard: '🌭 Musztarda'
        },
        burgers: {
            camemburger: {
                name: 'Camemburger',
                badge: 'Zimowa edycja',
                desc: 'Puszysta bułeczka <strong>brioche</strong> skrywa soczystą <strong>wołowinę</strong>, chrupiący <strong>bekon</strong> i kremowy <strong>camembert</strong>, który rozpływa się przy każdym kęsie. Słodycz <strong>żurawiny</strong> przełamuje intensywność sera, tworząc idealny kontrast, a świeża <strong>rukola</strong> dodaje lekkości i aromatu. Całość dopełnia aksamitny <strong>sos miodowo-musztardowy</strong>, który łączy wszystkie smaki w harmonijną, wykwintną kompozycję.'
            },
            classic: {
                name: 'Klasyczny cheeseburger z wołowiną i cheddarem',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong> otuloną aromatycznym serem <strong>cheddar</strong>. Świeże warzywa — chrupiąca <strong>sałata</strong>, soczysty <strong>pomidor</strong>, delikatna <strong>cebula</strong> i wyrazisty <strong>ogórek kiszony</strong> — dodają lekkości i równowagi. Całość podkreślają klasyczne akcenty <strong>musztardy</strong> i <strong>ketchupu</strong>, tworząc ponadczasowy smak, który zawsze zachwyca.'
            },
            cheese: {
                name: 'Burger Serowy z potrójnym serem i bekonem',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong>, otuloną podwójnym <strong>topionym cheddarem</strong> i delikatną <strong>mozzarellą</strong>. Chrupiący <strong>bekon</strong> i aromatyczna <strong>cebula prażona</strong> dodają głębi smaku, a świeża <strong>rukola</strong>, soczysty <strong>pomidor</strong> i wyrazisty <strong>ogórek kiszony</strong> równoważą całość. Wszystko wzbogacają dwie porcje aksamitnego <strong>sosu serowego</strong>, tworząc prawdziwie serową eksplozję smaku, której nie da się zapomnieć.'
            },
            chicken: {
                name: 'Burger z chrupiącym kurczakiem i cheddarem',
                desc: 'Puszysta bułeczka <strong>brioche</strong> skrywa chrupiący, <strong>panierowany filet z kurczaka</strong>, otulony aromatycznym serem <strong>cheddar</strong>. Świeże warzywa — <strong>sałata</strong>, soczysty <strong>pomidor</strong> i delikatna <strong>cebula</strong> — dodają lekkości i świeżości, a klasyczne połączenie <strong>ketchupu</strong> i <strong>majonezu</strong> dopełnia smak w idealnie zbalansowaną, apetyczną kompozycję.'
            },
            bbq: {
                name: 'BBQ burger z bekonem i cheddarem',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong>, otuloną aromatycznym <strong>cheddarem</strong> i chrupiącym <strong>bekonem</strong>. Soczysty <strong>pomidor</strong>, świeża <strong>rukola</strong>, wyrazisty <strong>ogórek kiszony</strong> i aromatyczna <strong>cebula</strong> tworzą idealną równowagę, a dwie porcje <strong>sosu BBQ</strong> dopełniają całość, nadając burgerowi intensywny, dymny smak, którego nie da się zapomnieć.'
            },
            spicy: {
                name: 'Ostry burger z bekonem i jalapeño',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong>, otuloną aromatycznym <strong>cheddarem</strong> i chrupiącym <strong>bekonem</strong>. Soczysta <strong>sałata</strong>, wyrazisty <strong>ogórek kiszony</strong> oraz <strong>smażona cebula</strong> dodają świeżości, a pikantne <strong>jalapeño</strong> w połączeniu ze <strong>słodkim chili</strong> i <strong>ostrym sosem</strong> tworzą wybuchową mieszankę smaków dla odważnych smakoszy.'
            },
            egg: {
                name: 'Burger z jajkiem sadzonym i bekonem',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong>, chrupiący <strong>bekon</strong> i idealnie usmażone <strong>jajko sadzone</strong>. Soczysta <strong>sałata</strong>, wyrazisty <strong>ogórek kiszony</strong> oraz aromatyczna <strong>smażona cebula</strong> dodają świeżości, a <strong>sos majonez</strong> i <strong>sos BBQ</strong> łączą wszystkie smaki w harmonijną, apetyczną całość, tworząc burger pełen kontrastów i przyjemnej intensywności.'
            }
        },
        extras: {
            meat: '🥩 Mięso',
            friedCamembert: '🧀 Ser Camembert Smażony',
            bacon: '🥓 Bekon',
            cheese: '🧀 Ser',
            jalapeno: '🌶️ Jalapeño',
            vegetables: '🥗 Warzywa'
        },
        sides: {
            fries: '🍟 Frytki S/L',
            friesPrice: '14/18 zł',
            friesNote: '150g/250g · sos w cenie',
            onionRings: '🧅 Krążki cebulowe S/L',
            onionRingsPrice: '13/19 zł',
            onionRingsNote: '6/12 szt · sos w cenie',
            nuggets: '🍗 Nuggetsy S/L',
            nuggetsPrice: '17/25 zł',
            nuggetsNote: '6/12 szt · sos w cenie',
            potatoWedges: '🥔 Łódeczki ziemniaczane ze skórką',
            potatoWedgesDesc: 'Grube frytki ziemniaczane ze skórką - miękkie w środku, złociste na zewnątrz.',
            potatoWedgesPrice: '17 zł',
            potatoWedgesNote: 'sos w cenie',
            friesSmall: '🍟 Frytki S',
            friesLarge: '🍟 Frytki L',
            onionRingsSmall: '🧅 Krążki cebulowe S',
            onionRingsLarge: '🧅 Krążki cebulowe L',
            nuggetsSmall: '🍗 Nuggetsy S',
            nuggetsLarge: '🍗 Nuggetsy L',
            friesSmallNote: '150g · sos w cenie',
            friesLargeNote: '250g · sos w cenie',
            onionRingsSmallNote: '6 szt · sos w cenie',
            onionRingsLargeNote: '12 szt · sos w cenie',
            nuggetsSmallNote: '6 szt · sos w cenie',
            nuggetsLargeNote: '12 szt · sos w cenie',
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
            sodaMix: '🥤 Pepsi/Cola/Sprite',
            juiceMix: '🍹 Sok',
            juiceOptionOrange: 'pomarańczowy',
            juiceOptionApple: 'jabłkowy',
            juiceOptionMulti: 'multiwitamina',
            waterMix: '💧 Woda',
            waterOptionStill: 'niegazowana',
            waterOptionSparkling: 'gazowana',
            sodaMixNote: '330 ml',
            juiceMixNote: '300 ml',
            waterMixNote: '500 ml'
        }
    },
    en: {
        tagline: 'Menu',
        combo: 'combo: burger + fries + sauce',
        sauceIncluded: 'sauce included',
        sugarIncluded: 'sugar included',
        withLemon: 'with lemon',
        newItem: 'NEW',
        popular1: '⭐ #1',
        popular2: '⭐ #2',
        popular3: '⭐ #3',
        packagingNotice: '📦 Prices do not include takeaway packaging (+1 PLN)',
        cupNotice: '📦 Prices do not include takeaway packaging (+0.50 PLN)',
        depositNotice: '♻️ Prices do not include the refundable bottle deposit (+0.50 PLN)',
        sauceExtraNote: '🧂 Extra sauce: from 3 PLN',
        disclaimer: 'Actual product may differ from image',
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
            drinks: '🥤 Drinks',
            extras: '🥓 Burger Extras'
        },
        sections: {
            burgers: 'Burgers',
            sides: 'Fries & Sides',
            sauces: 'Choice of Sauces',
            hotDrinks: 'Hot Drinks',
            drinks: 'Drinks',
            drinksCold: 'Cold Drinks',
            extras: '🥓 Burger Extras'
        },
        sauces: {
            ketchup: '🍅 Ketchup',
            bbq: '🍖 BBQ',
            chili: '🌶️ Sweet Chili',
            cheese: '🧀 Cheese',
            cheddarTopiony: '🧀 Melted Cheddar',
            spicy: '🔥 Spicy',
            mayo: '🥚 Mayo',
            garlic: '🧄 Garlic',
            mustard: '🌭 Mustard'
        },
        burgers: {
            camemburger: {
                name: 'Camemburger',
                badge: 'Winter edition',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong>, crispy <strong>bacon</strong>, and creamy <strong>camembert</strong> that melts with every bite. The sweetness of <strong>cranberry</strong> breaks through the intensity of the cheese, creating the perfect contrast, while fresh <strong>arugula</strong> adds lightness and aroma. Everything is complemented by a velvety <strong>honey-mustard sauce</strong> that brings all the flavors together in a harmonious, exquisite composition.'
            },
            classic: {
                name: 'Classic Cheeseburger',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong> wrapped in aromatic <strong>cheddar cheese</strong>. Fresh vegetables — crispy <strong>lettuce</strong>, juicy <strong>tomato</strong>, delicate <strong>onion</strong>, and distinctive <strong>pickled cucumber</strong> — add lightness and balance. Classic touches of <strong>mustard</strong> and <strong>ketchup</strong> complete the composition, creating a timeless flavor that always delights.'
            },
            cheese: {
                name: 'Triple Cheese Bacon',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong>, wrapped in double <strong>melted cheddar</strong> and delicate <strong>mozzarella</strong>. Crispy <strong>bacon</strong> and aromatic <strong>roasted onion</strong> add depth of flavor, while fresh <strong>arugula</strong>, juicy <strong>tomato</strong>, and distinctive <strong>pickled cucumber</strong> balance everything out. Two portions of velvety <strong>cheese sauce</strong> enrich it all, creating a truly cheesy flavor explosion that you won\'t forget.'
            },
            chicken: {
                name: 'Crispy Chicken',
                desc: 'A fluffy <strong>brioche bun</strong> conceals crispy, <strong>breaded chicken fillet</strong>, wrapped in aromatic <strong>cheddar cheese</strong>. Fresh vegetables — <strong>lettuce</strong>, juicy <strong>tomato</strong>, and delicate <strong>onion</strong> — add lightness and freshness, while the classic combination of <strong>ketchup</strong> and <strong>mayo</strong> completes the flavor in a perfectly balanced, appetizing composition.'
            },
            bbq: {
                name: 'BBQ Bacon',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong>, wrapped in aromatic <strong>cheddar</strong> and crispy <strong>bacon</strong>. Juicy <strong>tomato</strong>, fresh <strong>arugula</strong>, distinctive <strong>pickled cucumber</strong>, and aromatic <strong>onion</strong> create the perfect balance, while two portions of <strong>BBQ sauce</strong> complete everything, giving the burger an intense, smoky flavor that you won\'t forget.'
            },
            spicy: {
                name: 'Spicy Bacon Jalapeño',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong>, wrapped in aromatic <strong>cheddar</strong> and crispy <strong>bacon</strong>. Juicy <strong>lettuce</strong>, distinctive <strong>pickled cucumber</strong>, and <strong>fried onion</strong> add freshness, while spicy <strong>jalapeño</strong> combined with <strong>sweet chili</strong> and <strong>spicy sauce</strong> create an explosive mix of flavors for bold food lovers.'
            },
            egg: {
                name: 'Bacon Egg',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong>, crispy <strong>bacon</strong>, and perfectly <strong>fried egg</strong>. Juicy <strong>lettuce</strong>, distinctive <strong>pickled cucumber</strong>, and aromatic <strong>fried onion</strong> add freshness, while <strong>mayo sauce</strong> and <strong>BBQ sauce</strong> bring all the flavors together in a harmonious, appetizing whole, creating a burger full of contrasts and pleasant intensity.'
            }
        },
        extras: {
            meat: '🥩 Meat',
            friedCamembert: '🧀 Fried Camembert Cheese',
            bacon: '🥓 Bacon',
            cheese: '🧀 Cheese',
            jalapeno: '🌶️ Jalapeño',
            vegetables: '🥗 Vegetables'
        },
        sides: {
            fries: '🍟 Fries S/L',
            friesPrice: '14/18 PLN',
            friesNote: '150g/250g · sauce included',
            onionRings: '🧅 Onion Rings S/L',
            onionRingsPrice: '13/19 PLN',
            onionRingsNote: '6/12 pcs · sauce included',
            nuggets: '🍗 Nuggets S/L',
            nuggetsPrice: '17/25 PLN',
            nuggetsNote: '6/12 pcs · sauce included',
            potatoWedges: '🥔 Potato wedges with skin',
            potatoWedgesDesc: 'Thick skin-on potato fries - soft inside, golden on the outside.',
            potatoWedgesPrice: '17 PLN',
            potatoWedgesNote: 'sauce included',
            friesSmall: '🍟 Fries S',
            friesLarge: '🍟 Fries L',
            onionRingsSmall: '🧅 Onion Rings S',
            onionRingsLarge: '🧅 Onion Rings L',
            nuggetsSmall: '🍗 Nuggets S',
            nuggetsLarge: '🍗 Nuggets L',
            friesSmallNote: '150g · sauce included',
            friesLargeNote: '250g · sauce included',
            onionRingsSmallNote: '6 pcs · sauce included',
            onionRingsLargeNote: '12 pcs · sauce included',
            nuggetsSmallNote: '6 pcs · sauce included',
            nuggetsLargeNote: '12 pcs · sauce included',
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
            sodaMix: '🥤 Pepsi/Cola/Sprite',
            juiceMix: '🍹 Juice',
            juiceOptionOrange: 'orange',
            juiceOptionApple: 'apple',
            juiceOptionMulti: 'multivitamin',
            waterMix: '💧 Water',
            waterOptionStill: 'still',
            waterOptionSparkling: 'sparkling',
            sodaMixNote: '330 ml',
            juiceMixNote: '300 ml',
            waterMixNote: '500 ml'
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
