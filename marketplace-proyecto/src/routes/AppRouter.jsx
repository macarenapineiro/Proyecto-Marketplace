import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Cliente from '../pages/cliente/Cliente';
import Servicio from '../pages/servicio/Servicio';
import Insumo from '../pages/insumos/Insumo';
import {Route, Routes} from "react-router-dom";

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cliente' element={<Cliente />} />
            <Route path='/servicio' element={<Servicio />} />
            <Route path='/insumo' element={<Insumo />} />
        </Routes>
    )
}