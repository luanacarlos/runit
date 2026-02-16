import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const token = localStorage.getItem("token");
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Se não tem token, redireciona para login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se requer admin e não é admin, redireciona para dashboard
  if (requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Se está autenticado, renderiza o componente
  return children;
}