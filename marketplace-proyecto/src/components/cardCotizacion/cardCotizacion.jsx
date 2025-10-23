import './cardCotizacion.css'
export default function CardCotizacion({ }) {
    return (
        <>
            <div className="cotizacionContainer">
                <div className="containerRow">
                    <h3 className="cotizacionSubtitle">Cotización: </h3>
                    <span className="estado">Pendiente</span>
                </div>
                <div className="containerRow">
                    <div className="containerColumnDoble">
                        <div className="containerColumn">
                            <p className="precio">Precio Total</p>
                            <span className="precioValue">$ 1500</span>
                        </div>
                        <div className="containerColumn">
                            <p className="tiempo">Tiempo Estimado</p>
                            <span className="tiempoValue">3 días</span>
                        </div>
                    </div>
                </div>
                <div className="containerRow">
                    <div className="containerColumn">
                        <p className="descripcion">Descripción de la cotización</p>
                        <span className="descripcionValue">El servicio incluye arreglo completo</span>
                        <p className="insumosTitle">Insumos cotizados:</p>
                    </div>
                </div>
                <div className="materialContainerRow">
                    <p className="materialNombre">Tornillo</p>
                    <p className="materialPrecio">$ 100</p>
                    <p className="materialFecha">Inmediato</p>
                </div>
                <div className="containerRowButton">
                    <button className="aceptarButton">Aceptar Cotización</button>
                    <button className="rechazarButton">Rechazar</button>
                </div>
            </div>
        </>
    )
}