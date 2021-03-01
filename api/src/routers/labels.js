const express = require('express');

const router = express.Router();

// Require controller modules.
const labelController = require('../controllers/labels.js');
const labelTypeController = require('../controllers/labels/types');
const labelFilesController = require('../controllers/labels/files');

// Labels
router.put('/', labelController.put);

// Label types
router.get('/types', labelTypeController.getAll);

// Label Files
router.get('/files/:id', labelFilesController.download);
router.post('/files', labelFilesController.create);

module.exports = router;
