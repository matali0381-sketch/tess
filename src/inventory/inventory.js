class InventoryManager {
    constructor() {
        this.stock = {};
    }

    // Add stock of an item
    addStock(item, quantity) {
        if (!this.stock[item]) {
            this.stock[item] = 0;
        }
        this.stock[item] += quantity;
    }

    // Remove stock of an item
    removeStock(item, quantity) {
        if (this.stock[item]) {
            this.stock[item] = Math.max(0, this.stock[item] - quantity);
        }
    }

    // Get the current stock of an item
    getStock(item) {
        return this.stock[item] || 0;
    }

    // Get a summary of all stock
    getStockSummary() {
        return this.stock;
    }

    // Get analytics on stock
    getStockAnalytics() {
        const totalStock = Object.values(this.stock).reduce((acc, qty) => acc + qty, 0);
        const itemCount = Object.keys(this.stock).length;
        return {
            totalStock,
            itemCount,
            items: this.stock
        };
    }
}

module.exports = InventoryManager;