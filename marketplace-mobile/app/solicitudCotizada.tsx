import { useAuth } from '@/context/AuthContext';
import { useCotizacion } from '@/context/CotizacionContext';
import { SafeAreaView, StyleSheet } from 'react-native';
import CardCotizar from '../components/cardCotizar';
import Header from '../components/header';

interface Cotizacion {
    id: string;
    titulo: string;
    estado: string;
    descripcion: string;
    categoria: string;
    ubicacion: string;
    tiempo: string;
    precio: number;
    tiempoEstimado: string;
    detalles: string;
}

interface cotizacionContextType {
    cotizaciones: Cotizacion[];
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
    const { cotizaciones } = useCotizacion() as cotizacionContextType;

    return (
        <SafeAreaView style={styles.container}>
            <Header rol={currentUser?.rol || ''} name={currentUser?.name || ''} />
            <CardCotizar 
                titulo={cotizaciones[0]?.titulo || ''}
                estado={cotizaciones[0]?.estado || ''}
                descripcion={cotizaciones[0]?.descripcion || ''}
                categoria={cotizaciones[0]?.categoria || ''}
                ubicacion={cotizaciones[0]?.ubicacion || ''}
                precio={cotizaciones[0]?.precio || 0}
                tiempoEstimado={cotizaciones[0]?.tiempoEstimado || ''}
                detalles={cotizaciones[0]?.detalles || ''}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
})