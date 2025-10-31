import './insumo.css';
import CardHeader from '../../components/cardHeader/cardHeader'
import TabComponent from '../../components/tab/Tab'
import FormCotizacionMaterial from '../../components/formCotizacionMaterial/formCotizacionMaterial'
import CardInsumos from '../../components/cardInsumos/CardInsumos'
import CardCotizacion from '../../components/cardCotizacion/cardCotizacion'
import { useState } from 'react'
import { useSolicitudes } from '../../context/ServiceContext'
import {useAuth} from '../../context/AuthContext'

export default function Insumo() {
    const { currentUser } = useAuth();
    const { solicitudes, cotizacionesInsumos, agregarCotizacion, actualizarCotizacion, eliminarCotizacion } = useSolicitudes();
    
    const [showForm, setShowForm] = useState(false);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const [materialSeleccionado, setMaterialSeleccionado] = useState(null);
    const [cotizacionEditar, setCotizacionEditar] = useState(null);

    const handleCancelar = () => {
        setShowForm(false);
        setSolicitudSeleccionada(null);
        setMaterialSeleccionado(null);
        setCotizacionEditar(null);
    };

    const handleCotizarMaterial = (solicitud, material) => {
        setSolicitudSeleccionada(solicitud);
        setMaterialSeleccionado(material);
        setCotizacionEditar(null);
        setShowForm(true);
    };

    const handleEditar = (cotizacion) => {
        const solicitud = solicitudes.find(s => s.id === cotizacion.solicitudId);
        setSolicitudSeleccionada(solicitud);
        setMaterialSeleccionado({
            id: cotizacion.materialId,
            nombre: cotizacion.materialNombre,
            cantidad: cotizacion.materialCantidad,
            unidad: cotizacion.materialUnidad,
        });
        setCotizacionEditar(cotizacion);
        cotizacion.esEdicion = true;
        setShowForm(true);
    };

    const handleEliminar = (cotizacion) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta cotización?')) {
            eliminarCotizacion(cotizacion.id, 'insumo');
        }
    };

    const handleEnviarCotizacion = (cotizacion) => {
        if (cotizacion.esEdicion) {
            actualizarCotizacion(cotizacion.id, {
                precio: cotizacion.precio,
                tiempoEntrega: cotizacion.tiempoEntrega,
                observaciones: cotizacion.observaciones,
                descripcion: cotizacion.observaciones || `Cotización para ${cotizacion.materialCantidad} ${cotizacion.materialUnidad} de ${cotizacion.materialNombre}`,
            }, 'insumo');
        } else {
            agregarCotizacion({
                ...cotizacion,
                id: Date.now(),
                proveedor: currentUser?.name || 'Proveedor Insumos',
                titulo: `Material: ${cotizacion.materialNombre}`,
                descripcion: cotizacion.observaciones || `Cotización para ${cotizacion.materialCantidad} ${cotizacion.materialUnidad} de ${cotizacion.materialNombre}`,
                estado: "Pendiente",
                tipo: 'insumo',
            });
        }

        handleCancelar();
    };

    const solicitudesDisponiblesFunc = () => {
        const idsConCotizacionInsumo = (cotizacionesInsumos || []).map(c => c.solicitudId);
        return (solicitudes || []).filter(s => s.estado === 'Abierto' && !idsConCotizacionInsumo.includes(s.id));
    };

    const misCotizacionesFunc = () => {
        return (cotizacionesInsumos || []).filter(c => c.proveedor === currentUser?.name);
    };

    const solicitudesDisponibles = solicitudesDisponiblesFunc();
    const misCotizaciones = misCotizacionesFunc();

    return (
        <div className='insumoContainer'>
            <CardHeader rol={currentUser.rol} nombre={currentUser.name} />
            {showForm && materialSeleccionado && (
                <FormCotizacionMaterial
                    material={materialSeleccionado}
                    solicitud={solicitudSeleccionada}
                    cotizacion={cotizacionEditar}
                    onCancel={handleCancelar}
                    onSubmit={handleEnviarCotizacion}
                />
            )}

            {/* Tabs con solicitudes */}
            <div className="servicioContainer">
                <TabComponent
                    text1="Solicitudes disponibles"
                    text2="Mis cotizaciones"
                    solicitudes={solicitudesDisponibles}
                    cotizaciones={misCotizaciones}
                    CardServiceComponent={(props) => (
                        <CardInsumos 
                            {...props}
                            onCotizarMaterial={(material) => handleCotizarMaterial(props.solicitud, material)}
                        />
                    )}
                    CardCotizacionComponent={CardCotizacion}
                    mostrarBotonCotizar={true}
                    mostrarEditarCotizacion={true}
                    mostrarEliminarCotizacion={true}
                    onEditarCotizacion={handleEditar}
                    onEliminarCotizacion={handleEliminar}
                />
            </div>
        </div>
    )
}