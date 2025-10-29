import './servicio.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import TabComponent from '../../components/tab/Tab'
import CardService from '../../components/CardService/CardService'
import FormCotizacion from '../../components/formCotizacion/formCotizacion'
import CardCotizacion from '../../components/cardCotizacion/cardCotizacion'
import { useMemo, useState, useEffect } from 'react'
import { useSolicitudes } from '../../context/ServiceContext'
import { useAuth } from '../../context/AuthContext'

export default function Servicio() {
  // const services = useServicio();
  const { solicitudes, cotizaciones, agregarCotizacion, actualizarCotizacion, eliminarCotizacion } = useSolicitudes();
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [cotizacionEditar, setCotizacionEditar] = useState(null);
  // const [filteredAndSortedServices, setFilteredAndSortedServices] = useState(services);
  // const [sort, setSort] = useState('asc');
  // const [filterBy, setFilterBy] = useState(null);

  const handleCancelar = () => {
    setShowForm(false);
    setSolicitudSeleccionada(null);
    setCotizacionEditar(null);
  };

  const handleCotizar = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setCotizacionEditar(null);
    setShowForm(true);
  };

  const handleEditar = (cotizacion) => {
    // Encontrar la solicitud asociada
    const solicitud = solicitudes.find(s => s.id === cotizacion.solicitudId);
    setSolicitudSeleccionada(solicitud);
    setCotizacionEditar(cotizacion);
    setShowForm(true);
  };

  const handleEliminar = (cotizacion) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cotización?')) {
      eliminarCotizacion(cotizacion.id, 'servicio');
    }
  };

  const handleEnviarCotizacion = (cotizacion) => {
    const solicitud = solicitudes.find(s => s.id === cotizacion.solicitudId);
    
    if (cotizacion.esEdicion) {
      // Actualizar cotización existente
      actualizarCotizacion(cotizacion.id, {
        precio: cotizacion.precio,
        tiempoEntrega: cotizacion.tiempoEntrega,
        descripcion: cotizacion.descripcion,
      }, 'servicio');
    } else {
      // Crear nueva cotización
      agregarCotizacion({
        ...cotizacion,
        id: Date.now(),
        proveedor: currentUser?.name || 'Proveedor',
        titulo: solicitud ? `Cotización: ${solicitud.titulo}` : undefined,
        estado: "Pendiente",
        tipo: 'servicio',
      });
    }
    
    setShowForm(false);
    setSolicitudSeleccionada(null);
    setCotizacionEditar(null);
  };

  // Solo mostrar solicitudes que no tengan cotización de servicio
  const { cotizacionesServicios } = useSolicitudes();
  const solicitudesDisponibles = useMemo(() => {
    const idsConCotizacionServicio = new Set((cotizacionesServicios || []).map(c => c.solicitudId));
    return (solicitudes || []).filter(s => s.estado === 'Abierto' && !idsConCotizacionServicio.has(s.id));
  }, [solicitudes, cotizacionesServicios]);
  const misCotizaciones = useMemo(() => {
    return (cotizacionesServicios || []).filter(c => c.proveedor === currentUser?.name);
  }, [cotizacionesServicios, currentUser]);

  // const handleFiltroCategoria = (categoria) => {
  //   setFilteredAndSortedServices(services.filter(s => s.categoria === categoria));
  // }

  // useEffect(() => {
  //   setFilteredAndSortedServices(prevServices => { const sorted = [...prevServices];
  //   let filtered = sorted;
  //   if (filterBy !== null) {
  //   })
  // })

  return (
    <div className="clienteContainer">
      <CardHeader rol={currentUser.rol} nombre={currentUser.name} />

      {/* Solo mostrar el formulario si hay una solicitud seleccionada */}
      {showForm && (
        <FormCotizacion
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
          CardServiceComponent={CardService}
          CardCotizacionComponent={CardCotizacion}
          mostrarBotonCotizar={true}
          mostrarEditarCotizacion={true}
          mostrarEliminarCotizacion={true}
          onCotizar={handleCotizar}
          onEditarCotizacion={handleEditar}
          onEliminarCotizacion={handleEliminar}
        />
      </div>
    </div>
  );
}

// function useServicio(){
//   return solicitudesDisponibles;
// }