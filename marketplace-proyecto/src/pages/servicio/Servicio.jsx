import './servicio.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import TabComponent from '../../components/tab/Tab'
import CardService from '../../components/CardService/CardService'
import FormCotizacion from '../../components/formCotizacion/formCotizacion'
import { useState } from 'react'
import { useSolicitudes } from '../../context/SolicitudesContext'

export default function Servicio() {
  const { solicitudes } = useSolicitudes();
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

  return (
    <div className="clienteContainer">
      <CardHeader rol="Servicio" nombre="Juan Pérez" />

      {/* Solo mostrar el formulario si hay una solicitud seleccionada */}
      {showForm && (
        <FormCotizacion
          solicitud={solicitudSeleccionada}
          onCancel={handleCancelar}
        />
      )}

      {/* Tabs con solicitudes */}
      <div className="servicioContainer">
        <TabComponent
          text1="Solicitudes disponibles"
          text2="Mis cotizaciones"
          solicitudes={solicitudes}
          CardServiceComponent={CardService}
          mostrarBotonCotizar={true}
          onCotizar={handleCotizar}
        />
      </div>
    </div>
  );
}