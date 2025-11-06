import { useSolicitud } from '@/context/SolicitudContext';
import { SafeAreaView, Text } from 'react-native';
import FormCotizar from '../components/formCotizar';

interface Material {
    nombre: string;
    cantidad: number;
    unidad: string;
}
interface CardServiceProps {
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
        return <SafeAreaView><Text>No hay solicitud seleccionada</Text></SafeAreaView>;
    } return (
        <SafeAreaView>
            <FormCotizar
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