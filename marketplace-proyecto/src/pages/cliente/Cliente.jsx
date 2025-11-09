import './Cliente.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import CardService from '../../components/CardService/CardService'
import TabComponent from '../../components/tab/Tab'
import FormSolicitud from '../../components/formSolicitud/formSolicitud'
import CardCotizacion from '../../components/cardCotizacion/cardCotizacion'
import { useState } from 'react'
import { useSolicitudes } from '../../context/ServiceContext'
import { useAuth } from '../../context/AuthContext'
import { ToastContainer } from 'react-toastify';

export default function Cliente() {
  const { currentUser } = useAuth();
  const {
    solicitudes,
    cotizacionesServicios,
    cotizacionesInsumos,
    agregarSolicitud,
    actualizarEstadoCotizacion
  } = useSolicitudes();

  const [showForm, setShowForm] = useState(false);
  const [sort, setSort] = useState("asc");
  const [estadoFiltro, setEstadoFiltro] = useState('Pendiente');

  const handleNuevaSolicitud = () => {
    setShowForm(true);
  };

  const handleCancelar = () => {
    setShowForm(false);
  };

  const handleCrearSolicitud = (nuevaSolicitud) => {
    agregarSolicitud({ ...nuevaSolicitud, cliente: currentUser?.name || 'Cliente' });
    setShowForm(false);
  };

  const misSolicitudesAbiertas = () => {
    const idsConCotizacion = new Set([
      ...(cotizacionesServicios || []).map(c => c.solicitudId),
      ...(cotizacionesInsumos || []).map(c => c.solicitudId)
    ]);
    return (solicitudes || []).filter(s => s.cliente === currentUser?.name && !idsConCotizacion.has(s.id));
  }

  const misCotizacionesServicios = () => {
    const misIds = new Set((solicitudes || []).filter(s => s.cliente === currentUser?.name).map(s => s.id));
    const tituloPorId = new Map((solicitudes || []).map(s => [s.id, s.titulo]));
    return (cotizacionesServicios || [])
      .filter(c => misIds.has(c.solicitudId) && c.estado === estadoFiltro)
      .map(c => ({ ...c, titulo: `Para: ${tituloPorId.get(c.solicitudId) || 'Solicitud'}`, tipo: 'servicio' }));
  }

  const misCotizacionesInsumos = () => {
    const misIds = new Set((solicitudes || []).filter(s => s.cliente === currentUser?.name).map(s => s.id));
    const tituloPorId = new Map((solicitudes || []).map(s => [s.id, s.titulo]));
    return (cotizacionesInsumos || [])
      .filter(c => misIds.has(c.solicitudId) && c.estado === estadoFiltro)
      .map(c => ({ ...c, titulo: `Material: ${c.materialNombre} (${tituloPorId.get(c.solicitudId) || 'Solicitud'})`, tipo: 'insumo' }));
  }

  const handleAceptar = (cotizacion) => {
    actualizarEstadoCotizacion(cotizacion.id, 'Aceptado', cotizacion.tipo);
  };

  const handleRechazar = (cotizacion) => {
    actualizarEstadoCotizacion(cotizacion.id, 'Rechazado', cotizacion.tipo);
  };

  const handleOrdenarPorPrecio = () => {
    setSort(prevSort => prevSort === "asc" ? "desc" : "asc");
  }

  const ordernarPorPrecio = (lista) => {
    const copia = [...lista];
    copia.sort((a, b) => {
      if (sort === "asc") {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    })
    return copia;
  }

  const solicitudesAbiertas = misSolicitudesAbiertas();
  const cotServ = ordernarPorPrecio(misCotizacionesServicios());
  const cotInsu = ordernarPorPrecio(misCotizacionesInsumos());

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
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      </div>

      {/* Tabs con solicitudes */}
      <div className="servicioContainer">
        <TabComponent
          text1="Mis solicitudes"
          text2="Cotizaciones"
          solicitudes={solicitudesAbiertas}
          cotizaciones={[]}
          CardServiceComponent={CardService}
          CardCotizacionComponent={CardCotizacion}
          mostrarAccionesCotizacion={true}
          onAceptarCotizacion={handleAceptar}
          onRechazarCotizacion={handleRechazar}
          customCotizacionesRender={() => (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
                {['Pendiente', 'Aceptado', 'Rechazado'].map((estado) => (
                  <button
                    key={estado}
                    onClick={() => setEstadoFiltro(estado)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: estadoFiltro === estado ? '2px solid #000' : '1px solid #ccc',
                      backgroundColor: estadoFiltro === estado ? '#f0f0f0' : '#fff',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {estado}
                  </button>
                ))}
              </div>
              <button onClick={handleOrdenarPorPrecio} style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '10px',
              }}>
                Ordenar por precio {sort === "asc" ? "▼" : "▲"}
              </button>
              <div style={{ display: 'flex', gap: 32, justifyContent: 'center', width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ textAlign: 'center' }}>Cotizaciones de Servicios</h3>
                  {cotServ.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No hay cotizaciones de servicios aún.</p>
                  ) : (
                    cotServ.map((c) => (
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
                  {cotInsu.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No hay cotizaciones de insumos aún.</p>
                  ) : (
                    cotInsu.map((c) => (
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
            </div>
          )}
          sort={sort}
          onOrdenarPorPrecio={handleOrdenarPorPrecio}
        />
      </div>
    </div>

  );
}