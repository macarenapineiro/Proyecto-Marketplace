import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from "react";

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
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    setCurrentUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Error al cargar el usuario:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (username:string, password:string) => {
        const user = USERS.find(u => u.username === username && u.password === password);
        if (user) {
            const userData = { name: user.name, rol: user.rol };
            setCurrentUser(userData);
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            return { success: true, user };
        }
        return { success: false, user: null };
    }
 
    const logout = async () => {
        setCurrentUser(null);
        await AsyncStorage.removeItem("user");
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
