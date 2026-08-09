const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const Produto = require("./src/models/Produto");
const Perfume = require("./src/models/Perfume");
const Pedido = require("./src/models/Pedido");

const {
  lerJSON,
  salvarJSON,
  garantirArquivo
} = require("./src/repositories/jsonRepository");

const { buscarCEP } = require("./src/services/cepService");

const PORT = 3000;

const PUBLIC_DIR = path.join(__dirname, "public");
const PRODUTOS_FILE = path.join(__dirname, "data", "produtos.json");
const PEDIDOS_FILE = path.join(__dirname, "data", "pedidos.json");

function enviarJSON(res, status, dados) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8"
  });

  res.end(JSON.stringify(dados));
}

function lerBody(req) {
  return new Promise((resolve, reject) => {
    let corpo = "";

    req.on("data", chunk => {
      corpo += chunk;
    });

    req.on("end", () => {
      try {
        resolve(corpo ? JSON.parse(corpo) : {});
      } catch {
        reject(new Error("JSON inválido."));
      }
    });

    req.on("error", reject);
  });
}

async function servirArquivo(req, res) {
  const rota = req.url === "/" ? "/index.html" : req.url.split("?")[0];

  const caminho = path.join(PUBLIC_DIR, rota);

  try {
    const conteudo = await fs.readFile(caminho);

    const extensao = path.extname(caminho);

    const tipos = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8"
    };

    res.writeHead(200, {
      "Content-Type": tipos[extensao] || "text/plain"
    });

    res.end(conteudo);
  } catch {
    res.writeHead(404);
    res.end("Arquivo não encontrado.");
  }
}

async function rotasAPI(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/produtos") {
    const produtos = await lerJSON(PRODUTOS_FILE);

    return enviarJSON(res, 200, produtos);
  }

  if (
    req.method === "GET" &&
    url.pathname === "/api/produtos/media"
  ) {
    const produtos = await lerJSON(PRODUTOS_FILE);

    let media = 0;

    if (produtos.length > 0) {
      const soma = produtos.reduce((total, produto) => {
        return total + Number(produto.preco);
      }, 0);

      media = soma / produtos.length;
    }

    return enviarJSON(res, 200, {
      quantidade: produtos.length,
      media: Number(media.toFixed(2))
    });
  }

  if (req.method === "POST" && url.pathname === "/api/produtos") {
    const body = await lerBody(req);

    let produto;

    if (body.tipo === "perfume") {
      produto = new Perfume(
        null,
        body.nome,
        body.preco,
        body.categoria,
        body.imagem,
        body.concentracao
      );
    } else {
      produto = new Produto(
        null,
        body.nome,
        body.preco,
        body.categoria
      );
    }

    const produtos = await lerJSON(PRODUTOS_FILE);

    produtos.push(produto.toJSON());

    await salvarJSON(PRODUTOS_FILE, produtos);

    return enviarJSON(res, 201, produto.toJSON());
  }

  if (
    req.method === "GET" &&
    url.pathname.startsWith("/api/cep/")
  ) {
    const cep = url.pathname.split("/").pop();

    const endereco = await buscarCEP(cep);

    return enviarJSON(res, 200, endereco);
  }

  if (req.method === "GET" && url.pathname === "/api/pedidos") {
    const pedidos = await lerJSON(PEDIDOS_FILE);

    return enviarJSON(res, 200, pedidos);
  }

  if (req.method === "POST" && url.pathname === "/api/pedidos") {
    const body = await lerBody(req);

    const produtos = await lerJSON(PRODUTOS_FILE);

    const itens = body.itens.map(item => {
      const produto = produtos.find(
        produto => String(produto.id) === String(item.produtoId)
      );

      if (!produto) {
        throw new Error("Produto não encontrado.");
      }

      return {
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: item.quantidade
      };
    });

    const endereco = await buscarCEP(body.cep);

    const pedido = new Pedido({
      cliente: body.cliente,
      cep: body.cep,
      endereco,
      itens
    });

    const pedidos = await lerJSON(PEDIDOS_FILE);

    pedidos.push(pedido.toJSON());

    await salvarJSON(PEDIDOS_FILE, pedidos);

    return enviarJSON(res, 201, pedido.toJSON());
  }

  enviarJSON(res, 404, {
    erro: "Rota não encontrada."
  });
}

async function iniciarServidor() {
  await garantirArquivo(PRODUTOS_FILE);
  await garantirArquivo(PEDIDOS_FILE);

  const servidor = http.createServer(async (req, res) => {
    try {
      if (req.url.startsWith("/api/")) {
        await rotasAPI(req, res);
      } else {
        await servirArquivo(req, res);
      }
    } catch (erro) {
      enviarJSON(res, 400, {
        erro: erro.message
      });
    }
  });

  servidor.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

iniciarServidor();