const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, cartController.listarCarrinho);
router.post('/', authMiddleware, cartController.adicionarAoCarrinho);
router.delete('/:produtoId', authMiddleware, cartController.removerDoCarrinho);

module.exports = router;
