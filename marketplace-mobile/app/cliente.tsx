// import Footer from '@/components/footer';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import FormSolicitud from '../components/formSolicitud';
import Header from '../components/header';
import { useAuth } from '../context/AuthContext';
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

export default function ClienteScreen() {   
    const [activeTab, setActiveTab] = useState("Solicitudes");
    const handleTabPress = (tabName: string) => {
        setActiveTab(tabName);
    }
    
    const { currentUser, logout } = useAuth() as AuthContextType;
     const handleLogout = async () => {
        await logout();
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header rol={currentUser?.rol || ''} name={currentUser?.name || ''} />
            <View style={styles.content}>
                <Text>Estas en: {activeTab}</Text>
                {/* <FormSolicitud /> */}
            </View>
            {/* <Footer activeTab={activeTab} onTabPress={handleTabPress} /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        width: '100%',
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        // justifyContent: 'center',
        // alignItems: 'center',
    }
});