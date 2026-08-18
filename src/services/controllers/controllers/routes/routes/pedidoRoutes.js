const express = require("express");

const router = express.Router();

const pedidoController = require("../controllers/pedidoController");

// CREATE
router.post("/", pedidoController.criarPedido);

// READ
router.get("/", pedidoController.listarPedidos);

router.get("/:id", pedidoController.buscarPedido);

// UPDATE
router.put("/:id", pedidoController.atualizarPedido);

// DELETE
router.delete("/:id", pedidoController.excluirPedido);

module.exports = router;