const User = require("../models/User");
const { validateEmailDB, validatePassword } = require("../../utils/validator");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");

const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`

//REGISTER
const registerUser = async (req, res) => {
    try {
        const userBody = new User({
            ...req.body,
            votedGames: [] // Inicializar votedGames como un arreglo vacío
        });
        const valEmail = await validateEmailDB(req.body.email)
        if (!valEmail) {
            if (validatePassword(req.body.password)) {
                userBody.password = bcrypt.hashSync(userBody.password, 10)  
                const createdUser = await userBody.save();
                return res.json({ success: true, message: "Agregado con éxito", data: createdUser })
            } else {
                return res.json({ success: false, message: "La contraseña no cumple con el patrón" })
            }
        }
        return res.json({ success: false, message: "Email ya existe" })

    } catch (error) {
        console.error('Error en registerUser:', error);
        return res.status(500).json({ success: false, message: "Error del servidor", error: error.message });
    }
}

//LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDB = await validateEmailDB(email);
        if (!userDB || !bcrypt.compareSync(password, userDB.password)) {
            return res.status(401).json({ success: false, message: "Email o contraseña inválidos" });
        }
        const token = generateToken(userDB._id, userDB.email);

        const userInfo = {
            id: userDB._id,
            email: userDB.email,
            username: userDB.username,
            name: userDB.name,
            surname: userDB.surname,
            role: userDB.role,
            votedGames: userDB.votedGames || [] 
        };

        return res.json({ success: true, message: "Login realizado", token: token, userInfo: userInfo });
    } catch (error) {
        console.error('Error en loginUser:', error);
        return res.status(500).json({ success: false, message: "Error del servidor" });
    }
};



//PUT
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, role } = req.body;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ message: 'Usuario actualizado correctamente', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('votedGames');
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userInfo = {
            id: user._id,
            email: user.email,
            username: user.username,
            name: user.name,
            surname: user.surname,
            votedGames: user.votedGames || [] 
        };

        return res.json(userInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getByEmail = async (req, res) => {
    try {
        const { email } = req.params
        const emailUser = await User.find({ email: email });
        return res.status(200).json(emailUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const allUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getByEmail, registerUser, loginUser, getUserProfile, allUsers, updateUser }