const express = require('express');

const router = express.Router();

// Require controller modules.
const labelTypeController = require('../controllers/labels/types');
const labelFilesController = require('../controllers/labels/files');

// Label types
router.get('/types', labelTypeController.getAll);

// Label Files
router.post('/files', labelFilesController.create);

module.exports = router;
