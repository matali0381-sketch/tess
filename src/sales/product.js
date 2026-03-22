// Product Management Module

class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getDetails() {
        return `Product: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity}`;
    }
}

module.exports = Product;