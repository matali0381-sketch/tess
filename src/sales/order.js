// order.js

// Sales Order Management Module

class SalesOrder {
    constructor(orderId, customer, items) {
        this.orderId = orderId;
        this.customer = customer;
        this.items = items;
        this.status = 'Pending';
    }

    // Method to calculate total order amount
    calculateTotal() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    // Method to confirm the order
    confirmOrder() {
        this.status = 'Confirmed';
    }

    // Method to cancel the order
    cancelOrder() {
        this.status = 'Cancelled';
    }
}

module.exports = SalesOrder;
