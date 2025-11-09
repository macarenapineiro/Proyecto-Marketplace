import Header from '../../components/header/Header';
import Boton from '../../components/ButtonHome/ButtonHome';
import './Home.css';
export default function Home() {
    return (
        <>
            <div className="home">
                <Header />
                <div className="container">
                    <h2 className="homeSubtitle">Bienvenido</h2>
                    <div className="button-container">
                        <Boton texto="Iniciar Sesión" pagina="/login" />
                    </div>
                </div>
            </div>
        </>
    )
}