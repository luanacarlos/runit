import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      
      // ✅ Guardar dados do usuário no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify({
        nome: res.data.user.nome,
        email: res.data.user.email,
      }));
      
      // ✅ Detectar se é admin por email específico
      // Você pode mudar isso para verificar um campo no banco de dados
      const emailsAdmin = ["admin@runit.com", "admin@gmail.com"];
      const isAdmin = emailsAdmin.includes(res.data.user.email);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", isAdmin);
      
      // Redireciona para admin ou dashboard baseado no role
      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Erro ao fazer login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          className="w-full p-2 border rounded"
          name="email"
          placeholder="Email ou CPF"
          onChange={handleChange}
          value={form.email}
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleChange}
          value={form.senha}
        />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
          Entrar
        </button>
      </form>
    </div>
  );
}