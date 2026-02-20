import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import { theme } from "../theme";

export default function Header() {
  const navigate = useNavigate();
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  const usuario = usuarioLogado ? JSON.parse(usuarioLogado) : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <header
      style={{ backgroundColor: theme.colors.secondary }}
      className="text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="md" showText={true} />
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {usuario && (
              <>
                <span className="text-sm opacity-90">
                  Bem-vindo, <strong>{usuario.nome}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: "white",
                  }}
                >
                  Sair
                </button>
              </>
            )}
            {!usuario && (
              <>
                <Link
                  to="/login"
                  style={{ color: theme.colors.primary }}
                  className="hover:opacity-80 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{ backgroundColor: theme.colors.primary, color: "white" }}
                  className="px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Cadastro
                </Link>
              </>
            )}
          </nav>

          {/* Menu mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu mobile dropdown */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            {usuario && (
              <>
                <p className="text-sm opacity-90">
                  Bem-vindo, <strong>{usuario.nome}</strong>
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: "white",
                  }}
                >
                  Sair
                </button>
              </>
            )}
            {!usuario && (
              <>
                <Link
                  to="/login"
                  className="block py-2 hover:opacity-80 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 rounded-lg transition"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: "white",
                  }}
                >
                  Cadastro
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
