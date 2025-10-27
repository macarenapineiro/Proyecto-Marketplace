import './Cliente.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import CardService from '../../components/CardService/CardService'
import TabComponent from '../../components/tab/Tab'
import FormSolicitud from '../../components/formSolicitud/formSolicitud'
import CardCotizacion from '../../components/cardCotizacion/cardCotizacion'
import {useState, useMemo} from 'react'
import { useSolicitudes } from '../../context/ServiceContext'
import {useAuth} from '../../context/AuthContext'

export default function Cliente() {
  const {currentUser} = useAuth();
  const { solicitudes, cotizaciones, agregarSolicitud, agregarCotizacion, actualizarEstadoCotizacion } = useSolicitudes();
  const [showForm, setShowForm] = useState(false);

  const handleNuevaSolicitud = () => {
    setShowForm(true);
  };

  const handleCancelar = () => {
    setShowForm(false);
  };

  const handleCrearSolicitud = (nuevaSolicitud) => {
    // Adjuntar cliente creador a la solicitud
    agregarSolicitud({ ...nuevaSolicitud, cliente: currentUser?.name || 'Cliente' });
    setShowForm(false);
  };

  // Filtrar: solo mis solicitudes abiertas (sin cotizar)
  const misSolicitudesAbiertas = useMemo(() => {
    return (solicitudes || []).filter(s => s.cliente === currentUser?.name && s.estado === 'Abierto');
  }, [solicitudes, currentUser]);

  // Cotizaciones recibidas para mis solicitudes
  const misCotizaciones = useMemo(() => {
    const idsMisSolicitudes = new Set((solicitudes || []).filter(s => s.cliente === currentUser?.name).map(s => s.id));
    // Enriquecer con el título de la solicitud para mostrar en la tarjeta
    const tituloPorId = new Map((solicitudes || []).map(s => [s.id, s.titulo]));
    return (cotizaciones || [])
      .filter(c => idsMisSolicitudes.has(c.solicitudId))
      .map(c => ({ ...c, titulo: `Para: ${tituloPorId.get(c.solicitudId) || 'Solicitud'}` }));
  }, [cotizaciones, solicitudes, currentUser]);

  const handleAceptar = (cotizacion) => {
    actualizarEstadoCotizacion(cotizacion.id, 'Aceptado');
  };
  const handleRechazar = (cotizacion) => {
    actualizarEstadoCotizacion(cotizacion.id, 'Rechazado');
  };

  return (
    <div className="clienteContainer">
      <CardHeader rol={currentUser.rol} nombre={currentUser.name} />

      <div className="buttonContainer">
        {/* Mostrar botón solo si el formulario NO está visible */}
      {!showForm && (
        <button 
          className="nuevaSolicitudButton" 
          onClick={handleNuevaSolicitud}
        >
          + Nueva solicitud
        </button>
      )}

      {/* Mostrar formulario si showForm es true */}
      {showForm && (
        <FormSolicitud 
          onSubmit={handleCrearSolicitud} 
          onCancel={handleCancelar} 
        />
      )}
      </div>

      {/* Tabs con solicitudes */}
      <div className="servicioContainer">
        <TabComponent 
          text1="Mis solicitudes" 
          text2="Cotizaciones"
          solicitudes={misSolicitudesAbiertas}
          cotizaciones={misCotizaciones}
          CardServiceComponent={CardService}
          CardCotizacionComponent={CardCotizacion}
          mostrarAccionesCotizacion={true}
          onAceptarCotizacion={handleAceptar}
          onRechazarCotizacion={handleRechazar}
        />
      </div>
    </div>
  );
}