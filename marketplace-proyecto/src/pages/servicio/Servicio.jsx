import './servicio.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import TabComponent from '../../components/tab/Tab'
import CardService from '../../components/CardService/CardService'
import FormCotizacion from '../../components/formCotizacion/formCotizacion'
import CardCotizacion from '../../components/cardCotizacion/cardCotizacion'
import { useState } from 'react'
import { useSolicitudes } from '../../context/ServiceContext'
import { useAuth } from '../../context/AuthContext'

export default function Servicio() {
  const { solicitudes, cotizacionesServicios, agregarCotizacion, actualizarCotizacion, eliminarCotizacion } = useSolicitudes();
  const { currentUser } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [cotizacionEditar, setCotizacionEditar] = useState(null);

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
    if (cotizacion.esEdicion) {
      actualizarCotizacion(cotizacion.id, {
        precio: cotizacion.precio,
        tiempoEntrega: cotizacion.tiempoEntrega,
        descripcion: cotizacion.descripcion,
      }, 'servicio');
    } else {
      agregarCotizacion({
        ...cotizacion,
        id: Date.now(),
        proveedor: currentUser?.name || 'Proveedor',
        titulo: solicitudSeleccionada ? `Cotización: ${solicitudSeleccionada.titulo}` : undefined,
        estado: "Pendiente",
        tipo: 'servicio',
      });
    }

    handleCancelar();
  };

  const solicitudesDisponiblesFunc = () => {
    const idsConCotizacionServicio = (cotizacionesServicios || []).map(c => c.solicitudId);
    return (solicitudes || []).filter(s => s.estado === 'Abierto' && !idsConCotizacionServicio.includes(s.id));
  };

  const misCotizacionesFunc = () => {
    return (cotizacionesServicios || []).filter(c => c.proveedor === currentUser?.name);
  };

  const solicitudesDisponibles = solicitudesDisponiblesFunc();
  const misCotizaciones = misCotizacionesFunc();

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