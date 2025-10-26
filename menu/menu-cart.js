// Menu Cart Integration - adds "Add to Cart" buttons to menu items
// This file adds cart functionality without modifying existing menu code

let donenessModal = null;
let currentBurgerData = null;

document.addEventListener('DOMContentLoaded', () => {
    // Wait for translations to load
    setTimeout(() => {
        createDonenessModal();
        initMenuCartButtons();
    }, 200);
});

function initMenuCartButtons() {
    const currentLang = window.CommonUtils?.currentLang || 'pl';

    // Define menu items with prices (matching the HTML)
    const menuItems = [
        // Burgers
        { id: 'burger-classic', name: 'burgers.classic.name', price: 33, type: 'burger', image: 'images/classic.jpeg', selector: 0 },
        { id: 'burger-cheese', name: 'burgers.cheese.name', price: 40, type: 'burger', image: 'images/cheese.JPG', selector: 1 },
        { id: 'burger-chicken', name: 'burgers.chicken.name', price: 37, type: 'burger', image: 'images/chicken.JPG', selector: 2 },
        { id: 'burger-bbq', name: 'burgers.bbq.name', price: 36, type: 'burger', image: 'images/bbq.JPG', selector: 3 },
        { id: 'burger-spicy', name: 'burgers.spicy.name', price: 39, type: 'burger', image: 'images/hot.JPG', selector: 4 },
        { id: 'burger-egg', name: 'burgers.egg.name', price: 38, type: 'burger', image: 'images/egg.JPG', selector: 5 },

        // Extras (dodatki do burgera)
        { id: 'extra-meat', name: 'extras.meat', price: 12, type: 'extra', selector: 6 },
        { id: 'extra-bacon', name: 'extras.bacon', price: 4, type: 'extra', selector: 7 },
        { id: 'extra-cheese', name: 'extras.cheese', price: 2, type: 'extra', selector: 8 },
        { id: 'extra-jalapeno', name: 'extras.jalapeno', price: 2, type: 'extra', selector: 9 },
        { id: 'extra-vegetables', name: 'extras.vegetables', price: 2, type: 'extra', selector: 10 },

        // Sides
        { id: 'side-fries-small', name: 'sides.friesSmall', price: 14, type: 'side', selector: 11 },
        { id: 'side-fries-large', name: 'sides.friesLarge', price: 18, type: 'side', selector: 12 },
        { id: 'side-onion-small', name: 'sides.onionRingsSmall', price: 13, type: 'side', selector: 13 },
        { id: 'side-onion-large', name: 'sides.onionRingsLarge', price: 19, type: 'side', selector: 14 },
        { id: 'side-nuggets-small', name: 'sides.nuggetsSmall', price: 17, type: 'side', selector: 15 },
        { id: 'side-nuggets-large', name: 'sides.nuggetsLarge', price: 25, type: 'side', selector: 16 },
        { id: 'side-extra-sauce', name: 'sides.extraSauce', price: 3, type: 'side', selector: 17 },

        // Hot Drinks
        { id: 'drink-green-tea', name: 'hotDrinks.greenTea', price: 5, type: 'drink', selector: 18 },

        // Cold Drinks
        { id: 'drink-cola', name: 'drinks.cola', price: 9, type: 'drink', selector: 19 },
        { id: 'drink-cola-zero', name: 'drinks.colaZero', price: 9, type: 'drink', selector: 20 },
        { id: 'drink-orange', name: 'drinks.orangeJuice', price: 9, type: 'drink', selector: 23 },
        { id: 'drink-apple', name: 'drinks.appleJuice', price: 9, type: 'drink', selector: 24 },
        { id: 'drink-multi', name: 'drinks.multiJuice', price: 9, type: 'drink', selector: 25 },
        { id: 'drink-tomato', name: 'drinks.tomatoJuice', price: 9, type: 'drink', selector: 26 },
        { id: 'drink-water-still', name: 'drinks.waterStill', price: 6, type: 'drink', selector: 27 },
        { id: 'drink-water-sparkling', name: 'drinks.waterSparkling', price: 6, type: 'drink', selector: 28 }
    ];

    const allMenuItems = document.querySelectorAll('.menu-item:not(.unavailable)');

    menuItems.forEach((itemData, index) => {
        const menuItemEl = allMenuItems[itemData.selector];
        if (!menuItemEl) return;

        // Get translated name
        const translations = getMergedTranslations();
        const itemName = window.CommonUtils.getTranslation(itemData.name, currentLang, translations);

        // Create add to cart button
        const button = document.createElement('button');
        button.className = 'add-to-cart-btn';
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span data-i18n="cart.addToCart">${currentLang === 'pl' ? 'Dodaj' : 'Add'}</span>
        `;

        // Add click handler
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const item = {
                id: itemData.id,
                name: itemName,
                price: itemData.price,
                type: itemData.type,
                image: itemData.image || null
            };

            // Show doneness modal for burgers only (except chicken)
            if (itemData.type === 'burger' && itemData.id !== 'burger-chicken') {
                currentBurgerData = { item, button };
                showDonenessModal();
            } else {
                // Add directly for non-burger items
                window.BurgerCart.addItem(item);

                // Visual feedback
                button.classList.add('added');
                setTimeout(() => {
                    button.classList.remove('added');
                }, 1000);
            }
        });

        // Find item-footer and add button
        const itemFooter = menuItemEl.querySelector('.item-footer');
        if (itemFooter) {
            itemFooter.appendChild(button);
        }
    });
}

// Update button text on language change
window.addEventListener('languageChanged', () => {
    const buttons = document.querySelectorAll('.add-to-cart-btn span');
    const currentLang = window.CommonUtils?.currentLang || 'pl';
    buttons.forEach(btn => {
        btn.textContent = currentLang === 'pl' ? 'Dodaj' : 'Add';
    });

    // Update modal translations if it exists
    if (donenessModal) {
        updateModalTranslations();
    }
});

// Create doneness modal
function createDonenessModal() {
    const currentLang = window.CommonUtils?.currentLang || 'pl';
    const translations = getMergedTranslations();

    const modal = document.createElement('div');
    modal.className = 'doneness-modal';
    modal.innerHTML = `
        <div class="doneness-modal-content">
            <h3 class="doneness-modal-title" data-i18n="doneness.title">
                ${window.CommonUtils.getTranslation('doneness.title', currentLang, translations)}
            </h3>
            <div class="doneness-options">
                <div class="doneness-option" data-doneness="medium" data-i18n="doneness.medium">
                    ${window.CommonUtils.getTranslation('doneness.medium', currentLang, translations)}
                </div>
                <div class="doneness-option" data-doneness="wellDone" data-i18n="doneness.wellDone">
                    ${window.CommonUtils.getTranslation('doneness.wellDone', currentLang, translations)}
                </div>
            </div>
            <div class="doneness-modal-buttons">
                <button class="doneness-modal-btn doneness-cancel-btn">
                    ${currentLang === 'pl' ? 'Anuluj' : 'Cancel'}
                </button>
                <button class="doneness-modal-btn doneness-confirm-btn" disabled data-i18n="doneness.addToCart">
                    ${window.CommonUtils.getTranslation('doneness.addToCart', currentLang, translations)}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    donenessModal = modal;

    // Add event listeners
    const options = modal.querySelectorAll('.doneness-option');
    const confirmBtn = modal.querySelector('.doneness-confirm-btn');
    const cancelBtn = modal.querySelector('.doneness-cancel-btn');

    let selectedDoneness = null;

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedDoneness = option.dataset.doneness;
            confirmBtn.disabled = false;
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedDoneness && currentBurgerData) {
            const currentLang = window.CommonUtils?.currentLang || 'pl';
            const donenessText = selectedDoneness === 'medium' ? 'Medium' : 'Well done';

            const item = {
                ...currentBurgerData.item,
                doneness: selectedDoneness,
                name: `${currentBurgerData.item.name} (${donenessText})`
            };

            window.BurgerCart.addItem(item);

            // Visual feedback on button
            currentBurgerData.button.classList.add('added');
            setTimeout(() => {
                currentBurgerData.button.classList.remove('added');
            }, 1000);

            hideDonenessModal();
        }
    });

    cancelBtn.addEventListener('click', hideDonenessModal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideDonenessModal();
        }
    });
}

function showDonenessModal() {
    if (donenessModal) {
        // Reset selection
        const options = donenessModal.querySelectorAll('.doneness-option');
        const confirmBtn = donenessModal.querySelector('.doneness-confirm-btn');

        options.forEach(opt => opt.classList.remove('selected'));
        confirmBtn.disabled = true;

        donenessModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideDonenessModal() {
    if (donenessModal) {
        donenessModal.classList.remove('active');
        document.body.style.overflow = '';
        currentBurgerData = null;
    }
}

function updateModalTranslations() {
    if (!donenessModal) return;

    const currentLang = window.CommonUtils?.currentLang || 'pl';
    const translations = getMergedTranslations();

    // Update title
    const title = donenessModal.querySelector('.doneness-modal-title');
    if (title) {
        title.textContent = window.CommonUtils.getTranslation('doneness.title', currentLang, translations);
    }

    // Update options
    const mediumOption = donenessModal.querySelector('[data-doneness="medium"]');
    const wellDoneOption = donenessModal.querySelector('[data-doneness="wellDone"]');

    if (mediumOption) {
        mediumOption.textContent = window.CommonUtils.getTranslation('doneness.medium', currentLang, translations);
    }

    if (wellDoneOption) {
        wellDoneOption.textContent = window.CommonUtils.getTranslation('doneness.wellDone', currentLang, translations);
    }

    // Update buttons
    const cancelBtn = donenessModal.querySelector('.doneness-cancel-btn');
    const confirmBtn = donenessModal.querySelector('.doneness-confirm-btn');

    if (cancelBtn) {
        cancelBtn.textContent = currentLang === 'pl' ? 'Anuluj' : 'Cancel';
    }

    if (confirmBtn) {
        confirmBtn.textContent = window.CommonUtils.getTranslation('doneness.addToCart', currentLang, translations);
    }
}
