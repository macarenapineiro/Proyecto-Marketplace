import './insumo.css';
import CardHeader from '../../components/cardHeader/cardHeader'
import TabComponent from '../../components/tab/Tab'
import FormCotizacionMaterial from '../../components/formCotizacionMaterial/formCotizacionMaterial'
import CardInsumos from '../../components/cardInsumos/CardInsumos'
import CardCotizacion from '../../components/cardCotizacion/cardCotizacion'
import { useState } from 'react'
import { useSolicitudes } from '../../context/ServiceContext'
import { useAuth } from '../../context/AuthContext'

export default function Insumo() {
    const { currentUser } = useAuth();
    const { solicitudes, cotizacionesInsumos, agregarCotizacion, actualizarCotizacion, eliminarCotizacion } = useSolicitudes();

    const [showForm, setShowForm] = useState(false);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const [materialSeleccionado, setMaterialSeleccionado] = useState(null);
    const [cotizacionEditar, setCotizacionEditar] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('Todas');
    const [fechaFiltrar, setFechaFiltrar] = useState('');

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
            setSolicitudSeleccionada(null);
            setMaterialSeleccionado(null);
        }

        handleCancelar();
    };

    const solicitudesDisponiblesFunc = () => {
        return (solicitudes || []).filter(s => s.estado === 'Abierto').map(s => {
            const materialesPendientes = s.materiales.filter(m => {
                return !(cotizacionesInsumos || []).some(c => c.solicitudId === s.id && (c.materialId === m.id || c.materialId === m.nombre));
            });
            return {
                ...s,
                materiales: materialesPendientes
            };
        })
            .filter(s => s.materiales.length > 0)
            .filter(s => s.estado === 'Abierto' && s.materiales.length > 0)
            .filter(s => categoriaSeleccionada === 'Todas' || s.categoria === categoriaSeleccionada)
            .filter(s => ubicacionSeleccionada === 'Todas' || s.ubicacion === ubicacionSeleccionada)
            .filter(s => !fechaFiltrar || !s.fechaLimite || s.fechaLimite <= fechaFiltrar);
        // const idsConCotizacionInsumo = (cotizacionesInsumos || []).map(c => c.solicitudId);
        // let filtradas = (solicitudes || []).filter(s => s.estado === 'Abierto' && !idsConCotizacionInsumo.includes(s.id));
        // if (categoriaSeleccionada !== 'Todas') {
        //     filtradas = filtradas.filter(s => s.categoria === categoriaSeleccionada);
        // }
        // if (ubicacionSeleccionada !== 'Todas') {
        //     filtradas = filtradas.filter(s => s.ubicacion === ubicacionSeleccionada);
        // }
        // if (fechaFiltrar) {
        //     filtradas = filtradas.filter(
        //         s => !s.fechaLimite || s.fechaLimite <= fechaFiltrar
        //     );
        // }
        // return filtradas;
    };

    // const misCotizacionesFunc = () => {
    //     return (cotizacionesInsumos || []).filter(c => c.proveedor === currentUser?.name);
    // };

    const solicitudesDisponibles = solicitudesDisponiblesFunc();
    const misCotizaciones = cotizacionesInsumos.filter(c => c.proveedor === currentUser?.name);;

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
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <label style={{ marginRight: '10px' }}>Filtrar por categoría:</label>
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    >
                        <option value="Todas">Todas</option>
                        <option value="reparaciones">reparaciones</option>
                        <option value="limpieza">limpieza</option>
                        <option value="jardineria">jardinería</option>
                        <option value="electricidad">Electricidad</option>
                        <option value="plomeria">Plomería</option>
                        <option value="pintura">Pintura</option>
                        <option value="carpinteria">Carpintería</option>
                        <option value="construccion">Construcción</option>
                        <option value="mecanica">Mecánica</option>
                    </select>
                    <label style={{ margin: '0 10px' }}>Filtrar por ubicación:</label>
                    <select
                        value={ubicacionSeleccionada}
                        onChange={(e) => setUbicacionSeleccionada(e.target.value)}
                    >
                        <option value="Todas">Todas</option>
                        <option value="Maldonado">Maldonado</option>
                        <option value="Punta del Este">Punta del Este</option>
                        <option value="San Carlos">San Carlos</option>
                        <option value="Pan de Azúcar">Pan de Azúcar</option>
                        <option value="Piriápolis">Piriápolis</option>
                        <option value="La Barra">La Barra</option>
                        <option value="José Ignacio">José Ignacio</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <label>Filtrar por fecha:</label>
                    <input
                        type="date"
                        value={fechaFiltrar}
                        onChange={(e) => setFechaFiltrar(e.target.value)}
                    />
                </div>
                <TabComponent
                    text1="Solicitudes disponibles"
                    text2="Mis cotizaciones"
                    solicitudes={solicitudesDisponibles}
                    cotizaciones={misCotizaciones}
                    CardServiceComponent={(props) => (
                        <CardInsumos
                            mostrarBotonCotizar={true}
                            solicitudId={props.solicitud.id}
                            cotizaciones={misCotizaciones}
                            {...props.solicitud}
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