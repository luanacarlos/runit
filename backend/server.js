import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import racesRoutes from "./routes/races.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/races", racesRoutes);

// Conexão com MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/runit";

mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB conectado em: " + mongoUri)) 
  .catch(err => console.error("Erro ao conectar MongoDB:", err));

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));