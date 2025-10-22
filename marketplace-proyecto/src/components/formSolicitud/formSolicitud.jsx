import './formSolicitud.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
export default function FormSolicitud(onSubmit, onCancel) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        ubicacion: ''
    });

    const [materiales, setMateriales] = useState([]);
    const [nuevoMaterial, setNuevoMaterial] = useState({
        nombre: '',
        unidad: '',
        cantidad: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleMaterialChange = (e) => {
        const { name, value } = e.target;
        setNuevoMaterial(prev => ({
        ...prev,
        [name]: value
        }));
    };
    const agregarMaterial = () => {
        if (nuevoMaterial.nombre.trim() === '' || nuevoMaterial.unidad.trim() === '' || nuevoMaterial.cantidad.trim() === '') {
        alert('Por favor, completa nombre, unidad y cantidad del material');
        return;
        }

        const cantidadNum = parseFloat(nuevoMaterial.cantidad);
        if (isNaN(cantidadNum) || cantidadNum <= 0) {
        alert('Por favor, ingresa una cantidad válida');
        return;
        }

        setMateriales(prev => [...prev, {
        nombre: nuevoMaterial.nombre.trim(),
        unidad: nuevoMaterial.unidad.trim(),
        cantidad: cantidadNum
        }]);

        setNuevoMaterial({ nombre: '', unidad: '', cantidad: '' });
    };

    const eliminarMaterial = (index) => {
        setMateriales(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (formData.titulo.trim() === '' || formData.descripcion.trim() === '') {
            alert('Por favor, completa el título y la descripción');
            return;
        }

        if (formData.categoria === '') {
            alert('Por favor, selecciona una categoría');
            return;
        }

        if (formData.ubicacion.trim() === '') {
            alert('Por favor, ingresa una ubicación');
            return;
        }

        const solicitud = {
            titulo: formData.titulo.trim(),
            descripcion: formData.descripcion.trim(),
            categoria: formData.categoria,
            ubicacion: formData.ubicacion.trim(),
            materiales: materiales
        };

        onSubmit(solicitud);
    };
    return(
        <div className="formContainer">
            <div className="containerRow">
                <h2 className="subtitle">Crear nueva solicitud</h2>
                <button className="exitSolicitud">x</button>
            </div>
            <div className="containerRow">
                <div className="containerColumn">
                    <label htmlFor="titulo" className="label">Titulo del servicio</label>
                    <input 
                        type="text" 
                        id="titulo" 
                        name="titulo" 
                        className="inputField" 
                        placeholder="Ej. Reparación del techo" 
                        value={formData.titulo} 
                        onChange={handleInputChange} />
                </div>
            </div>
            <div className="containerRow">
                <div className="containerColumn">
                    <label htmlFor="descripcion" className="label">Descripción</label>
                    <textarea 
                        id="descripcion" 
                        name="descripcion" 
                        className="inputField" 
                        placeholder="Describir detalladamente el servicio que se necesita"
                        value={formData.descripcion}
                        onChange={handleInputChange} />
                </div>
            </div>
            <div className="containerRow">
                <div className="containerColumnDoble">
                    <div className="containerColumn">
                        <label htmlFor="categoria" className="label">Categoría</label>
                        <select 
                            id="categoria" 
                            name="categoria" 
                            className="inputSelect"
                            value={formData.categoria}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="reparaciones">Reparaciones</option>
                            <option value="limpieza">Limpieza</option>
                            <option value="jardineria">Jardinería</option>
                        </select>
                        <p className="label">Materiales necesarios: </p>
                    </div>
                    <div className="containerColumn">
                        <label htmlFor="Ubicacion" className="label">Ubicación</label>
                        <input 
                            type="text" 
                            id="ubicacion" 
                            name="ubicacion" 
                            className="inputField" 
                            placeholder="Ciudad, País" 
                            value={formData.ubicacion}
                            onChange={handleInputChange}
                        />
                        <button type="button" className="addMaterialButton" onClick={agregarMaterial}>+ Agregar material</button>
                    </div>
                </div>
            </div>
            <div className="containerRow">
                <div className="containerColumnTriple">
                    <div className="containerColumn">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del material"
                            className="inputField"
                            value={nuevoMaterial.nombre}
                            onChange={handleMaterialChange}
                        />
                    </div>
                    <div className="containerColumn">
                        <input
                            type="text"
                            name="unidad"
                            placeholder="Unidad (ej: kg, litros, metros)"
                            className="inputField"
                            value={nuevoMaterial.unidad}
                            onChange={handleMaterialChange}
                        />
                    </div>  
                    <div className="containerColumn">
                        <input
                            type="number"
                            name="cantidad"
                            placeholder="Cantidad"
                            className="inputField"
                            value={nuevoMaterial.cantidad}
                            onChange={handleMaterialChange}
                            min="0"
                            step="0.01"
                        />
                    </div>    
                </div>
            </div>
            {materiales.length > 0 && (
          <div className="containerRow">
            <div className="containerColumnTriple">
              <div className="containerColumn">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {materiales.map((material, index) => (
                    <li key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      backgroundColor: '#f5f5f5',
                      marginBottom: '8px',
                      borderRadius: '4px'
                    }}>
                      <div>
                        <strong>Material {index + 1}:</strong>
                        <div style={{ marginTop: '5px', fontSize: '14px' }}>
                          <span><strong>Nombre:</strong> {material.nombre}</span><br/>
                          <span><strong>Unidad:</strong> {material.unidad}</span><br/>
                          <span><strong>Cantidad:</strong> {material.cantidad}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => eliminarMaterial(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'red',
                          cursor: 'pointer',
                          fontSize: '20px'
                        }}
                      >
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
            <div className="containerRowButtons">
                <button type="button" className="submitButton" onClick={handleSubmit}>Crear solicitud</button>
                <button type="button" className="cancelButton" onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    )
}