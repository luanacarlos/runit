import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    nascimento: "",
    senha: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.nome || !form.email || !form.senha || !form.telefone || !form.cpf || !form.nascimento) {
      return "Todos os campos são obrigatórios";
    }
    if (!form.email.includes("@")) {
      return "Email inválido";
    }
    if (form.senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres";
    }
    if (!/^\d{11}$/.test(form.cpf)) {
      return "CPF deve ter 11 dígitos";
    }
    if (!/^\d{10,11}$/.test(form.telefone)) {
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

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      
      // ✅ Guardar dados do usuário no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cpf: form.cpf,
        nascimento: form.nascimento
      }));
      
      setSuccess(res.data.msg);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Erro ao registrar usuário");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 lg:p-10 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">
          Novo no Run It? Cadastre-se
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        
        <input
          className="w-full p-2 border rounded"
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          value={form.nome}
        />
        <input
          className="w-full p-2 border rounded"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          className="w-full p-2 border rounded"
          name="telefone"
          placeholder="Telefone"
          onChange={handleChange}
          value={form.telefone}
        />
        <input
          className="w-full p-2 border rounded"
          name="cpf"
          placeholder="CPF"
          onChange={handleChange}
          value={form.cpf}
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          name="nascimento"
          placeholder="Data de nascimento"
          onChange={handleChange}
          value={form.nascimento}
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleChange}
          value={form.senha}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Cadastrar
        </button>
      </form>
    </div>
  );
}