import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import DashboardCliente from '../dashboardCliente/dashboardCliente';
import {Route, Routes} from "react-router-dom";

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<DashboardCliente />} />
        </Routes>
    )
}