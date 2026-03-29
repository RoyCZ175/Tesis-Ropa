const express = require('express');
const router = express.Router();
const prendaController = require('../controllers/prendaController');

// Ruta para añadir prenda: POST http://localhost:3000/api/prendas
router.post('/', prendaController.addPrenda);

// Ruta para ver el armario de un usuario: GET http://localhost:3000/api/prendas/usuario/1
router.get('/usuario/:userId', prendaController.getPrendasByUser);

module.exports = router;