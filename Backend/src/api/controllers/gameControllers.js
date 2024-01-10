const Game = require('../models/Games');
const User = require('../models/User');

//GET 
const getGames = async (req, res) => {
    try {
        let query = {};
        if (req.query.name) {
            query.nombre = { $regex: req.query.name, $options: "i" };
        }
        if (req.query.votes) {
            const votes = parseInt(req.query.votes);
            if (!isNaN(votes)) {
                query.votos = { $gte: votes };
            }
        }
        const games = await Game.find(query);
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//POST 
const newGame = async (req, res) => {
    try {
        const game = new Game({
            nombre: req.body.nombre,
            imagen: req.body.imagen,
            desarrollador: req.body.desarrollador,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            votos: req.body.votos
        });
        await game.save();
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//DELETE
const deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).json({ message: 'Juego no encontrado' });
        res.json({ message: 'Juego eliminado'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PUT
const updateGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        if (req.body.nombre) game.nombre = req.body.nombre;
        if (req.body.imagen) game.imagen = req.body.imagen;
        if (req.body.desarrollador) game.desarrollador = req.body.desarrollador;
        if (req.body.categoria) game.categoria = req.body.categoria;
        if (req.body.descripcion) game.descripcion = req.body.descripcion;
        if (req.body.votos) game.votos = req.body.votos;

        await game.save();
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//GET by name
const getGameByName = async (req, res) => {
    try {
        const game = await Game.findOne({ nombre: req.params.nombre });
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//GET by id
const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//GET by category
const getGameByCategory = async (req, res) => {
    try {
        const game = await Game.find({ categoria: req.params.categoria });
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const voteForGame = async (req, res) => {
    const { userId, gameId } = req.body;

    try {
        const user = await User.findById(userId);
        const game = await Game.findById(gameId);

        if (!user || !game) {
            return res.status(404).json({ message: "Usuario o juego no encontrado" });
        }

        // Verificar si el usuario ya ha votado por este juego
        if (user.votedGames.includes(gameId)) {
            return res.status(400).json({ message: "Ya has votado por este juego" });
        }

        // Verificar si el usuario ha alcanzado el límite de 5 votos
        if (user.votedGames.length >= 5) {
            return res.status(400).json({ message: "Has alcanzado el límite de 5 votos" });
        }

        user.votedGames.push(gameId);
        game.votos += 1;

        await user.save();
        await game.save();

        res.json({ success: true, message: "Voto registrado con éxito", game });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar la votación" });
    }
};



module.exports = { getGames, newGame, deleteGame, updateGame, getGameByName, getGameById, getGameByCategory, voteForGame };
