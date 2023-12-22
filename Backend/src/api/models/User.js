const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    votedGames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});


const User = mongoose.model("user", userSchema);
module.exports = User; 
