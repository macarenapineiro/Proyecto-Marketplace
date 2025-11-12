import { useAuth } from "@/context/AuthContext";
import { useSolicitud } from '@/context/SolicitudContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FormCotizar from '../components/formCotizar';
import Header from '../components/header';

interface Material {
    nombre: string;
    cantidad: number;
    unidad: string;
}
interface CardServiceProps {
    id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    ubicacion: string;
    tiempo: string;
    estado: string;
    materiales: Material[];
    onCotizar?: () => void;
}

interface User {
    name: string;
    rol: 'Solicitante' | 'Proveedor' ;
}

interface AuthContextType {
    currentUser: User | null;
}


export default function Cotizar() {
    const { solicitudSeleccionada } = useSolicitud() as { solicitudSeleccionada?: CardServiceProps };
    const { currentUser } = useAuth() as AuthContextType;

    if (!solicitudSeleccionada) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f9fc' }}>
                <Header rol={currentUser?.rol || ''} name={currentUser?.name || ''} />
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyCard}>
                        <Ionicons
                            name="document-text-outline"
                            size={60}
                            color="#16a085"
                            style={{ alignSelf: 'center', marginBottom: 10 }}
                        />
                        <Text style={styles.emptyTitle}>No has seleccionado una solicitud aún</Text>
                        <Text style={styles.emptyText}>Usa el tab <Text style={styles.highlight}>"Servicio"</Text> para cotizar una solicitud disponible.</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    } return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f9fc' }}>
            <FormCotizar
                solicitudId={solicitudSeleccionada.id}
                title={solicitudSeleccionada.titulo}
                description={solicitudSeleccionada.descripcion}
                categoria={solicitudSeleccionada.categoria}
                ubicacion={solicitudSeleccionada.ubicacion}
                fecha={solicitudSeleccionada.tiempo}
                estado={solicitudSeleccionada.estado}
                materiales={solicitudSeleccionada.materiales}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
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