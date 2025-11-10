import { useSolicitud } from '@/context/SolicitudContext';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FormCotizar from '../components/formCotizar';

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

export default function Cotizar() {
    const { solicitudSeleccionada } = useSolicitud() as { solicitudSeleccionada?: CardServiceProps };

    if (!solicitudSeleccionada) {
        return <SafeAreaView style={styles.emptyContainer}>
            <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No has seleccionado una solicitud aún</Text>
                <Text style={styles.emptyText}>Usa el tab <Text style={styles.highlight}>"Servicio"</Text> para cotizar una solicitud disponible.</Text>
            </View>
        </SafeAreaView>
    } return (
        <SafeAreaView>
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