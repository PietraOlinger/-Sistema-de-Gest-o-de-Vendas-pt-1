const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");
const { buscarCEP } = require("../services/cepService");

async function listarPedidos(req, res) {
  try {
    const pedidos = await Pedido.listarTodos();
    res.status(200).json(pedidos);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao listar pedidos.", erro: erro.message });
  }
}

async function buscarPedido(req, res) {
  try {
    const pedido = await Pedido.buscarPorId(req.params.id);

    if (!pedido) {
      return res.status(404).json({ mensagem: "Pedido não encontrado." });
    }

    return res.status(200).json(pedido);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro ao buscar pedido.", erro: erro.message });
  }
}

async function criarPedido(req, res) {
  try {
    const { cliente, produtoId, quantidade, cep, status } = req.body;

    if (!cliente || !produtoId || !quantidade || !cep) {
      return res.status(400).json({ mensagem: "Cliente, produto, quantidade e CEP são obrigatórios." });
    }

    const produtos = await Produto.listarTodos();
    const produtoSelecionado = produtos.find((produto) => Number(produto.id) === Number(produtoId));

    if (!produtoSelecionado) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    const endereco = await buscarCEP(cep);
    const pedido = await Pedido.criar({
      cliente,
      cep,
      endereco,
      itens: [{
        produtoId: produtoSelecionado.id,
        nome: produtoSelecionado.nome,
        preco: produtoSelecionado.preco,
        quantidade: Number(quantidade)
      }],
      status
    });

    return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso!", pedido });
  } catch (erro) {
    return res.status(400).json({ mensagem: erro.message || "Erro ao cadastrar pedido." });
  }
}

async function atualizarPedido(req, res) {
  try {
    const pedido = await Pedido.atualizar(req.params.id, req.body);

    if (!pedido) {
      return res.status(404).json({ mensagem: "Pedido não encontrado." });
    }

    return res.status(200).json({ mensagem: "Pedido atualizado com sucesso!", pedido });
  } catch (erro) {
    return res.status(400).json({ mensagem: erro.message || "Erro ao atualizar pedido." });
  }
}

async function excluirPedido(req, res) {
  try {
    const excluido = await Pedido.excluir(req.params.id);

    if (!excluido) {
      return res.status(404).json({ mensagem: "Pedido não encontrado." });
    }

    return res.status(200).json({ mensagem: "Pedido excluído com sucesso!" });
  } catch (erro) {
    return res.status(400).json({ mensagem: erro.message || "Erro ao excluir pedido." });
  }
}

module.exports = {
  listarPedidos,
  buscarPedido,
  criarPedido,
  atualizarPedido,
  excluirPedido
};
