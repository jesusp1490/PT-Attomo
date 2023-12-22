const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = `${process.env.JWT_SECRET_KEY}`

//REGISTER
const registerUser = async (req, res) => {
    try {
        const { name, surname, username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, surname, username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//LOGIN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const { password, ...userData } = req.user.toObject(); 
        res.status(200).json(userData);
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