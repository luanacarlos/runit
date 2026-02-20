import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.js";

const router = express.Router();

// Cadastro
router.post("/register", async (req, res) => {
  try {
    const { nome, email, telefone, cpf, nascimento, sexo, senha } = req.body;

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
      sexo,
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

// Esqueci a senha - gera token e envia email
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Email não cadastrado" });

    // gera token e expiry de 1 hora
    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();

    // determina a URL do frontend a partir de variável de ambiente
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetLink = `${frontendURL.replace(/\/$/, "")}/reset-password?token=${token}`;

    // se o host SMTP não estiver definido, só loga o link (útil em dev locais)
    if (!process.env.SMTP_HOST) {
      console.log("[RECOVERY LINK]", resetLink);
    } else {
      // configura transporte de email via nodemailer usando variáveis de ambiente
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || "no-reply@runit.com",
        to: user.email,
        subject: "Recuperação de senha",
        text: `Você solicitou a recuperação de senha. Copie e cole o link abaixo no navegador:\n${resetLink}`,
        html: `<p>Você solicitou a recuperação de senha. Clique no link abaixo ou copie e cole no navegador:</p><p><a href=\"${resetLink}\">Redefinir minha senha</a></p>`,
      });
    }

    res.json({ msg: "Email de recuperação enviado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
});

// redefinir senha com token
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ msg: "Token inválido ou expirado" });

    const salt = await bcrypt.genSalt(10);
    user.senha = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ msg: "Senha atualizada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
});

export default router;
