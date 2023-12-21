const User = require("../api/models/User");

const validatePassword = (pass) => {

    const regex = /[A-Za-z\d$@$!%*?&]{8,15}/;
    return regex.test(pass)
}

const validateEmailDB = async (emailUser) => {
    try {
        console.log("Buscando en la base de datos el email:", emailUser);
        const validateEmail = await User.findOne({ email: emailUser });
        console.log("Resultado de la búsqueda:", validateEmail);
        return validateEmail;
    } catch (error) {
        console.log("Error al buscar el email:", error);
        throw error; 
    }
}

module.exports = { validateEmailDB, validatePassword }