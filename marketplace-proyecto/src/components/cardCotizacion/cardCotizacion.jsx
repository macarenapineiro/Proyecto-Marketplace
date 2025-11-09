import './cardCotizacion.css'
import {toast, ToastContainer} from 'react-toastify';

export default function CardCotizacion({
    titulo = 'Cotización',
    estado = 'Pendiente',
    precio = 0,
    tiempoEntrega = '',
    descripcion = '',
    cliente = '',
    fechaServicio = '',
    mostrarAcciones = false,
    mostrarEditar = false,
    mostrarEliminar = false,
    onAceptar,
    onRechazar,
    onEditar,
    onEliminar,
}) {
    const estadoClass = `estado ${String(estado).toLowerCase()}`;
    const handleAceptar = () => {
        onAceptar();
        toast.success('Cotización aceptada');
    }
    const handleRechazar = () => {
        onRechazar();
        toast.info('Cotización rechazada');
    }
    const handleEliminar = () => {
        onEliminar();
        toast.error('Cotización eliminada');
    }
    return (
        <div className="cotizacionContainer">
            <div className="containerRow">
                <h3 className="cotizacionSubtitle">{titulo}</h3>
                <span className={estadoClass}>{estado}</span>
            </div>
            {cliente && (
                <div className="containerRow">
                    <p className="cliente">Cliente: {cliente}</p>
                </div>
            )}
            <div className="containerRow">
                <div className="containerColumnDoble">
                    <div className="containerColumn">
                        <p className="precio">Precio Total</p>
                        <span className="precioValue">$ {precio}</span>
                    </div>
                    <div className="containerColumn">
                        <p className="tiempo">Tiempo Estimado</p>
                        <span className="tiempoValue">{tiempoEntrega}</span>
                    </div>
                </div>
            </div>
            {descripcion && (
                <div className="containerRow">
                    <div className="containerColumn">
                        <p className="descripcion">Descripción de la cotización</p>
                        <span className="descripcionValue">{descripcion}</span>
                    </div>
                </div>
            )}
            {fechaServicio && (
                <div className="containerRow">
                    <div className="containerColumn">
                        <p className="fechaServicio">Fecha de Servicio</p>
                        <span className="fechaServicioValue">{fechaServicio}</span>
                    </div>
                </div>
            )}
            {mostrarAcciones && estado === 'Pendiente' && (
                <div className="containerRowButton">
                    <button className="aceptarButton" onClick={handleAceptar}>
                        Aceptar Cotización
                    </button>
                    <button className="rechazarButton" onClick={handleRechazar}>
                        Rechazar
                    </button>
                </div>
            )}
            {mostrarEditar && estado === 'Pendiente' && (
                <div className="containerRowButton">
                    <button className="editarButton" onClick={onEditar}>
                        Editar Cotización
                    </button>
                    {mostrarEliminar && (
                        <button className="eliminarButton" onClick={handleEliminar}>
                            Eliminar
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}