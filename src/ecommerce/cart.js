class ShoppingCart {
    constructor() {
        this.items = {};
    }

    addItem(item, quantity) {
        if (this.items[item]) {
            this.items[item] += quantity;
        } else {
            this.items[item] = quantity;
        }
    }

    removeItem(item) {
        delete this.items[item];
    }

    updateQuantity(item, quantity) {
        if (this.items[item]) {
            this.items[item] = quantity;
        }
    }

    getTotal() {
        let total = 0;
        for (const [item, quantity] of Object.entries(this.items)) {
            // Assume each item has a price associated with it in some way, for demonstration:
            const price = this.getPrice(item);
            total += price * quantity;
        }
        return total;
    }

    getItemCount() {
        return Object.keys(this.items).length;
    }

    // Placeholder function for item price retrieval
    getPrice(item) {
        // For demonstration purposes, return a fixed price
        return 10; // Example fixed price for all items
    }
}

// Example of usage:
const cart = new ShoppingCart();

// Adding items to the cart
cart.addItem('apple', 2);
cart.addItem('banana', 5);

// Updating item quantity
cart.updateQuantity('apple', 3);

// Getting total cost
console.log(cart.getTotal()); // Outputs total cost

// Getting number of distinct items in cart
console.log(cart.getItemCount()); // Outputs number of distinct items
