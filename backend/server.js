import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);

// Conexão com MongoDB (ajuste a URL conforme seu ambiente)
mongoose.connect("mongodb://localhost:27017/runit")
  .then(() => console.log("MongoDB conectado")) 
  .catch(err => console.error("Erro ao conectar MongoDB:", err));

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
