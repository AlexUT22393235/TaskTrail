import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const AuthChecker = ({ element }) => {
  // Verificar si el usuario está autenticado (puedes implementar tu lógica de autenticación aquí)
  const isAuthenticated = localStorage.getItem('usuario');

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default AuthChecker;
