import './Cliente.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import CardService from '../../components/CardService/CardService'
import TabComponent from '../../components/tab/Tab'
import FormSolicitud from '../../components/formSolicitud/formSolicitud'
import CardCotizacion from '../../components/cardCotizacion/cardCotizacion'
import { useState, useMemo, useEffect } from 'react'
import { useSolicitudes } from '../../context/ServiceContext'
import { useAuth } from '../../context/AuthContext'

export default function Cliente() {
  const { currentUser } = useAuth();
  const { solicitudes, cotizacionesServicios, cotizacionesInsumos, agregarSolicitud, agregarCotizacion, actualizarEstadoCotizacion } = useSolicitudes();
  const [showForm, setShowForm] = useState(false);
  const [sort, setSort] = useState("asc");

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

  // Filtrar: solo mis solicitudes abiertas (sin cotización de ningún tipo)
  const misSolicitudesAbiertas = useMemo(() => {
    const idsConCotizacion = new Set([
      ...(cotizacionesServicios || []).map(c => c.solicitudId),
      ...(cotizacionesInsumos || []).map(c => c.solicitudId)
    ]);
    return (solicitudes || []).filter(s => s.cliente === currentUser?.name && !idsConCotizacion.has(s.id));
  }, [solicitudes, cotizacionesServicios, cotizacionesInsumos, currentUser]);

  // Cotizaciones de servicios recibidas para mis solicitudes
  const misCotizacionesServicios = useMemo(() => {
    const idsMisSolicitudes = new Set((solicitudes || []).filter(s => s.cliente === currentUser?.name).map(s => s.id));
    const tituloPorId = new Map((solicitudes || []).map(s => [s.id, s.titulo]));
    return (cotizacionesServicios || [])
      .filter(c => idsMisSolicitudes.has(c.solicitudId))
      .map(c => ({ ...c, titulo: `Para: ${tituloPorId.get(c.solicitudId) || 'Solicitud'}`, tipo: 'servicio' }));
  }, [cotizacionesServicios, solicitudes, currentUser]);

  // Cotizaciones de insumos recibidas para mis solicitudes
  const misCotizacionesInsumos = useMemo(() => {
    const idsMisSolicitudes = new Set((solicitudes || []).filter(s => s.cliente === currentUser?.name).map(s => s.id));
    const tituloPorId = new Map((solicitudes || []).map(s => [s.id, s.titulo]));
    return (cotizacionesInsumos || [])
      .filter(c => idsMisSolicitudes.has(c.solicitudId))
      .map(c => ({ ...c, titulo: `Material: ${c.materialNombre} (${tituloPorId.get(c.solicitudId) || 'Solicitud'})`, tipo: 'insumo' }));
  }, [cotizacionesInsumos, solicitudes, currentUser]);

  const handleAceptar = (cotizacion) => {
    actualizarEstadoCotizacion(cotizacion.id, 'Aceptado', cotizacion.tipo);
  };

  const handleRechazar = (cotizacion) => {
    actualizarEstadoCotizacion(cotizacion.id, 'Rechazado', cotizacion.tipo);
  };

  const handleOrdenarPorPrecio = () => {
    setSort(prevSort => prevSort === "asc" ? "desc" : "asc");
  }

  // Ordenar ambas listas si se desea
  useEffect(() => {
    // ...puedes implementar ordenamiento si lo deseas...
  }, [sort, misCotizacionesServicios, misCotizacionesInsumos])

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
        <button onClick={handleOrdenarPorPrecio}>Ordenar por precio</button>
        <TabComponent
          text1="Mis solicitudes"
          text2="Cotizaciones"
          solicitudes={misSolicitudesAbiertas}
          cotizaciones={[]}
          CardServiceComponent={CardService}
          CardCotizacionComponent={CardCotizacion}
          mostrarAccionesCotizacion={true}
          onAceptarCotizacion={handleAceptar}
          onRechazarCotizacion={handleRechazar}
          customCotizacionesRender={() => (
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', width: '100%' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ textAlign: 'center' }}>Cotizaciones de Servicios</h3>
                {misCotizacionesServicios.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No hay cotizaciones de servicios aún.</p>
                ) : (
                  misCotizacionesServicios.map((c) => (
                    <CardCotizacion
                      key={c.id}
                      {...c}
                      mostrarAcciones={true}
                      onAceptar={() => handleAceptar(c)}
                      onRechazar={() => handleRechazar(c)}
                    />
                  ))
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ textAlign: 'center' }}>Cotizaciones de Insumos</h3>
                {misCotizacionesInsumos.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No hay cotizaciones de insumos aún.</p>
                ) : (
                  misCotizacionesInsumos.map((c) => (
                    <CardCotizacion
                      key={c.id}
                      {...c}
                      mostrarAcciones={true}
                      onAceptar={() => handleAceptar(c)}
                      onRechazar={() => handleRechazar(c)}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}