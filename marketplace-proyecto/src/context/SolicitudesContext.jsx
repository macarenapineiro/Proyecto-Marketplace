import { createContext, useContext, useState } from 'react';

const SolicitudesContext = createContext();

export function SolicitudesProvider({ children }) {
    const [solicitudes, setSolicitudes] = useState([]);

    const agregarSolicitud = (nuevaSolicitud) => {
        setSolicitudes(prev => [...prev, nuevaSolicitud]);
    };

    const actualizarSolicitud = (id, cambios) => {
        setSolicitudes(prev => 
            prev.map(sol => sol.id === id ? { ...sol, ...cambios } : sol)
        );
    };

    return (
        <SolicitudesContext.Provider value={{ solicitudes, agregarSolicitud, actualizarSolicitud }}>
            {children}
        </SolicitudesContext.Provider>
    );
}

export function useSolicitudes() {
    const context = useContext(SolicitudesContext);
    if (!context) {
        throw new Error('useSolicitudes debe usarse dentro de SolicitudesProvider');
    }
    return context;
}
