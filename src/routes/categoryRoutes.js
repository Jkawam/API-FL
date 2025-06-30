// src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); // Importa o controlador de categoria

// Rota para listar todas as categorias
// GET /api/v1/categories
router.get('/', categoryController.listar);

// Rota para buscar uma categoria por ID
// GET /api/v1/categories/:id
router.get('/:id', categoryController.buscarPorId);

// Rota para cadastrar uma nova categoria
// POST /api/v1/categories
router.post('/', categoryController.criar);

// Rota para atualizar uma categoria existente
// PUT /api/v1/categories/:id
router.put('/:id', categoryController.atualizar);

// Rota para deletar uma categoria
// DELETE /api/v1/categories/:id
router.delete('/:id', categoryController.deletar);

module.exports = router;
