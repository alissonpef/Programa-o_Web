// Script utilizado para popular o banco de dados
const mongoose = require("./config/db");
const Usuario = require("./models/Usuario");
const Sala = require("./models/Sala");

// Dados a serem inseridos
const usuarios = [
  { idufsc: "admin", senha: "admin", salas: ["C-120", "C-124", "A-316", "A-317", "A-117", "A-205"] },
  { idufsc: "Clark_Kent", senha: "KWpoiuwex", salas: ["C-120", "C-124", "A-316"] },
  { idufsc: "Lois_Lane", senha: "zasdoeve", salas: ["C-124", "A-317"] },
  { idufsc: "Lex_Luthor", senha: "kasjdd92a", salas: ["A-117", "A-205"] },
];
const salas = [
  { id: "C-120", passwd: "xpkj812" },
  { id: "C-124", passwd: "xpkj812" },
  { id: "A-316", passwd: "xpkj812" },
  { id: "A-317", passwd: "xpkj812" },
  { id: "A-117", passwd: "xpkj812" },
  { id: "A-205", passwd: "xpkj812" },
];

// Inserindo ou atualizando os dados
const upsertData = async () => {
  try {
    await Promise.all([Usuario.deleteMany(), Sala.deleteMany()]);
    await Promise.all([Usuario.insertMany(usuarios), Sala.insertMany(salas)]);
    console.log("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados no banco de dados: ", error);
  } finally {
    mongoose.connection.close();
  }
};

upsertData();
