import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles }) => {
  const usuarioId = localStorage.getItem('usuarioId');
  const rolId = localStorage.getItem('usuarioRol');

  // Verificar si el usuario está autenticado y su rol permite acceder a la ruta
  const isAuthenticated = usuarioId && rolId && allowedRoles.includes(parseInt(rolId));

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;