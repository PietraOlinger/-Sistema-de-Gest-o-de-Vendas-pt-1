const Product = require('../models/Product');

async function listarProdutos(filtros = {}, pagina = 1, limite = 10) {
  const paginaAtual = Number(pagina) || 1;
  const limiteAtual = Number(limite) || 10;

  const query = { ativo: true, ...filtros };
  const total = await Product.countDocuments(query);
  const produtos = await Product.find(query)
    .populate('categoria')
    .skip((paginaAtual - 1) * limiteAtual)
    .limit(limiteAtual);

  return {
    dados: produtos,
    pagina: paginaAtual,
    limite: limiteAtual,
    total,
    totalPaginas: Math.ceil(total / limiteAtual)
  };
}

async function criarProduto(dados) {
  return Product.create(dados);
}

async function buscarProdutoPorId(id) {
  return Product.findById(id).populate('categoria');
}

async function atualizarProduto(id, dados) {
  return Product.findByIdAndUpdate(id, dados, { new: true, runValidators: true });
}

async function excluirProduto(id) {
  return Product.findByIdAndDelete(id);
}

module.exports = {
  listarProdutos,
  criarProduto,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
};
