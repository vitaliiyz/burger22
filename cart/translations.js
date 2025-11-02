// Translation system for Cart Page
const translations = {
    pl: {
        title: 'Koszyk',
        emptyCart: 'Twój koszyk jest pusty',
        emptyCartDesc: 'Dodaj produkty z menu, aby złożyć zamówienie',
        goToMenu: 'Przejdź do menu',
        backToMenu: '← Wróć do menu',
        cartItems: 'Twoje zamówienie',
        itemName: 'Nazwa',
        quantity: 'Ilość',
        price: 'Cena',
        total: 'Razem',
        remove: 'Usuń',
        clearCart: 'Wyczyść koszyk',
        checkout: 'Złóż zamówienie',
        orderDetails: 'Szczegóły zamówienia',
        yourName: 'Twoje imię',
        yourPhone: 'Numer telefonu',
        pickupTime: 'Czas odbioru',
        pickupTimeNow: 'Jak najszybciej',
        pickupTime15: 'Za 15 minut',
        pickupTime30: 'Za 30 minut',
        pickupTime45: 'Za 45 minut',
        pickupTime60: 'Za 1 godzinę',
        comments: 'Uwagi do zamówienia (opcjonalnie)',
        paymentMethod: 'Sposób płatności',
        paymentCash: 'Gotówka przy odbiorze',
        paymentCard: 'Karta przy odbiorze',
        sendVia: 'Wyślij zamówienie przez',
        phoneCall: 'Zadzwoń',
        sendViaSite: 'Wyślij przez stronę',
        submitOrder: 'Wyślij zamówienie',
        namePlaceholder: 'Wpisz swoje imię',
        phonePlaceholder: 'np. +48 123 456 789',
        commentsPlaceholder: 'Dodatkowe informacje...',
        orderSummary: 'Podsumowanie zamówienia',
        subtotal: 'Suma',
        totalAmount: 'Do zapłaty'
    },
    en: {
        title: 'Cart',
        emptyCart: 'Your cart is empty',
        emptyCartDesc: 'Add items from menu to place an order',
        goToMenu: 'Go to menu',
        backToMenu: '← Back to menu',
        cartItems: 'Your order',
        itemName: 'Name',
        quantity: 'Quantity',
        price: 'Price',
        total: 'Total',
        remove: 'Remove',
        clearCart: 'Clear cart',
        checkout: 'Place order',
        orderDetails: 'Order details',
        yourName: 'Your name',
        yourPhone: 'Phone number',
        pickupTime: 'Pickup time',
        pickupTimeNow: 'As soon as possible',
        pickupTime15: 'In 15 minutes',
        pickupTime30: 'In 30 minutes',
        pickupTime45: 'In 45 minutes',
        pickupTime60: 'In 1 hour',
        comments: 'Order comments (optional)',
        paymentMethod: 'Payment method',
        paymentCash: 'Cash on pickup',
        paymentCard: 'Card on pickup',
        sendVia: 'Send order via',
        phoneCall: 'Call',
        sendViaSite: 'Send via website',
        submitOrder: 'Submit order',
        namePlaceholder: 'Enter your name',
        phonePlaceholder: 'e.g. +48 123 456 789',
        commentsPlaceholder: 'Additional information...',
        orderSummary: 'Order summary',
        subtotal: 'Subtotal',
        totalAmount: 'Total amount'
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
