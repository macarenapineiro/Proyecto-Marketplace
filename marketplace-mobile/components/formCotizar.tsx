import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CardSolicitudProps {
    title: string;
    description: string;
    categoria: string;
    ubicacion: string;
    fecha: string;
    estado: string;
    materiales: Material[];
}

interface Material {
    nombre: string;
    cantidad: number;
    unidad: string;
}

export default function formCotizar({title, description, categoria, ubicacion, fecha, estado, materiales}: CardSolicitudProps) {
    return( 
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.titulo}>Crear cotización</Text>
            </View>
            <View style={styles.title}>
                <Text style={styles.title}>Solicitud: {title}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.subtitle}>Solicitud</Text>
                <Text style={styles.descripcion}>{description}</Text>
                <Text style={styles.material}>Materiales necesarios:</Text>
                {materiales.map((material, index) => (
                    <Text key={index} style={styles.materialItem}>- {material.nombre} ({material.cantidad} {material.unidad})</Text>
                ))}
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.label}>Precio cotización:</Text>
                <TextInput style={styles.input} placeholder="Ingrese el precio total" keyboardType="numeric" />
                <Text style={styles.label}>Tiempo estimado:</Text>
                <TextInput style={styles.input} placeholder="Ingrese el tiempo estimado" />
                <Text style={styles.label}>Detalles adicionales:</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Ingrese detalles adicionales"
                    multiline
                />
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Enviar Cotización</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 16,
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
        marginBottom: 16,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    container: {
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    descripcion: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    material: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
    materialItem: {
        fontSize: 14,
        color: '#555',
    },
    cardContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 12,
    },
    submitButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    submitButtonText: {
        color: '#fff',
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    cancelButtonText: {
        color: '#fff',
    },
})