import mongoose from "mongoose";

const inscriptionSchema = new mongoose.Schema({
  raceId: { type: mongoose.Schema.Types.ObjectId, ref: "Race", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  cpf: { type: String, required: true },
  nascimento: { type: Date, required: true },

  // nova parte
  kitOption: {
    type: String,
    enum: ["pickup", "delivery"],
    default: "pickup"
  },
  address: { type: String },               // somente se delivery

  inscrito_em: { type: Date, default: Date.now }
});

export default mongoose.model("Inscription", inscriptionSchema);