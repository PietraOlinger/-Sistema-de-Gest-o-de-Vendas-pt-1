const mongoose = require('mongoose');

async function connectDatabase(uri) {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB conectado com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error.message);
    console.warn('Continuando em modo local sem MongoDB.');
    return false;
  }
}

module.exports = { connectDatabase };
