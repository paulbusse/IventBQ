const express = require('express');

const router = express.Router();

// Require controller modules.
const genericController = require('../controllers/generic');
const placesController = require('../controllers/places');
const itemsController = require('../controllers/items');

// GET generic paths.
router.get('/OK', genericController.ok);

// Places
router.get('/places', placesController.getAll);
router.post('/places', placesController.create);

// Items
router.post('/items', itemsController.create);

module.exports = router;
