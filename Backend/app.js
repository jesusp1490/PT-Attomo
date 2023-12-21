const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/utils/db');
const gameRoutes = require('./src/api/routes/gameRoutes');
const userRoutes = require('./src/api/routes/userRoutes');
// const commentRoutes = require('./src/api/routes/commentRoutes');

dotenv.config();
const cors = require('cors');
const app = express();

const allowedOrigins = ['http://127.0.0.1:5000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));


const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;



connectDB();

// Conexion a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB"))
.catch((error) => console.error("Erro conectado a MongoDB", error))



//Rutas
app.use(express.json());
app.use('/games', gameRoutes);
app.use('/users', userRoutes);
// app.use('/comment', commentRoutes);

//Manejo de errores
app.use((req, res, next) => {
    res.status(404).send("Esa ruta no existe");
});

//Config puerto
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

