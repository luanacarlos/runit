import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import { Button, Input } from "./components/FormComponents";
import { theme } from "./theme";
import termsContent from "./terms-and-conditions.md?raw";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      navigate(isAdmin ? "/admin" : "/dashboard", { replace: true });
    }
  }, [navigate]);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    nascimento: "",
    sexo: "",
    senha: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.nome || !form.email || !form.senha || !form.telefone || !form.cpf || !form.nascimento || !form.sexo) {
      return "Todos os campos são obrigatórios";
    }
    if (!acceptTerms) {
      return "Você deve aceitar os termos e condições";
    }
    if (!form.email.includes("@")) {
      return "Email inválido";
    }
    if (form.senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres";
    }
    if (!/^\d{11}$/.test(form.cpf.replace(/\D/g, ''))) {
      return "CPF deve ter 11 dígitos";
    }
    if (!/^\d{10,11}$/.test(form.telefone.replace(/\D/g, ''))) {
      return "Telefone inválido";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      localStorage.setItem("usuarioLogado", JSON.stringify({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cpf: form.cpf,
        nascimento: form.nascimento,
        sexo: form.sexo
      }));

      setSuccess("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Erro ao registrar usuário");
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
            className="space-y-4"
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
              Criar Conta
            </h2>

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

            {success && (
              <div
                style={{
                  backgroundColor: "#E8F5E9",
                  borderLeft: `4px solid ${theme.colors.success}`,
                  color: theme.colors.success,
                }}
                className="p-3 rounded text-sm"
              >
                {success}
              </div>
            )}

            <Input
              name="nome"
              placeholder="Seu nome completo"
              onChange={handleChange}
              value={form.nome}
              required
              label="Nome"
            />

            <Input
              name="email"
              type="email"
              placeholder="seu@email.com"
              onChange={handleChange}
              value={form.email}
              required
              label="Email"
            />

            <Input
              name="telefone"
              placeholder="(11) 99999-9999"
              onChange={handleChange}
              value={form.telefone}
              required
              label="Telefone"
            />

            <Input
              name="cpf"
              placeholder="000.000.000-00"
              onChange={handleChange}
              value={form.cpf}
              required
              label="CPF"
            />

            <Input
              name="nascimento"
              type="date"
              onChange={handleChange}
              value={form.nascimento}
              required
              label="Data de nascimento"
            />

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.colors.secondary }}
              >
                Sexo *
              </label>
              <select
                name="sexo"
                value={form.sexo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors font-medium"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                  color: form.sexo ? theme.colors.text : theme.colors.text,
                }}
                onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                onBlur={(e) => e.target.style.borderColor = theme.colors.border}
              >
                <option value="">Selecione seu sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>

            <Input
              name="senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              onChange={handleChange}
              value={form.senha}
              required
              label="Senha"
            />

            {/* Checkbox Termos e Condições */}
            <div className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: theme.colors.background, borderLeft: `4px solid ${theme.colors.primary}` }}>
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 cursor-pointer"
                style={{ accentColor: theme.colors.primary }}
              />
              <label htmlFor="terms" className="text-sm cursor-pointer" style={{ color: theme.colors.text }}>
                Aceito os{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  style={{ color: theme.colors.primary }}
                  className="font-semibold hover:opacity-80 transition underline"
                >
                  termos e condições
                </button>
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Cadastrar"}
            </Button>

            <p className="text-center text-sm" style={{ color: theme.colors.text }}>
              Já tem conta?{" "}
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

      {/* Modal Termos e Condições */}
      {showTermsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          style={{ animation: "fadeIn 0.3s ease-in-out" }}
        >
          <div
            className="rounded-lg shadow-2xl max-w-2xl w-full p-8 max-h-96 overflow-y-auto"
            style={{ backgroundColor: theme.colors.background }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: theme.colors.secondary }}
            >
              Termos e Condições
            </h2>
            
            <div 
              className="prose prose-sm mb-6 text-sm leading-relaxed whitespace-pre-wrap"
              style={{ color: theme.colors.text }}
            >
              {termsContent}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setAcceptTerms(true);
                  setShowTermsModal(false);
                }}
                fullWidth
              >
                Aceitar
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTermsModal(false)}
                fullWidth
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}