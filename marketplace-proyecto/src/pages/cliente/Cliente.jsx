import './Cliente.css'
import CardHeader from '../../components/cardHeader/cardHeader'
import CardService from '../../components/CardService/CardService'
import TabComponent from '../../components/tab/Tab'
import FormSolicitud from '../../components/formSolicitud/formSolicitud'
export default function Cliente() {
    return (
        <div className="clienteContainer">
          <CardHeader rol="Solicitante" nombre="Juan Pérez" />
          <FormSolicitud />
          <div className="servicioContainer">
              <TabComponent text1="Mis solicitudes" text2="Cotizaciones" />
          </div>
        </div>

    )
}