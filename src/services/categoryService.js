const Category = require('../models/Category');

async function listarCategorias() {
  return Category.find();
}

async function criarCategoria(dados) {
  return Category.create(dados);
}

async function atualizarCategoria(id, dados) {
  return Category.findByIdAndUpdate(id, dados, { new: true, runValidators: true });
}

async function excluirCategoria(id) {
  return Category.findByIdAndDelete(id);
}

module.exports = { listarCategorias, criarCategoria, atualizarCategoria, excluirCategoria };
