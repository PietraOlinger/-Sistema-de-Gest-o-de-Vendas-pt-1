const path = require("node:path");
const { lerJSON, salvarJSON } = require("../repositories/jsonRepository");

const PEDIDOS_FILE = path.join(__dirname, "../../data/pedidos.json");

class Pedido {
  constructor({ id, cliente, cep, endereco, itens, status = "Pendente" }) {
    this.id = id ?? Date.now();
    this.cliente = Pedido.validarCliente(cliente);
    this.cep = Pedido.validarCEP(cep);
    this.endereco = endereco || null;
    this.itens = Pedido.validarItens(itens);
    this.status = Pedido.validarStatus(status);
    this.data = new Date().toISOString();
    this.total = this.calcularTotal();
  }

  static validarCliente(cliente) {
    if (!cliente || String(cliente).trim().length < 2) {
      throw new Error("Informe corretamente o nome do cliente.");
    }
    return String(cliente).trim();
  }

  static validarCEP(cep) {
    const numeros = String(cep || "").replace(/\D/g, "");
    if (!/^\d{8}$/.test(numeros)) {
      throw new Error("O CEP deve conter 8 números.");
    }
    return numeros;
  }

  static validarStatus(status) {
    const statusPermitidos = ["Pendente", "Em preparação", "Enviado", "Concluído", "Cancelado"];
    const valor = status || "Pendente";
    if (!statusPermitidos.includes(valor)) {
      throw new Error("Status do pedido inválido.");
    }
    return valor;
  }

  static validarQuantidade(quantidade) {
    const valor = Number(quantidade);
    if (!Number.isInteger(valor) || valor <= 0) {
      throw new Error("A quantidade deve ser maior que zero.");
    }
    return valor;
  }

  static validarItens(itens) {
    if (!Array.isArray(itens) || itens.length === 0) {
      throw new Error("O pedido precisa possuir pelo menos um produto.");
    }

    return itens.map((item) => ({
      produtoId: item.produtoId,
      nome: item.nome,
      preco: Number(item.preco),
      quantidade: Pedido.validarQuantidade(item.quantidade)
    }));
  }

  calcularTotal() {
    const total = this.itens.reduce((soma, item) => soma + Number(item.preco) * Number(item.quantidade), 0);
    return Number(total.toFixed(2));
  }

  toJSON() {
    return {
      id: this.id,
      cliente: this.cliente,
      cep: this.cep,
      endereco: this.endereco,
      itens: this.itens,
      data: this.data,
      status: this.status,
      total: this.total
    };
  }

  static async listarTodos() {
    return lerJSON(PEDIDOS_FILE);
  }

  static async buscarPorId(id) {
    const pedidos = await this.listarTodos();
    return pedidos.find((pedido) => Number(pedido.id) === Number(id));
  }

  static async criar(dados) {
    const pedidos = await this.listarTodos();
    const novoId = pedidos.length > 0 ? Math.max(...pedidos.map((pedido) => Number(pedido.id))) + 1 : 1;

    const pedido = new Pedido({
      id: novoId,
      cliente: dados.cliente,
      cep: dados.cep,
      endereco: dados.endereco || null,
      itens: dados.itens,
      status: dados.status || "Pendente"
    });

    pedidos.push(pedido.toJSON());
    await salvarJSON(PEDIDOS_FILE, pedidos);
    return pedido.toJSON();
  }

  static async atualizar(id, dados) {
    const pedidos = await this.listarTodos();
    const indice = pedidos.findIndex((pedido) => Number(pedido.id) === Number(id));

    if (indice === -1) {
      return null;
    }

    const pedidoAtual = pedidos[indice];
    const pedidoAtualizado = new Pedido({
      id: Number(id),
      cliente: dados.cliente ?? pedidoAtual.cliente,
      cep: dados.cep ?? pedidoAtual.cep,
      endereco: dados.endereco ?? pedidoAtual.endereco,
      itens: dados.itens ?? pedidoAtual.itens,
      status: dados.status ?? pedidoAtual.status
    });

    pedidos[indice] = pedidoAtualizado.toJSON();
    await salvarJSON(PEDIDOS_FILE, pedidos);
    return pedidos[indice];
  }

  static async excluir(id) {
    const pedidos = await this.listarTodos();
    const indice = pedidos.findIndex((pedido) => Number(pedido.id) === Number(id));

    if (indice === -1) {
      return false;
    }

    pedidos.splice(indice, 1);
    await salvarJSON(PEDIDOS_FILE, pedidos);
    return true;
  }
}

module.exports = Pedido;