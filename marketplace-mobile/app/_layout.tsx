import AppNavigator from "@/navigation/AppNavigator";
import { AuthProvider } from "../context/AuthContext";
import { CotizacionProvider } from '../context/CotizacionContext';
import { SolicitudProvider } from "../context/SolicitudContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <SolicitudProvider>
        <CotizacionProvider>
          <AppNavigator />
        </CotizacionProvider>
      </SolicitudProvider>
    </AuthProvider>
  )
}
