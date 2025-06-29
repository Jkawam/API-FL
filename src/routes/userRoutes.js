// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa o controlador

// Rota para obter informações do usuário pelo ID
router.get('/:id', userController.getUserById);

module.exports = router;