import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

/**
 * Props de accesibilidad: vinculan el tab con su panel
 */
function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

/**
 * Componente principal
 */
export default function TabComponent({
  text1 = "Solicitudes",
  text2 = "Cotizaciones",
  solicitudes = [],
  cotizaciones = [],
  CardServiceComponent,
  CardCotizacionComponent,
  mostrarBotonCotizar = false,
  onCotizar,
  mostrarAccionesCotizacion = false,
  mostrarEditarCotizacion = false,
  mostrarEliminarCotizacion = false,
  onAceptarCotizacion,
  onRechazarCotizacion,
  onEditarCotizacion,
  onEliminarCotizacion,
  customCotizacionesRender,
  sort,
  onOrdenarPorPrecio,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Encabezado de las pestañas */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs de solicitudes"
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab label={text1} {...a11yProps(0)} />
          <Tab label={text2} {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Contenido de la primera pestaña */}
      <CustomTabPanel value={value} index={0}>
        {solicitudes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            No hay solicitudes aún. Crea tu primera solicitud.
          </p>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {solicitudes.map((solicitud) => (
              <CardServiceComponent
                key={solicitud.id}
                solicitud={solicitud}
                titulo={solicitud.titulo}
                descripcion={solicitud.descripcion}
                estado={solicitud.estado}
                fecha={solicitud.fecha}
                categoria={solicitud.categoria}
                ubicacion={solicitud.ubicacion}
                materiales={solicitud.materiales}
                mostrarBotonCotizar={mostrarBotonCotizar}
                onCotizar={() => onCotizar && onCotizar(solicitud)}
              />
            ))}
          </Box>
        )}
      </CustomTabPanel>

      {/* Contenido de la segunda pestaña */}
      <CustomTabPanel value={value} index={1}>
        {customCotizacionesRender
          ? customCotizacionesRender()
          : (
            cotizaciones.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                No hay cotizaciones aún.
              </p>
            ) : (
              <Box sx={{ width: '100%' }}>
                {/* Botón para ordenar por precio */}
                {onOrdenarPorPrecio && (
                  <button
                    onClick={onOrdenarPorPrecio}
                    style={{ marginBottom: 10 }}
                  >
                    Ordenar por precio {sort === "asc" ? "▼" : "▲"}
                  </button>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center',
                  }}
                >
                  {cotizaciones.map((c) => (
                    <CardCotizacionComponent
                      key={c.id}
                      titulo={c.titulo || `Cotización #${c.id}`}
                      estado={c.estado}
                      precio={c.precio}
                      tiempoEntrega={c.tiempoEntrega}
                      descripcion={c.descripcion}
                      mostrarAcciones={mostrarAccionesCotizacion}
                      mostrarEditar={mostrarEditarCotizacion}
                      mostrarEliminar={mostrarEliminarCotizacion}
                      onAceptar={() => onAceptarCotizacion && onAceptarCotizacion(c)}
                      onRechazar={() => onRechazarCotizacion && onRechazarCotizacion(c)}
                      onEditar={() => onEditarCotizacion && onEditarCotizacion(c)}
                      onEliminar={() => onEliminarCotizacion && onEliminarCotizacion(c)}
                    />
                  ))}
                </Box>
              </Box>
            )
          )
        }
      </CustomTabPanel>
    </Box>
  );
}
