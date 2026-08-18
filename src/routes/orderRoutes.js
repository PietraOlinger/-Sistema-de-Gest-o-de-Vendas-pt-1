const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, orderController.listarPedidos);
router.post('/', authMiddleware, orderController.criarPedido);
router.patch('/:id/status', authMiddleware, orderController.atualizarStatusPedido);

module.exports = router;
