import Footer from '@/components/footer';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

interface User {
    name: string;
    rol: 'Solicitante' | 'Proveedor' | 'Proveedor de Insumos';
    email: string;
}

interface AuthContextType {
    currentUser: User | null;
    logout: () => Promise<void>;
}


export default function PerfilScreen() {
    const { currentUser, logout } = useAuth() as AuthContextType;
        const [activeTab, setActiveTab] = useState("Solicitudes");

    const handleTabPress = (tabName: string) => {
        setActiveTab("Perfil");
    }
    const handleLogout = async () => {
        await logout();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            {currentUser && (
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Name: {currentUser.name}</Text>
                    <Text style={styles.userInfoText}>Role: {currentUser.rol}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <Footer activeTab={"Perfil"} onTabPress={handleTabPress} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    userInfo: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    userInfoText: {
        fontSize: 18,
        marginVertical: 5,
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: '#FF3B30',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});