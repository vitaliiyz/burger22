// Cart Page Application Logic

let cart = null;
let selectedMessenger = 'telegram'; // Default messenger (via website)

// Cloudflare Worker URL для отправки заказов
// Это публичный endpoint - безопасно для GitHub (не содержит секретов)
const CLOUDFLARE_WORKER_URL = 'https://burger22-orders.vz260198.workers.dev';

document.addEventListener('DOMContentLoaded', () => {
    // Wait for cart to initialize
    setTimeout(() => {
        cart = window.BurgerCart;
        initCartPage();
        initMessengerButtons();
    }, 100);
});

function initMessengerButtons() {
    const messengerButtons = document.querySelectorAll('.messenger-btn');

    messengerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            messengerButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            // Update selected messenger
            selectedMessenger = btn.dataset.messenger;
        });
    });
}

function initCartPage() {
    renderCart();

    // Listen for cart updates
    window.addEventListener('cartUpdated', renderCart);

    // Clear cart button
    document.getElementById('clearCartBtn')?.addEventListener('click', () => {
        if (confirm(getCurrentLang() === 'pl' ?
            'Czy na pewno chcesz wyczyścić koszyk?' :
            'Are you sure you want to clear the cart?')) {
            cart.clearCart();
        }
    });

    // Checkout form
    document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckout);

    // Update placeholders on language change
    window.addEventListener('languageChanged', updatePlaceholders);
}

function renderCart() {
    const items = cart.getItems();
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (items.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';

    renderCartItems(items);
    updateCartSummary();
}

function renderCartItems(items) {
    const cartItemsList = document.getElementById('cartItemsList');
    const currentLang = getCurrentLang();

    cartItemsList.innerHTML = items.map(item => {
        const itemTotal = item.price * item.quantity;
        const imageHtml = item.image ?
            `<img src="../menu/${item.image}" alt="${item.name}" class="cart-item-image">` :
            `<div class="cart-item-image no-image">${getItemEmoji(item.type)}</div>`;

        return `
            <div class="cart-item" data-item-id="${item.id}">
                ${imageHtml}
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} zł</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-btn" data-item-id="${item.id}">−</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-item-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-item-id="${item.id}">
                        ${currentLang === 'pl' ? 'Usuń' : 'Remove'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Add event listeners
    cartItemsList.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            cart.increaseQuantity(btn.dataset.itemId);
        });
    });

    cartItemsList.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            cart.decreaseQuantity(btn.dataset.itemId);
        });
    });

    cartItemsList.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            cart.removeItem(btn.dataset.itemId);
        });
    });
}

function getItemEmoji(type) {
    const emojis = {
        burger: '🍔',
        side: '🍟',
        drink: '🥤',
        extra: '🥓'
    };
    return emojis[type] || '🍽️';
}

function updateCartSummary() {
    const subtotal = cart.getTotalPrice();
    document.getElementById('subtotalPrice').textContent = `${subtotal} zł`;
    document.getElementById('totalPrice').textContent = `${subtotal} zł`;
}

function handleCheckout(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const orderData = {
        name: formData.get('customerName'),
        phone: formData.get('customerPhone'),
        pickupTime: formData.get('pickupTime'),
        paymentMethod: formData.get('paymentMethod'),
        comments: formData.get('comments'),
        items: cart.getItems(),
        total: cart.getTotalPrice()
    };

    // Send order via selected method
    if (selectedMessenger === 'phone') {
        makePhoneCall(orderData);
    } else if (selectedMessenger === 'telegram') {
        sendOrderViaTelegram(orderData);
    } else {
        sendOrderViaWhatsApp(orderData);
    }
}

function sendOrderViaWhatsApp(orderData) {
    const currentLang = getCurrentLang();

    // Format pickup time
    const pickupTimeLabels = {
        pl: {
            asap: 'Jak najszybciej',
            '15min': 'Za 15 minut',
            '30min': 'Za 30 minut',
            '45min': 'Za 45 minut',
            '60min': 'Za 1 godzinę'
        },
        en: {
            asap: 'As soon as possible',
            '15min': 'In 15 minutes',
            '30min': 'In 30 minutes',
            '45min': 'In 45 minutes',
            '60min': 'In 1 hour'
        }
    };

    const paymentLabels = {
        pl: {
            cash: 'Gotówka',
            card: 'Karta'
        },
        en: {
            cash: 'Cash',
            card: 'Card'
        }
    };

    // Build message
    let message = currentLang === 'pl' ?
        `*🍔 NOWE ZAMÓWIENIE - Burger 22*\n\n` :
        `*🍔 NEW ORDER - Burger 22*\n\n`;

    message += currentLang === 'pl' ? `*Imię:* ${orderData.name}\n` : `*Name:* ${orderData.name}\n`;
    message += currentLang === 'pl' ? `*Telefon:* ${orderData.phone}\n` : `*Phone:* ${orderData.phone}\n`;
    message += currentLang === 'pl' ? `*Odbiór:* ${pickupTimeLabels[currentLang][orderData.pickupTime]}\n` : `*Pickup:* ${pickupTimeLabels[currentLang][orderData.pickupTime]}\n`;
    message += currentLang === 'pl' ? `*Płatność:* ${paymentLabels[currentLang][orderData.paymentMethod]}\n\n` : `*Payment:* ${paymentLabels[currentLang][orderData.paymentMethod]}\n\n`;

    message += currentLang === 'pl' ? `*Zamówienie:*\n` : `*Order:*\n`;

    orderData.items.forEach(item => {
        message += `• ${item.name} x${item.quantity} = ${item.price * item.quantity} zł\n`;
    });

    message += `\n*${currentLang === 'pl' ? 'RAZEM' : 'TOTAL'}:* ${orderData.total} zł`;

    if (orderData.comments) {
        message += `\n\n*${currentLang === 'pl' ? 'Uwagi' : 'Comments'}:*\n${orderData.comments}`;
    }

    // WhatsApp phone number
    const whatsappNumber = '48573256526'; // Format: country code + number (no + or spaces)

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear cart after sending
    setTimeout(() => {
        if (confirm(currentLang === 'pl' ?
            'Zamówienie wysłane! Czy wyczyścić koszyk?' :
            'Order sent! Clear cart?')) {
            cart.clearCart();
        }
    }, 1000);
}

function sendOrderViaTelegram(orderData) {
    const currentLang = getCurrentLang();

    // Check if worker URL is configured
    if (!CLOUDFLARE_WORKER_URL || CLOUDFLARE_WORKER_URL === 'YOUR_CLOUDFLARE_WORKER_URL_HERE') {
        alert(currentLang === 'pl' ?
            'Błąd konfiguracji. Skontaktuj się z administratorem.' :
            'Configuration error. Please contact administrator.');
        return;
    }

    // Show loading message
    const submitButton = document.querySelector('.btn-primary.btn-large');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = currentLang === 'pl' ? 'Wysyłanie...' : 'Sending...';

    // Add language to order data
    orderData.lang = currentLang;

    // Send to Cloudflare Worker
    fetch(CLOUDFLARE_WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Success
        alert(currentLang === 'pl' ?
            '✅ Zamówienie wysłane! Skontaktujemy się wkrótce.' :
            '✅ Order sent! We will contact you soon.');

        // Clear cart
        cart.clearCart();

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    })
    .catch(error => {
        console.error('Error sending order:', error);
        alert(currentLang === 'pl' ?
            '❌ Błąd wysyłania zamówienia. Spróbuj ponownie lub zadzwoń.' :
            '❌ Error sending order. Please try again or call us.');

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
}

function makePhoneCall(orderData) {
    const currentLang = getCurrentLang();
    const phoneNumber = '+48573256526';

    // Show message to user
    alert(currentLang === 'pl' ?
        `Teraz zadzwonimy na numer: ${phoneNumber}\n\nPamiętaj o szczegółach zamówienia:\n- Imię: ${orderData.name}\n- Odbiór: ${orderData.pickupTime}\n- Płatność: ${orderData.paymentMethod}\n- Suma: ${orderData.total} zł` :
        `We will now call: ${phoneNumber}\n\nRemember your order details:\n- Name: ${orderData.name}\n- Pickup: ${orderData.pickupTime}\n- Payment: ${orderData.paymentMethod}\n- Total: ${orderData.total} zł`);

    // Initiate phone call
    window.location.href = `tel:${phoneNumber}`;

    // Clear cart after call
    setTimeout(() => {
        if (confirm(currentLang === 'pl' ?
            'Czy zamówienie zostało złożone telefonicznie? Wyczyścić koszyk?' :
            'Was the order placed by phone? Clear cart?')) {
            cart.clearCart();
        }
    }, 2000);
}

function getCurrentLang() {
    return window.CommonUtils?.currentLang || 'pl';
}

function updatePlaceholders() {
    const currentLang = getCurrentLang();
    const translations = getMergedTranslations();

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const value = window.CommonUtils.getTranslation(key, currentLang, translations);
        if (value) {
            element.placeholder = value;
        }
    });

    // Update select options
    document.querySelectorAll('select option[data-i18n]').forEach(option => {
        const key = option.getAttribute('data-i18n');
        const value = window.CommonUtils.getTranslation(key, currentLang, translations);
        if (value) {
            option.textContent = value;
        }
    });

    // Re-render cart items to update button text
    if (cart && cart.getItems().length > 0) {
        renderCartItems(cart.getItems());
    }
}
