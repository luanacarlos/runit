import express from "express";
import Race from "../models/race.js";
import Inscription from "../models/inscription.js";

const router = express.Router();

// ✅ Criar corrida
router.post("/", async (req, res) => {
  try {
    const { nome, organizacao, data, local, imagem, descricao } = req.body;

    const novaRace = new Race({
      nome,
      organizacao,
      data: new Date(data),
      local,
      imagem,
      descricao
    });

    await novaRace.save();
    res.status(201).json({ msg: "Corrida criada com sucesso", race: novaRace });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao criar corrida", error: err.message });
  }
});

// ✅ Obter todas as corridas
router.get("/", async (req, res) => {
  try {
    const races = await Race.find().sort({ data: 1 });
    res.json(races);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar corridas", error: err.message });
  }
});

// ✅ Obter corrida por ID
router.get("/:id", async (req, res) => {
  try {
    const race = await Race.findById(req.params.id);
    if (!race) return res.status(404).json({ msg: "Corrida não encontrada" });
    res.json(race);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar corrida", error: err.message });
  }
});

// ✅ Atualizar corrida
router.put("/:id", async (req, res) => {
  try {
    const { nome, organizacao, data, local, imagem, descricao } = req.body;
    const updatedRace = await Race.findByIdAndUpdate(
      req.params.id,
      { nome, organizacao, data: new Date(data), local, imagem, descricao },
      { new: true }
    );
    res.json({ msg: "Corrida atualizada", race: updatedRace });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao atualizar corrida", error: err.message });
  }
});

// ✅ Deletar corrida
router.delete("/:id", async (req, res) => {
  try {
    await Race.findByIdAndDelete(req.params.id);
    await Inscription.deleteMany({ raceId: req.params.id });
    res.json({ msg: "Corrida deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao deletar corrida", error: err.message });
  }
});

// ✅ Criar inscrição
router.post("/:id/inscriptions", async (req, res) => {
  try {
    const { nome, email, telefone, cpf, nascimento } = req.body;

    const novaInscricao = new Inscription({
      raceId: req.params.id,
      nome,
      email,
      telefone,
      cpf,
      nascimento: new Date(nascimento)
    });

    await novaInscricao.save();
    res.status(201).json({ msg: "Inscrição realizada", inscription: novaInscricao });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao inscrever", error: err.message });
  }
});

// ✅ Obter inscrições por corrida
router.get("/:id/inscriptions", async (req, res) => {
  try {
    const inscriptions = await Inscription.find({ raceId: req.params.id }).sort({
      inscrito_em: -1
    });
    res.json(inscriptions);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar inscrições", error: err.message });
  }
});

export default router;