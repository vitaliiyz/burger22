// Cart Module for Burger 22
// Handles shopping cart functionality with localStorage

class ShoppingCart {
    constructor() {
        this.storageKey = 'burger22_cart';
        this.items = this.loadCart();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            this.dispatchCartUpdate();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Dispatch custom event when cart updates
    dispatchCartUpdate() {
        const event = new CustomEvent('cartUpdated', {
            detail: {
                items: this.items,
                count: this.getTotalCount(),
                total: this.getTotalPrice()
            }
        });
        window.dispatchEvent(event);
    }

    // Add item to cart
    addItem(item) {
        // item structure: { id, name, price, type, image }
        const existingItem = this.items.find(i => i.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...item,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        return true;
    }

    // Remove item from cart completely
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(itemId, quantity) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Increase quantity by 1
    increaseQuantity(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.quantity += 1;
            this.saveCart();
        }
    }

    // Decrease quantity by 1
    decreaseQuantity(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                this.saveCart();
            } else {
                this.removeItem(itemId);
            }
        }
    }

    // Get all items
    getItems() {
        return this.items;
    }

    // Get total number of items
    getTotalCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Get total price
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // Check if item is in cart
    hasItem(itemId) {
        return this.items.some(item => item.id === itemId);
    }

    // Get item quantity
    getItemQuantity(itemId) {
        const item = this.items.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    }
}

// Create global cart instance
window.BurgerCart = new ShoppingCart();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}
