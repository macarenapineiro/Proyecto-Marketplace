import { createContext, useContext, useState } from 'react';

export const SolicitudContext = createContext(
  undefined
);

export const SolicitudProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);

  const agregarSolicitud = (nuevaSolicitud) => {
    setSolicitudes([...solicitudes, nuevaSolicitud]);
  };

  return (
    <SolicitudContext.Provider value={{ solicitudes, agregarSolicitud }}>
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