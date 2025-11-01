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
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('Todas');
  const [fechaFiltrar, setFechaFiltrar] = useState('');

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
    let filtradas = (solicitudes || []).filter(s => s.estado === 'Abierto' && !idsConCotizacionServicio.includes(s.id));
    if (categoriaSeleccionada !== 'Todas') {
      filtradas = filtradas.filter(s => s.categoria === categoriaSeleccionada);
    }
    if (ubicacionSeleccionada !== 'Todas') {
      filtradas = filtradas.filter(s => s.ubicacion === ubicacionSeleccionada);
    }
    if (fechaFiltrar) {
      filtradas = filtradas.filter(
        s => !s.fechaLimite || s.fechaLimite <= fechaFiltrar
      );
    }
    return filtradas;
  }

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
