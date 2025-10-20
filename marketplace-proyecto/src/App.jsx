import './App.css'
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <section className="App">
      <Router>
        <AppRouter />
      </Router>
    </section>
  )
}
export default App

