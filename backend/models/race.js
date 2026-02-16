import mongoose from "mongoose";

const raceSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  organizacao: { type: String, required: true },
  data: { type: Date, required: true },
  local: { type: String, required: true },
  imagem: { type: String },
  descricao: { type: String },
  criado_em: { type: Date, default: Date.now }
});

export default mongoose.model("Race", raceSchema);