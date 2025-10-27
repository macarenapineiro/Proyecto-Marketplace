import { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
    const [solicitudes, setSolicitudes] = useState([]);
    const [cotizaciones, setCotizaciones] = useState([]);
    
    const agregarSolicitud = (solicitud) => {
        setSolicitudes(prev => [...prev, {...solicitud, id: Date.now(), estado: 'Abierto'}]);
    };

    // Recibe la cotización completa con solicitudId incluido
    const agregarCotizacion = (cotizacion) => {
        setCotizaciones(prev => [...prev, cotizacion]);
        // Actualizar el estado de la solicitud a Pendiente cuando se crea una cotización
        setSolicitudes(prev => prev.map(s => 
            s.id === cotizacion.solicitudId ? {...s, estado: 'Pendiente'} : s
        ));
    };

    const actualizarCotizacion = (cotizacionId, cambios) => {
        setCotizaciones(prev => prev.map(c => 
            c.id === cotizacionId ? {...c, ...cambios} : c
        ));
    };

    const eliminarCotizacion = (cotizacionId) => {
        let solicitudId = null;
        
        setCotizaciones(prev => {
            const cotizacion = prev.find(c => c.id === cotizacionId);
            if (!cotizacion) return prev;
            
            solicitudId = cotizacion.solicitudId;
            // Eliminar la cotización
            return prev.filter(c => c.id !== cotizacionId);
        });
        
        // Si no quedan más cotizaciones para esa solicitud, volver a estado Abierto
        if (solicitudId) {
            setSolicitudes(prev => prev.map(s => {
                if (s.id === solicitudId) {
                    const cotizacionesRestantes = cotizaciones.filter(
                        c => c.solicitudId === solicitudId && c.id !== cotizacionId
                    );
                    // Si no quedan cotizaciones, volver a Abierto
                    if (cotizacionesRestantes.length === 0) {
                        return {...s, estado: 'Abierto'};
                    }
                }
                return s;
            }));
        }
    };

    const actualizarEstadoCotizacion = (cotizacionId, nuevoEstado) => {
        // Actualizar estado de la cotización y obtener la solicitudId
        let solicitudId = null;
        
        setCotizaciones(prev => {
            // Encontrar la cotización para obtener su solicitudId
            const cotizacion = prev.find(c => c.id === cotizacionId);
            if (!cotizacion) return prev;
            
            solicitudId = cotizacion.solicitudId;
            
            // Actualizar estado de la cotización
            return prev.map(c => {
                if (c.id === cotizacionId) {
                    return {...c, estado: nuevoEstado};
                }
                // Si se acepta una, rechazar las demás de la misma solicitud
                if (nuevoEstado === 'Aceptado' && c.solicitudId === solicitudId && c.id !== cotizacionId) {
                    return {...c, estado: 'Rechazado'};
                }
                return c;
            });
        });
        
        // Actualizar estado de la solicitud
        if (solicitudId) {
            setSolicitudes(prev => prev.map(s => 
                s.id === solicitudId ? {...s, estado: nuevoEstado} : s
            ));
        }
    };

    return(
    <ServiceContext.Provider value={{
        solicitudes,
        cotizaciones,
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
    if (!context) {
        throw new Error('useSolicitudes debe usarse dentro de ServiceProvider');
    }
    return context;
}





