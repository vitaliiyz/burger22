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
        disclaimer: 'Wygląd potrawy może się różnić od zdjęcia',
        takeaway: {
            title: 'Złóż przedzamówienie',
            desc: 'Zadzwoń i złóż zamówienie. Przygotujemy je przed Twoim przyjściem!',
            trouble: '+48 573 256 526',
            copy: 'Kopiuj',
            call: 'Zadzwoń'
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
                name: 'Klasyczny Burger',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong> otuloną aromatycznym serem <strong>cheddar</strong>. Świeże warzywa — chrupiąca <strong>sałata</strong>, soczysty <strong>pomidor</strong>, delikatna <strong>cebula</strong> i wyrazisty <strong>ogórek kiszony</strong> — dodają lekkości i równowagi. Całość podkreślają klasyczne akcenty <strong>musztardy</strong> i <strong>ketchupu</strong>, tworząc ponadczasowy smak, który zawsze zachwyca.'
            },
            cheese: {
                name: 'Serowy Burger',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong>, otuloną podwójnym <strong>topionym cheddarem</strong> i delikatną <strong>mozzarellą</strong>. Chrupiący <strong>bekon</strong> i aromatyczna <strong>cebula prażona</strong> dodają głębi smaku, a świeża <strong>rukola</strong>, soczysty <strong>pomidor</strong> i wyrazisty <strong>ogórek kiszony</strong> równoważą całość. Wszystko wzbogacają dwie porcje aksamitnego <strong>sosu serowego</strong>, tworząc prawdziwie serową eksplozję smaku, której nie da się zapomnieć.'
            },
            chicken: {
                name: 'Kurczak Burger',
                desc: 'Puszysta bułeczka <strong>brioche</strong> skrywa chrupiący, <strong>panierowany filet z kurczaka</strong>, otulony aromatycznym serem <strong>cheddar</strong>. Świeże warzywa — <strong>sałata</strong>, soczysty <strong>pomidor</strong> i delikatna <strong>cebula</strong> — dodają lekkości i świeżości, a klasyczne połączenie <strong>ketchupu</strong> i <strong>majonezu</strong> dopełnia smak w idealnie zbalansowaną, apetyczną kompozycję.'
            },
            bbq: {
                name: 'BBQ Burger',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong>, otuloną aromatycznym <strong>cheddarem</strong> i chrupiącym <strong>bekonem</strong>. Soczysty <strong>pomidor</strong>, świeża <strong>rukola</strong>, wyrazisty <strong>ogórek kiszony</strong> i aromatyczna <strong>cebula</strong> tworzą idealną równowagę, a dwie porcje <strong>sosu BBQ</strong> dopełniają całość, nadając burgerowi intensywny, dymny smak, którego nie da się zapomnieć.'
            },
            spicy: {
                name: 'Ostry Burger',
                desc: 'Puszysta bułeczka <strong>brioche</strong> kryje w sobie soczystą <strong>wołowinę</strong>, otuloną aromatycznym <strong>cheddarem</strong> i chrupiącym <strong>bekonem</strong>. Soczysta <strong>sałata</strong>, wyrazisty <strong>ogórek kiszony</strong> oraz <strong>smażona cebula</strong> dodają świeżości, a pikantne <strong>jalapeño</strong> w połączeniu ze <strong>słodkim chili</strong> i <strong>ostrym sosem</strong> tworzą wybuchową mieszankę smaków dla odważnych smakoszy.'
            },
            egg: {
                name: 'Jaja Burger',
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
            friesSmall: '🍟 Frytki 150g',
            friesLarge: '🍟 Frytki 300g',
            onionRingsSmall: '🧅 Krążki cebulowe 6 szt',
            onionRingsLarge: '🧅 Krążki cebulowe 12 szt',
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
            orangeJuice: '🍊 Sok pomarańczowy 0,3 l',
            appleJuice: '🍎 Sok jabłkowy 0,3 l',
            multiJuice: '🍹 Sok multiwitamina 0,3 l',
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
        newItem: 'NEW',
        popular1: '⭐ #1',
        popular2: '⭐ #2',
        popular3: '⭐ #3',
        packagingNotice: '📦 Prices do not include takeaway packaging (+1 PLN)',
        cupNotice: '📦 Prices do not include takeaway packaging (+0.50 PLN)',
        disclaimer: 'Actual product may differ from image',
        takeaway: {
            title: 'Place Pre-order',
            desc: 'Call us to place your order. We\'ll have it ready before you arrive!',
            trouble: '+48 573 256 526',
            copy: 'Copy',
            call: 'Call'
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
                name: 'Classic Burger',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong> wrapped in aromatic <strong>cheddar cheese</strong>. Fresh vegetables — crispy <strong>lettuce</strong>, juicy <strong>tomato</strong>, delicate <strong>onion</strong>, and distinctive <strong>pickled cucumber</strong> — add lightness and balance. Classic touches of <strong>mustard</strong> and <strong>ketchup</strong> complete the composition, creating a timeless flavor that always delights.'
            },
            cheese: {
                name: 'Cheesy Burger',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong>, wrapped in double <strong>melted cheddar</strong> and delicate <strong>mozzarella</strong>. Crispy <strong>bacon</strong> and aromatic <strong>roasted onion</strong> add depth of flavor, while fresh <strong>arugula</strong>, juicy <strong>tomato</strong>, and distinctive <strong>pickled cucumber</strong> balance everything out. Two portions of velvety <strong>cheese sauce</strong> enrich it all, creating a truly cheesy flavor explosion that you won\'t forget.'
            },
            chicken: {
                name: 'Chicken Burger',
                desc: 'A fluffy <strong>brioche bun</strong> conceals crispy, <strong>breaded chicken fillet</strong>, wrapped in aromatic <strong>cheddar cheese</strong>. Fresh vegetables — <strong>lettuce</strong>, juicy <strong>tomato</strong>, and delicate <strong>onion</strong> — add lightness and freshness, while the classic combination of <strong>ketchup</strong> and <strong>mayo</strong> completes the flavor in a perfectly balanced, appetizing composition.'
            },
            bbq: {
                name: 'BBQ Burger',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong>, wrapped in aromatic <strong>cheddar</strong> and crispy <strong>bacon</strong>. Juicy <strong>tomato</strong>, fresh <strong>arugula</strong>, distinctive <strong>pickled cucumber</strong>, and aromatic <strong>onion</strong> create the perfect balance, while two portions of <strong>BBQ sauce</strong> complete everything, giving the burger an intense, smoky flavor that you won\'t forget.'
            },
            spicy: {
                name: 'Spicy Burger',
                desc: 'A fluffy <strong>brioche bun</strong> conceals juicy <strong>beef</strong>, wrapped in aromatic <strong>cheddar</strong> and crispy <strong>bacon</strong>. Juicy <strong>lettuce</strong>, distinctive <strong>pickled cucumber</strong>, and <strong>fried onion</strong> add freshness, while spicy <strong>jalapeño</strong> combined with <strong>sweet chili</strong> and <strong>spicy sauce</strong> create an explosive mix of flavors for bold food lovers.'
            },
            egg: {
                name: 'Egg Burger',
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
            friesSmall: '🍟 Fries 150g',
            friesLarge: '🍟 Fries 300g',
            onionRingsSmall: '🧅 Onion Rings 6 pcs',
            onionRingsLarge: '🧅 Onion Rings 12 pcs',
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
            orangeJuice: '🍊 Orange Juice 0.3 l',
            appleJuice: '🍎 Apple Juice 0.3 l',
            multiJuice: '🍹 Multivitamin Juice 0.3 l',
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
