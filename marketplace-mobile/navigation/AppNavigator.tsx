import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../app/login';
import { useAuth } from '../context/AuthContext';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
    Login: undefined;
    Cliente: undefined;
    Perfil: undefined;
    Solicitud: undefined;
    AppTabs: undefined;

};

interface User {
    name: string;
    rol: 'Solicitante' | 'Proveedor' ;
}

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; user: any | null }>;
    logout: () => Promise<void>;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { isAuthenticated } = useAuth() as AuthContextType;

    return (
        <Stack.Navigator>
            {!isAuthenticated && (
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            )}

            {isAuthenticated && (
                <Stack.Screen
                    name="AppTabs"
                    component={TabNavigator} 
                    options={{ headerShown: false }}
                />)}
        </Stack.Navigator>
    );
}
