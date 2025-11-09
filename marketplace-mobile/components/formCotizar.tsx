import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCotizacion } from '../context/CotizacionContext';
import { useSolicitud } from '../context/SolicitudContext';

interface FormCotizarProps {
    title: string;
    description: string;
    categoria: string;
    ubicacion: string;
    fecha: string;
    estado: string;
    materiales: Material[];
    cotizacionExistente?: Cotizacion | null;
    onSubmit?: (cotizacion: any) => void;
}
interface Cotizacion {
    id: string;
    title: string;
    description: string;
    categoria: string;
    ubicacion: string;
    fecha: string;
    estado: string;
    materiales: Material[];
    precio: string;
    tiempoEstimado: string;
    detallesAdicionales: string;
}

interface Material {
    nombre: string;
    cantidad: number;
    unidad: string;
}

export default function FormCotizar({ title, description, categoria, ubicacion, fecha, estado, materiales, cotizacionExistente, onSubmit }: FormCotizarProps) {
    const { agregarCotizacionServicio } = useCotizacion() as {
        cotizacionesServicio: any[];
        agregarCotizacionServicio: (cotizacion: any) => void;
    };
    const { actualizarEstadoSolicitud, limpiarSolicitudSeleccionada } = useSolicitud() as any;

    const [formData, setFormData] = useState({
        precio: cotizacionExistente?.precio?.toString() || '',
        tiempoEstimado: cotizacionExistente?.tiempoEstimado || '',
        detallesAdicionales: cotizacionExistente?.detallesAdicionales || '',
    });

    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleCancel = () => {
        setFormData({
            precio: '',
            tiempoEstimado: '',
            detallesAdicionales: '',
        });
    }

    const handleSubmit = () => {
        if (!formData.precio || !formData.tiempoEstimado) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }
        const nuevaCotizacion = {
            id: cotizacionExistente?.id || Date.now().toString(),
            title,
            description,
            categoria,
            ubicacion,
            fecha,
            estado: "Pendiente",
            materiales,
            ...formData,
        };
        if (onSubmit) {
            onSubmit(nuevaCotizacion);
        }
        else {
            agregarCotizacionServicio(nuevaCotizacion);
            actualizarEstadoSolicitud(title, 'Pendiente');
        }
        handleCancel();
        Alert.alert(
            '¡Éxito!',
            'La cotización se creó correctamente.',
            [{ text: 'Aceptar', onPress: () => limpiarSolicitudSeleccionada() }],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.card}>
            <Text style={styles.header}>Crear cotización</Text>
            <View style={styles.title}>
                <Text style={styles.title}>Solicitud: {title}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.subtitle}>Solicitud</Text>
                <Text style={styles.text}>{description}</Text>
                <Text style={styles.subtitle}>Materiales necesarios:</Text>
                {materiales.map((material, index) => (
                    <Text key={index} style={styles.text}>- {material.nombre} ({material.cantidad} {material.unidad})</Text>
                ))}
            </View>
            <View style={styles.formSection}>
                <Text style={styles.label}>Precio cotización:</Text>
                <TextInput value={formData.precio} style={styles.input} placeholder="Ingrese el precio total" keyboardType="numeric" placeholderTextColor="#999" onChangeText={(value) => handleChange('precio', value)} />
                <Text style={styles.label}>Tiempo estimado:</Text>
                <TextInput value={formData.tiempoEstimado} style={styles.input} placeholder="Ingrese el tiempo estimado" placeholderTextColor="#999" onChangeText={(value) => handleChange('tiempoEstimado', value)} />
                <Text style={styles.label}>Detalles adicionales:</Text>
                <TextInput
                    value={formData.detallesAdicionales}
                    style={[styles.input, { height: 100 }]}
                    placeholder="Ingrese detalles adicionales"
                    multiline
                    placeholderTextColor="#999"
                    onChangeText={(value) => handleChange('detallesAdicionales', value)}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Enviar Cotización</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fafafa',
        borderRadius: 16,
        padding: 20,
        margin: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        color: '#222',
        marginBottom: 16,
        textAlign: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#444',
        marginTop: 8,
        marginBottom: 4,
    },
    text: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    formSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#444',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#333',
        marginBottom: 14,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#2f80ed',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 8,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 8,
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: '500',
        fontSize: 15,
    },
})