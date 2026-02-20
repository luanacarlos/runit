import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  nascimento: { type: Date, required: true },
  sexo: { type: String, enum: ["Masculino", "Feminino"], required: true },
  senha: { type: String, required: true },

  // campos para recuperação de senha
  resetToken: { type: String },
  resetTokenExpires: { type: Date }
});

export default mongoose.model("User", userSchema);
