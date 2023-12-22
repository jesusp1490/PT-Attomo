const jwt = require('jsonwebtoken');
const User = require('../api/models/User');

const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`;

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('No se pudo encontrar el usuario');
        }
        req.user = user; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Autenticación fallida' });
    }
};

module.exports = authenticate;
