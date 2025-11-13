import { createContext, useContext, useState } from 'react';
import { useSolicitud } from './SolicitudContext';

export const CotizacionContext = createContext(
    undefined
)
export const CotizacionProvider = ({ children }) => {
    const { actualizarEstadoSolicitud } = useSolicitud();
    const [cotizacionesServicio, setCotizacionesServicio] = useState([]);

    const agregarCotizacionServicio = (nuevaCotizacion) => {
        setCotizacionesServicio([...cotizacionesServicio, nuevaCotizacion]);
    };

    const actualizarCotizacionServicio = (id, cambios) => {
        setCotizacionesServicio(prevCotizaciones =>
            prevCotizaciones.map(cotizacion =>
                cotizacion.id === id ? { ...cotizacion, ...cambios } : cotizacion
            )
        );
    }

    const eliminarCotizacionServicio = (id, solicitudId) => {
        const cotizacion = cotizacionesServicio.find(c => c.id === id);
        if (!cotizacion) return;
        setCotizacionesServicio(prev => prev.filter(c => c.id !== id));
        if (cotizacion.solicitudId) {
            actualizarEstadoSolicitud(cotizacion.solicitudId, 'Abierto'); // o 'Pendiente' según tu lógica
        }
    }

    return (
        <CotizacionContext.Provider value={{ cotizacionesServicio, agregarCotizacionServicio, actualizarCotizacionServicio, eliminarCotizacionServicio }}>
            {children}
        </CotizacionContext.Provider>
    );
}
export function useCotizacion() {
    const context = useContext(CotizacionContext);

    if (!context) {
        throw new Error("useCotizacion must be used within a CotizacionProvider");
    }

    return context;
}