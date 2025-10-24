import './servicio.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import TabComponent from '../../components/tab/Tab'
import CardService from '../../components/CardService/CardService'
import FormCotizacion from '../../components/formCotizacion/formCotizacion'
import CardCotizacion from '../../components/cardCotizacion/cardCotizacion'
import { useState } from 'react'
import { useSolicitudes } from '../../context/SolicitudesContext'

export default function Servicio() {
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
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="clienteContainer">
      <CardHeader rol={user.rol} nombre={user.name} />

      {/* Solo mostrar el formulario si hay una solicitud seleccionada */}
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
          CardServiceComponent={CardService}
          CardCotizacionComponent={CardCotizacion}
          mostrarBotonCotizar={true}
          onCotizar={handleCotizar}
        />
      </div>
    </div>
  );
}