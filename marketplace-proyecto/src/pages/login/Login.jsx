import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import InformationCard from '../../components/InformationCard/InformationCard'
import ButtonBlack from '../../components/ButtonBlack/ButtonBlack'
const HARDCODED_USER = {
  username: "admin@test.com",
  password: "admin123",
  name: "Admin User"
}
export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    function handleSubmit(e) {
      e.preventDefault();
      if(!username || !password){
        setError("Por favor, completa todos los campos");
        return;
      }
      if (username === HARDCODED_USER.username && password === HARDCODED_USER.password) {
        const fakeToken = "token-demo-abc123";
        localStorage.setItem("authToken", fakeToken);
        localStorage.setItem("userName", HARDCODED_USER.name);
        setError(null);
        navigate('/dashboard');
      } else{
        setError("Usuario o contraseña incorrectos");
      }
    }
    function handleLogout(){
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
    }
    const logged = !!localStorage.getItem("authToken");
  return (
    <>
      <Header />
      <main className="login">
        <h2 className="login-title">Iniciar sesión</h2>
        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
            <InformationCard type="text" name="username" placeholder="Ingresa tu correo electrónico" text="Correo electrónico" value={username} onChange={e => setUsername(e.target.value)} />
            <InformationCard type="password" name="password" placeholder="Ingresa tu contraseña" text="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
            <ButtonBlack text="Iniciar sesión" type="submit" />
        </form>
      </main>
    </>
  )
}
