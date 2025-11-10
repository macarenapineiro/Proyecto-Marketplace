import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CardCotizarProps {
    titulo: string;
    estado: string;
    descripcion: string;
    categoria: string;
    ubicacion: string;
    precio: number;
    tiempoEstimado: string;
    detalles: string;
    onAceptar?: () => void;
    onRechazar?: () => void;
    onEditar?: () => void;
    onEliminar?: () => void;
    currentUser?: any;
}

export default function CardCotizar({ currentUser, titulo, estado, descripcion, categoria, ubicacion, precio, tiempoEstimado, detalles, onAceptar, onRechazar, onEditar, onEliminar }: CardCotizarProps) {
    const [mostrarBotones, setMostrarBotones] = useState(true);

    const estadoStyles: { [key: string]: any } = {
        abierto: {
            backgroundColor: '#D4EFDF',
            color: '#1E8449',
        },
        pendiente: {
            backgroundColor: '#FBE691',
            color: '#8B7643',
        },
        aceptado: {
            backgroundColor: '#5ED08D',
            color: '#046B0D',
        },
        rechazado: {
            backgroundColor: '#DD8585',
            color: '#6B0404',
        },
    };

    const handleAceptar = () => {
        setMostrarBotones(false);
        if (onAceptar) {
            onAceptar();
        }
        Alert.alert('Cotización Aceptada', 'Has aceptado la cotización exitosamente.');
    }

    const handleRechazar = () => {
        setMostrarBotones(false);
        if (onRechazar) {
            onRechazar();
        }
        Alert.alert('Cotización Rechazada', 'Has rechazado la cotización exitosamente.');
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Cotización: {titulo}</Text>
                <Text style={[styles.estado, estadoStyles[estado?.toLowerCase() || 'pendiente']]}>{estado}</Text>
            </View>
            <Text style={styles.descripcion}>{descripcion}</Text>
            <Text style={styles.categoria}>{categoria}</Text>

            <View style={styles.details}>
                <View style={styles.rowItem}>
                    <MaterialIcons name="location-on" size={20} color="#000" />
                    <Text style={styles.time}>{ubicacion}</Text>
                </View>
                <View style={styles.rowItem}>
                    <MaterialIcons name="inventory" size={20} color="#000" />
                    <Text style={styles.time}>Precio: ${precio}</Text>
                </View>
                <View style={styles.rowItem}>
                    <MaterialIcons name="access-time" size={20} color="#000" />
                    <Text style={styles.time}>Tiempo Estimado: {tiempoEstimado} días</Text>
                </View>
            </View>
            <Text style={styles.label}>Detalles Adicionales</Text>
            <Text style={styles.text}>{detalles}</Text>
            {currentUser?.rol === 'Solicitante' && estado !== 'Aceptado' && estado !== 'Rechazado' ? (
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleAceptar}>
                        <Text style={styles.textAceptar}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRechazar}>
                        <Text style={styles.textRechazar}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
            ):currentUser?.rol === 'Proveedor' && estado!=='Aceptado' && estado!=='Rechazado' ? (
                <View style={styles.button}>
                    <TouchableOpacity onPress={onEditar}>
                        <Text style={styles.textEditar}>Editar Cotización</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onEliminar}>
                        <Text style={styles.textEliminar}>Eliminar Cotización</Text>
                    </TouchableOpacity>
                </View>
            ): null}
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
        flexShrink: 1,
        marginBottom: 4,
    },
    descripcion: {
        fontSize: 14,
        color: '#7f8c8d',
        fontStyle: 'italic',
        marginTop: 6,
        marginBottom: 6,
    },
    categoria: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
        borderWidth: 1,
        borderColor: '#dfe6e9',
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
    },
    estado: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    details: {
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
        paddingTop: 12,
        marginTop: 12,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    time: {
        marginLeft: 6,
        fontSize: 14,
        color: '#2c3e50',
    },
    label: {
        marginTop: 14,
        fontSize: 15,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 6,
    },
    text: {
        fontSize: 14,
        color: '#555',
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 4,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    textAceptar: {
        fontSize: 16,
        color: '#2f80ed',
        fontWeight: '600',
        backgroundColor: '#d0e8ff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    textRechazar: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: '600',
        backgroundColor: '#f8d7da',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    textEditar: {
        fontSize: 16,
        color: '#2f80ed',
        fontWeight: '600',
    },
    textEliminar: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: '600',
    },
}); 