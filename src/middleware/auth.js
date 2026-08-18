const { verificarToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Token ausente ou inválido.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = verificarToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ mensagem: 'Acesso negado.' });
    }
    next();
  };
}

module.exports = { authMiddleware, authorizeRoles };
