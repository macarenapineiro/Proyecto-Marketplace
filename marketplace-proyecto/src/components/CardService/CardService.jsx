import './CardService.css'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export default function CardService({titulo, descripcion, estado, fecha, categoria, materiales, mostrarBotonCotizar, onCotizar}){
    return(
        <div className="cardContainer">
            <div className="containerRow">
                <h3 className="cardTitle">{titulo}</h3>
                <span className={`status ${estado.toLowerCase()}`}>{estado}</span>
            </div>
            <div className="containerRow">
                <p className="cardDescription">{descripcion}</p>
            </div>
            <div className="containerRow">
                <div className="containerFecha">
                    <AccessTimeRoundedIcon id="clockIcon"/> 
                    <span className="cardFecha">{fecha}</span>
                </div>
                <div className="containerMaterial">
                    <Inventory2OutlinedIcon id="materialIcon"/>
                    <span className="cardMateriales">{materiales.length} materiales</span>
                </div>
                <span className="cardCategory">{categoria}</span>
            </div>
            <div className="containerRow">
                <p className="cardP">Materiales solicitados:</p>
            </div>
            <div className="containerRow">
                <div className="materialList">
                    {materiales.map((material, index) => (
                        <div key={index} className="materialItem" style={{ marginBottom: '8px' }}>
                            <strong>Material {index + 1}:</strong> {material.nombre} ( {material.cantidad} {material.unidad} )
                        </div>
                    ))}
                </div>
            </div>
            {mostrarBotonCotizar && (
                <div className="containerRow">
                    <button className="cotizarButton" onClick={onCotizar}>
                        Cotizar servicio
                    </button>
                </div>
            )}
        </div>
    )
}
