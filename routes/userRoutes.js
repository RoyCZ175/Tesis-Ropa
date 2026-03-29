const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para el registro: POST http://localhost:3000/api/users/register
router.post('/register', userController.registerUser);

module.exports = router;