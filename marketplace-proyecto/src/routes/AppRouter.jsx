import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Cliente from '../pages/cliente/Cliente';
import Servicio from '../pages/servicio/Servicio';
import {Route, Routes} from "react-router-dom";

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/cliente' element={<Cliente />} />
            <Route path='/dashboard/servicio' element={<Servicio />} />
        </Routes>
    )
}