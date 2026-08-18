const categoryService = require('../services/categoryService');

async function listarCategorias(req, res) {
  try {
    const categorias = await categoryService.listarCategorias();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function criarCategoria(req, res) {
  try {
    const categoria = await categoryService.criarCategoria(req.body);
    return res.status(201).json({ mensagem: 'Categoria criada com sucesso.', categoria });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function atualizarCategoria(req, res) {
  try {
    const categoria = await categoryService.atualizarCategoria(req.params.id, req.body);
    if (!categoria) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }
    return res.status(200).json({ mensagem: 'Categoria atualizada com sucesso.', categoria });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function excluirCategoria(req, res) {
  try {
    const categoria = await categoryService.excluirCategoria(req.params.id);
    if (!categoria) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }
    return res.status(200).json({ mensagem: 'Categoria excluída com sucesso.' });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

module.exports = { listarCategorias, criarCategoria, atualizarCategoria, excluirCategoria };
