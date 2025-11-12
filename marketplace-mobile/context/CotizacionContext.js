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
        setCotizacionesServicio(prevCotizaciones => {
            const cotizacionEliminada = prevCotizaciones.find(cotizacion => cotizacion.id === id);
            const nuevasCotizaciones = prevCotizaciones.filter(cotizacion => cotizacion.id !== id);
            if (cotizacionEliminada){
                actualizarEstadoSolicitud(cotizacionEliminada.solicitudId, 'Abierto');
            }
            return nuevasCotizaciones;
        });
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