import CardService from '@/components/cardService';
import Header from '@/components/header';
import { useAuth } from '@/context/AuthContext';
import { useSolicitud } from '@/context/SolicitudContext';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TabParamList } from '../navigation/TabNavigator';


type ServicioNavigationProp = BottomTabNavigationProp<TabParamList, 'Servicio'>;

interface User {
    name: string;
    rol: 'Solicitante' | 'Proveedor' | 'Proveedor de Insumos';
}

interface AuthContextType {
    currentUser: User | null;
}

interface Material {
    nombre: string;
    cantidad: number;
    unidad: string;
}

interface Solicitud {
    titulo: string;
    descripcion: string;
    categoria: string;
    ubicacion: string;
    fechaLimite: string;
    materiales: Material[];
    estado: string;
}

interface SolicitudContextType {
    solicitudes: Solicitud[];
    seleccionarSolicitud: (solicitud: Solicitud) => void;
    solicitudesAbiertas: Solicitud[];
}

export default function Servicio() {
    const { solicitudes, seleccionarSolicitud, solicitudesAbiertas } = useSolicitud() as SolicitudContextType;
    const { currentUser } = useAuth() as AuthContextType;
    const navigation = useNavigation<ServicioNavigationProp>();

    const handleCotizar = (solicitud: Solicitud) => {
        seleccionarSolicitud(solicitud);
        navigation.navigate('Cotizar');

    };

    return (
        <SafeAreaView>
            <Header rol={currentUser?.rol || ''} name={currentUser?.name || ''} />
            <ScrollView style={styles.content}>
                <Text style={styles.headline}>Mis Solicitudes</Text>
                {solicitudes.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyCard}>
                            <Text style={styles.emptyTitle}>No tienes solicitudes aún</Text>
                            <Text style={styles.emptyText}>Usa el tab <Text style={styles.highlight}>"Solicitudes"</Text> para crear una nueva.</Text>
                        </View>
                    </View>
                ) : (
                    solicitudesAbiertas.map((solicitud, index) => (
                        <CardService
                            key={index}
                            titulo={solicitud.titulo}
                            descripcion={solicitud.descripcion}
                            categoria={solicitud.categoria}
                            ubicacion={solicitud.ubicacion}
                            tiempo={solicitud.fechaLimite}
                            materiales={solicitud.materiales}
                            estado={solicitud.estado as 'Abierto' | 'Pendiente' | 'Aceptado' | 'Rechazado'}
                            onCotizar={() => handleCotizar(solicitud)}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f7f9fc',
    },
    headline: {
        fontSize: 22,
        fontWeight: '700',
        marginVertical: 20,
        textAlign: 'center',
        color: '#2c3e50',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    emptyContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#34495e',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        lineHeight: 22,
    },
    highlight: {
        color: '#16a085',
        fontWeight: '600',
    },
})