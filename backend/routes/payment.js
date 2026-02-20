import express from "express";
import pkg from 'mercadopago';
const { MercadoPagoConfig, Preference } = pkg;

const router = express.Router();

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

// Rota principal de preferência
router.post("/preference", async (req, res) => {
  try {
    const { raceId, inscricaoData, preco, titulo, descricao } = req.body;

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{
          id: raceId || "kit-corrida",
          title: titulo || "Kit de Corrida",
          description: descricao || "Kit para inscrição",
          unit_price: Number(preco),
          quantity: 1,
          currency_id: "BRL"
        }],
        payer: {
          email: inscricaoData?.email || "user@example.com",
          name: inscricaoData?.nome || "Usuário"
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL || "http://localhost"}/dashboard?payment=success`,
          failure: `${process.env.FRONTEND_URL || "http://localhost"}/dashboard?payment=failure`,
          pending: `${process.env.FRONTEND_URL || "http://localhost"}/dashboard?payment=pending`
        },
        auto_return: "approved",
        notification_url: `${process.env.BACKEND_URL || "http://localhost:5000"}/api/payment/webhook`
      }
    });

    res.status(201).json({ preferenceId: result.id, initPoint: result.init_point });
  } catch (error) {
    console.error("❌ Erro ao criar preferência:", error.message);
    res.status(500).json({ msg: "Erro ao criar preferência", error: error.message });
  }
});

// OAuth - redirecionar vendedor para autorização
router.get('/oauth/authorize', (req, res) => {
  const MP_CLIENT_ID = process.env.MP_CLIENT_ID || '';
  const MP_REDIRECT_URI = process.env.MP_REDIRECT_URI || 'http://localhost:5000/api/payment/oauth/callback';
  const state = req.query.state || 'runit-' + Date.now();
  const url = `https://auth.mercadopago.com.br/authorization?client_id=${MP_CLIENT_ID}&response_type=code&platform_id=mp&redirect_uri=${encodeURIComponent(MP_REDIRECT_URI)}&state=${state}`;
  res.redirect(url);
});

// OAuth - callback
router.get('/oauth/callback', async (req, res) => {
  const { code, state } = req.query;
  if (!code) return res.status(400).json({ error: 'Authorization code not found.' });

  try {
    const MP_CLIENT_ID = process.env.MP_CLIENT_ID || '';
    const MP_CLIENT_SECRET = process.env.MP_CLIENT_SECRET || '';
    const MP_REDIRECT_URI = process.env.MP_REDIRECT_URI || 'http://localhost:5000/api/payment/oauth/callback';

    const params = new URLSearchParams({
      client_id: MP_CLIENT_ID,
      client_secret: MP_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: MP_REDIRECT_URI
    });

    const response = await fetch('https://api.mercadopago.com/oauth/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params
    });

    const result = await response.json();
    res.json({ message: 'Conta vinculada com sucesso!', mp_oauth: result });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter access_token', details: err.message });
  }
});

export default router;