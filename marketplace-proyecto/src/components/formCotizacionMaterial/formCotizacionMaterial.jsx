import './formCotizacionMaterial.css'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function FormCotizacionMaterial({ material, solicitud, cotizacion, onCancel, onSubmit }) {
    const [formData, setFormData] = useState({
        precio: '',
        tiempoEntrega: '',
        observaciones: ''
    });

    // Cargar datos si estamos editando
    useEffect(() => {
        if (cotizacion) {
            setFormData({
                precio: cotizacion.precio || '',
                tiempoEntrega: cotizacion.tiempoEntrega || '',
                observaciones: cotizacion.observaciones || ''
            });
        }
    }, [cotizacion]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'precio' && parseFloat(value) < 0) {
            setFormData(prev => ({ ...prev, [name]: '' }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const precioNum = parseFloat(formData.precio);
        if (!formData.precio || !formData.tiempoEntrega) {
            toast.error('Por favor, completa precio y tiempo de entrega');
            return;
        }
        if (isNaN(precioNum) || precioNum <= 0) {
            toast.error('El precio debe ser un número mayor a 0');
            return;
        }
        const nuevaCotizacion = {
            id: cotizacion?.id || Date.now(),
            solicitudId: solicitud.id,
            materialId: material.id || material.nombre,
            materialNombre: material.nombre,
            materialCantidad: material.cantidad,
            materialUnidad: material.unidad,
            ...formData,
            precio: precioNum,
            fecha: new Date().toLocaleDateString(),
            esEdicion: !!cotizacion
        };
        onSubmit(nuevaCotizacion);
        toast.success(`Cotización ${cotizacion ? 'actualizada' : 'creada'} con éxito`);
        setFormData({
            precio: '',
            tiempoEntrega: '',
            observaciones: ''
        });
    };

    const handleCancel = () => {
        onCancel();
        toast.info('Cotización cancelada');
    }

    return (
        <div className="formContainer">
            <div className="formRow">
                <h2 className="subtitle">{cotizacion ? 'Editar cotización' : 'Cotizar material'}</h2>
                <button className="exitSolicitud" onClick={handleCancel}>✕</button>
            </div>

            <div className="formRow">
                <span className="solTitulo">Material: {material?.nombre} - Cantidad: {material?.cantidad} {material?.unidad}</span>
            </div>
        
            <div className="formRow">
                <div className="containerSolicitudColumn">
                    <h3 id="solSubtitle">Para la solicitud:</h3>
                    <p id="solDescripcion">{solicitud?.titulo}</p>
                    <p className="materialesTitulo">Descripción de la solicitud:</p>
                    <p id="solDescripcion">{solicitud?.descripcion}</p>
                </div>
            </div>

            <div className="formRow">
                <div className="containerColumnDoble">
                    <div className="containerColumn">
                        <label className="label" htmlFor="precio">Precio del material:</label>
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            className="inputField"
                            placeholder="Ingrese el precio"
                            value={formData.precio}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <div className="containerColumn">
                        <label className="label" htmlFor="tiempoEntrega">Tiempo de entrega:</label>
                        <input
                            type="text"
                            id="tiempoEntrega"
                            name="tiempoEntrega"
                            className="inputField"
                            placeholder="Ej. 2 días, 1 semana"
                            value={formData.tiempoEntrega}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="formRow">
                <div className="containerColumn">
                    <label className="label" htmlFor="observaciones">Observaciones (opcional):</label>
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        className="inputField descriptionField"
                        placeholder="Información adicional sobre el material, marca, etc."
                        value={formData.observaciones}
                        onChange={handleInputChange}
                        rows="4"
                    ></textarea>
                </div>
            </div>

            <div className="containerRowButtons">
                <button type="button" className="submitButton" onClick={handleSubmit}>
                    {cotizacion ? 'Guardar cambios' : 'Enviar cotización'}
                </button>
                <button type="button" className="cancelButton" onClick={handleCancel}>
                    Cancelar
                </button>
            </div>
        </div>
    )
}
