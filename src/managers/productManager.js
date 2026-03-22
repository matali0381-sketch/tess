const express = require('express');
const router = express.Router();

class ProductManager {
    constructor() {
        this.products = []; // Should eventually link to a database
    }

    addProduct(product) {
        this.products.push(product);
        return product;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getProductBySku(sku) {
        return this.products.find(product => product.sku === sku);
    }

    getAllProducts() {
        return this.products;
    }

    updateStock(id, quantity) {
        const product = this.getProductById(id);
        if (product) {
            product.stock += quantity;
            return product;
        }
        return null;
    }

    recordSale(id, quantity) {
        const product = this.getProductById(id);
        if (product) {
            product.stock -= quantity;
            return product;
        }
        return null;
    }

    getLowStockProducts(threshold) {
        return this.products.filter(product => product.stock < threshold);
    }

    getTopSellingProducts(limit) {
        return this.products
            .sort((a, b) => b.sales - a.sales)
            .slice(0, limit);
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
}

// Route Definitions
router.post('/products', (req, res) => {
    const product = req.body;
    const addedProduct = productManager.addProduct(product);
    res.status(201).json(addedProduct);
});

router.get('/products/:id', (req, res) => {
    const product = productManager.getProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

router.get('/products/sku/:sku', (req, res) => {
    const product = productManager.getProductBySku(req.params.sku);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

router.get('/products', (req, res) => {
    res.json(productManager.getAllProducts());
});

router.put('/products/:id/stock', (req, res) => {
    const { quantity } = req.body;
    const product = productManager.updateStock(req.params.id, quantity);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

router.post('/products/:id/sale', (req, res) => {
    const { quantity } = req.body;
    const product = productManager.recordSale(req.params.id, quantity);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

router.get('/products/low-stock/:threshold', (req, res) => {
    const lowStockProducts = productManager.getLowStockProducts(req.params.threshold);
    res.json(lowStockProducts);
});

router.get('/products/top-selling/:limit', (req, res) => {
    const topSellingProducts = productManager.getTopSellingProducts(req.params.limit);
    res.json(topSellingProducts);
});

router.put('/products/:id', (req, res) => {
    const updatedProduct = productManager.updateProduct(req.params.id, req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
});

router.delete('/products/:id', (req, res) => {
    const result = productManager.deleteProduct(req.params.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

const productManager = new ProductManager();
module.exports = router;
