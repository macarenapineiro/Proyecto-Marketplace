import './ButtonHome.css';
import { useNavigate } from 'react-router-dom';

export default function Boton({ texto, pagina }) {
    const navigate = useNavigate();
    
    return (
        <button onClick={() => navigate(pagina)} className="boton-home">
            {texto}
        </button>
    )
}
