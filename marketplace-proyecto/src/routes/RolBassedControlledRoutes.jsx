import {useAuth} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

export default function RolBasedControlledRoutes({rol}) {
    const {currentUser} = useAuth();
    
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    
    if(currentUser.rol === rol){
        return <Outlet />;
    }
    
    return <Navigate to="/" replace />;
}