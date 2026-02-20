import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const usuario = usuarioLogado ? JSON.parse(usuarioLogado) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate(isAdmin ? "/admin" : "/dashboard")}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              🏃 RunIt
            </button>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {isAdmin && (
              <button
                onClick={() => navigate("/admin")}
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
              >
                Dashboard Admin
              </button>
            )}
            {!isAdmin && (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-700 hover:text-blue-600 font-semibold transition"
              >
                Minhas Corridas
              </button>
            )}

            {/* Usuário Info */}
            {usuario && (
              <div className="flex items-center gap-4 border-l pl-6">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {usuario.nome}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAdmin ? "Administrador" : "Usuário"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Sair
                </button>
              </div>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {isAdmin && (
              <button
                onClick={() => {
                  navigate("/admin");
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition"
              >
                Dashboard Admin
              </button>
            )}
            {!isAdmin && (
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 rounded transition"
              >
                Minhas Corridas
              </button>
            )}
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}