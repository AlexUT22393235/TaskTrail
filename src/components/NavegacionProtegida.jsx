import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const NavegacionProtegida = ({ element }) => {
  const onNavigate = (event) => {
    if (!event || !event.defaultPrevented) {
      return <Navigate to="/" />;
    }
  };

  return React.cloneElement(element, { onNavigate });
};

export default NavegacionProtegida;
