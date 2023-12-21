const express = require('express');
const router = express.Router();
// const upload = require("../../middleware/upload.file");
const { getGames, newGame, deleteGame, updateGame, getGameByName, getGameById, getGameByCategory } = require('../controllers/gameControllers');

router.get('/', getGames);
router.get('/:id', getGameById);
router.get('/name/:nombre', getGameByName);
router.get('/category/:categoria', getGameByCategory);
router.post('/', newGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

module.exports = router;