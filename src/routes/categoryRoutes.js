const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');

router.get('/', categoryController.listarCategorias);
router.post('/', authMiddleware, authorizeRoles('admin'), categoryController.criarCategoria);
router.put('/:id', authMiddleware, authorizeRoles('admin'), categoryController.atualizarCategoria);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), categoryController.excluirCategoria);

module.exports = router;
