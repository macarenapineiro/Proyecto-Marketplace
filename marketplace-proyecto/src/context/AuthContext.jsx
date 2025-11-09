import { createContext, useContext } from "react";
import {useState} from "react";
const USERS = [
  {
    username: "cliente@test.com",
    password: "cliente123",
    name: "Juan Pérez",
    rol: "Solicitante",
    redirect: "/cliente"
  },
  {
    username: "servicio@test.com",
    password: "servicio123",
    name: "María Gómez",
    rol: "Proveedor",
    redirect: "/servicio"
  },
  {
    username: "insumos@test.com",
    password: "insumos123",
    name: "Carlos López",
    rol: "Proveedor de Insumos",
    redirect: "/insumo"
  }
]

export const AuthContext = createContext(
  undefined
);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    
    const login = (username, password) => {
        const user = USERS.find(u => u.username === username && u.password === password);
        if (user) {
            setCurrentUser({ name: user.name, rol: user.rol });
            localStorage.setItem("user", JSON.stringify({
                name: user.name,
                rol: user.rol
            }));
            return { success: true, user };
        }
        return { success: false, user: null };
    }
 
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    }
    return (
        <AuthContext.Provider value={{currentUser, login, logout, isAuthenticated: !!currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
}