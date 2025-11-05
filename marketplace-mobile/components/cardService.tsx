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
                        <Text style={styles.time}>{ubicacion.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Text>
                    </View>
                    <Text style={styles.material}>Materiales solicitados</Text>
                    {materiales.map((m, i) => (
                        <Text style={styles.materialList} key={i}> {m.nombre} - {m.cantidad} {m.unidad}</Text>
                    ))}
                </View>
            )}
            <TouchableOpacity
                style={[
                    styles.button,
                    showDetails ? styles.buttonLess : styles.buttonMore,
                ]}
                onPress={() => setShowDetails((prev) => !prev)}
            >
                <Text
                    style={[
                        styles.buttonText,
                        showDetails ? styles.buttonTextLess : styles.buttonTextMore,
                    ]}
                >
                    {showDetails ? 'Ver menos' : 'Ver más info'}
                </Text>
            </TouchableOpacity>
        </View>
    )
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
    estado: {
        backgroundColor: '#D4EFDF',
        color: '#1E8449',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        fontSize: 14,
        fontWeight: '600',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 4,
    },
    descripcion: {
        fontSize: 15,
        color: '#7f8c8d',
        fontStyle: 'italic',
        marginTop: 6,
    },
    categoria: {
        marginTop: 10,
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
    material: {
        marginTop: 14,
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 6,
    },
    materialList: {
        fontSize: 14,
        color: '#555',
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 4,
    },
    details: {
        borderTopColor: '#ecf0f1',
        borderTopWidth: 1,
        paddingTop: 12,
        marginTop: 12,
    },
    button: {
        marginTop: 16,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    buttonMore: {
    backgroundColor: '#5dade2',
  },
  buttonLess: {
    backgroundColor: '#aeb6bf',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonTextMore: {
    color: '#fff',
  },
  buttonTextLess: {
    color: '#2c3e50',
  },
})