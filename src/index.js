const express = require('express');
const bodyParser = require('body-parser');

const invoiceManager = require('./managers/invoiceManager');
const expenseManager = require('./managers/expenseManager');
const orderManager = require('./managers/orderManager');
const customerManager = require('./managers/customerManager');
const productManager = require('./managers/productManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Initialize managers
invoiceManager.init();
expenseManager.init();
orderManager.init();
customerManager.init();
productManager.init();

// Setup routes
app.use('/api/invoices', invoiceManager.router);
app.use('/api/expenses', expenseManager.router);
app.use('/api/orders', orderManager.router);
app.use('/api/customers', customerManager.router);
app.use('/api/products', productManager.router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
