// Invoice Management Module

class Invoice {
    constructor(client, items) {
        this.client = client;
        this.items = items;
        this.dateIssued = new Date();
        this.invoiceNumber = this.generateInvoiceNumber();
    }

    generateInvoiceNumber() {
        return `INV-${Math.floor(Math.random() * 1000000)}`;
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    getInvoiceDetails() {
        return {
            invoiceNumber: this.invoiceNumber,
            client: this.client,
            items: this.items,
            total: this.calculateTotal(),
            dateIssued: this.dateIssued
        };
    }
}

module.exports = Invoice;
