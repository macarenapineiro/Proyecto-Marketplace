import './Register.css'
import Header from '../../components/header/Header'
import InformationCard from '../../components/InformationCard/InformationCard'
import ButtonLogin from '../../components/ButtonLogin/ButtonLogin'
export default function Register() {
    return (
        <>
              <Header />
              <main className="register">
                <h2 className="register-title">Crear nueva cuenta</h2>
                <form className="register-form">
                    <InformationCard type="text" name="name" placeholder="Ingresa tu nombre" text="Nombre" />  
                    <InformationCard type="text" name="phone" placeholder="Ingresa tu número de teléfono" text="Teléfono" />  
                    <InformationCard type="text" name="username" placeholder="Ingresa tu correo electrónico" text="Correo electrónico" />
                    <InformationCard type="password" name="password" placeholder="Ingresa tu contraseña" text="Contraseña" />
                    <ButtonLogin text="Registrarse" />
                </form>
              </main>
            </>

    )
}