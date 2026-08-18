const Pedido = require("../models/Pedido");

exports.listarPedidos = (req, res) => {
  try {
    const pedidos = Pedido.listarTodos();

    res.status(200).json(pedidos);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar pedidos."
    });
  }
};

exports.buscarPedido = (req, res) => {
  try {
    const pedido = Pedido.buscarPorId(req.params.id);

    if (!pedido) {
      return res.status(404).json({
        mensagem: "Pedido não encontrado."
      });
    }

    res.status(200).json(pedido);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar pedido."
    });
  }
};

exports.criarPedido = (req, res) => {
  try {
    const {
      cliente,
      produto,
      quantidade,
      valorUnitario,
      status
    } = req.body;

    if (
      !cliente ||
      !produto ||
      quantidade === undefined ||
      valorUnitario === undefined
    ) {
      return res.status(400).json({
        mensagem:
          "Cliente, produto, quantidade e valor unitário são obrigatórios."
      });
    }

    if (Number(quantidade) <= 0) {
      return res.status(400).json({
        mensagem: "A quantidade deve ser maior que zero."
      });
    }

    if (Number(valorUnitario) < 0) {
      return res.status(400).json({
        mensagem: "O valor não pode ser negativo."
      });
    }

    const novoPedido = Pedido.criar({
      cliente,
      produto,
      quantidade,
      valorUnitario,
      status
    });

    res.status(201).json({
      mensagem: "Pedido cadastrado com sucesso!",
      pedido: novoPedido
    });
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar pedido."
    });
  }
};

exports.atualizarPedido = (req, res) => {
  try {
    const pedido = Pedido.atualizar(
      req.params.id,
      req.body
    );

    if (!pedido) {
      return res.status(404).json({
        mensagem: "Pedido não encontrado."
      });
    }

    res.status(200).json({
      mensagem: "Pedido atualizado com sucesso!",
      pedido
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar pedido."
    });
  }
};

exports.excluirPedido = (req, res) => {
  try {
    const excluido = Pedido.excluir(req.params.id);

    if (!excluido) {
      return res.status(404).json({
        mensagem: "Pedido não encontrado."
      });
    }

    res.status(200).json({
      mensagem: "Pedido excluído com sucesso!"
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao excluir pedido."
    });
  }
};