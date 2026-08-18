const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const produtoRoutesPath = './src/routes/produtoRoutes.js';
const pedidoRoutesPath = './src/routes/pedidoRoutes.js';

test('rotas da API devem existir para produtos e pedidos', () => {
  assert.equal(fs.existsSync(produtoRoutesPath), true, 'rota de produtos não encontrada');
  assert.equal(fs.existsSync(pedidoRoutesPath), true, 'rota de pedidos não encontrada');
});
