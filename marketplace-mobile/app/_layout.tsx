import AppNavigator from "../app/AppNavigator";
import { AuthProvider } from "../context/AuthContext";
import { SolicitudProvider } from "../context/SolicitudContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <SolicitudProvider>
        <AppNavigator />
      </SolicitudProvider>
    </AuthProvider>
  )
}
