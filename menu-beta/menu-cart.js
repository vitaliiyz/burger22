// Menu Cart Integration - adds "Add to Cart" buttons to menu items
// This file adds cart functionality without modifying existing menu code

let donenessModal = null;
let currentBurgerData = null;

// Variables for sides modal
let sidesModal = null;
let currentSideData = null;

// Variables for tea modal
let teaModal = null;
let currentTeaData = null;

document.addEventListener('DOMContentLoaded', () => {
    // Wait for translations to load
    setTimeout(() => {
        createDonenessModal();
        createSidesModal();
        createTeaModal();
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

        // Extras (dodatki do burgera) - removed from here, available only when ordering burgers

        // Sides
        { id: 'side-fries-small', name: 'sides.friesSmall', price: 14, type: 'side', selector: 6 },
        { id: 'side-fries-large', name: 'sides.friesLarge', price: 18, type: 'side', selector: 7 },
        { id: 'side-onion-small', name: 'sides.onionRingsSmall', price: 13, type: 'side', selector: 8 },
        { id: 'side-onion-large', name: 'sides.onionRingsLarge', price: 19, type: 'side', selector: 9 },
        { id: 'side-nuggets-small', name: 'sides.nuggetsSmall', price: 17, type: 'side', selector: 10 },
        { id: 'side-nuggets-large', name: 'sides.nuggetsLarge', price: 25, type: 'side', selector: 11 },
        // Extra sauce removed - available only as paid add-on when ordering sides

        // Hot Drinks
        { id: 'drink-green-tea', name: 'hotDrinks.greenTea', price: 5, type: 'drink', selector: 12 },
        { id: 'drink-americano', name: 'hotDrinks.americano', price: 7.90, type: 'drink', selector: 13 },
        { id: 'drink-espresso', name: 'hotDrinks.espresso', price: 6.90, type: 'drink', selector: 14 },
        { id: 'drink-double-espresso', name: 'hotDrinks.doubleEspresso', price: 9.90, type: 'drink', selector: 15 },
        { id: 'drink-cappuccino', name: 'hotDrinks.cappuccino', price: 9.90, type: 'drink', selector: 16 },
        { id: 'drink-latte', name: 'hotDrinks.latte', price: 9.90, type: 'drink', selector: 17 },

        // Cold Drinks (unavailable items like Sprite, Beer are excluded)
        { id: 'drink-cola', name: 'drinks.cola', price: 9, type: 'drink', selector: 18 },
        { id: 'drink-cola-zero', name: 'drinks.colaZero', price: 9, type: 'drink', selector: 19 },
        { id: 'drink-orange', name: 'drinks.orangeJuice', price: 9, type: 'drink', selector: 20 },
        { id: 'drink-apple', name: 'drinks.appleJuice', price: 9, type: 'drink', selector: 21 },
        { id: 'drink-multi', name: 'drinks.multiJuice', price: 9, type: 'drink', selector: 22 },
        { id: 'drink-tomato', name: 'drinks.tomatoJuice', price: 9, type: 'drink', selector: 23 },
        { id: 'drink-water-still', name: 'drinks.waterStill', price: 6, type: 'drink', selector: 24 },
        { id: 'drink-water-sparkling', name: 'drinks.waterSparkling', price: 6, type: 'drink', selector: 25 }
    ];

    // Exclude items that should not have add buttons:
    // - Items from "dodatki-burgera" section (available only when ordering burgers)
    // - Extra sauce item (available only as paid add-on with sides)
    const extraSection = document.getElementById('dodatki-burgera');
    const allMenuItemsNodeList = document.querySelectorAll('.menu-item:not(.unavailable)');
    const allMenuItems = Array.from(allMenuItemsNodeList).filter(item => {
        // Exclude burger extras section
        if (extraSection.contains(item)) return false;

        // Exclude extra sauce item by checking if it contains the extraSauce translation key
        const extraSauceElement = item.querySelector('[data-i18n="sides.extraSauce"]');
        if (extraSauceElement) return false;

        return true;
    });

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

            // Show doneness modal for all burgers
            if (itemData.type === 'burger') {
                currentBurgerData = { item, button };
                showDonenessModal();
            } else if (itemData.type === 'side' && (itemData.id.includes('fries') || itemData.id.includes('onion') || itemData.id.includes('nuggets'))) {
                // Show sides modal for fries, onion rings, and nuggets
                currentSideData = { item, button };
                showSidesModal();
            } else if (itemData.id === 'drink-green-tea') {
                // Show tea customization modal
                currentTeaData = { item, button };
                showTeaModal();
            } else {
                // Add directly for other items
                window.BurgerCart.addItem(item);

                // Visual feedback
                button.classList.remove('added'); // Remove any existing class first
                void button.offsetWidth; // Force reflow to restart animation
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
            <button class="modal-close-btn" aria-label="Close">×</button>
            <h3 class="doneness-modal-title" data-i18n="doneness.title">
                ${window.CommonUtils.getTranslation('doneness.title', currentLang, translations)}
            </h3>
            <div class="combo-option-wrapper">
                <label class="combo-checkbox-label">
                    <input type="checkbox" class="combo-checkbox" id="comboCheckbox">
                    <span class="combo-checkbox-text" data-i18n="doneness.comboOption">
                        ${window.CommonUtils.getTranslation('doneness.comboOption', currentLang, translations)}
                    </span>
                </label>
            </div>

            <div class="combo-sauce-selection" style="display: none;">
                <h5 class="combo-sauce-title">${currentLang === 'pl' ? 'Wybierz sos do zestawu:' : 'Choose combo sauce:'}</h5>
                <div class="combo-sauce-options">
                    ${['ketchup', 'bbq', 'chili', 'cheese', 'mayo', 'garlic', 'mustard'].map(sauce => `
                        <label class="combo-sauce-radio-label">
                            <input type="radio" name="comboSauce" class="combo-sauce-radio" value="${sauce}">
                            <span>${window.CommonUtils.getTranslation('sauces.' + sauce, currentLang, translations)}</span>
                        </label>
                    `).join('')}
                </div>
                <p class="combo-sauce-error" style="display: none; color: #d32f2f; font-size: 0.9em; margin-top: 8px; font-weight: 600;">
                    ${currentLang === 'pl' ? '⚠️ Wybierz sos do zestawu' : '⚠️ Select a sauce for combo'}
                </p>
            </div>

            <div class="extras-section">
                <h4 class="extras-title">${currentLang === 'pl' ? 'Dodatki do burgera (opcjonalnie)' : 'Burger Extras (optional)'}</h4>
                <div class="extras-options">
                    <div class="extra-item" data-extra="meat" data-price="12">
                        <span class="extra-name">${window.CommonUtils.getTranslation('extras.meat', currentLang, translations)}</span>
                        <div class="extra-controls">
                            <span class="extra-price">12 zł</span>
                            <div class="extra-quantity-controls">
                                <button class="extra-btn extra-minus" type="button">−</button>
                                <span class="extra-quantity">0</span>
                                <button class="extra-btn extra-plus" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="extra-item" data-extra="bacon" data-price="4">
                        <span class="extra-name">${window.CommonUtils.getTranslation('extras.bacon', currentLang, translations)}</span>
                        <div class="extra-controls">
                            <span class="extra-price">4 zł</span>
                            <div class="extra-quantity-controls">
                                <button class="extra-btn extra-minus" type="button">−</button>
                                <span class="extra-quantity">0</span>
                                <button class="extra-btn extra-plus" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="extra-item" data-extra="cheese" data-price="2">
                        <span class="extra-name">${window.CommonUtils.getTranslation('extras.cheese', currentLang, translations)}</span>
                        <div class="extra-controls">
                            <span class="extra-price">2 zł</span>
                            <div class="extra-quantity-controls">
                                <button class="extra-btn extra-minus" type="button">−</button>
                                <span class="extra-quantity">0</span>
                                <button class="extra-btn extra-plus" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="extra-item" data-extra="jalapeno" data-price="2">
                        <span class="extra-name">${window.CommonUtils.getTranslation('extras.jalapeno', currentLang, translations)}</span>
                        <div class="extra-controls">
                            <span class="extra-price">2 zł</span>
                            <div class="extra-quantity-controls">
                                <button class="extra-btn extra-minus" type="button">−</button>
                                <span class="extra-quantity">0</span>
                                <button class="extra-btn extra-plus" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <label class="extra-checkbox-label vegetables-checkbox-wrapper">
                        <input type="checkbox" class="vegetables-main-checkbox" id="vegetablesCheckbox">
                        <span class="extra-name">${window.CommonUtils.getTranslation('extras.vegetables', currentLang, translations)}</span>
                        <span class="extra-price">+2 zł/szt</span>
                    </label>
                </div>

                <div class="vegetables-submenu" style="display: none;">
                    <h5 class="vegetables-title">${currentLang === 'pl' ? 'Wybierz warzywa (min. 1 wymagane):' : 'Choose vegetables (min. 1 required):'}</h5>
                    <div class="vegetables-options">
                        <div class="extra-item vegetable-item" data-vegetable="tomato" data-price="2">
                            <span class="extra-name">${currentLang === 'pl' ? '🍅 Pomidor' : '🍅 Tomato'}</span>
                            <div class="extra-controls">
                                <span class="extra-price">2 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity vegetable-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item vegetable-item" data-vegetable="lettuce" data-price="2">
                            <span class="extra-name">${currentLang === 'pl' ? '🥬 Sałata' : '🥬 Lettuce'}</span>
                            <div class="extra-controls">
                                <span class="extra-price">2 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity vegetable-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item vegetable-item" data-vegetable="pickle" data-price="2">
                            <span class="extra-name">${currentLang === 'pl' ? '🥒 Ogórek kiszony' : '🥒 Pickle'}</span>
                            <div class="extra-controls">
                                <span class="extra-price">2 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity vegetable-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item vegetable-item" data-vegetable="onion" data-price="2">
                            <span class="extra-name">${currentLang === 'pl' ? '🧅 Cebula' : '🧅 Onion'}</span>
                            <div class="extra-controls">
                                <span class="extra-price">2 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity vegetable-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="vegetables-error" style="display: none; color: #d32f2f; font-size: 0.9em; margin-top: 12px; font-weight: 600;">
                        ${currentLang === 'pl' ? '⚠️ Wybierz przynajmniej jedno warzywo' : '⚠️ Select at least one vegetable'}
                    </p>
                </div>

                <div class="sauces-section">
                    <label class="extra-checkbox-label sauces-checkbox-wrapper">
                        <input type="checkbox" class="sauces-main-checkbox" id="saucesCheckbox">
                        <span class="extra-name">${currentLang === 'pl' ? '🧂 Sosy' : '🧂 Sauces'}</span>
                        <span class="extra-price">+3 zł/szt</span>
                    </label>
                </div>

                <div class="sauces-submenu" style="display: none;">
                    <h5 class="sauces-title">${currentLang === 'pl' ? 'Wybierz sosy (min. 1 wymagany):' : 'Choose sauces (min. 1 required):'}</h5>
                    <div class="sauces-options">
                        <div class="extra-item sauce-item" data-sauce="ketchup" data-price="3">
                            <span class="extra-name">${window.CommonUtils.getTranslation('sauces.ketchup', currentLang, translations)}</span>
                            <div class="extra-controls">
                                <span class="extra-price">3 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity sauce-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item sauce-item" data-sauce="bbq" data-price="3">
                            <span class="extra-name">${window.CommonUtils.getTranslation('sauces.bbq', currentLang, translations)}</span>
                            <div class="extra-controls">
                                <span class="extra-price">3 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity sauce-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item sauce-item" data-sauce="chili" data-price="3">
                            <span class="extra-name">${window.CommonUtils.getTranslation('sauces.chili', currentLang, translations)}</span>
                            <div class="extra-controls">
                                <span class="extra-price">3 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity sauce-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item sauce-item" data-sauce="cheese" data-price="3">
                            <span class="extra-name">${window.CommonUtils.getTranslation('sauces.cheese', currentLang, translations)}</span>
                            <div class="extra-controls">
                                <span class="extra-price">3 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity sauce-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item sauce-item" data-sauce="mayo" data-price="3">
                            <span class="extra-name">${window.CommonUtils.getTranslation('sauces.mayo', currentLang, translations)}</span>
                            <div class="extra-controls">
                                <span class="extra-price">3 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity sauce-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item sauce-item" data-sauce="garlic" data-price="3">
                            <span class="extra-name">${window.CommonUtils.getTranslation('sauces.garlic', currentLang, translations)}</span>
                            <div class="extra-controls">
                                <span class="extra-price">3 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity sauce-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="extra-item sauce-item" data-sauce="mustard" data-price="3">
                            <span class="extra-name">${window.CommonUtils.getTranslation('sauces.mustard', currentLang, translations)}</span>
                            <div class="extra-controls">
                                <span class="extra-price">3 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity sauce-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="sauces-error" style="display: none; color: #d32f2f; font-size: 0.9em; margin-top: 12px; font-weight: 600;">
                        ${currentLang === 'pl' ? '⚠️ Wybierz przynajmniej jeden sos' : '⚠️ Select at least one sauce'}
                    </p>
                </div>
            </div>

            <div class="comment-section">
                <label class="comment-label">${currentLang === 'pl' ? '💬 Dodatkowe uwagi (opcjonalnie):' : '💬 Additional comments (optional):'}</label>
                <textarea class="comment-textarea" placeholder="${currentLang === 'pl' ? 'Np. bez pomidora, bez cebuli...' : 'E.g. no tomato, no onion...'}"></textarea>
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
    const confirmBtn = modal.querySelector('.doneness-confirm-btn');
    const cancelBtn = modal.querySelector('.doneness-cancel-btn');

    // Handle combo checkbox - show/hide sauce selection
    const comboCheckbox = modal.querySelector('.combo-checkbox');
    const comboSauceSelection = modal.querySelector('.combo-sauce-selection');

    if (comboCheckbox && comboSauceSelection) {
        comboCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                comboSauceSelection.style.display = 'block';
            } else {
                comboSauceSelection.style.display = 'none';
                // Uncheck all sauce radios
                modal.querySelectorAll('.combo-sauce-radio').forEach(radio => {
                    radio.checked = false;
                });
                // Hide error if exists
                const comboSauceError = comboSauceSelection.querySelector('.combo-sauce-error');
                if (comboSauceError) comboSauceError.style.display = 'none';
            }
        });

        // Hide error when a sauce is selected
        modal.querySelectorAll('.combo-sauce-radio').forEach(radio => {
            radio.addEventListener('change', () => {
                const comboSauceError = comboSauceSelection.querySelector('.combo-sauce-error');
                if (comboSauceError) comboSauceError.style.display = 'none';
            });
        });
    }

    // Handle extras and vegetables quantity controls
    const extrasItems = modal.querySelectorAll('.extra-item:not(.vegetable-item):not(.sauce-item)');
    const vegetableItems = modal.querySelectorAll('.vegetable-item');
    const vegetablesError = modal.querySelector('.vegetables-error');

    // Handle main extras (meat, bacon, cheese, jalapeno)
    extrasItems.forEach(item => {
        const plusBtn = item.querySelector('.extra-plus');
        const minusBtn = item.querySelector('.extra-minus');
        const quantitySpan = item.querySelector('.extra-quantity');
        const extraType = item.dataset.extra;
        const isMeat = extraType === 'meat';
        const maxQuantity = isMeat ? 2 : 5;

        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity < maxQuantity) {
                quantity++;
                quantitySpan.textContent = quantity;
            }
        });

        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
    });

    // Handle vegetables checkbox toggle
    const vegetablesMainCheckbox = modal.querySelector('.vegetables-main-checkbox');
    const vegetablesSubmenu = modal.querySelector('.vegetables-submenu');

    if (vegetablesMainCheckbox && vegetablesSubmenu) {
        vegetablesMainCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                vegetablesSubmenu.style.display = 'block';
            } else {
                vegetablesSubmenu.style.display = 'none';
                // Reset all vegetable quantities
                modal.querySelectorAll('.vegetable-quantity').forEach(span => {
                    span.textContent = '0';
                });
                if (vegetablesError) vegetablesError.style.display = 'none';
            }
        });
    }

    // Handle vegetables (separate items with +/- buttons)
    vegetableItems.forEach(item => {
        const plusBtn = item.querySelector('.extra-plus');
        const minusBtn = item.querySelector('.extra-minus');
        const quantitySpan = item.querySelector('.extra-quantity');

        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity < 5) {
                quantity++;
                quantitySpan.textContent = quantity;
                // Hide error if any vegetable is selected
                if (vegetablesError) vegetablesError.style.display = 'none';
            }
        });

        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
    });

    // Handle sauces checkbox toggle
    const saucesMainCheckbox = modal.querySelector('.sauces-main-checkbox');
    const saucesSubmenu = modal.querySelector('.sauces-submenu');
    const saucesError = modal.querySelector('.sauces-error');

    if (saucesMainCheckbox && saucesSubmenu) {
        saucesMainCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                saucesSubmenu.style.display = 'block';
            } else {
                saucesSubmenu.style.display = 'none';
                // Reset all sauce quantities
                modal.querySelectorAll('.sauce-quantity').forEach(span => {
                    span.textContent = '0';
                });
                if (saucesError) saucesError.style.display = 'none';
            }
        });
    }

    // Handle sauces (separate items with +/- buttons)
    const sauceItems = modal.querySelectorAll('.sauce-item');
    sauceItems.forEach(item => {
        const plusBtn = item.querySelector('.extra-plus');
        const minusBtn = item.querySelector('.extra-minus');
        const quantitySpan = item.querySelector('.extra-quantity');

        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity < 5) {
                quantity++;
                quantitySpan.textContent = quantity;
                // Hide error if any sauce is selected
                if (saucesError) saucesError.style.display = 'none';
            }
        });

        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (!currentBurgerData) return;

        const currentLang = window.CommonUtils?.currentLang || 'pl';
        const comboCheckbox = modal.querySelector('.combo-checkbox');
        const isCombo = comboCheckbox.checked;

        // Validate combo sauce selection
        let selectedComboSauce = null;
        if (isCombo) {
            const comboSauceRadio = modal.querySelector('.combo-sauce-radio:checked');
            if (!comboSauceRadio) {
                // Show error if no sauce selected
                const comboSauceSelection = modal.querySelector('.combo-sauce-selection');
                const comboSauceError = modal.querySelector('.combo-sauce-error');
                if (comboSauceError) {
                    comboSauceError.style.display = 'block';
                    comboSauceSelection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                return; // Stop execution
            }
            selectedComboSauce = comboSauceRadio.value;
        }

        const translations = getMergedTranslations();
        const comboText = window.CommonUtils.getTranslation('doneness.comboShort', currentLang, translations);

        // Collect selected extras with quantities
        const selectedExtras = [];
        let extrasPrice = 0;

        // Handle main extras (not vegetables, not sauces)
        modal.querySelectorAll('.extra-item:not(.vegetable-item):not(.sauce-item)').forEach(item => {
            const quantity = parseInt(item.querySelector('.extra-quantity').textContent);
            if (quantity > 0) {
                const extraType = item.dataset.extra;
                const price = parseInt(item.dataset.price);
                const extraName = window.CommonUtils.getTranslation(`extras.${extraType}`, currentLang, translations);

                const extrasText = quantity > 1
                    ? `${extraName} x${quantity}`
                    : extraName;
                selectedExtras.push(extrasText);
                extrasPrice += price * quantity;
            }
        });

        // Handle vegetables separately - check if checkbox is checked
        const vegetablesCheckbox = modal.querySelector('.vegetables-main-checkbox');
        const isVegetablesChecked = vegetablesCheckbox && vegetablesCheckbox.checked;

        if (isVegetablesChecked) {
            const selectedVegetables = [];
            let vegetablesPrice = 0;
            const vegNames = {
                pl: { tomato: 'Pomidor', lettuce: 'Sałata', pickle: 'Ogórek', onion: 'Cebula' },
                en: { tomato: 'Tomato', lettuce: 'Lettuce', pickle: 'Pickle', onion: 'Onion' }
            };

            modal.querySelectorAll('.vegetable-item').forEach(item => {
                const quantity = parseInt(item.querySelector('.extra-quantity').textContent);
                if (quantity > 0) {
                    const vegType = item.dataset.vegetable;
                    const price = parseInt(item.dataset.price);
                    const vegName = vegNames[currentLang][vegType];

                    const vegText = quantity > 1
                        ? `${vegName} x${quantity}`
                        : vegName;
                    selectedVegetables.push(vegText);
                    vegetablesPrice += price * quantity;
                }
            });

            // Validate: if vegetables checkbox is checked, at least 1 vegetable must be selected
            if (selectedVegetables.length === 0) {
                const vegetablesError = modal.querySelector('.vegetables-error');
                if (vegetablesError) {
                    vegetablesError.style.display = 'block';
                    vegetablesSubmenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                return; // Stop execution
            }

            // Add vegetables to order
            const vegLabel = currentLang === 'pl' ? '🥗 Warzywa' : '🥗 Vegetables';
            selectedExtras.push(`${vegLabel}: ${selectedVegetables.join(', ')}`);
            extrasPrice += vegetablesPrice;
        }

        // Handle sauces separately - check if checkbox is checked
        const saucesCheckbox = modal.querySelector('.sauces-main-checkbox');
        const isSaucesChecked = saucesCheckbox && saucesCheckbox.checked;

        if (isSaucesChecked) {
            const selectedSauces = [];
            let saucesPrice = 0;
            const sauceNames = {
                pl: {
                    ketchup: 'Ketchup', bbq: 'BBQ', chili: 'Chili',
                    cheese: 'Serowy', mayo: 'Majonez',
                    garlic: 'Czosnkowy', mustard: 'Musztarda'
                },
                en: {
                    ketchup: 'Ketchup', bbq: 'BBQ', chili: 'Chili',
                    cheese: 'Cheese', mayo: 'Mayo',
                    garlic: 'Garlic', mustard: 'Mustard'
                }
            };

            modal.querySelectorAll('.sauce-item').forEach(item => {
                const quantity = parseInt(item.querySelector('.extra-quantity').textContent);
                if (quantity > 0) {
                    const sauceType = item.dataset.sauce;
                    const price = parseInt(item.dataset.price);
                    const sauceName = sauceNames[currentLang][sauceType];

                    const sauceText = quantity > 1
                        ? `${sauceName} x${quantity}`
                        : sauceName;
                    selectedSauces.push(sauceText);
                    saucesPrice += price * quantity;
                }
            });

            // Validate: if sauces checkbox is checked, at least 1 sauce must be selected
            if (selectedSauces.length === 0) {
                const saucesError = modal.querySelector('.sauces-error');
                const saucesSubmenu = modal.querySelector('.sauces-submenu');
                if (saucesError) {
                    saucesError.style.display = 'block';
                    saucesSubmenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                return; // Stop execution
            }

            // Add sauces to order
            const sauceLabel = currentLang === 'pl' ? '🧂 Sosy' : '🧂 Sauces';
            selectedExtras.push(`${sauceLabel}: ${selectedSauces.join(', ')}`);
            extrasPrice += saucesPrice;
        }

        // Build item name
        let itemName;

        // Build combo text with sauce if applicable
        let comboTextWithSauce = comboText;
        if (isCombo && selectedComboSauce) {
            const sauceNames = {
                pl: {
                    ketchup: 'Ketchup', bbq: 'BBQ', chili: 'Chili',
                    cheese: 'Serowy', mayo: 'Majonez',
                    garlic: 'Czosnkowy', mustard: 'Musztarda'
                },
                en: {
                    ketchup: 'Ketchup', bbq: 'BBQ', chili: 'Chili',
                    cheese: 'Cheese', mayo: 'Mayo',
                    garlic: 'Garlic', mustard: 'Mustard'
                }
            };
            const sauceName = sauceNames[currentLang][selectedComboSauce];
            const withText = currentLang === 'pl' ? 'z sosem' : 'with sauce';
            comboTextWithSauce = `${comboText} ${withText} ${sauceName}`;
        }

        // No doneness text for any burger
        itemName = isCombo
            ? `${currentBurgerData.item.name} - ${comboTextWithSauce}`
            : currentBurgerData.item.name;

        // Add extras to name
        if (selectedExtras.length > 0) {
            itemName += ` + ${selectedExtras.join(' + ')}`;
        }

        // Get comment
        const commentTextarea = modal.querySelector('.comment-textarea');
        const comment = commentTextarea ? commentTextarea.value.trim() : '';

        // Add comment to name if provided
        if (comment) {
            itemName += ` | 💬 ${comment}`;
        }

        // Calculate total price
        let totalPrice = currentBurgerData.item.price;
        if (isCombo) totalPrice += 9;
        totalPrice += extrasPrice;

        const item = {
            ...currentBurgerData.item,
            isCombo: isCombo,
            extras: selectedExtras,
            comment: comment,
            price: totalPrice,
            name: itemName,
            id: `${currentBurgerData.item.id}-${Date.now()}`
        };

        window.BurgerCart.addItem(item);

        // Visual feedback on button
        const button = currentBurgerData.button;
        button.classList.remove('added'); // Remove any existing class first
        // Force reflow to restart animation
        void button.offsetWidth;
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 1000);

        hideDonenessModal();
    });

    cancelBtn.addEventListener('click', hideDonenessModal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideDonenessModal();
        }
    });

    // Close button handler
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideDonenessModal);
    }
}

// Create sides sauce selection modal
function createSidesModal() {
    const currentLang = window.CommonUtils?.currentLang || 'pl';
    const translations = getMergedTranslations();

    const modal = document.createElement('div');
    modal.className = 'doneness-modal sides-modal';
    modal.innerHTML = `
        <div class="doneness-modal-content">
            <button class="modal-close-btn" aria-label="Close">×</button>
            <h3 class="doneness-modal-title">
                ${currentLang === 'pl' ? 'Wybierz sosy' : 'Choose sauces'}
            </h3>

            <!-- Free sauce selection -->
            <div class="combo-sauce-selection" style="display: block;">
                <h5 class="combo-sauce-title">${currentLang === 'pl' ? 'Wybierz sos (1 gratis):' : 'Choose sauce (1 free):'}</h5>
                <div class="combo-sauce-options">
                    ${['ketchup', 'bbq', 'chili', 'cheese', 'mayo', 'garlic', 'mustard'].map(sauce => `
                        <label class="combo-sauce-radio-label">
                            <input type="radio" name="sideSauce" class="combo-sauce-radio side-sauce-radio" value="${sauce}">
                            <span>${window.CommonUtils.getTranslation('sauces.' + sauce, currentLang, translations)}</span>
                        </label>
                    `).join('')}
                </div>
                <p class="combo-sauce-error side-sauce-error" style="display: none; color: #d32f2f; font-size: 0.9em; margin-top: 8px; font-weight: 600;">
                    ${currentLang === 'pl' ? '⚠️ Wybierz sos gratis' : '⚠️ Choose a free sauce'}
                </p>
            </div>

            <!-- Paid sauces section -->
            <div class="sauces-section" style="margin-top: 20px;">
                <label class="extra-checkbox-label sauces-checkbox-wrapper">
                    <input type="checkbox" class="sauces-main-checkbox" id="sideExtraSaucesCheckbox">
                    <span class="extra-name">${currentLang === 'pl' ? '🧂 Dodatkowe sosy' : '🧂 Extra Sauces'}</span>
                    <span class="extra-price">+3 zł/szt</span>
                </label>
            </div>

            <div class="sauces-submenu" style="display: none; margin-top: 12px;">
                <h5 class="sauces-title">${currentLang === 'pl' ? 'Wybierz dodatkowe sosy:' : 'Choose extra sauces:'}</h5>
                <div class="sauces-options">
                    ${['ketchup', 'bbq', 'chili', 'cheese', 'mayo', 'garlic', 'mustard'].map(sauce => `
                        <div class="extra-item sauce-item" data-sauce="${sauce}" data-price="3">
                            <span class="extra-name">${window.CommonUtils.getTranslation('sauces.' + sauce, currentLang, translations)}</span>
                            <div class="extra-controls">
                                <span class="extra-price">3 zł</span>
                                <div class="extra-quantity-controls">
                                    <button class="extra-btn extra-minus" type="button">−</button>
                                    <span class="extra-quantity sauce-quantity">0</span>
                                    <button class="extra-btn extra-plus" type="button">+</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="comment-section">
                <label class="comment-label">${currentLang === 'pl' ? '💬 Dodatkowe uwagi (opcjonalnie):' : '💬 Additional comments (optional):'}</label>
                <textarea class="comment-textarea" placeholder="${currentLang === 'pl' ? 'Np. bez soli, dobrze wysmażone...' : 'E.g. no salt, well fried...'}"></textarea>
            </div>

            <div class="doneness-modal-buttons">
                <button class="doneness-modal-btn doneness-cancel-btn">
                    ${currentLang === 'pl' ? 'Anuluj' : 'Cancel'}
                </button>
                <button class="doneness-modal-btn doneness-confirm-btn">
                    ${currentLang === 'pl' ? 'Dodaj do koszyka' : 'Add to cart'}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    sidesModal = modal;

    // Add event listeners
    const confirmBtn = modal.querySelector('.doneness-confirm-btn');
    const cancelBtn = modal.querySelector('.doneness-cancel-btn');

    // Cancel button
    cancelBtn.addEventListener('click', () => {
        hideSidesModal();
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideSidesModal();
        }
    });

    // Close button handler
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideSidesModal);
    }

    // Handle paid sauces checkbox
    const saucesCheckbox = modal.querySelector('.sauces-main-checkbox');
    const saucesSubmenu = modal.querySelector('.sauces-submenu');

    if (saucesCheckbox && saucesSubmenu) {
        saucesCheckbox.addEventListener('change', (e) => {
            saucesSubmenu.style.display = e.target.checked ? 'block' : 'none';
            if (!e.target.checked) {
                // Reset quantities
                modal.querySelectorAll('.sauce-quantity').forEach(span => {
                    span.textContent = '0';
                });
            }
        });
    }

    // Handle paid sauces quantity controls
    const sauceItems = modal.querySelectorAll('.sauce-item');
    sauceItems.forEach(item => {
        const plusBtn = item.querySelector('.extra-plus');
        const minusBtn = item.querySelector('.extra-minus');
        const quantitySpan = item.querySelector('.extra-quantity');

        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity < 5) {
                quantity++;
                quantitySpan.textContent = quantity;
            }
        });

        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });
    });

    // Hide free sauce error when sauce is selected
    modal.querySelectorAll('.side-sauce-radio').forEach(radio => {
        radio.addEventListener('change', () => {
            const error = modal.querySelector('.side-sauce-error');
            if (error) error.style.display = 'none';
        });
    });

    // Confirm button - add item to cart
    confirmBtn.addEventListener('click', () => {
        if (!currentSideData) return;

        const currentLang = window.CommonUtils?.currentLang || 'pl';

        // Validate free sauce selection
        const selectedFreeSauce = modal.querySelector('.side-sauce-radio:checked');
        if (!selectedFreeSauce) {
            const error = modal.querySelector('.side-sauce-error');
            if (error) {
                error.style.display = 'block';
                modal.querySelector('.combo-sauce-selection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            return;
        }

        const translations = getMergedTranslations();
        const sauceNames = {
            pl: {
                ketchup: 'Ketchup', bbq: 'BBQ', chili: 'Chili',
                cheese: 'Serowy', mayo: 'Majonez',
                garlic: 'Czosnkowy', mustard: 'Musztarda'
            },
            en: {
                ketchup: 'Ketchup', bbq: 'BBQ', chili: 'Chili',
                cheese: 'Cheese', mayo: 'Mayo',
                garlic: 'Garlic', mustard: 'Mustard'
            }
        };

        // Build item name with free sauce
        const freeSauceName = sauceNames[currentLang][selectedFreeSauce.value];
        const withText = currentLang === 'pl' ? 'z' : 'with';
        let itemName = `${currentSideData.item.name} ${withText} ${freeSauceName}`;

        // Collect paid sauces
        const extraSauces = [];
        let extraSaucesPrice = 0;

        modal.querySelectorAll('.sauce-item').forEach(item => {
            const quantity = parseInt(item.querySelector('.extra-quantity').textContent);
            if (quantity > 0) {
                const sauceType = item.dataset.sauce;
                const price = parseInt(item.dataset.price);
                const sauceName = sauceNames[currentLang][sauceType];

                const sauceText = quantity > 1 ? `${sauceName} x${quantity}` : sauceName;
                extraSauces.push(sauceText);
                extraSaucesPrice += price * quantity;
            }
        });

        // Add extra sauces to name
        if (extraSauces.length > 0) {
            const extraLabel = currentLang === 'pl' ? '🧂 Dodatkowe sosy' : '🧂 Extra Sauces';
            itemName += ` + ${extraLabel}: ${extraSauces.join(', ')}`;
        }

        // Get comment
        const commentTextarea = modal.querySelector('.comment-textarea');
        const comment = commentTextarea ? commentTextarea.value.trim() : '';

        // Add comment to name if provided
        if (comment) {
            itemName += ` | 💬 ${comment}`;
        }

        // Calculate total price
        const totalPrice = currentSideData.item.price + extraSaucesPrice;

        const item = {
            ...currentSideData.item,
            name: itemName,
            price: totalPrice,
            freeSauce: selectedFreeSauce.value,
            extraSauces: extraSauces,
            comment: comment,
            id: `${currentSideData.item.id}-${Date.now()}`
        };

        window.BurgerCart.addItem(item);

        // Visual feedback
        const button = currentSideData.button;
        button.classList.remove('added'); // Remove any existing class first
        void button.offsetWidth; // Force reflow to restart animation
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 1000);

        hideSidesModal();
    });
}

function showSidesModal() {
    if (sidesModal) {
        // Reset free sauce selection
        sidesModal.querySelectorAll('.side-sauce-radio').forEach(radio => {
            radio.checked = false;
        });

        // Reset paid sauces
        const saucesCheckbox = sidesModal.querySelector('.sauces-main-checkbox');
        if (saucesCheckbox) {
            saucesCheckbox.checked = false;
        }

        const saucesSubmenu = sidesModal.querySelector('.sauces-submenu');
        if (saucesSubmenu) {
            saucesSubmenu.style.display = 'none';
        }

        sidesModal.querySelectorAll('.sauce-quantity').forEach(span => {
            span.textContent = '0';
        });

        // Hide errors
        const error = sidesModal.querySelector('.side-sauce-error');
        if (error) error.style.display = 'none';

        // Reset comment
        const commentTextarea = sidesModal.querySelector('.comment-textarea');
        if (commentTextarea) {
            commentTextarea.value = '';
        }

        sidesModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset scroll position to top
        const modalContent = sidesModal.querySelector('.doneness-modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }
}

function hideSidesModal() {
    if (sidesModal) {
        sidesModal.classList.remove('active');
        document.body.style.overflow = '';
        currentSideData = null;
    }
}

function showDonenessModal() {
    if (donenessModal) {
        // Reset selection
        const confirmBtn = donenessModal.querySelector('.doneness-confirm-btn');
        const comboCheckbox = donenessModal.querySelector('.combo-checkbox');

        if (comboCheckbox) {
            comboCheckbox.checked = false;
        }

        // Hide combo sauce selection and reset combo sauce radios
        const comboSauceSelection = donenessModal.querySelector('.combo-sauce-selection');
        if (comboSauceSelection) {
            comboSauceSelection.style.display = 'none';
        }

        // Uncheck all combo sauce radios and hide error
        donenessModal.querySelectorAll('.combo-sauce-radio').forEach(radio => {
            radio.checked = false;
        });
        const comboSauceError = donenessModal.querySelector('.combo-sauce-error');
        if (comboSauceError) {
            comboSauceError.style.display = 'none';
        }

        // Reset all quantities (extras and vegetables)
        donenessModal.querySelectorAll('.extra-quantity').forEach(span => {
            span.textContent = '0';
        });

        // Reset vegetables checkbox
        const vegetablesCheckbox = donenessModal.querySelector('.vegetables-main-checkbox');
        if (vegetablesCheckbox) {
            vegetablesCheckbox.checked = false;
        }

        // Hide vegetables submenu and error
        const vegetablesSubmenu = donenessModal.querySelector('.vegetables-submenu');
        const vegetablesError = donenessModal.querySelector('.vegetables-error');
        if (vegetablesSubmenu) {
            vegetablesSubmenu.style.display = 'none';
        }
        if (vegetablesError) {
            vegetablesError.style.display = 'none';
        }

        // Reset sauces checkbox
        const saucesCheckbox = donenessModal.querySelector('.sauces-main-checkbox');
        if (saucesCheckbox) {
            saucesCheckbox.checked = false;
        }

        // Hide sauces submenu and error
        const saucesSubmenu = donenessModal.querySelector('.sauces-submenu');
        const saucesError = donenessModal.querySelector('.sauces-error');
        if (saucesSubmenu) {
            saucesSubmenu.style.display = 'none';
        }
        if (saucesError) {
            saucesError.style.display = 'none';
        }

        // Reset comment
        const commentTextarea = donenessModal.querySelector('.comment-textarea');
        if (commentTextarea) {
            commentTextarea.value = '';
        }

        // Enable confirm button (no doneness selection required)
        confirmBtn.disabled = false;

        donenessModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset scroll position to top
        const modalContent = donenessModal.querySelector('.doneness-modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
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

    // Update combo option text
    const comboText = donenessModal.querySelector('.combo-checkbox-text');
    if (comboText) {
        comboText.textContent = window.CommonUtils.getTranslation('doneness.comboOption', currentLang, translations);
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

// Create tea customization modal
function createTeaModal() {
    const currentLang = window.CommonUtils?.currentLang || 'pl';
    const translations = getMergedTranslations();

    const modal = document.createElement('div');
    modal.className = 'doneness-modal tea-modal';
    modal.innerHTML = `
        <div class="doneness-modal-content">
            <button class="modal-close-btn" aria-label="Close">×</button>
            <h3 class="doneness-modal-title">
                ${currentLang === 'pl' ? 'Personalizuj herbatę' : 'Customize your tea'}
            </h3>

            <!-- Sugar selection -->
            <div class="tea-option-section">
                <h5 class="tea-option-title">${currentLang === 'pl' ? '🍬 Cukier (max 5):' : '🍬 Sugar (max 5):'}</h5>
                <div class="tea-quantity-controls">
                    <button class="extra-btn tea-minus" type="button" data-item="sugar">−</button>
                    <span class="tea-quantity" id="teaSugarQuantity">0</span>
                    <button class="extra-btn tea-plus" type="button" data-item="sugar">+</button>
                </div>
            </div>

            <!-- Lemon selection -->
            <div class="tea-option-section">
                <h5 class="tea-option-title">${currentLang === 'pl' ? '🍋 Cytryna (max 1):' : '🍋 Lemon (max 1):'}</h5>
                <div class="tea-quantity-controls">
                    <button class="extra-btn tea-minus" type="button" data-item="lemon">−</button>
                    <span class="tea-quantity" id="teaLemonQuantity">0</span>
                    <button class="extra-btn tea-plus" type="button" data-item="lemon">+</button>
                </div>
            </div>

            <div class="comment-section">
                <label class="comment-label">${currentLang === 'pl' ? '💬 Dodatkowe uwagi (opcjonalnie):' : '💬 Additional comments (optional):'}</label>
                <textarea class="comment-textarea" placeholder="${currentLang === 'pl' ? 'Np. mocna, słaba...' : 'E.g. strong, weak...'}"></textarea>
            </div>

            <div class="doneness-modal-buttons">
                <button class="doneness-modal-btn doneness-cancel-btn">
                    ${currentLang === 'pl' ? 'Anuluj' : 'Cancel'}
                </button>
                <button class="doneness-modal-btn doneness-confirm-btn">
                    ${currentLang === 'pl' ? 'Dodaj do koszyka' : 'Add to cart'}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    teaModal = modal;

    // Add event listeners
    const confirmBtn = modal.querySelector('.doneness-confirm-btn');
    const cancelBtn = modal.querySelector('.doneness-cancel-btn');

    const sugarQuantity = modal.querySelector('#teaSugarQuantity');
    const lemonQuantity = modal.querySelector('#teaLemonQuantity');

    // Sugar controls
    modal.querySelectorAll('.tea-plus[data-item="sugar"]').forEach(btn => {
        btn.addEventListener('click', () => {
            let quantity = parseInt(sugarQuantity.textContent);
            if (quantity < 5) {
                sugarQuantity.textContent = quantity + 1;
            }
        });
    });

    modal.querySelectorAll('.tea-minus[data-item="sugar"]').forEach(btn => {
        btn.addEventListener('click', () => {
            let quantity = parseInt(sugarQuantity.textContent);
            if (quantity > 0) {
                sugarQuantity.textContent = quantity - 1;
            }
        });
    });

    // Lemon controls
    modal.querySelectorAll('.tea-plus[data-item="lemon"]').forEach(btn => {
        btn.addEventListener('click', () => {
            let quantity = parseInt(lemonQuantity.textContent);
            if (quantity < 1) {
                lemonQuantity.textContent = quantity + 1;
            }
        });
    });

    modal.querySelectorAll('.tea-minus[data-item="lemon"]').forEach(btn => {
        btn.addEventListener('click', () => {
            let quantity = parseInt(lemonQuantity.textContent);
            if (quantity > 0) {
                lemonQuantity.textContent = quantity - 1;
            }
        });
    });

    // Cancel button
    cancelBtn.addEventListener('click', () => {
        hideTeaModal();
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideTeaModal();
        }
    });

    // Close button handler
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideTeaModal);
    }

    // Confirm button - add item to cart
    confirmBtn.addEventListener('click', () => {
        if (!currentTeaData) return;

        const currentLang = window.CommonUtils?.currentLang || 'pl';
        const sugar = parseInt(sugarQuantity.textContent);
        const lemon = parseInt(lemonQuantity.textContent);

        // Build item name with customization
        let itemName = currentTeaData.item.name;
        const customizations = [];

        if (sugar > 0) {
            const sugarText = currentLang === 'pl'
                ? `${sugar} ${sugar === 1 ? 'cukier' : sugar < 5 ? 'cukry' : 'cukrów'}`
                : `${sugar} sugar${sugar > 1 ? 's' : ''}`;
            customizations.push(`🍬 ${sugarText}`);
        }

        if (lemon > 0) {
            const lemonText = currentLang === 'pl' ? 'z cytryną' : 'with lemon';
            customizations.push(`🍋 ${lemonText}`);
        }

        if (customizations.length > 0) {
            itemName += ` (${customizations.join(', ')})`;
        }

        // Get comment
        const commentTextarea = modal.querySelector('.comment-textarea');
        const comment = commentTextarea ? commentTextarea.value.trim() : '';

        // Add comment to name if provided
        if (comment) {
            itemName += ` | 💬 ${comment}`;
        }

        const item = {
            ...currentTeaData.item,
            name: itemName,
            sugar: sugar,
            lemon: lemon,
            comment: comment,
            id: `${currentTeaData.item.id}-${Date.now()}`
        };

        window.BurgerCart.addItem(item);

        // Visual feedback
        const button = currentTeaData.button;
        button.classList.remove('added'); // Remove any existing class first
        void button.offsetWidth; // Force reflow to restart animation
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 1000);

        hideTeaModal();
    });
}

function showTeaModal() {
    if (teaModal) {
        // Reset quantities
        teaModal.querySelector('#teaSugarQuantity').textContent = '0';
        teaModal.querySelector('#teaLemonQuantity').textContent = '0';

        // Reset comment
        const commentTextarea = teaModal.querySelector('.comment-textarea');
        if (commentTextarea) {
            commentTextarea.value = '';
        }

        teaModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset scroll position to top
        const modalContent = teaModal.querySelector('.doneness-modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }
}

function hideTeaModal() {
    if (teaModal) {
        teaModal.classList.remove('active');
        document.body.style.overflow = '';
        currentTeaData = null;
    }
}
