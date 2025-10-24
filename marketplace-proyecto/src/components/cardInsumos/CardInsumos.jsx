import './CardInsumos.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
export default function CardInsumos() {
    return (
        <div className="containerCard">
            <div className="containerRow">
                <h3 className="cardTitle">Reparación</h3>
                <p className="cardCategory">Construcción</p>
            </div>
            <div className="containerRow">
                <p className="cardDescripcion">Necesito reparar el techo</p>
            </div>
            <div className="containerRow">
                <div className="fecha">
                    <AccessTimeIcon id="iconFecha" />
                    <p className="cardFecha">10 - 11 - 2025</p>
                </div>
                <p className="cardUbicacion">Maldonado, Uruguay</p>
                <p className="cardPrecio">$1000</p>
            </div>
            <div className="containerRow">
                <div className="containerColumn">
                    <p className="cardMateriales">Materiales Necesarios:</p>
                    <div className="materialesItem">
                        <div className="materialContainer">
                            <Inventory2OutlinedIcon id="materialIcon" />
                            <p className="materialName">Membrana asfáltica</p>
                        </div>
                        <p className="materialCantidad">Cantidad: 2 rollos</p>
                        <button className="materialCotizar">Cotizar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}