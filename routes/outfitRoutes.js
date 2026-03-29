const express = require('express');
const router = express.Router();
const outfitController = require('../controllers/outfitController');

// Ruta: GET http://localhost:3000/api/outfits/sugerir/1
router.get('/sugerir/:userId', outfitController.generarOutfit);

module.exports = router;