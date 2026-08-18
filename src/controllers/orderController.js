const orderService = require('../services/orderService');

async function listarPedidos(req, res) {
  try {
    const pedidos = await orderService.listarPedidos(req.user.id);
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function criarPedido(req, res) {
  try {
    const pedido = await orderService.criarPedido(req.user.id, req.body);
    return res.status(201).json({ mensagem: 'Pedido criado com sucesso.', pedido });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function atualizarStatusPedido(req, res) {
  try {
    const pedido = await orderService.atualizarStatusPedido(req.params.id, req.body.status);
    if (!pedido) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
    }
    return res.status(200).json({ mensagem: 'Status atualizado com sucesso.', pedido });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

module.exports = { listarPedidos, criarPedido, atualizarStatusPedido };
