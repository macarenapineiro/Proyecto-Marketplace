import './ButtonBlack.css'
import {useNavigate} from 'react-router-dom';
export default function ButtonBlack({text}) {
    const navigate = useNavigate();
    return (
        <button className="button-black" onClick={() => navigate('/dashboard')}>
            {text}
        </button>
    )
}