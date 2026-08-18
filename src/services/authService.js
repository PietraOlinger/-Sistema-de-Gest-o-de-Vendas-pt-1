const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { gerarToken } = require('../utils/jwt');

async function registrarUsuario(dados) {
  const usuarioExistente = await User.findOne({ email: dados.email });
  if (usuarioExistente) {
    throw new Error('E-mail já cadastrado.');
  }

  const usuario = await User.create({
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
    role: dados.role || 'user'
  });

  const token = gerarToken({ id: usuario._id, email: usuario.email, role: usuario.role });
  return {
    token,
    usuario: {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    }
  };
}

async function loginUsuario(email, senha) {
  const usuario = await User.findOne({ email });
  if (!usuario) {
    throw new Error('Credenciais inválidas.');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error('Credenciais inválidas.');
  }

  const token = gerarToken({ id: usuario._id, email: usuario.email, role: usuario.role });
  return {
    token,
    usuario: {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    }
  };
}

module.exports = { registrarUsuario, loginUsuario };
