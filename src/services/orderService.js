const Order = require('../models/Order');

async function listarPedidos(usuarioId) {
  return Order.find({ usuario: usuarioId }).populate('itens.produto');
}

async function criarPedido(usuarioId, dados) {
  const pedido = await Order.create({
    usuario: usuarioId,
    itens: dados.itens,
    total: dados.total,
    status: dados.status || 'pendente'
  });
  return pedido;
}

async function atualizarStatusPedido(id, status) {
  return Order.findByIdAndUpdate(id, { status }, { new: true });
}

module.exports = { listarPedidos, criarPedido, atualizarStatusPedido };
