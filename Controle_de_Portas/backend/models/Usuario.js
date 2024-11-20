const mongoose = require("mongoose");

// Define o esquema do usuário no banco de dados
const UsuarioSchema = new mongoose.Schema({
  idufsc: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  salas: { type: [String], default: [] },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
