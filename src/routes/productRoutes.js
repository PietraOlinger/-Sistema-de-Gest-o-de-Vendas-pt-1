const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');

router.get('/', productController.listarProdutos);
router.get('/:id', productController.buscarProduto);
router.post('/', authMiddleware, authorizeRoles('admin'), productController.criarProduto);
router.put('/:id', authMiddleware, authorizeRoles('admin'), productController.atualizarProduto);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), productController.excluirProduto);

module.exports = router;
