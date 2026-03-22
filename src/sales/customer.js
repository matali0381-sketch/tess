// customer.js

// This module handles customer management

class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    save() {
        // Logic to save customer information
    }

    static findByEmail(email) {
        // Logic to find a customer by email
    }
}

module.exports = Customer;