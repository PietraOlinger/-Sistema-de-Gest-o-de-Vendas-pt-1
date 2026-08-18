require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('node:path');
const { connectDatabase } = require('./src/config/database');
const swaggerDocs = require('./src/docs/swagger');

const productRoutes = require('./src/routes/produtoRoutes');
const orderRoutes = require('./src/routes/pedidoRoutes');
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productMongoRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderMongoRoutes = require('./src/routes/orderRoutes');
const { garantirArquivo } = require('./src/repositories/jsonRepository');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/produtos', productRoutes);
app.use('/api/pedidos', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productMongoRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderMongoRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
  res.json({
    mensagem: 'API do Sistema de Gestão de Vendas funcionando!',
    endpoints: {
      produtos: '/api/produtos',
      pedidos: '/api/pedidos',
      auth: '/api/auth',
      docs: '/docs'
    }
  });
});

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', (req, res) => {
  res.status(404).json({ mensagem: 'Rota da API não encontrada.' });
});

(async () => {
  await garantirArquivo(path.join(__dirname, 'data', 'produtos.json'), []);
  await garantirArquivo(path.join(__dirname, 'data', 'pedidos.json'), []);

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/perfume-marketplace';
    await connectDatabase(mongoUri);
  } catch (error) {
    console.warn('MongoDB indisponível. Continuando em modo local JSON.');
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação: http://localhost:${PORT}/docs`);
  });
})();

