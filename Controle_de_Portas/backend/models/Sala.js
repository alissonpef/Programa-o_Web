const mongoose = require("mongoose");

// Define o esquema da sala no banco de dados
const SalaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  passwd: { type: String, required: true },
});

module.exports = mongoose.model("Sala", SalaSchema);
