import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    tiempo: string; // fecha límite
    materiales: Material[];
}

export default function CardService({ titulo, descripcion, categoria, ubicacion, tiempo, materiales }: CardServiceProps) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>{titulo}</Text>
                <Text style={styles.estado}>Abierto</Text>
            </View>
            <Text style={styles.descripcion}>{descripcion}</Text>
            <Text style={styles.categoria}>{categoria}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowDetails(prev => !prev)}
            >
                <Text style={styles.buttonText}>{showDetails ? 'Ver menos' : 'Ver más info'}</Text>
            </TouchableOpacity>
            {showDetails && (
                <View style={styles.details}>
                    <View style={styles.rowItem}>
                        <MaterialIcons name="access-time" size={20} color="#000" />
                        <Text style={styles.time}>{tiempo}</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <MaterialIcons name="inventory" size={20} color="#000" />
                        <Text style={styles.time}>{materiales.length} </Text>
                    </View>
                    <View style={styles.rowItem}>
                        <MaterialIcons name="location-on" size={20} color="#000" />
                        <Text style={styles.time}>{ubicacion} </Text>
                    </View>
                    <Text style={styles.material}>Materiales solicitados</Text>
                    {materiales.map((m, i) => (
                        <Text style={styles.materialList}key={i}> {m.nombre} - {m.cantidad} {m.unidad}</Text>
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    estado: {
        backgroundColor: '#ABEBBA',
        color: '#438B54',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
        fontSize: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    descripcion: {
        fontSize: 16,
        color: '#777474',
        fontStyle: 'italic',
        marginTop: 8,
    },
    categoria: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignSelf: 'flex-start',
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    time: {
        marginLeft: 4,
        fontSize: 14,
        color: '#000',
    },
    material: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'italic',
    },
    materialList: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 8,
    },
    button: {
        marginTop: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: 'none',
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#386a95ff',
        fontWeight: 'bold',
    },
    details: {
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
})