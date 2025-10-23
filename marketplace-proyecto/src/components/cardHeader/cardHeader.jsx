import './cardHeader.css';
import {useNavigate} from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
export default function CardHeader({rol, nombre}){
    const navigate = useNavigate();
    return(
        <header className='cardHeaderContainer'>
            <h2 className={`rol ${rol.toLowerCase()}`}>{rol}</h2>
            <div className="containerUser">
                <AccountCircleOutlinedIcon id='userIcon' />
                <p className='cardHeaderName'>{nombre}</p>
            </div>
            <button onClick={() => navigate('/dashboard')} className='volverButton'>Volver</button>
            <button onClick={() => navigate('/login')} className='exitButton'>Cerrar Sesión</button>
        </header>
    )
}