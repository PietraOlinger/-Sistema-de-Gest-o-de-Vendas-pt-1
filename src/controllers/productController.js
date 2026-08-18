const productService = require('../services/productService');

async function listarProdutos(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const resultado = await productService.listarProdutos({}, page, limit);
    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function criarProduto(req, res) {
  try {
    const produto = await productService.criarProduto(req.body);
    return res.status(201).json({ mensagem: 'Produto criado com sucesso.', produto });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function buscarProduto(req, res) {
  try {
    const produto = await productService.buscarProdutoPorId(req.params.id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function atualizarProduto(req, res) {
  try {
    const produto = await productService.atualizarProduto(req.params.id, req.body);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
    return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.', produto });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function excluirProduto(req, res) {
  try {
    const produto = await productService.excluirProduto(req.params.id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
    return res.status(200).json({ mensagem: 'Produto excluído com sucesso.' });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

module.exports = { listarProdutos, criarProduto, buscarProduto, atualizarProduto, excluirProduto };
