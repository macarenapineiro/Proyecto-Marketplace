import Cotizar from '@/app/cotizar';
import Servicio from '@/app/servicio';
import { useAuth } from '@/context/AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cliente from '../app/cliente';
import PerfilScreen from '../app/perfil';
import Solicitud from '../app/solicitud';
export type TabParamList = {
    Servicio: undefined;
    Cotizar: undefined;
    Perfil: undefined;
    Cliente: undefined;
    Solicitud: undefined;
};
interface User {
    name: string;
    rol: 'Solicitante' | 'Proveedor' | 'Proveedor de Insumos';
}

interface AuthContextType {
    currentUser: User | null;
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { currentUser } = useAuth() as AuthContextType;
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#999',
                headerShown: false,
            }}>
            {currentUser?.rol === 'Solicitante' && (
                <>
                    <Tab.Screen name="Cliente" component={Cliente} options={{ headerShown: false, tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} /> }} />
                    <Tab.Screen name="Solicitud" component={Solicitud} options={{ headerShown: false, tabBarIcon: ({ color }) => <MaterialIcons name="add-box" size={24} color={color} /> }} />
                    <Tab.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} /> }} />
                </>
            )}
            {currentUser?.rol === 'Proveedor' && (
                <>
                    <Tab.Screen name="Servicio" component={Servicio} options={{ headerShown: false, tabBarIcon: ({ color }) => <MaterialIcons name="add-box" size={24} color={color} /> }} />
                    <Tab.Screen name="Cotizar" component={Cotizar} options={{ headerShown: false, tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" size={24} color={color} /> }} />
                    <Tab.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false, tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={color} /> }} />
                </>
            )}

        </Tab.Navigator>
    )
}
export default TabNavigator;