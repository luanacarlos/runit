import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const router = express.Router();

// Cadastro
router.post("/register", async (req, res) => {
  try {
    const { nome, email, telefone, cpf, nascimento, senha } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email já cadastrado" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const newUser = new User({
      nome,
      email,
      telefone,
      cpf,
      nascimento,
      senha: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ msg: "Senha inválida" });

    res.json({ msg: "Login realizado com sucesso", user: { nome: user.nome, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
});

export default router;
