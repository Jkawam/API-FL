// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa o controlador de usuário

// Rota para obter informações do usuário pelo ID
// GET /api/v1/users/:id
router.get('/:id', userController.getUserById);

// Rota para registrar um novo usuário
// POST /api/v1/users
router.post('/', userController.createUser);

// Rota para atualizar um usuário existente
// PUT /api/v1/users/:id
router.put('/:id', userController.updateUser);

// Rota para deletar um usuário
// DELETE /api/v1/users/:id
router.delete('/:id', userController.deleteUser);

module.exports = router;
