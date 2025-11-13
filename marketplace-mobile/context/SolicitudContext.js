import { createContext, useContext, useState } from 'react';

export const SolicitudContext = createContext(
  undefined
);

export const SolicitudProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  const agregarSolicitud = (nuevaSolicitud) => {
    setSolicitudes([...solicitudes, nuevaSolicitud]);
  };

  const seleccionarSolicitud = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
  }

  const limpiarSolicitudSeleccionada = () => setSolicitudSeleccionada(null);

  const actualizarEstadoSolicitud = (solicitudId, nuevoEstado) => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.map((solicitud) =>
        solicitud.id === solicitudId ? { ...solicitud, estado: nuevoEstado } : solicitud
      )
    );
    if(nuevoEstado === 'Abierto' || nuevoEstado === 'Pendiente') {
      const solicitud = solicitudes.find(s => s.id === solicitudId);
      if(solicitud && !solicitudesAbiertas.some(s => s.id === solicitudId)) {
        setSolicitudes((prevSolicitudes) => [...prevSolicitudes, solicitud]);
      }
      else{
        setSolicitudes((prevSolicitudes) => prevSolicitudes.filter(s => s.id !== solicitudId));
      }
    }
  };

  const solicitudesAbiertas = solicitudes.filter(solicitud => solicitud.estado === 'Abierto');
  const solicitudesPendientes = solicitudes.filter(solicitud => solicitud.estado === 'Pendiente');

  return (
    <SolicitudContext.Provider value={{ solicitudes, agregarSolicitud, solicitudSeleccionada, seleccionarSolicitud, actualizarEstadoSolicitud, limpiarSolicitudSeleccionada, solicitudesAbiertas, solicitudesPendientes }}>
      {children}
    </SolicitudContext.Provider>
  );
}
export function useSolicitud() {
  const context = useContext(SolicitudContext);

  if (!context) {
    throw new Error("useSolicitud must be used within a SolicitudProvider");
  }

  return context;
}