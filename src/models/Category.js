const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  descricao: String
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
