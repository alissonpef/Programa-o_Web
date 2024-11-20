const express = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { authenticateToken } = require("./middlewares");
const connections = require("./connections");

const router = express.Router();

// Chave secreta para geração de tokens JWT
const SECRET_KEY = "chav3-s3cr3ta";

// Rota de login
router.post("/login", async (req, res) => {
  try {
    const { idufsc, senha } = req.body;

    // Busca o usuário no banco de dados
    const usuario = await Usuario.findOne({ idufsc });

    // Verifica se o usuário existe e se a senha está correta
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Gera um token JWT com o idufsc do usuário
    const token = jwt.sign({ idufsc }, SECRET_KEY, { expiresIn: "1h" });

    // Retorna o token para o cliente
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Rota para obter a lista de salas que o usuário pode acessar
router.get("/lista", authenticateToken, async (req, res) => {
  try {
    // Busca o usuário no banco de dados
    const usuario = await Usuario.findOne({ idufsc: req.user.idufsc });

    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Retorna a lista de salas
    res.json({ salas: usuario.salas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Rota para abrir uma porta
router.post("/abre", authenticateToken, async (req, res) => {
  try {
    const { sala } = req.body;
    const idufsc = req.user.idufsc;

    // Busca o usuário no banco de dados
    const usuario = await Usuario.findOne({ idufsc });

    // Verifica se o usuário tem permissão para abrir a porta
    if (!usuario || !usuario.salas.includes(sala)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    // Verifica se a fechadura está conectada
    const connection = connections[sala];
    if (connection) {
      // Envia o comando de abrir a porta via WebSocket
      connection.send(JSON.stringify({ action: "abre" }));
      res.json({ message: "Comando enviado" });
    } else {
      res.status(404).json({ message: "Fechadura não encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;

// Exemplo de uso das rotas
// curl -X POST http://localhost:2000/login -H "Content-Type: application/json" -d '{"idufsc": "Clark_Kent", "senha": "KWpoiuwex"}'
// curl -X GET http://localhost:2000/lista -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVmc2MiOiJDbGFya19LZW50IiwiaWF0IjoxNzI5Mzc2NDE1LCJleHAiOjE3MjkzODAwMTV9.mv0TssnFKuWU7jMhhKFxQHLQfJKBIKkdJ4-IOgheC44" -H "Content-Type: application/json"
// curl -X POST http://localhost:2000/abre -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVmc2MiOiJDbGFya19LZW50IiwiaWF0IjoxNzI5Mzc2NDE1LCJleHAiOjE3MjkzODAwMTV9.mv0TssnFKuWU7jMhhKFxQHLQfJKBIKkdJ4-IOgheC44" -H "Content-Type: application/json" -d '{"sala": "C-120"}'
