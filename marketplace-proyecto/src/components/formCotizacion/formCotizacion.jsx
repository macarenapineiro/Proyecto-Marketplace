import './formCotizacion.css'
import {useState} from 'react';
export default function FormCotizacion({solicitud, onCancel}) {
    const [formData, setFormData] = useState({
        precio: '',
        tiempoEntrega: '',
        descripcion: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.precio || !formData.tiempoEntrega || !formData.descripcion) {
            alert('Por favor, completa todos los campos');
            return;
        }
        const nuevaCotizacion = {
            id: Date.now(),
            solicitudId: solicitud.id,
            ...formData,
            fecha: new Date().toLocaleDateString(),
        };
        onSubmit(nuevaCotizacion);
        setFormData({
            precio: '',
            tiempoEntrega: '',
            descripcion: ''
        });
    };
    return (
        <div className="formContainer">
            <div className="formRow">
                <h2 className="subtitle">Crear cotización</h2>
                <button className="exitSolicitud" onClick={onCancel}>x</button>
            </div>
            <div className="formRow">
                <span className="solTitulo">Para: {solicitud?.titulo}</span>
            </div>
            <div className="formRow">
                <div className="containerSolicitudColumn">
                    <h3 id="solSubtitle">Solicitud</h3>
                    <p id="solDescripcion">{solicitud?.descripcion}</p>
                    <p className="materialesTitulo">Materiales necesarios:</p>
                    <div className="materialesList">
                        {solicitud?.materiales?.map((material, index) => (
                            <div key={index} className="materialItem" style={{ marginBottom: '8px' }}>
                                <strong>Material {index + 1}:</strong> {material.nombre} ( {material.cantidad} {material.unidad} )
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="formRow">
                <div className="containerColumnDoble">
                    <div className="containerColumn">
                        <label className="label" htmlFor="precio">Precio Cotización:</label>
                        <input type="number" id="precio" name="precio" className="inputField" placeholder="Ingrese el precio" value={formData.precio} onChange={handleInputChange} />
                    </div>
                    <div className="containerColumn">
                        <label className="label" htmlFor="tiempoEntrega">Tiempo estimado</label>
                        <input type="text" id="tiempoEntrega" name="tiempoEntrega" className="inputField" placeholder="Ej. 3 días" value={formData.tiempoEntrega} onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <div className="formRow">
                <div className="containerColumn">
                    <label className="label" htmlFor="descripcion">Descripción:</label>
                    <textarea id="descripcion" name="descripcion" className="inputField" placeholder="Ingrese una descripción" value={formData.descripcion} onChange={handleInputChange}></textarea>
                </div>
            </div>
            <div className="containerRowButtons">
                <button type="button" className="submitButton" onClick={handleSubmit}>
                    Enviar cotización
                </button>
                <button type="button" className="cancelButton" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </div>
       
    )
}