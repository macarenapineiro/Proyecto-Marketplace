import './Dashboard.css'
import Header from '../../components/header/Header';
import ButtonRol from '../../components/ButtonRol/ButtonRol';
import { useEffect } from 'react';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Header />
            <div className="dashboardContainer">
                <h2 className="dashboardSubtitle">Selecciona un Rol</h2>
                <div className="button-container-rol">
                    <ButtonRol text="Cliente" page="/dashboard/cliente" />
                    <ButtonRol text="Servicio" page="/dashboard/servicio" />
                    <ButtonRol text="Insumos" page="/dashboard/insumos" />
                </div>
            </div>
        </div>
    )
}