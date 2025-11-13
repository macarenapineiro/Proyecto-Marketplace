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
  };

  const solicitudesAbiertas = solicitudes.filter(solicitud => solicitud.estado === 'Abierto');

  return (
    <SolicitudContext.Provider value={{ solicitudes, agregarSolicitud, solicitudSeleccionada, seleccionarSolicitud, actualizarEstadoSolicitud, limpiarSolicitudSeleccionada, solicitudesAbiertas }}>
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