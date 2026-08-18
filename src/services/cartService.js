const Cart = require('../models/Cart');

async function listarCarrinho(usuarioId) {
  return Cart.findOne({ usuario: usuarioId }).populate('itens.produto');
}

async function adicionarAoCarrinho(usuarioId, item) {
  let carrinho = await Cart.findOne({ usuario: usuarioId });

  if (!carrinho) {
    carrinho = await Cart.create({ usuario: usuarioId, itens: [] });
  }

  const indice = carrinho.itens.findIndex((produto) => String(produto.produto) === String(item.produto));

  if (indice >= 0) {
    carrinho.itens[indice].quantidade += Number(item.quantidade || 1);
  } else {
    carrinho.itens.push({ produto: item.produto, quantidade: Number(item.quantidade || 1) });
  }

  carrinho.total = carrinho.itens.reduce((soma, produto) => soma + (produto.quantidade * 1), 0);
  await carrinho.save();
  return carrinho;
}

async function removerDoCarrinho(usuarioId, produtoId) {
  const carrinho = await Cart.findOne({ usuario: usuarioId });
  if (!carrinho) return null;

  carrinho.itens = carrinho.itens.filter((item) => String(item.produto) !== String(produtoId));
  await carrinho.save();
  return carrinho;
}

module.exports = { listarCarrinho, adicionarAoCarrinho, removerDoCarrinho };
