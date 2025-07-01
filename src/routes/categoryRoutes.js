
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); 


router.get('/', categoryController.listar);


router.get('/:id', categoryController.buscarPorId);


router.post('/', categoryController.criar);


router.put('/:id', categoryController.atualizar);


router.delete('/:id', categoryController.deletar);

module.exports = router;
