import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cliente from '../app/cliente';
import Login from '../app/login';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
    Login: undefined;
    Cliente: undefined;
    //   Servicio: undefined;
    //   Insumo: undefined;
};

const Stack = createNativeStackNavigator < RootStackParamList > ();

export default function AppNavigator() {
    const { isAuthenticated, currentUser } = useAuth();

    return (
        <Stack.Navigator>
            {!isAuthenticated ? (
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            ) : null}

            {isAuthenticated && currentUser?.rol === "Solicitante" && (
                <Stack.Screen name="Cliente" component={Cliente} />
            )}
        </Stack.Navigator>
    );
}
