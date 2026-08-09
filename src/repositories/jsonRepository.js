const fs = require("node:fs/promises");
const path = require("node:path");

async function garantirArquivo(
  caminho,
  valorInicial = []
) {
  try {
    await fs.access(caminho);
  } catch {
    await fs.mkdir(
      path.dirname(caminho),
      {
        recursive: true
      }
    );

    await fs.writeFile(
      caminho,
      JSON.stringify(valorInicial, null, 2),
      "utf8"
    );
  }
}

async function lerJSON(caminho) {
  await garantirArquivo(caminho);

  const conteudo = await fs.readFile(
    caminho,
    "utf8"
  );

  if (!conteudo.trim()) {
    return [];
  }

  return JSON.parse(conteudo);
}

async function salvarJSON(caminho, dados) {
  await fs.writeFile(
    caminho,
    JSON.stringify(dados, null, 2),
    "utf8"
  );
}

module.exports = {
  garantirArquivo,
  lerJSON,
  salvarJSON
};