import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

/**
 * Panel de contenido que se muestra solo cuando su tab está activa
 */
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
export default function TabComponent({ text1, text2, solicitudes = [], CardServiceComponent, CardCotizacionComponent, mostrarBotonCotizar = false, onCotizar }) {
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
                titulo={solicitud.titulo}
                descripcion={solicitud.descripcion}
                estado={solicitud.estado}
                fecha={solicitud.fecha}
                categoria={solicitud.categoria}
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
        <CardCotizacionComponent />
      </CustomTabPanel>
    </Box>
  );
}
