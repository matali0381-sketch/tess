'use strict';

class Ledger {
    constructor() {
        this.entries = [];
    }

    addEntry(description, amount) {
        const entry = {
            description,
            amount,
            date: new Date().toISOString()
        };
        this.entries.push(entry);
    }

    getEntries() {
        return this.entries;
    }
}

module.exports = Ledger;
