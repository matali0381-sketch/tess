// auth.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = {}; // This will act as in-memory data storage for demonstration purposes
const SECRET_KEY = 'your_secret_key'; // Change this to your own secret key

// User registration
function register(username, password) {
    if (users[username]) {
        throw new Error('User already exists');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    users[username] = { password: hashedPassword };
    return { message: 'User registered successfully' };
}

// User login
function login(username, password) {
    const user = users[username];
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid username or password');
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return { token };
}

// JWT token generation
function generateToken(username) {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
}

// Password reset
function resetPassword(username, newPassword) {
    const user = users[username];
    if (!user) {
        throw new Error('User not found');
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    return { message: 'Password reset successfully' };
}

// Session management (mock)
const sessions = {};
function createSession(username) {
    const sessionId = new Date().getTime() + '-' + username;
    sessions[sessionId] = { username };
    return { sessionId };
}

function getSession(sessionId) {
    return sessions[sessionId];
}

module.exports = { register, login, generateToken, resetPassword, createSession, getSession };