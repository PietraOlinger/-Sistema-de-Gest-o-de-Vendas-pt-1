const readline = require("node:readline/promises");

const {
  stdin: input,
  stdout: output
} = require("node:process");

const path = require("node:path");

const Produto = require("./src/models/Produto");
const Perfume = require("./src/models/Perfume");
const Pedido = require("./src/models/Pedido");

const {
  lerJSON,
  salvarJSON
} = require("./src/repositories/jsonRepository");

const { buscarCEP } = require("./src/services/cepService");

const PRODUTOS_FILE = path.join(
  __dirname,
  "data",
  "produtos.json"
);

const PEDIDOS_FILE = path.join(
  __dirname,
  "data",
  "pedidos.json"
);

const rl = readline.createInterface({
  input,
  output
});

async function cadastrarProduto() {
  console.log("\n--- CADASTRAR PRODUTO ---");

  const nome = await rl.question("Nome: ");

  const preco = await rl.question("Preço: R$ ");

  const categoria = await rl.question("Categoria: ");

  const perfume = await rl.question(
    "É um perfume? Digite s ou n: "
  );

  let produto;

  if (perfume.toLowerCase() === "s") {
    const concentracao = await rl.question(
      "Concentração: "
    );

    const imagem = await rl.question(
      "URL da imagem (opcional): "
    );

    produto = new Perfume(
      null,
      nome,
      preco,
      categoria || "Perfume feminino",
      imagem,
      concentracao || "Eau de Parfum"
    );
  } else {
    produto = new Produto(
      null,
      nome,
      preco,
      categoria || "Produto"
    );
  }

  const produtos = await lerJSON(PRODUTOS_FILE);

  produtos.push(produto.toJSON());

  await salvarJSON(PRODUTOS_FILE, produtos);

  console.log("\nProduto cadastrado com sucesso!");
}

async function listarProdutos() {
  const produtos = await lerJSON(PRODUTOS_FILE);

  console.log("\n--- PRODUTOS CADASTRADOS ---");

  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado.");
    return;
  }

  produtos.forEach((produto, indice) => {
    console.log(
      `${indice + 1} - ${produto.nome} | R$ ${Number(
        produto.preco
      ).toFixed(2)}`
    );
  });
}

async function calcularMedia() {
  const produtos = await lerJSON(PRODUTOS_FILE);

  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado.");
    return;
  }

  const soma = produtos.reduce((total, produto) => {
    return total + Number(produto.preco);
  }, 0);

  const media = soma / produtos.length;

  console.log(
    `\nMédia dos preços: R$ ${media.toFixed(2)}`
  );
}

async function salvarPedido() {
  console.log("\n--- NOVO PEDIDO ---");

  const produtos = await lerJSON(PRODUTOS_FILE);

  if (produtos.length === 0) {
    console.log("Cadastre um produto primeiro.");
    return;
  }

  produtos.forEach((produto, indice) => {
    console.log(
      `${indice + 1} - ${produto.nome} - R$ ${Number(
        produto.preco
      ).toFixed(2)}`
    );
  });

  const cliente = await rl.question(
    "\nNome do cliente: "
  );

  const cep = await rl.question("CEP: ");

  const escolha = await rl.question(
    "Número do produto: "
  );

  const quantidade = await rl.question(
    "Quantidade: "
  );

  const produto = produtos[Number(escolha) - 1];

  if (!produto) {
    throw new Error("Produto inválido.");
  }

  console.log("\nConsultando CEP...");

  const endereco = await buscarCEP(cep);

  const pedido = new Pedido({
    cliente,
    cep,
    endereco,
    itens: [
      {
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: Number(quantidade)
      }
    ]
  });

  const pedidos = await lerJSON(PEDIDOS_FILE);

  pedidos.push(pedido.toJSON());

  await salvarJSON(PEDIDOS_FILE, pedidos);

  console.log("\nPedido salvo com sucesso!");

  console.log(
    `Total: R$ ${pedido.total.toFixed(2)}`
  );
}

async function menu() {
  let opcao = "";

  while (opcao !== "0") {
    console.log(`
===============================
 SISTEMA DE GESTÃO DE VENDAS
===============================

1 - Cadastrar produto
2 - Listar produtos
3 - Calcular média de preços
4 - Salvar pedido
0 - Sair
`);

    opcao = await rl.question("Escolha uma opção: ");

    try {
      switch (opcao) {
        case "1":
          await cadastrarProduto();
          break;

        case "2":
          await listarProdutos();
          break;

        case "3":
          await calcularMedia();
          break;

        case "4":
          await salvarPedido();
          break;

        case "0":
          console.log("Sistema encerrado.");
          break;

        default:
          console.log("Opção inválida.");
      }
    } catch (erro) {
      console.log("Erro:", erro.message);
    }
  }

  rl.close();
}

menu();