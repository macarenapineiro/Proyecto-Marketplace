import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
  const { isAuthenticated, currentUser } = useAuth();

  // Si está autenticado, redirigir a su página correspondiente
  if (isAuthenticated && currentUser) {
    // Mapear rol a ruta
    const roleRoutes = {
      "Solicitante": "/cliente",
      "Proveedor": "/servicio",
      "Proveedor de Insumos": "/insumo"
    };
    const redirectTo = roleRoutes[currentUser.rol] || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}