import './Login.css'
import Header from '../../components/header/Header'
import InformationCard from '../../components/InformationCard/InformationCard'
import ButtonBlack from '../../components/ButtonBlack/ButtonBlack'
export default function Login() {
  return (
    <>
      <Header />
      <main className="login">
        <h2 className="login-title">Iniciar sesión</h2>
        <form className="login-form">
            <InformationCard type="text" name="username" placeholder="Ingresa tu correo electrónico" text="Correo electrónico" />
            <InformationCard type="password" name="password" placeholder="Ingresa tu contraseña" text="Contraseña" />
            <ButtonBlack text="Iniciar sesión" />
        </form>
      </main>
    </>
  )
}
