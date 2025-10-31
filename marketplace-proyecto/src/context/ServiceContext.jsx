import { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cotizacionesServicios, setCotizacionesServicios] = useState([]);
  const [cotizacionesInsumos, setCotizacionesInsumos] = useState([]);

  const agregarSolicitud = (solicitud) => {
    setSolicitudes(prev => [...prev, { ...solicitud }]);
  };

  const agregarCotizacion = (cotizacion) => {
    const nuevaCotizacion = { ...cotizacion, id: cotizacion.id || Date.now() };
    if (cotizacion.tipo === 'insumo') {
      setCotizacionesInsumos(prev => [...prev, nuevaCotizacion]);
    } else {
      setCotizacionesServicios(prev => [...prev, nuevaCotizacion]);
    }
  };

  const actualizarCotizacion = (cotizacionId, cambios, tipo) => {
    const actualizar = (prev) => prev.map(c => c.id === cotizacionId ? { ...c, ...cambios } : c);
    if (tipo === 'insumo') setCotizacionesInsumos(prev => actualizar(prev));
    else setCotizacionesServicios(prev => actualizar(prev));
  };

  const eliminarCotizacion = (cotizacionId, tipo) => {
    const filtrar = (prev) => prev.filter(c => c.id !== cotizacionId);
    if (tipo === 'insumo') setCotizacionesInsumos(prev => filtrar(prev));
    else setCotizacionesServicios(prev => filtrar(prev));
  };

  const actualizarEstadoCotizacion = (cotizacionId, nuevoEstado, tipo) => {
    const actualizar = (prev) => {
      const cotizacion = prev.find(c => c.id === cotizacionId);
      if (!cotizacion) return prev;
      const solicitudId = cotizacion.solicitudId;
      return prev.map(c => {
        if (c.id === cotizacionId) return { ...c, estado: nuevoEstado };
        if (nuevoEstado === 'Aceptado' && c.solicitudId === solicitudId && c.id !== cotizacionId) {
          return { ...c, estado: 'Rechazado' };
        }
        return c;
      });
    };

    if (tipo === 'insumo') setCotizacionesInsumos(prev => actualizar(prev));
    else setCotizacionesServicios(prev => actualizar(prev));
  };

  return (
    <ServiceContext.Provider value={{
      solicitudes,
      cotizacionesServicios,
      cotizacionesInsumos,
      agregarSolicitud,
      agregarCotizacion,
      actualizarCotizacion,
      eliminarCotizacion,
      actualizarEstadoCotizacion,
    }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useSolicitudes() {
  const context = useContext(ServiceContext);
  if (!context) throw new Error('useSolicitudes debe usarse dentro de ServiceProvider');
  return context;
}
