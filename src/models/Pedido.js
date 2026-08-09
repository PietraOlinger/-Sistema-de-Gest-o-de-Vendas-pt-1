class Pedido {
  constructor({
    id,
    cliente,
    cep,
    endereco,
    itens
  }) {
    this.id = id || Date.now();

    this.cliente = Pedido.validarCliente(cliente);

    this.cep = Pedido.validarCEP(cep);

    this.endereco = endereco;

    this.itens = Pedido.validarItens(itens);

    this.data = new Date().toISOString();

    this.total = this.calcularTotal();
  }

  static validarCliente(cliente) {
    if (!cliente || cliente.trim().length < 2) {
      throw new Error(
        "Informe corretamente o nome do cliente."
      );
    }

    return cliente.trim();
  }

  static validarCEP(cep) {
    const numeros = String(cep).replace(/\D/g, "");

    if (!/^\d{8}$/.test(numeros)) {
      throw new Error(
        "O CEP deve conter 8 números."
      );
    }

    return numeros;
  }

  static validarQuantidade(quantidade) {
    const valor = Number(quantidade);

    if (!Number.isInteger(valor) || valor <= 0) {
      throw new Error(
        "A quantidade deve ser maior que zero."
      );
    }

    return valor;
  }

  static validarItens(itens) {
    if (!Array.isArray(itens) || itens.length === 0) {
      throw new Error(
        "O pedido precisa possuir pelo menos um produto."
      );
    }

    return itens.map(item => {
      return {
        produtoId: item.produtoId,
        nome: item.nome,
        preco: Number(item.preco),
        quantidade: Pedido.validarQuantidade(
          item.quantidade
        )
      };
    });
  }

  calcularTotal() {
    const total = this.itens.reduce(
      (soma, item) => {
        return soma + item.preco * item.quantidade;
      },
      0
    );

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
      total: this.total
    };
  }
}

module.exports = Pedido;