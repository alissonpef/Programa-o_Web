const WebSocket = require("ws");
const connections = require("./connections");
const Sala = require("../models/Sala");

function setupWebsocket(PORT_WS) {
  // Cria o servidor de WebSocket na porta especificada
  const wss = new WebSocket.Server({ port: PORT_WS });

  // Evento disparado quando um cliente se conecta
  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      try {
        const dados = JSON.parse(message);

        // Verifica o tipo de mensagem recebida
        if (dados.tipo == "loginFechadura") {
          const { id, passwd } = dados;

          // Busca a sala no banco de dados
          const sala = await Sala.findOne({ id });

          // Verifica as credenciais da fechadura
          if (!sala || sala.passwd != passwd) {
            ws.send(JSON.stringify({ mensagem: "Credenciais inválidas" }));
            console.log(`Tentativa de conexão inválida para fechadura ${id}`);
            return ws.close();
          }

          // Armazena o identificador da fechadura
          ws.id = id;

          // Armazena a conexão da fechadura no objeto 'connections'
          connections[id] = ws;
          console.log(`Fechadura ${id} conectada`);
        }
      } catch (error) {
        console.error("Erro ao buscar a sala no banco de dados", error);
        ws.send(JSON.stringify({ mensagem: "Erro no servidor" }));
        ws.close();
      }
    });

    // Evento disparado quando a conexão é fechada
    ws.on("close", () => {
      if (ws.id) {
        // Remove a conexão da fechadura
        delete connections[ws.id];
        console.log(`Fechadura ${ws.id} desconectada`);
      }
    });
  });

  console.log(`Servidor de WebSocket configurado na porta ${PORT_WS}`);
}

module.exports = setupWebsocket;
