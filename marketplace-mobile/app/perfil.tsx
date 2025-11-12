import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';


interface User {
    name: string;
    rol: 'Solicitante' | 'Proveedor' ;
    username: string;
}

interface AuthContextType {
    currentUser: User | null;
    logout: () => Promise<void>;
}


export default function PerfilScreen() {
    const { currentUser, logout } = useAuth() as AuthContextType;
    const handleLogout = async () => {
        await logout();
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#4C8BF5', '#0052D4']}
                style={styles.header}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {currentUser?.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.name}>{currentUser?.name}</Text>
                    <Text style={styles.email}>{currentUser?.username}</Text>
                </View>
            </LinearGradient>
            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <MaterialIcons name="badge" size={22} color="#4C8BF5" />
                    <Text style={styles.infoText}>{currentUser?.rol}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialIcons name="logout" size={20} color="#fff" />
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingVertical: 40,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatarContainer: {
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#4C8BF5',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    email: {
        fontSize: 14,
        color: '#DDE6FF',
    },
    infoCard: {
        backgroundColor: '#fff',
        width: '85%',
        borderRadius: 15,
        padding: 20,
        marginTop: 30,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    infoText: {
        fontSize: 18,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF3B30',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 40,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});