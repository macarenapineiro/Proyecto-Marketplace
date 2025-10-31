import { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
    const [solicitudes, setSolicitudes] = useState([]);
    const [cotizacionesServicios, setCotizacionesServicios] = useState([]);
    const [cotizacionesInsumos, setCotizacionesInsumos] = useState([]);
    
    const agregarSolicitud = (solicitud) => {
        setSolicitudes(prev => [...prev, {...solicitud}]);
    };

    // Recibe la cotización completa con solicitudId incluido y tipo: 'servicio' | 'insumo'
    const agregarCotizacion = (cotizacion) => {
        if (cotizacion.tipo === 'insumo') {
            setCotizacionesInsumos(prev => [...prev, cotizacion]);
        } else {
            setCotizacionesServicios(prev => [...prev, cotizacion]);
        }
        // No cambiamos el estado global de la solicitud, solo la visibilidad para el proveedor que cotizó
    };

    // Actualiza cotización según tipo
    const actualizarCotizacion = (cotizacionId, cambios, tipo) => {
        if (tipo === 'insumo') {
            setCotizacionesInsumos(prev => prev.map(c => c.id === cotizacionId ? {...c, ...cambios} : c));
        } else {
            setCotizacionesServicios(prev => prev.map(c => c.id === cotizacionId ? {...c, ...cambios} : c));
        }
    };

    // Elimina cotización según tipo
    const eliminarCotizacion = (cotizacionId, tipo) => {
        if (tipo === 'insumo') {
            setCotizacionesInsumos(prev => prev.filter(c => c.id !== cotizacionId));
        } else {
            setCotizacionesServicios(prev => prev.filter(c => c.id !== cotizacionId));
        }
    };

    // Actualiza estado de cotización según tipo
    const actualizarEstadoCotizacion = (cotizacionId, nuevoEstado, tipo) => {
        if (tipo === 'insumo') {
            setCotizacionesInsumos(prev => {
                const cotizacion = prev.find(c => c.id === cotizacionId);
                if (!cotizacion) return prev;
                const solicitudId = cotizacion.solicitudId;
                return prev.map(c => {
                    if (c.id === cotizacionId) {
                        return { ...c, estado: nuevoEstado };
                    }
                    if (nuevoEstado === 'Aceptado' && c.solicitudId === solicitudId && c.id !== cotizacionId) {
                        return { ...c, estado: 'Rechazado' };
                    }
                    return c;
                });
            });
        } else {
            setCotizacionesServicios(prev => {
                const cotizacion = prev.find(c => c.id === cotizacionId);
                if (!cotizacion) return prev;
                const solicitudId = cotizacion.solicitudId;
                return prev.map(c => {
                    if (c.id === cotizacionId) {
                        return { ...c, estado: nuevoEstado };
                    }
                    if (nuevoEstado === 'Aceptado' && c.solicitudId === solicitudId && c.id !== cotizacionId) {
                        return { ...c, estado: 'Rechazado' };
                    }
                    return c;
                });
            });
        }
    };

    return(
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
    if (!context) {
        throw new Error('useSolicitudes debe usarse dentro de ServiceProvider');
    }
    return context;
}





