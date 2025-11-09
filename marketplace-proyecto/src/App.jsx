import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from './routes/AppRouter'
import { ServiceProvider } from './context/ServiceContext'
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <section className="App">
        <AuthProvider>
          <ServiceProvider>
            <Router>
              <AppRouter />
            </Router>
          </ServiceProvider>
        </AuthProvider>
    </section>
  )
}
export default App

