import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Cliente from '../pages/cliente/Cliente';
import Servicio from '../pages/servicio/Servicio';
import Insumo from '../pages/insumos/Insumo';
import {Route, Routes} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RolBasedControlledRoutes from './RolBassedControlledRoutes';

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route element={<RolBasedControlledRoutes rol="Solicitante" />}>
                    <Route path='/cliente' element={<Cliente />} />
                </Route>
                <Route element={<RolBasedControlledRoutes rol="Proveedor" />}>
                    <Route path='/servicio' element={<Servicio />} />
                </Route>
                <Route element={<RolBasedControlledRoutes rol="Proveedor de Insumos" />}>
                    <Route path='/insumo' element={<Insumo />} />
                </Route>
            </Route>
        </Routes>
    )
}