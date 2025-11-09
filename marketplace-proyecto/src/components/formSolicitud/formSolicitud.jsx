import './formSolicitud.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormSolicitud({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        ubicacion: '',
        fechaLimite: ''
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
            toast.warning('Por favor, completa nombre, unidad y cantidad del material');
            return;
        }

        const cantidadNum = parseFloat(nuevoMaterial.cantidad);
        if (isNaN(cantidadNum) || cantidadNum <= 0) {
            toast.warning('Por favor, ingresa una cantidad válida');
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
        toast.success('Material agregado');
        setNuevoMaterial({ nombre: '', unidad: '', cantidad: '' });
    };

    const eliminarMaterial = (index) => {
        const element = materiales[index];
        setMateriales(prev => prev.filter((_, i) => i !== index));
        toast.info(`Material "${element.nombre}" eliminado`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.titulo.trim() === '' || formData.descripcion.trim() === '') {
            toast.warning('Por favor, completa el título y la descripción');
            return;
        }
        if (formData.categoria === '') {
            toast.warning('Por favor, selecciona una categoría');
            return;
        }
        if (formData.ubicacion.trim() === '') {
            toast.warning('Por favor, ingresa una ubicación');
            return;
        }
        if (formData.fechaLimite.trim() === '') {
            toast.warning('Por favor, ingresa una fecha límite');
            return;
        }

        const nuevaSolicitud = {
            id: Date.now(),
            ...formData,
            materiales,
            estado: 'Abierto',
        };

        onSubmit(nuevaSolicitud); 
        toast.success('Solicitud creada con éxito');

        setFormData({ titulo: '', descripcion: '', categoria: '', ubicacion: '', fechaLimite: '' });
        setMateriales([]);
        setNuevoMaterial({ nombre: '', unidad: '', cantidad: '' });
    };
    return (
        <div className="formContainer">
            <div className="containerRow">
                <h2 className="subtitle">Crear nueva solicitud</h2>
                <button className="exitSolicitud" onClick={() => { onCancel(); toast.info('Solicitud cancelada'); } }>x</button>
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
                <div className="containerColumnTriple">
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
                            <option value="electricidad">Electricidad</option>
                            <option value="plomeria">Plomería</option>
                            <option value="pintura">Pintura</option>
                            <option value="carpinteria">Carpintería</option>
                            <option value="construccion">Construcción</option>
                            <option value="mecanica">Mecánica</option>
                        </select>
                    </div>
                    <div className="containerColumn">
                        <label className="label">Ubicación</label>
                        <select
                            name="ubicacion"
                            className="inputSelect"
                            value={formData.ubicacion}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccionar ubicación</option>
                            <option value="Maldonado">Maldonado</option>
                            <option value="Punta del Este">Punta del Este</option>
                            <option value="San Carlos">San Carlos</option>
                            <option value="Pan de Azúcar">Pan de Azúcar</option>
                            <option value="Piriápolis">Piriápolis</option>
                            <option value="La Barra">La Barra</option>
                            <option value="José Ignacio">José Ignacio</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="containerColumn">
                        <label className="label">Fecha Límite</label>
                        <input
                            type="date"
                            name="fechaLimite"
                            className="inputField"
                            value={formData.fechaLimite}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <p className="label">Materiales necesarios:</p>
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
                    <select
                        name="unidad"
                        className="inputSelect"
                        value={nuevoMaterial.unidad}
                        onChange={handleMaterialChange}
                    >
                        <option value="">Seleccionar unidad</option>
                        <option value="kg">Kilogramos</option>
                        <option value="litros">Litros</option>
                        <option value="metros">Metros</option>
                        <option value="metrosCuadrados">Metros cuadrados</option>
                        <option value="unidades">Unidades</option>
                    </select>
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
                <button type="button" className="cancelButton" onClick={() => { onCancel(); toast.info('Solicitud cancelada'); }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

