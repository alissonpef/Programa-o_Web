const jwt = require("jsonwebtoken");

// Chave secreta para geração de tokens JWT
const SECRET = "chav3-s3cr3ta";

// Middleware de autenticação
function authenticateToken(req, res, next) {
  // Obtém o token do header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Se não houver token, retorna não autorizado
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  // Verifica se o token é válido
  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      // Retorna não autorizado se o token for inválido ou expirado
      return res.status(403).json({ message: "Token inválido ou expirado" });
    }

    // Armazena as informações do usuário no objeto 'req' para uso posterior
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
