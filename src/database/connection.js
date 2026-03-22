// connection.js

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const dbName = 'yourDatabaseName'; // Replace with your database name

let db;

const connectToDatabase = async () => {
    if (db) return db;
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    return db;
};

module.exports = { connectToDatabase };