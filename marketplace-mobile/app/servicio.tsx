import CardService from '@/components/cardService';
import Header from '@/components/header';
import { useAuth } from '@/context/AuthContext';
import { useSolicitud } from '@/context/SolicitudContext';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropdownComponent from '../components/dropDown';
import { TabParamList } from '../navigation/TabNavigator';
import { useCotizacion } from '@/context/CotizacionContext';

type ServicioNavigationProp = BottomTabNavigationProp<TabParamList, 'Servicio'>;

interface User {
    name: string;
    rol: 'Solicitante' | 'Proveedor' ;
}

interface AuthContextType {
    currentUser: User | null;
}

interface Material {
    nombre: string;
    cantidad: number;
    unidad: string;
}

interface Solicitud {
    id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    ubicacion: string;
    fechaLimite: string;
    materiales: Material[];
    estado: string;
}

interface SolicitudContextType {
    solicitudes: Solicitud[];
    seleccionarSolicitud: (solicitud: Solicitud) => void;
    solicitudesAbiertas: Solicitud[];
}

export default function Servicio() {
    const { seleccionarSolicitud, solicitudesAbiertas } = useSolicitud() as SolicitudContextType;
    const { currentUser } = useAuth() as AuthContextType;
    const navigation = useNavigation<ServicioNavigationProp>();
    const {cotizacionesServicio} = useCotizacion() as {cotizacionesServicio: any[]};

    const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
    const [ubicacionFiltro, setUbicacionFiltro] = useState<string>('Todas');
    const [fechaFiltro, setFechaFiltro] = useState<string>('Todas');

    const handleCotizar = (solicitud: Solicitud) => {
        seleccionarSolicitud(solicitud);
        navigation.navigate('Cotizar');

    };
    const solicitudesDisponibles = solicitudesAbiertas.filter(solicitud=>{
        const tieneCotizacion = cotizacionesServicio.some(
            (cotizacion:any) => cotizacion.solicitudId === solicitud.id &&
            (cotizacion.estado === 'Pendiente' || cotizacion.estado === 'Aceptado')
        );
        return !tieneCotizacion;
    })

    const filteredSolicitudes = solicitudesDisponibles.filter(solicitud => {
        return (categoriaFiltro === 'Todas' || solicitud.categoria === categoriaFiltro) &&
            (ubicacionFiltro === 'Todas' || solicitud.ubicacion === ubicacionFiltro) &&
            (fechaFiltro === 'Todas' || solicitud.fechaLimite === fechaFiltro);
    });

    const categoriaData = [
        { label: 'Todas', value: 'Todas' },
        { label: 'Reparaciones', value: 'reparaciones' },
        { label: 'Limpieza', value: 'limpieza' },
        { label: 'Jardinería', value: 'jardineria' },
        { label: 'Electricidad', value: 'electricidad' },
        { label: 'Plomería', value: 'plomeria' },
        { label: 'Pintura', value: 'pintura' },
        { label: 'Carpintería', value: 'carpinteria' },
        { label: 'Construcción', value: 'construccion' },
        { label: 'Mecánica', value: 'mecanica' },
    ];

    const ubicacionData = [
        { label: 'Todas', value: 'Todas' },
        { label: 'Maldonado', value: 'maldonado' },
        { label: 'Punta del Este', value: 'punta_del_este' },
        { label: 'San Carlos', value: 'san_carlos' },
        { label: 'Pan de Azúcar', value: 'pan_de_azucar' },
        { label: 'Piriápolis', value: 'piriapolis' },
        { label: 'La Barra', value: 'la_barra' },
        { label: 'José Ignacio', value: 'jose_ignacio' },
        { label: 'Otro', value: 'otro' },
    ];

    const fechaData = [
        { label: 'Todas', value: 'Todas' },
        ...solicitudesAbiertas.map(s => ({ label: s.fechaLimite, value: s.fechaLimite }))
    ];

    return (
        <SafeAreaView style={{ backgroundColor: '#f7f9fc', flex: 1 }}>
            <Header rol={currentUser?.rol || ''} name={currentUser?.name || ''} />
            <View style={styles.filtrosContainer}>
                <View style={styles.filtroRow}>
                    <View style={styles.filtroCol}>
                        <Text style={styles.filtroLabel}>Filtrar por categoría:</Text>
                        <DropdownComponent
                            label="Categoría"
                            data={categoriaData}
                            value={categoriaFiltro}
                            onValueChange={setCategoriaFiltro}
                            customStyles={{
                                dropdown: { height: 40 },
                                placeholderStyle: { fontSize: 12 },
                                selectedTextStyle: { fontSize: 12 },
                                inputSearchStyle: { fontSize: 12, height: 30 },
                            }}
                        />
                    </View>
                    <View style={styles.filtroCol}>
                        <Text style={styles.filtroLabel}>Filtrar por ubicación:</Text>
                        <DropdownComponent
                            label="Ubicación"
                            data={ubicacionData}
                            value={ubicacionFiltro}
                            onValueChange={setUbicacionFiltro}
                            customStyles={{
                                dropdown: { height: 40 },
                                placeholderStyle: { fontSize: 12 },
                                selectedTextStyle: { fontSize: 12 },
                                inputSearchStyle: { fontSize: 12, height: 30 },
                            }}
                        />
                    </View>
                    <View style={styles.filtroCol}>
                        <Text style={styles.filtroLabel}>Filtrar por fecha:</Text>
                        <DropdownComponent
                            label="Fecha"
                            data={fechaData}
                            value={fechaFiltro}
                            onValueChange={setFechaFiltro}
                            customStyles={{
                                dropdown: { height: 40 },
                                placeholderStyle: { fontSize: 12 },
                                selectedTextStyle: { fontSize: 12 },
                                inputSearchStyle: { fontSize: 12, height: 30 },
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => { setCategoriaFiltro('Todas'); setUbicacionFiltro('Todas'); setFechaFiltro('Todas'); }}
                    style={styles.resetButton}
                >
                    <Text style={styles.resetText}>Resetear filtros</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content}>
                <Text style={styles.headline}>Solicitudes disponibles</Text>
                {solicitudesAbiertas.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyCard}>
                            <Text style={styles.emptyTitle}>No tienes solicitudes aún</Text>
                            <Text style={styles.emptyText}>Parece que aún no has recibido solicitudes. Una vez el solicitante cree una solicitud, aparecerá aquí.</Text>
                        </View>
                    </View>
                ) : filteredSolicitudes.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyCard}>
                            <Text style={styles.emptyTitle}>Sin resultados</Text>
                            <Text style={styles.emptyText}>No se encontraron solicitudes que coincidan con los filtros seleccionados.
                                Prueba modificando o restableciendo los filtros.
                            </Text>
                        </View>
                    </View>
                ):(
                    filteredSolicitudes.map((solicitud, index) => (
                        <CardService
                            key={index}
                            titulo={solicitud.titulo}
                            descripcion={solicitud.descripcion}
                            categoria={solicitud.categoria}
                            ubicacion={solicitud.ubicacion}
                            tiempo={solicitud.fechaLimite}
                            materiales={solicitud.materiales}
                            estado={solicitud.estado as 'Abierto' | 'Pendiente' | 'Aceptado' | 'Rechazado'}
                            onCotizar={() => handleCotizar(solicitud)}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f7f9fc',
    },
    filtrosContainer: {
        marginHorizontal: 20,
        marginVertical: 15,
    },
    filtroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f7f9fc',
        padding: 10,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    filtroCol: {
        flex: 1,
        marginHorizontal: 5,
    },
    filtroLabel: {
        fontWeight: '600',
        marginBottom: 4,
        color: '#2c3e50',
        textAlign: 'center',
    },
    resetButton: {
        marginTop: 12,
        alignSelf: 'center',
        backgroundColor: '#4C8BF5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    resetText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    headline: {
        fontSize: 22,
        fontWeight: '700',
        marginVertical: 20,
        textAlign: 'center',
        color: '#2c3e50',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
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