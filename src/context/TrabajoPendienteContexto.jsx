import React, { createContext, useContext, useState } from 'react';

const TrabajoPendienteContext = createContext();

export const TrabajoPendienteProvider = ({ children }) => {
  const [trabajoPendiente, setTrabajoPendiente] = useState(null);

  return (
    <TrabajoPendienteContext.Provider value={{ trabajoPendiente, setTrabajoPendiente }}>
      {children}
    </TrabajoPendienteContext.Provider>
  );
};

export const useTrabajoPendiente = () => {
  return useContext(TrabajoPendienteContext);
};
