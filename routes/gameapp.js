const express = require('express');
const router = express.Router();

const gameController = require('../controllers/games');

router.get('/', gameController.getAll);

router.get('/:id', gameController.getSingle);

router.post('/', gameController.createGame);

module.exports = router;