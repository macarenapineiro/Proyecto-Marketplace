import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import { useAuth } from '../../context/AuthContext'
import InformationCard from '../../components/InformationCard/InformationCard'
import ButtonBlack from '../../components/ButtonBlack/ButtonBlack'


export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, logout } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }
    
    const result = login(username, password);
    
    if (result.success && result.user) {
      setError(null);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  }
  
  const logged = !!localStorage.getItem("authToken");

  return (
    <>
      <Header />
      <main className="login">
        <h2 className="login-title">Iniciar sesión</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <InformationCard type="text" name="username" placeholder="Ingresa tu correo electrónico" text="Correo electrónico" value={username} onChange={e => setUsername(e.target.value)} />
          <InformationCard type="password" name="password" placeholder="Ingresa tu contraseña" text="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
          <ButtonBlack text="Iniciar sesión" type="submit" />
        </form>
      </main>
    </>
  )
}
