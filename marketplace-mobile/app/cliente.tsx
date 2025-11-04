import Footer from '@/components/footer';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
            </View>
            <Footer activeTab={activeTab} onTabPress={handleTabPress} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});