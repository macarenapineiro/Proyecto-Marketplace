import { Text, View } from 'react-native';

interface CardCotizarProps {
    titulo: string;
    estado: string;
    descripcion: string;
    categoria: string;
    ubicacion: string;
    precio: number;
    tiempoEstimado: string;
    detalles: string;
}

interface Material {
    nombre: string;
    cantidad: number;
    unidad: string;
}

export default function CardCotizar({ titulo, estado, descripcion, categoria, ubicacion, precio, tiempoEstimado, detalles }: CardCotizarProps) {
    return (
        <View>
            <View>
                <Text>Cotización: {titulo}</Text>
                <Text>{estado}</Text>
            </View>
            <View>
                <Text>Descripción: {descripcion}</Text>
                <Text>Categoría: {categoria}</Text>
                <Text>Ubicación: {ubicacion}</Text>
            </View>
            <View>
                <Text>Precio del Servicio: {precio}</Text>
                <Text>Tiempo Estimado: {tiempoEstimado} días</Text>
            </View>
            <Text>Detalles Adicionales: {detalles}</Text>
        </View>
    );
}
