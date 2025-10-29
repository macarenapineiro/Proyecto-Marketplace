import './CardInsumos.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export default function CardInsumos({
    titulo,
    descripcion,
    estado,
    fecha,
    categoria,
    ubicacion,
    materiales = [],
    mostrarBotonCotizar = false,
    onCotizarMaterial
}) {
    return (
        <div className="containerCard">
            <div className="containerRow">
                <h3 className="cardTitle">{titulo}</h3>
                <p className="cardCategory">{categoria}</p>
            </div>
            <div className="containerRow">
                <p className="cardDescripcion">{descripcion}</p>
            </div>
            <div className="containerRow">
                <div className="fecha">
                    <AccessTimeIcon id="iconFecha" />
                    <p className="cardFecha">{fecha}</p>
                </div>
                {ubicacion && <p className="cardUbicacion">{ubicacion}</p>}
                <span className={`status ${estado?.toLowerCase()}`}>{estado}</span>
            </div>
            <div className="containerRow">
                <div className="containerColumn">
                    <p className="cardMateriales">Materiales Necesarios:</p>
                    {materiales.map((material, index) => (
                        <div key={index} className="materialesItem">
                            <div className="materialContainer">
                                <Inventory2OutlinedIcon id="materialIcon" />
                                <p className="materialName">{material.nombre}</p>
                            </div>
                            <p className="materialCantidad">Cantidad: {material.cantidad} {material.unidad}</p>
                            {mostrarBotonCotizar && (
                                <button 
                                    className="materialCotizar" 
                                    onClick={() => onCotizarMaterial && onCotizarMaterial(material)}
                                >
                                    Cotizar
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}