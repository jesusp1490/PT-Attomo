const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
    const secret = process.env.JWT_SECRET;
    console.log('Secret in generateToken:', secret); // Agrega esto para depurar
    return jwt.sign({ id, email }, secret, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken }
