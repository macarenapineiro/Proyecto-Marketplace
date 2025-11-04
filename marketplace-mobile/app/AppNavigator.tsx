import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import Cliente from './cliente';
import Login from './login';
import PerfilScreen from './perfil';

export type RootStackParamList = {
    Login: undefined;
    Cliente: undefined;
    Perfil: undefined;
    //   Servicio: undefined;
    //   Insumo: undefined;
};

interface User {
    name: string;
    rol: 'Solicitante' | 'Proveedor' | 'Proveedor de Insumos';
}

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; user: any | null }>;
    logout: () => Promise<void>;
}

const Stack = createNativeStackNavigator < RootStackParamList > ();

export default function AppNavigator() {
    const { isAuthenticated, currentUser } = useAuth() as AuthContextType;

    return (
        <Stack.Navigator>
            {!isAuthenticated && (
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            )}

            {isAuthenticated && currentUser?.rol === "Solicitante" && (
                <>
                    <Stack.Screen name="Cliente" component={Cliente} options={{ headerShown: false }} />
                    <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
        // <Stack.Navigator>
        //     {!isAuthenticated ? (
        //         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        //     ) : null}

        //     {isAuthenticated && currentUser?.rol === "Solicitante" && (
        //         <Stack.Screen name="Cliente" component={Cliente} options={{ headerShown: false }} />
        //         <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
        //     )}
        // </Stack.Navigator>
    );
}
