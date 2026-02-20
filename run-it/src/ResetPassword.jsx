import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import { Button, Input } from "./components/FormComponents";
import { theme } from "./theme";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get("token");

  const [senha, setSenha] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (senha !== confirm) {
      setError("As senhas não coincidem");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        newPassword: senha,
      });
      setMessage(res.data.msg);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.msg || "Erro ao resetar senha");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Token de recuperação ausente. Solicite um novo link.");
    }
  }, [token]);

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
              Redefinir Senha
            </h2>

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

            {token && (
              <>
                <Input
                  name="senha"
                  type="password"
                  placeholder="Nova senha (mínimo 6 caracteres)"
                  onChange={(e) => setSenha(e.target.value)}
                  value={senha}
                  required
                  label="Nova Senha"
                />

                <Input
                  name="confirm"
                  type="password"
                  placeholder="Confirme sua nova senha"
                  onChange={(e) => setConfirm(e.target.value)}
                  value={confirm}
                  required
                  label="Confirmar Senha"
                />

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Atualizando..." : "Atualizar Senha"}
                </Button>
              </>
            )}

            <p className="text-center text-sm" style={{ color: theme.colors.text }}>
              <Link
                to="/login"
                style={{ color: theme.colors.primary }}
                className="font-semibold hover:opacity-80 transition"
              >
                Voltar ao login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}