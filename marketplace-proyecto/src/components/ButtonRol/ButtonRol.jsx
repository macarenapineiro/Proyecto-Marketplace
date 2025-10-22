import './ButtonRol.css'
import {useNavigate} from 'react-router-dom';
export default function ButtonRol({text, page}) {
    const navigate = useNavigate();
    return(
        <button className="button-rol" onClick={() => navigate(page)}>
            {text}
        </button>
    )
}