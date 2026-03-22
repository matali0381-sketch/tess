const express = require('express');

class InvoiceManager {
    constructor() {
        this.invoices = [];
    }

    createInvoice(invoice) {
        this.invoices.push(invoice);
        return invoice;
    }

    getInvoiceById(id) {
        return this.invoices.find(invoice => invoice.id === id) || null;
    }

    getAllInvoices() {
        return this.invoices;
    }

    markAsPaid(id) {
        const invoice = this.getInvoiceById(id);
        if(invoice) {
            invoice.paid = true;
            return invoice;
        }
        return null;
    }

    getRemainingAmount(id) {
        const invoice = this.getInvoiceById(id);
        if(invoice) {
            return invoice.total - (invoice.paid ? invoice.amountPaid : 0);
        }
        return null;
    }
}

const router = express.Router();
const invoiceManager = new InvoiceManager();

// POST route to create an invoice
router.post('/invoices', (req, res) => {
    const invoice = invoiceManager.createInvoice(req.body);
    res.status(201).json(invoice);
});

// GET route to retrieve an invoice by ID
router.get('/invoices/:id', (req, res) => {
    const invoice = invoiceManager.getInvoiceById(req.params.id);
    if (invoice) {
        res.json(invoice);
    } else {
        res.status(404).send('Invoice not found');
    }
});

// GET route to retrieve all invoices
router.get('/invoices', (req, res) => {
    const invoices = invoiceManager.getAllInvoices();
    res.json(invoices);
});

// PATCH route to mark an invoice as paid
router.patch('/invoices/:id/paid', (req, res) => {
    const invoice = invoiceManager.markAsPaid(req.params.id);
    if (invoice) {
        res.json(invoice);
    } else {
        res.status(404).send('Invoice not found');
    }
});

// GET route to get the remaining amount of an invoice
router.get('/invoices/:id/remaining', (req, res) => {
    const remainingAmount = invoiceManager.getRemainingAmount(req.params.id);
    if (remainingAmount !== null) {
        res.json({ remainingAmount });
    } else {
        res.status(404).send('Invoice not found');
    }
});

module.exports = { router, InvoiceManager };