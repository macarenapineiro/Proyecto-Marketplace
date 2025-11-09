import './cardHeader.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function CardHeader({ rol, nombre }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <header className='cardHeaderContainer'>
            <h2 className={`rol ${rol.toLowerCase()}`}>{rol}</h2>
            <div className="containerUser">
                <AccountCircleOutlinedIcon id='userIcon' />
                <p className='cardHeaderName'>{nombre}</p>
            </div>
            <button onClick={handleLogout} className='exitButton'>Cerrar Sesión</button>
        </header>
    );
}