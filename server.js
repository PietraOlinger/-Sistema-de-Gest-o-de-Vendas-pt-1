const express = require("express");
const path = require("node:path");
const productRoutes = require("./src/routes/produtoRoutes");
const orderRoutes = require("./src/routes/pedidoRoutes");
const { garantirArquivo } = require("./src/repositories/jsonRepository");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/produtos", productRoutes);
app.use("/api/pedidos", orderRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (req, res) => {
  res.json({
    mensagem: "API do Sistema de Gestão de Vendas funcionando!",
    endpoints: {
      produtos: "/api/produtos",
      pedidos: "/api/pedidos"
    }
  });
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(__dirname, "public", "index.html"));
});

(async () => {
  await garantirArquivo(path.join(__dirname, "data", "produtos.json"), []);
  await garantirArquivo(path.join(__dirname, "data", "pedidos.json"), []);

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("API Produtos: http://localhost:3000/api/produtos");
    console.log("API Pedidos: http://localhost:3000/api/pedidos");
  });
})();

// Tratamento de rota inexistente da API
app.use("/api", (req, res) => {
  res.status(404).json({
    mensagem: "Rota da API não encontrada."
  });
});

