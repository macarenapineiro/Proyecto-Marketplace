import './App.css'
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from './routes/AppRouter'
import { SolicitudesProvider } from './context/SolicitudesContext'

function App() {
  return (
    <section className="App">
      <SolicitudesProvider>
        <Router>
          <AppRouter />
        </Router>
      </SolicitudesProvider>
    </section>
  )
}
export default App

