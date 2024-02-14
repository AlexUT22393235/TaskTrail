import React, { createContext, useContext, useState } from 'react';

const TrabajoPendienteContext = createContext();

export const TrabajoPendienteProvider = ({ children }) => {
  const [trabajoPendiente, setTrabajoPendiente] = useState({
    descripcion: '',
    horas_trabajo: 0,
    tipo_trabajo_id: null,
    tarifa_trabajo_id: 0,
    usuario_id: null, // Inicializar con null
  });
  

  return (
    <TrabajoPendienteContext.Provider value={{ trabajoPendiente, setTrabajoPendiente }}>
      {children}
    </TrabajoPendienteContext.Provider>
  );
};

export const useTrabajoPendiente = () => {
  return useContext(TrabajoPendienteContext);
};
