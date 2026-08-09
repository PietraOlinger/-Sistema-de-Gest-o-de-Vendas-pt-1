const Produto = require("./Produto");

class Perfume extends Produto {
  constructor(
    id,
    nome,
    preco,
    categoria = "Perfume feminino",
    imagem = "",
    concentracao = "Eau de Parfum"
  ) {
    super(id, nome, preco, categoria);

    this.imagem = imagem;

    this.concentracao = concentracao;
  }

  getDescricao() {
    return `${this.nome} - ${this.concentracao}`;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      tipo: "Perfume",
      imagem: this.imagem,
      concentracao: this.concentracao,
      descricao: this.getDescricao()
    };
  }
}

module.exports = Perfume;