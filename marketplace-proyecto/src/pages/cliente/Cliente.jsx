import './Cliente.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import CardService from '../../components/CardService/CardService'
import TabComponent from '../../components/tab/Tab'
import FormSolicitud from '../../components/formSolicitud/formSolicitud'
import {useState} from 'react'
export default function Cliente() {
    const [showForm, setShowForm] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  const handleNuevaSolicitud = () => {
    setShowForm(true);
  };

  const handleCancelar = () => {
    setShowForm(false);
  };

  const handleCrearSolicitud = (nuevaSolicitud) => {
    setSolicitudes(prev => [...prev, nuevaSolicitud]);
    setShowForm(false);
  };

  return (
    <div className="clienteContainer">
      <CardHeader rol="Solicitante" nombre="Juan Pérez" />

      <div className="buttonContainer">
        {/* Mostrar botón solo si el formulario NO está visible */}
      {!showForm && (
        <button 
          className="nuevaSolicitudButton" 
          onClick={handleNuevaSolicitud}
        >
          + Nueva solicitud
        </button>
      )}

      {/* Mostrar formulario si showForm es true */}
      {showForm && (
        <FormSolicitud 
          onSubmit={handleCrearSolicitud} 
          onCancel={handleCancelar} 
        />
      )}
      </div>

      {/* Tabs con solicitudes */}
      <div className="servicioContainer">
        <TabComponent 
          text1="Mis solicitudes" 
          text2="Cotizaciones"
          solicitudes={solicitudes}
          CardServiceComponent={CardService}
        />
      </div>
    </div>
  );
}