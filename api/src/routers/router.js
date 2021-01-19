const express = require('express');

const router = express.Router();

// Require controller modules.
const labelTypeController = require('../controllers/labeltypes');
const genericController = require('../controllers/generic');
const placesController = require('../controllers/places');

// GET generic paths.
router.get('/OK', genericController.ok);

// Places
router.get('/places', placesController.getAll);
router.post('/places', placesController.create);

// Label types
router.get('/labeltypes', labelTypeController.getAll);

module.exports = router;
