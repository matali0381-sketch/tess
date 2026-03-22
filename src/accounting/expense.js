'use strict';

class Expense {
    constructor(amount, description) {
        this.amount = amount;
        this.description = description;
        this.date = new Date();
    }

    getDetails() {
        return `Expense: $${this.amount} - ${this.description} on ${this.date.toLocaleDateString()}`;
    }
}

module.exports = Expense;