const path = require("node:path");
const { lerJSON, salvarJSON } = require("../repositories/jsonRepository");

const PRODUTOS_FILE = path.join(__dirname, "../../data/produtos.json");

class Produto {
  constructor(id, nome, preco, categoria = "Produto", estoque = 0, imagem = "") {
    this.id = id ?? Date.now();
    this.nome = Produto.validarNome(nome);
    this.preco = Produto.validarPreco(preco);
    this.categoria = categoria || "Produto";
    this.estoque = Produto.validarEstoque(estoque);
    this.imagem = imagem || "";
  }

  static validarNome(nome) {
    if (!nome || String(nome).trim().length < 2) {
      throw new Error("O nome precisa ter pelo menos 2 caracteres.");
    }
    return String(nome).trim();
  }

  static validarPreco(preco) {
    const valor = Number(preco);
    if (!Number.isFinite(valor) || valor <= 0) {
      throw new Error("O preço deve ser maior que zero.");
    }
    return valor;
  }

  static validarEstoque(estoque) {
    const valor = Number(estoque ?? 0);
    if (!Number.isFinite(valor) || valor < 0) {
      throw new Error("O estoque não pode ser negativo.");
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
      estoque: this.estoque,
      imagem: this.imagem,
      tipo: "Produto",
      descricao: this.getDescricao()
    };
  }

  static async listarTodos() {
    return lerJSON(PRODUTOS_FILE);
  }

  static async buscarPorId(id) {
    const produtos = await this.listarTodos();
    return produtos.find((produto) => Number(produto.id) === Number(id));
  }

  static async criar(dados) {
    const produtos = await this.listarTodos();
    const novoId = produtos.length > 0 ? Math.max(...produtos.map((produto) => Number(produto.id))) + 1 : 1;
    const produto = new Produto(
      novoId,
      dados.nome,
      dados.preco,
      dados.categoria,
      dados.estoque ?? 0,
      dados.imagem || ""
    );

    produtos.push(produto.toJSON());
    await salvarJSON(PRODUTOS_FILE, produtos);
    return produto.toJSON();
  }

  static async atualizar(id, dados) {
    const produtos = await this.listarTodos();
    const indice = produtos.findIndex((produto) => Number(produto.id) === Number(id));

    if (indice === -1) {
      return null;
    }

    const produtoAtual = produtos[indice];
    const produtoAtualizado = new Produto(
      Number(id),
      dados.nome ?? produtoAtual.nome,
      dados.preco ?? produtoAtual.preco,
      dados.categoria ?? produtoAtual.categoria,
      dados.estoque ?? produtoAtual.estoque,
      dados.imagem ?? produtoAtual.imagem
    );

    produtos[indice] = produtoAtualizado.toJSON();
    await salvarJSON(PRODUTOS_FILE, produtos);
    return produtos[indice];
  }

  static async excluir(id) {
    const produtos = await this.listarTodos();
    const indice = produtos.findIndex((produto) => Number(produto.id) === Number(id));

    if (indice === -1) {
      return false;
    }

    produtos.splice(indice, 1);
    await salvarJSON(PRODUTOS_FILE, produtos);
    return true;
  }
}

module.exports = Produto;
