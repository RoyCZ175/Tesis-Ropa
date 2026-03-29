const express = require('express');
const router = express.Router();
const iaController = require('../controllers/iaController');

router.post('/evaluar', iaController.evaluarOutfit);

module.exports = router;