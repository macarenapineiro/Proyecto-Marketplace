import FormCotizar from '@/components/formCotizar';
import { useAuth } from '@/context/AuthContext';
import { useCotizacion } from '@/context/CotizacionContext';
import { useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CardCotizar from '../components/cardCotizar';
import Header from '../components/header';

interface Cotizacion {
    id: string;
    title: string;
    estado: string;
    description: string;
    categoria: string;
    ubicacion: string;
    fecha: string;
    precio: number;
    tiempoEstimado: string;
    detallesAdicionales: string;
    materiales: Material[];
}
interface Material {
    nombre: string;
    cantidad: number;
    unidad: string;
}

interface cotizacionContextType {
    cotizacionesServicio: Cotizacion[];
    actualizarCotizacionServicio: (id: string, updatedCotizacion: Partial<Cotizacion>) => void;
    eliminarCotizacionServicio: (id: string) => void;
}

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

export default function SolicitudCotizada() {
    const { currentUser } = useAuth() as AuthContextType;
    const { cotizacionesServicio, actualizarCotizacionServicio, eliminarCotizacionServicio } = useCotizacion() as cotizacionContextType;
    
    const [modalVisible, setModalVisible] = useState(false);
    const [cotizacionEditar, setCotizacionEditar] = useState<Cotizacion | null>(null);

    const handleEditar = (cotizacion: Cotizacion) => {
        setCotizacionEditar(cotizacion);
        setModalVisible(true);
    }

    const handleGuardar = (cotizacionActualizada: Partial<Cotizacion>) => {
        actualizarCotizacionServicio(cotizacionEditar?.id || '', cotizacionActualizada);
        setModalVisible(false);
        setCotizacionEditar(null);
    }
    const handleEliminar = (id: string) => {
        Alert.alert(
            "Eliminar Cotización",
            "¿Estás seguro que deseas eliminar esta cotización?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", style: "destructive", onPress: () => eliminarCotizacionServicio(id) }
            ]
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header rol={currentUser?.rol || ''} name={currentUser?.name || ''} />
            <ScrollView style={styles.content}>
                <Text style={styles.headline}>Mis Cotizaciones</Text>
                {!cotizacionesServicio || cotizacionesServicio.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyCard}>
                            <Text style={styles.emptyTitle}>No tienes cotizaciones aún</Text>
                        </View>
                    </View>
                ) : (cotizacionesServicio.map(cotizacion => (
                    <CardCotizar
                        key={cotizacion.id}
                        titulo={cotizacion.title || ''}
                        estado={cotizacion.estado || ''}
                        descripcion={cotizacion.description || ''}
                        categoria={cotizacion.categoria || ''}
                        ubicacion={cotizacion.ubicacion || ''}
                        precio={cotizacion.precio || 0}
                        tiempoEstimado={cotizacion.tiempoEstimado || ''}
                        detalles={cotizacion.detallesAdicionales || ''}
                        onEditar={() => handleEditar(cotizacion)}
                        onEliminar={() => handleEliminar(cotizacion.id)}
                    />
                )))}
            </ScrollView>
            <Modal visible={modalVisible} animationType="slide">
                {cotizacionEditar && (
                    <FormCotizar
                        title={cotizacionEditar.title}
                        description={cotizacionEditar.description}
                        categoria={cotizacionEditar.categoria}
                        ubicacion={cotizacionEditar.ubicacion}
                        fecha={cotizacionEditar.fecha}
                        estado={cotizacionEditar.estado}
                        materiales={cotizacionEditar.materiales}
                        cotizacionExistente={{
                            id: cotizacionEditar.id, 
                            title: cotizacionEditar.title,
                            description: cotizacionEditar.description,
                            categoria: cotizacionEditar.categoria,
                            ubicacion: cotizacionEditar.ubicacion,
                            fecha: cotizacionEditar.fecha,
                            estado: cotizacionEditar.estado,
                            materiales: cotizacionEditar.materiales,
                            precio: String(cotizacionEditar.precio),
                            tiempoEstimado: cotizacionEditar.tiempoEstimado,
                            detallesAdicionales: cotizacionEditar.detallesAdicionales,
                        }}
                        onSubmit={handleGuardar}
                    />
                    )}
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    content: {
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