const mongoose = require("mongoose");

// Conecta ao banco de dados MongoDB
mongoose.connect("mongodb://localhost:27017/controle-de-portas");

// Conexão exitosa
mongoose.connection.on("connected", () => {
  console.log("Conexão com o banco de dados estabelecida");
});

// Conexão com erro
mongoose.connection.on("error", (err) => {
  console.log("Erro na conexão com o banco de dados: " + err);
});

module.exports = mongoose;
