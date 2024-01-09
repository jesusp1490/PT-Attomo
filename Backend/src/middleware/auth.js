const { verifyToken } = require("../utils/jwt");
const User = require("../api/models/User");

const isAuth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({ message: "No autorizado: No hay token" });
        }

        const token = auth.split(" ")[1];
        const tokenVerified = verifyToken(token);
        if (!tokenVerified.id) {
            return res.status(401).json({ message: "No autorizado", error: tokenVerified });
        }

        const userProfile = await User.findById(tokenVerified.id);
        if (!userProfile) {
            return res.status(401).json({ message: "No autorizado: Usuario no encontrado" });
        }

        req.userProfile = userProfile;
        next();
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

module.exports = { isAuth };
