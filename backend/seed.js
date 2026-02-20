import mongoose from "mongoose";
import Race from "./models/race.js";

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/runit";

async function main() {
  await mongoose.connect(MONGO);
  console.log("conectado ao mongo");

  const examples = [
    {
      nome: "Corrida do Sol",
      organizacao: "Equipe Alfa",
      data: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // uma semana
      local: "Praia da Costa",
      descricao: "5 km na areia",
      imagem: ""
    },
    {
      nome: "Maratona Noturna",
      organizacao: "SportRun",
      data: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      local: "Centro da cidade",
      descricao: "42 km sob as estrelas",
      imagem: ""
    },
    {
      nome: "Passeio Ciclístico",
      organizacao: "Pedala Brasil",
      data: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
      local: "Parque Municipal",
      descricao: "20 km de bike",
      imagem: ""
    }
  ];

  await Race.deleteMany({});            // opcional: limpa as corridas existentes
  const created = await Race.insertMany(examples);
  console.log("insere", created.length, "corridas");
  mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});