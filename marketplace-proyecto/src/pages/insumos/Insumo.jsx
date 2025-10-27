import './insumo.css';
import CardHeader from '../../components/cardHeader/cardHeader'
import TabComponent from '../../components/tab/Tab'
import CardService from '../../components/CardService/CardService'
import FormCotizacion from '../../components/formCotizacion/formCotizacion'
import CardInsumos from '../../components/cardInsumos/CardInsumos'
import { useState } from 'react'
import { useSolicitudes } from '../../context/ServiceContext'
import {useAuth} from '../../context/AuthContext'

export default function Insumo() {
    const { currentUser } = useAuth();
    const { solicitudes, enviarCotizacion } = useSolicitudes();
    const [showForm, setShowForm] = useState(false);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

    const handleCancelar = () => {
        setShowForm(false);
        setSolicitudSeleccionada(null);
    };

    const handleCotizar = (solicitud) => {
        setSolicitudSeleccionada(solicitud);
        setShowForm(true);
        // Aquí puedes agregar la lógica para crear una cotización
    };

    const handleEnviarCotizacion = (cotizacion) => {
        enviarCotizacion(cotizacion);
        setShowForm(false);
        setSolicitudSeleccionada(null);
    }
    return (
        <div className='insumoContainer'>
            <CardHeader rol={currentUser.rol} nombre={currentUser.name} />
            <CardInsumos />
            {showForm && (
                <FormCotizacion
                    solicitud={solicitudSeleccionada}
                    onCancel={handleCancelar}
                    onSubmit={handleEnviarCotizacion}
                />
            )}

            {/* Tabs con solicitudes */}
            <div className="servicioContainer">
                <TabComponent
                    text1="Solicitudes disponibles"
                    text2="Mis cotizaciones"
                    solicitudes={solicitudes}
                    CardServiceComponent={CardInsumos}
                    CardCotizacionComponent={CardService}
                    mostrarBotonCotizar={true}
                    onCotizar={handleCotizar}
                />
            </div>
        </div>
    )
}