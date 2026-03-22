const express = require('express');
const router = express.Router();

class OrderManager {
    constructor() {
        this.orders = [];
    }

    createOrder(order) {
        this.orders.push(order);
        return order;
    }

    getOrderById(id) {
        return this.orders.find(order => order.id === id);
    }

    getOrdersByCustomerId(customerId) {
        return this.orders.filter(order => order.customerId === customerId);
    }

    updateOrderStatus(id, status) {
        const order = this.getOrderById(id);
        if (order) {
            order.status = status;
            return order;
        }
        return null;
    }

    getOrdersByStatus(status) {
        return this.orders.filter(order => order.status === status);
    }

    getTotalSales() {
        return this.orders.reduce((total, order) => total + order.amount, 0);
    }

    getAverageOrderValue() {
        return this.getTotalSales() / this.orders.length;
    }

    getAllOrders() {
        return this.orders;
    }
}

const orderManager = new OrderManager();

router.post('/orders', (req, res) => {
    const order = orderManager.createOrder(req.body);
    res.status(201).json(order);
});

router.get('/orders/:id', (req, res) => {
    const order = orderManager.getOrderById(req.params.id);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

router.get('/orders/customer/:customerId', (req, res) => {
    const orders = orderManager.getOrdersByCustomerId(req.params.customerId);
    res.status(200).json(orders);
});

router.put('/orders/:id/status', (req, res) => {
    const order = orderManager.updateOrderStatus(req.params.id, req.body.status);
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

router.get('/orders/status/:status', (req, res) => {
    const orders = orderManager.getOrdersByStatus(req.params.status);
    res.status(200).json(orders);
});

router.get('/orders/total-sales', (req, res) => {
    const totalSales = orderManager.getTotalSales();
    res.status(200).json({ totalSales });
});

router.get('/orders/average-order-value', (req, res) => {
    const averageOrderValue = orderManager.getAverageOrderValue();
    res.status(200).json({ averageOrderValue });
});

router.get('/orders', (req, res) => {
    const orders = orderManager.getAllOrders();
    res.status(200).json(orders);
});

module.exports = router;
