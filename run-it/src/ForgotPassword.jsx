import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import { Button, Input } from "./components/FormComponents";
import { theme } from "./theme";

export default function ForgotPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "Erro ao solicitar recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo e Slogan */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" showText={true} />
            </div>
            <p
              className="text-lg italic"
              style={{ color: theme.colors.primary }}
            >
              Leveza na entrega, velocidade na prova.
            </p>
          </div>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            style={{
              backgroundColor: theme.colors.lightGray,
              padding: "2rem",
              borderRadius: "1rem",
            }}
          >
            <h2
              className="text-2xl font-bold text-center"
              style={{ color: theme.colors.secondary }}
            >
              Recuperar Senha
            </h2>

            <p className="text-center text-sm" style={{ color: theme.colors.text }}>
              Digite seu email e receberá um link para resetar sua senha.
            </p>

            {message && (
              <div
                style={{
                  backgroundColor: "#E8F5E9",
                  borderLeft: `4px solid ${theme.colors.success}`,
                  color: theme.colors.success,
                }}
                className="p-3 rounded text-sm"
              >
                {message}
              </div>
            )}

            {error && (
              <div
                style={{
                  backgroundColor: "#FFEBEE",
                  borderLeft: `4px solid ${theme.colors.error}`,
                  color: theme.colors.error,
                }}
                className="p-3 rounded text-sm"
              >
                {error}
              </div>
            )}

            <Input
              name="email"
              type="email"
              placeholder="seu@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              label="Email cadastrado"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>

            <p className="text-center text-sm" style={{ color: theme.colors.text }}>
              Lembrou a senha?{" "}
              <Link
                to="/login"
                style={{ color: theme.colors.primary }}
                className="font-semibold hover:opacity-80 transition"
              >
                Fazer login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}