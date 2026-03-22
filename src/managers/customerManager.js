const express = require('express');
const router = express.Router();

class CustomerManager {
    constructor() {
        this.customers = [];
    }

    addCustomer(customer) {
        this.customers.push(customer);
        return customer;
    }

    getCustomerById(id) {
        return this.customers.find(c => c.id === id);
    }

    getCustomerByEmail(email) {
        return this.customers.find(c => c.email === email);
    }

    getAllCustomers() {
        return this.customers;
    }

    updateCustomer(id, updatedData) {
        const customer = this.getCustomerById(id);
        if (customer) {
            Object.assign(customer, updatedData);
        }
        return customer;
    }

    updateTotalPurchase(id, amount) {
        const customer = this.getCustomerById(id);
        if (customer) {
            customer.totalPurchase = (customer.totalPurchase || 0) + amount;
        }
        return customer;
    }

    getTopCustomers(limit) {
        return this.customers.sort((a, b) => (b.totalPurchase || 0) - (a.totalPurchase || 0)).slice(0, limit);
    }

    deleteCustomer(id) {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            return this.customers.splice(index, 1)[0];
        }
        return null;
    }
}

const customerManager = new CustomerManager();

// Router endpoints
router.post('/customers', (req, res) => {
    const customer = customerManager.addCustomer(req.body);
    res.status(201).json(customer);
});

router.get('/customers/:id', (req, res) => {
    const customer = customerManager.getCustomerById(req.params.id);
    res.status(customer ? 200 : 404).json(customer);
});

router.get('/customers/email/:email', (req, res) => {
    const customer = customerManager.getCustomerByEmail(req.params.email);
    res.status(customer ? 200 : 404).json(customer);
});

router.get('/customers', (req, res) => {
    const customers = customerManager.getAllCustomers();
    res.json(customers);
});

router.put('/customers/:id', (req, res) => {
    const customer = customerManager.updateCustomer(req.params.id, req.body);
    res.status(customer ? 200 : 404).json(customer);
});

router.put('/customers/purchase/:id', (req, res) => {
    const customer = customerManager.updateTotalPurchase(req.params.id, req.body.amount);
    res.status(customer ? 200 : 404).json(customer);
});

router.get('/customers/top/:limit', (req, res) => {
    const topCustomers = customerManager.getTopCustomers(parseInt(req.params.limit));
    res.json(topCustomers);
});

router.delete('/customers/:id', (req, res) => {
    const customer = customerManager.deleteCustomer(req.params.id);
    res.status(customer ? 200 : 404).json(customer);
});

module.exports = router;
