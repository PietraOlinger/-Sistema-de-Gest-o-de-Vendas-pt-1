const { registrarUsuario, loginUsuario } = require('../services/authService');

async function registrar(req, res) {
  try {
    const dados = await registrarUsuario(req.body);
    return res.status(201).json(dados);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const dados = await loginUsuario(email, senha);
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

module.exports = { registrar, login };
