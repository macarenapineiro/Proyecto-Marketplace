import { createContext, useContext, useState } from 'react';

const SolicitudesContext = createContext();

export function SolicitudesProvider({ children }) {
    const [solicitudes, setSolicitudes] = useState([]);
    const [cotizaciones, setCotizaciones] = useState([]);

    const agregarSolicitud = (nuevaSolicitud) => {
        setSolicitudes(prev => [...prev, nuevaSolicitud]);
    };

    const actualizarSolicitud = (id, cambios) => {
        setSolicitudes(prev => 
            prev.map(sol => sol.id === id ? { ...sol, ...cambios } : sol)
        );
    };
    
    const enviarCotizacion = (cotizacion) =>{
        setCotizaciones(prev => [...prev, {...cotizacion}])
        actualizarSolicitud(cotizacion.solicitudId, { estado: 'Pendiente' });
    }

    return (
        <SolicitudesContext.Provider value={{ solicitudes, cotizaciones, agregarSolicitud, actualizarSolicitud, enviarCotizacion }}>
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
