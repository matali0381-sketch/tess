// Configuration template for the application

module.exports = {
    // Port number
    port: 3000,

    // Database connection settings
    db: {
        host: 'localhost',
        user: 'username',
        password: 'password',
        database: 'dbname'
    },

    // JWT secret
    jwtSecret: 'your_jwt_secret',

    // Other configuration settings
    // Add additional settings as required
};