import { createContext, useContext, useState } from 'react';

export const CotizacionContext = createContext(
    undefined
)
export const CotizacionProvider = ({ children }) => {
    const [cotizacionesServicio, setCotizacionesServicio] = useState([]);
    const [cotizacionesInsumo, setCotizacionesInsumo] = useState([]);

    const agregarCotizacionServicio = (nuevaCotizacion) => {
        setCotizacionesServicio([...cotizacionesServicio, nuevaCotizacion]);
    };

    const agregarCotizacionInsumo = (nuevaCotizacion) => {
        setCotizacionesInsumo([...cotizacionesInsumo, nuevaCotizacion]);
    };

    return (
        <CotizacionContext.Provider value={{ cotizacionesServicio, agregarCotizacionServicio, cotizacionesInsumo, agregarCotizacionInsumo }}>
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