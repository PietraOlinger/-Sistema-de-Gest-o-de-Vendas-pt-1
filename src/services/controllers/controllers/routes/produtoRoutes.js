const express = require("express");

const router = express.Router();

const produtoController = require("../controllers/produtoController");

// CREATE
router.post("/", produtoController.criarProduto);

// READ
router.get("/", produtoController.listarProdutos);

router.get("/:id", produtoController.buscarProduto);

// UPDATE
router.put("/:id", produtoController.atualizarProduto);

// DELETE
router.delete("/:id", produtoController.excluirProduto);

module.exports = router;