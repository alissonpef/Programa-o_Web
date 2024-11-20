require("./config/db");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./config/routes");
const setupWebSocket = require("./config/websocket");

// Inicializa a aplicação Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuramos as rotas da aplicação
app.use("/", routes);

// Inicia o servidor HTTP na porta 2000
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Configura o servidor WebSocket
const PORT_WS = 4000;
setupWebSocket(PORT_WS);
