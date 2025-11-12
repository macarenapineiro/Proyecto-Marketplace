import './formCotizacion.css'
import {toast, ToastContainer} from 'react-toastify';
import {useState, useEffect} from 'react';
export default function FormCotizacion({solicitud, cotizacion, onCancel, onSubmit}) {
    const [formData, setFormData] = useState({
        precio: '',
        tiempoEntrega: '',
        descripcion: ''
    });
    
    useEffect(() => {
        if (cotizacion) {
            setFormData({
                precio: cotizacion.precio || '',
                tiempoEntrega: cotizacion.tiempoEntrega || '',
                descripcion: cotizacion.descripcion || ''
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
        if (!formData.precio || !formData.tiempoEntrega || !formData.descripcion) {
            toast.warning('Por favor, complete todos los campos');
            return;
        }
        const precioNum = parseFloat(formData.precio);
        if (isNaN(precioNum) || precioNum <= 0) {
            toast.warning('El precio debe ser un número mayor a 0');
            return;
        }
        const nuevaCotizacion = {
            id: cotizacion?.id || Date.now(),
            solicitudId: solicitud.id,
            ...formData,
            fecha: new Date().toLocaleDateString(),
            esEdicion: !!cotizacion
        };
        onSubmit(nuevaCotizacion);
        toast.success(`Cotización ${cotizacion ? 'actualizada' : 'creada'} con éxito`);
        setFormData({
            precio: '',
            tiempoEntrega: '',
            descripcion: ''
        });
    };
    const handleCancel = () => {
        onCancel();
    }
    return (
        <div className="formContainer">
            <div className="formRow">
                <h2 className="subtitle">{cotizacion ? 'Editar cotización' : 'Crear cotización'}</h2>
                <button className="exitSolicitud" onClick={handleCancel}>x</button>
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
                    <textarea id="descripcion" name="descripcion" className="inputField descriptionField" placeholder="Ingrese una descripción" value={formData.descripcion} onChange={handleInputChange}></textarea>
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