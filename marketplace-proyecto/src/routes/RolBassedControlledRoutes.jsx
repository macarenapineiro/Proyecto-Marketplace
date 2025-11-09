import {useAuth} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

export default function RolBasedControlledRoutes({rol}) {
    const {currentUser} = useAuth();
    
    // Si no hay usuario, no mostrar nada (ProtectedRoute ya redirige)
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    
    // Si el rol coincide, mostrar la ruta
    if(currentUser.rol === rol){
        return <Outlet />;
    }
    
    // Si el rol no coincide, redirigir a home o a su dashboard correspondiente
    return <Navigate to="/" replace />;
}