class Produto {
  constructor(id, nome, preco, categoria = "Produto") {
    this.id = id || Date.now();

    this.nome = Produto.validarNome(nome);

    this.preco = Produto.validarPreco(preco);

    this.categoria = categoria;
  }

  static validarNome(nome) {
    if (!nome || nome.trim().length < 2) {
      throw new Error(
        "O nome precisa ter pelo menos 2 caracteres."
      );
    }

    return nome.trim();
  }

  static validarPreco(preco) {
    const valor = Number(preco);

    if (!Number.isFinite(valor) || valor <= 0) {
      throw new Error(
        "O preço deve ser maior que zero."
      );
    }

    return valor;
  }

  getDescricao() {
    return `${this.nome} - ${this.categoria}`;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      categoria: this.categoria,
      tipo: "Produto",
      descricao: this.getDescricao()
    };
  }
}

module.exports = Produto;
