const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    desarrollador: { type: String, required: true },
    categoria: { type: String, required: true },
    descripcion: { type: String, required: true },
    votos: { type: Number, default: 0 }
});

module.exports = mongoose.model('Game', gameSchema);