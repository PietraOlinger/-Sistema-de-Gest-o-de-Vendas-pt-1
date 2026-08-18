const Produto = require("../models/Produto");

exports.listarProdutos = (req, res) => {
  try {
    const produtos = Produto.listarTodos();

    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar produtos."
    });
  }
};

exports.buscarProduto = (req, res) => {
  try {
    const produto = Produto.buscarPorId(req.params.id);

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado."
      });
    }

    res.status(200).json(produto);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar produto."
    });
  }
};

exports.criarProduto = (req, res) => {
  try {
    const {
      nome,
      preco,
      categoria,
      estoque,
      imagem
    } = req.body;

    if (
      !nome ||
      preco === undefined ||
      !categoria ||
      estoque === undefined
    ) {
      return res.status(400).json({
        mensagem:
          "Nome, preço, categoria e estoque são obrigatórios."
      });
    }

    if (Number(preco) < 0) {
      return res.status(400).json({
        mensagem: "O preço não pode ser negativo."
      });
    }

    if (Number(estoque) < 0) {
      return res.status(400).json({
        mensagem: "O estoque não pode ser negativo."
      });
    }

    const novoProduto = Produto.criar({
      nome,
      preco,
      categoria,
      estoque,
      imagem
    });

    res.status(201).json({
      mensagem: "Produto cadastrado com sucesso!",
      produto: novoProduto
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar produto."
    });
  }
};

exports.atualizarProduto = (req, res) => {
  try {
    const produto = Produto.atualizar(
      req.params.id,
      req.body
    );

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado."
      });
    }

    res.status(200).json({
      mensagem: "Produto atualizado com sucesso!",
      produto
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar produto."
    });
  }
};

exports.excluirProduto = (req, res) => {
  try {
    const excluido = Produto.excluir(req.params.id);

    if (!excluido) {
      return res.status(404).json({
        mensagem: "Produto não encontrado."
      });
    }

    res.status(200).json({
      mensagem: "Produto excluído com sucesso!"
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao excluir produto."
    });
  }
};