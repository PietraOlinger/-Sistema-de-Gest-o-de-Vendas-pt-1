const cartService = require('../services/cartService');

async function listarCarrinho(req, res) {
  try {
    const carrinho = await cartService.listarCarrinho(req.user.id);
    return res.status(200).json(carrinho || { itens: [], total: 0 });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function adicionarAoCarrinho(req, res) {
  try {
    const carrinho = await cartService.adicionarAoCarrinho(req.user.id, req.body);
    return res.status(201).json({ mensagem: 'Produto adicionado ao carrinho.', carrinho });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function removerDoCarrinho(req, res) {
  try {
    const carrinho = await cartService.removerDoCarrinho(req.user.id, req.params.produtoId);
    if (!carrinho) {
      return res.status(404).json({ mensagem: 'Carrinho não encontrado.' });
    }
    return res.status(200).json({ mensagem: 'Produto removido do carrinho.', carrinho });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

module.exports = { listarCarrinho, adicionarAoCarrinho, removerDoCarrinho };
