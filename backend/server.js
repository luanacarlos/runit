import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import racesRoutes from "./routes/races.js";
import paymentRoutes from "./routes/payment.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/races", racesRoutes);
app.use("/api/payment", paymentRoutes);

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/runit";
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB conectado em: " + mongoUri))
  .catch(err => console.error("Erro ao conectar MongoDB:", err));

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
