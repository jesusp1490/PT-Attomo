const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken, verifyToken };
