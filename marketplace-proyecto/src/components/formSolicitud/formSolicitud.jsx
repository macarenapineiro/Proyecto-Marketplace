import './formSolicitud.css';
import { useState } from 'react';
export default function FormSolicitud({ onSubmit, onCancel }) {
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMaterialChange = (e) => {
        const { name, value } = e.target;
        setNuevoMaterial(prev => ({ ...prev, [name]: value }));
    };

    const agregarMaterial = () => {
        if (
            nuevoMaterial.nombre.trim() === '' ||
            nuevoMaterial.unidad.trim() === '' ||
            nuevoMaterial.cantidad.trim() === ''
        ) {
            alert('Por favor, completa nombre, unidad y cantidad del material');
            return;
        }

        const cantidadNum = parseFloat(nuevoMaterial.cantidad);
        if (isNaN(cantidadNum) || cantidadNum <= 0) {
            alert('Por favor, ingresa una cantidad válida');
            return;
        }

        setMateriales(prev => [
            ...prev,
            {
                nombre: nuevoMaterial.nombre.trim(),
                unidad: nuevoMaterial.unidad.trim(),
                cantidad: cantidadNum
            }
        ]);

        setNuevoMaterial({ nombre: '', unidad: '', cantidad: '' });
    };

    const eliminarMaterial = (index) => {
        setMateriales(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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

        const nuevaSolicitud = {
            id: Date.now(),
            ...formData,
            materiales,
            estado: 'Abierto',
            fecha: new Date().toLocaleDateString(),
        };

        onSubmit(nuevaSolicitud); // enviamos al padre

        // limpiamos el formulario
        setFormData({ titulo: '', descripcion: '', categoria: '', ubicacion: '' });
        setMateriales([]);
        setNuevoMaterial({ nombre: '', unidad: '', cantidad: '' });
    };
    return (
        <div className="formContainer">
            <div className="containerRow">
                <h2 className="subtitle">Crear nueva solicitud</h2>
                <button className="exitSolicitud" onClick={onCancel}>x</button>
            </div>

            <div className="containerRow">
                <div className="containerColumn">
                    <label className="label">Título del servicio</label>
                    <input
                        type="text"
                        name="titulo"
                        className="inputField"
                        placeholder="Ej. Reparación del techo"
                        value={formData.titulo}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="containerRow">
                <div className="containerColumn">
                    <label className="label">Descripción</label>
                    <textarea
                        name="descripcion"
                        className="inputField"
                        placeholder="Describe el servicio que se necesita"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="containerRow">
                <div className="containerColumnDoble">
                    <div className="containerColumn">
                        <label className="label">Categoría</label>
                        <select
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
                        <p className="label">Materiales necesarios:</p>
                    </div>
                    <div className="containerColumn">
                        <label className="label">Ubicación</label>
                        <input
                            type="text"
                            name="ubicacion"
                            className="inputField"
                            placeholder="Ciudad, País"
                            value={formData.ubicacion}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="containerRow">
                <div className="containerColumnTriple">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del material"
                        className="inputField"
                        value={nuevoMaterial.nombre}
                        onChange={handleMaterialChange}
                    />
                    <input
                        type="text"
                        name="unidad"
                        placeholder="Unidad (ej: kg, litros, metros)"
                        className="inputField"
                        value={nuevoMaterial.unidad}
                        onChange={handleMaterialChange}
                    />
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

            <div className="containerRow">
                <button
                    type="button"
                    className="addMaterialButton"
                    onClick={agregarMaterial}
                >
                    ➕ Agregar material
                </button>
            </div>
            {materiales.length > 0 && (
                <div className="containerRow materialContainer">
                    {materiales.map((material, index) => (
                        <div key={index} className="materialItemCard">
                            <div className="materialInfo">
                                <strong>{material.nombre}</strong>
                            </div>
                            <div className="materialQuantity">
                                <span>{material.cantidad} {material.unidad}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => eliminarMaterial(index)}
                                className="deleteMaterialButton"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="containerRowButtons">
                <button type="button" className="submitButton" onClick={handleSubmit}>
                    Crear solicitud
                </button>
                <button type="button" className="cancelButton" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

