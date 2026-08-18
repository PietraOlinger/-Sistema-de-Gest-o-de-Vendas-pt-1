const Produto = require("../models/Produto");

async function listarProdutos(req, res) {
  try {
    const produtos = await Produto.listarTodos();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao listar produtos.", erro: erro.message });
  }
}

async function buscarProduto(req, res) {
  try {
    const produto = await Produto.buscarPorId(req.params.id);

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    return res.status(200).json(produto);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro ao buscar produto.", erro: erro.message });
  }
}

async function criarProduto(req, res) {
  try {
    const { nome, preco, categoria, estoque, imagem } = req.body;

    if (!nome || preco === undefined || !categoria || estoque === undefined) {
      return res.status(400).json({ mensagem: "Nome, preço, categoria e estoque são obrigatórios." });
    }

    const novoProduto = await Produto.criar({ nome, preco, categoria, estoque, imagem });

    return res.status(201).json({ mensagem: "Produto cadastrado com sucesso!", produto: novoProduto });
  } catch (erro) {
    return res.status(400).json({ mensagem: erro.message || "Erro ao cadastrar produto." });
  }
}

async function atualizarProduto(req, res) {
  try {
    const produto = await Produto.atualizar(req.params.id, req.body);

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    return res.status(200).json({ mensagem: "Produto atualizado com sucesso!", produto });
  } catch (erro) {
    return res.status(400).json({ mensagem: erro.message || "Erro ao atualizar produto." });
  }
}

async function excluirProduto(req, res) {
  try {
    const excluido = await Produto.excluir(req.params.id);

    if (!excluido) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    return res.status(200).json({ mensagem: "Produto excluído com sucesso!" });
  } catch (erro) {
    return res.status(400).json({ mensagem: erro.message || "Erro ao excluir produto." });
  }
}

module.exports = {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  excluirProduto
};
