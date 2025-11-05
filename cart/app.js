// Cart Page Application Logic

let cart = null;
let selectedMessenger = 'telegram'; // Default messenger (via website)
let pendingOrder = null; // Stores order data while awaiting confirmation

// Cloudflare Worker URL для отправки заказов
// Это публичный endpoint - безопасно для GitHub (не содержит секретов)
// Автоматически определяем локальное тестирование
const CLOUDFLARE_WORKER_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8787'  // Локальный Worker (wrangler dev)
    : 'https://burger22-orders.vz260198.workers.dev';  // Production Worker

document.addEventListener('DOMContentLoaded', () => {
    // Wait for cart to initialize
    setTimeout(() => {
        cart = window.BurgerCart;
        initCartPage();
        initMessengerButtons();
        initModalHandlers();
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
    // Show confirmation modal before sending
    showOrderConfirmationModal(orderData);
}

function actualSendOrderViaTelegram(orderData) {
    const currentLang = getCurrentLang();

    // Check if worker URL is configured
    if (!CLOUDFLARE_WORKER_URL || CLOUDFLARE_WORKER_URL === 'YOUR_CLOUDFLARE_WORKER_URL_HERE') {
        alert(currentLang === 'pl' ?
            'Błąd konfiguracji. Skontaktuj się z administratorem.' :
            'Configuration error. Please contact administrator.');
        return;
    }

    // Show loading message with spinner
    const submitButton = document.querySelector('.btn-primary.btn-large');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <svg class="spinner" viewBox="0 0 24 24" width="20" height="20">
            <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"></circle>
        </svg>
        <span>${currentLang === 'pl' ? 'Wysyłanie...' : 'Sending...'}</span>
    `;
    submitButton.classList.add('loading');

    // Add language to order data
    orderData.lang = currentLang;

    // Create timeout promise (10 seconds)
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000);
    });

    // Send to Cloudflare Worker with timeout
    Promise.race([
        fetch(CLOUDFLARE_WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        }),
        timeoutPromise
    ])
    .then(async response => {
        if (!response.ok) {
            // Don't log error details to avoid exposing sensitive info in DevTools
            throw new Error('Failed to send order');
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
        submitButton.innerHTML = originalText;
        submitButton.classList.remove('loading');
    })
    .catch(error => {
        // Don't log error details to avoid exposing sensitive info in DevTools

        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        submitButton.classList.remove('loading');

        // Show error modal with order details and phone number
        showErrorModal(orderData, error.message === 'Request timeout');
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

// Modal Functions
function formatOrderDetailsHTML(orderData) {
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

    let html = '<div class="order-info">';

    // Customer details
    html += `<div class="info-row">
        <span class="info-label">${currentLang === 'pl' ? 'Imię:' : 'Name:'}</span>
        <span class="info-value">${orderData.name}</span>
    </div>`;

    html += `<div class="info-row">
        <span class="info-label">${currentLang === 'pl' ? 'Telefon:' : 'Phone:'}</span>
        <span class="info-value">${orderData.phone}</span>
    </div>`;

    html += `<div class="info-row">
        <span class="info-label">${currentLang === 'pl' ? 'Odbiór:' : 'Pickup:'}</span>
        <span class="info-value">${pickupTimeLabels[currentLang][orderData.pickupTime]}</span>
    </div>`;

    html += `<div class="info-row">
        <span class="info-label">${currentLang === 'pl' ? 'Płatność:' : 'Payment:'}</span>
        <span class="info-value">${paymentLabels[currentLang][orderData.paymentMethod]}</span>
    </div>`;

    html += '</div>';

    // Order items
    html += '<div class="order-items">';
    html += `<h3>${currentLang === 'pl' ? 'Zamówienie:' : 'Order:'}</h3>`;

    orderData.items.forEach(item => {
        html += `<div class="order-item">
            <span class="item-name">${item.name} x${item.quantity}</span>
            <span class="item-price">${item.price * item.quantity} zł</span>
        </div>`;
    });

    html += '</div>';

    // Total
    html += `<div class="order-total">
        <span class="total-label">${currentLang === 'pl' ? 'RAZEM:' : 'TOTAL:'}</span>
        <span class="total-value">${orderData.total} zł</span>
    </div>`;

    // Comments
    if (orderData.comments) {
        html += `<div class="order-comments">
            <strong>${currentLang === 'pl' ? 'Uwagi:' : 'Comments:'}</strong><br>
            ${orderData.comments}
        </div>`;
    }

    return html;
}

function showOrderConfirmationModal(orderData) {
    const modal = document.getElementById('orderConfirmModal');
    const confirmationDetails = document.getElementById('confirmationDetails');

    // Store order data for later confirmation
    pendingOrder = orderData;

    // Populate modal with order details
    confirmationDetails.innerHTML = formatOrderDetailsHTML(orderData);

    // Show modal
    modal.classList.add('show');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeOrderConfirmationModal() {
    const modal = document.getElementById('orderConfirmModal');
    modal.classList.remove('show');

    // Restore body scroll
    document.body.style.overflow = '';

    // Clear pending order
    pendingOrder = null;
}

function showErrorModal(orderData, isTimeout = false) {
    const currentLang = getCurrentLang();
    const modal = document.getElementById('orderErrorModal');
    const errorDetails = document.getElementById('errorDetails');
    const errorFooter = document.getElementById('errorModalFooter');

    const phoneNumber = '+48573256526';

    // Build error message HTML based on error type
    let errorMessage;
    if (isTimeout) {
        errorMessage = currentLang === 'pl' ?
            'Wysyłanie zamówienia trwa zbyt długo. Sprawdź połączenie internetowe i spróbuj ponownie, lub zadzwoń do nas.' :
            'Sending order is taking too long. Check your internet connection and try again, or call us.';
    } else {
        errorMessage = currentLang === 'pl' ?
            'Przepraszamy, ale nie udało się wysłać zamówienia przez stronę. Prosimy o kontakt telefoniczny.' :
            'We apologize, but we were unable to send your order through the website. Please contact us by phone.';
    }

    let html = `<div class="error-message">${errorMessage}</div>`;

    html += `<div class="phone-number">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>${phoneNumber}</span>
    </div>`;

    // Add order details
    html += formatOrderDetailsHTML(orderData);

    errorDetails.innerHTML = html;

    // Build footer buttons based on error type
    let footerHtml = '';
    if (isTimeout) {
        // Show "Try Again" and "Call" buttons for timeout
        footerHtml = `
            <button class="btn-secondary" id="retryOrderBtn" data-i18n="tryAgain">
                ${currentLang === 'pl' ? 'Spróbuj ponownie' : 'Try again'}
            </button>
            <button class="btn-primary btn-call" id="callRestaurantBtn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span data-i18n="callNow">${currentLang === 'pl' ? 'Zadzwoń teraz' : 'Call now'}</span>
            </button>
        `;
    } else {
        // Show only "Call" button for other errors
        footerHtml = `
            <button class="btn-primary btn-call" id="callRestaurantBtn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span data-i18n="callNow">${currentLang === 'pl' ? 'Zadzwoń teraz' : 'Call now'}</span>
            </button>
        `;
    }

    errorFooter.innerHTML = footerHtml;

    // Add event listeners for new buttons
    const callBtn = document.getElementById('callRestaurantBtn');
    if (callBtn) {
        callBtn.addEventListener('click', () => {
            window.location.href = 'tel:+48573256526';
        });
    }

    const retryBtn = document.getElementById('retryOrderBtn');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            closeErrorModal();
            // Retry sending the order
            actualSendOrderViaTelegram(orderData);
        });
    }

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeErrorModal() {
    const modal = document.getElementById('orderErrorModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function initModalHandlers() {
    const modal = document.getElementById('orderConfirmModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelOrder');
    const confirmBtn = document.getElementById('confirmOrderBtn');

    // Close modal handlers
    closeBtn.addEventListener('click', closeOrderConfirmationModal);
    cancelBtn.addEventListener('click', closeOrderConfirmationModal);

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeOrderConfirmationModal();
        }
    });

    // Confirm order handler
    confirmBtn.addEventListener('click', () => {
        if (pendingOrder) {
            closeOrderConfirmationModal();
            // Actually send the order
            actualSendOrderViaTelegram(pendingOrder);
        }
    });

    // Error modal handlers
    const errorModal = document.getElementById('orderErrorModal');
    const closeErrorBtn = document.getElementById('closeErrorModal');

    closeErrorBtn.addEventListener('click', closeErrorModal);

    errorModal.addEventListener('click', (e) => {
        if (e.target === errorModal) {
            closeErrorModal();
        }
    });

    // Note: Call and Retry button handlers are added dynamically in showErrorModal()
}
