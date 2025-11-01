import './formCotizacionMaterial.css'
import { useState, useEffect } from 'react';

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
            alert('Por favor, completa precio y tiempo de entrega');
            return;
        }
        if (isNaN(precioNum) || precioNum <= 0) {
            alert('El precio debe ser un número mayor a 0');
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
        setFormData({
            precio: '',
            tiempoEntrega: '',
            observaciones: ''
        });
    };

    return (
        <div className="formMaterialContainer">
            <div className="formMaterialRow">
                <h2 className="formMaterialTitle">{cotizacion ? 'Editar cotización' : 'Cotizar material'}</h2>
                <button className="formMaterialCloseButton" onClick={onCancel}>✕</button>
            </div>

            <div className="formMaterialRow">
                <div className="formMaterialInfoBox">
                    <h3 className="formMaterialInfoTitle">Material solicitado:</h3>
                    <div className="formMaterialInfoDetail">
                        <p><strong>Nombre:</strong> {material.nombre}</p>
                        <p><strong>Cantidad:</strong> {material.cantidad} {material.unidad}</p>
                    </div>
                </div>
            </div>

            <div className="formMaterialRow">
                <span className="solicitudTitulo">Para la solicitud: {solicitud?.titulo}</span>
            </div>

            <div className="formMaterialRow">
                <div className="formMaterialColumnDoble">
                    <div className="formMaterialColumn">
                        <label className="formMaterialLabel" htmlFor="precio">Precio del material:</label>
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            className="formMaterialInput"
                            placeholder="Ingrese el precio"
                            value={formData.precio}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <div className="formMaterialColumn">
                        <label className="formMaterialLabel" htmlFor="tiempoEntrega">Tiempo de entrega:</label>
                        <input
                            type="text"
                            id="tiempoEntrega"
                            name="tiempoEntrega"
                            className="formMaterialInput"
                            placeholder="Ej. 2 días, 1 semana"
                            value={formData.tiempoEntrega}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="formMaterialRow">
                <div className="formMaterialColumn">
                    <label className="formMaterialLabel" htmlFor="observaciones">Observaciones (opcional):</label>
                    <textarea
                        id="observaciones"
                        name="observaciones"
                        className="formMaterialTextarea"
                        placeholder="Información adicional sobre el material, marca, etc."
                        value={formData.observaciones}
                        onChange={handleInputChange}
                        rows="4"
                    ></textarea>
                </div>
            </div>

            <div className="formMaterialRowButtons">
                <button type="button" className="formMaterialSubmitButton" onClick={handleSubmit}>
                    {cotizacion ? 'Guardar cambios' : 'Enviar cotización'}
                </button>
                <button type="button" className="formMaterialCancelButton" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </div>
    )
}
