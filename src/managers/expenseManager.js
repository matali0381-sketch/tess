const express = require('express');

class ExpenseManager {
    constructor() {
        this.expenses = [];
    }

    recordExpense(expense) {
        this.expenses.push(expense);
    }

    getExpensesByCategory(category) {
        return this.expenses.filter(expense => expense.category === category);
    }

    getTotalExpensesByPeriod(startDate, endDate) {
        return this.expenses
            .filter(expense => new Date(expense.date) >= new Date(startDate) && new Date(expense.date) <= new Date(endDate))
            .reduce((total, expense) => total + expense.amount, 0);
    }

    getAllExpenses() {
        return this.expenses;
    }

    getExpenseSummary() {
        return this.expenses.reduce((summary, expense) => {
            summary[expense.category] = (summary[expense.category] || 0) + expense.amount;
            return summary;
        }, {});
    }

    deleteExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
    }
}

const router = express.Router();
const expenseManager = new ExpenseManager();

router.post('/expenses', (req, res) => {
    const expense = req.body;
    expenseManager.recordExpense(expense);
    res.status(201).send(expense);
});

router.get('/expenses', (req, res) => {
    res.send(expenseManager.getAllExpenses());
});

router.get('/expenses/category/:category', (req, res) => {
    const { category } = req.params;
    res.send(expenseManager.getExpensesByCategory(category));
});

router.get('/expenses/summary', (req, res) => {
    res.send(expenseManager.getExpenseSummary());
});

router.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    expenseManager.deleteExpense(id);
    res.status(204).send();
});

module.exports = { ExpenseManager, router };