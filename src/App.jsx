import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Trabajos from './pages/Trabajos';
import Detalles from './pages/Detalles';
import Secciones from './pages/Secciones';
import GeneradoCodigo from './Functions/GeneradoCodigo';
import CodigoVerificacion from "./pages/CodigoVerificacion";
import ComponentePrueba from "./pages/ComponentePrueba";
import ComponentePruebaEmail from "./pages/ComponentePruebaEmail";
import AdminGeneral from './pages/AdminGeneral';
import PrivateRoute from './pages/PrivateRoute';
import 'tailwindcss/tailwind.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Admin"
          element={
            <PrivateRoute
              element={<Admin />}
              allowedRoles={[1]}
            />
          }
        />
        <Route
          path="/Trabajos"
          element={
            <PrivateRoute
              element={<Trabajos />}
              allowedRoles={[2]}
            />
          }
        />
        <Route
          path="/Detalles"
          element={
            <PrivateRoute
              element={<Detalles />}
              allowedRoles={[2]}
            />
          }
        />
        <Route
          path="/Secciones"
          element={
            <PrivateRoute
              element={<Secciones />}
              allowedRoles={[2]}
            />
          }
        />
        <Route
          path="/Codigo"
          element={
            <PrivateRoute
              element={<GeneradoCodigo />}
              allowedRoles={[2]}
            />
          }
        />
        <Route
          path="/CodigoVerificacion"
          element={
            <PrivateRoute
              element={<CodigoVerificacion />}
              allowedRoles={[2]}
            />
          }
        />
        <Route
          path="/ComponentePrueba"
          element={
            <PrivateRoute
              element={<ComponentePrueba />}
              allowedRoles={[2]}
            />
          }
        />
        <Route
          path="/ComponentePruebaEmail"
          element={
            <PrivateRoute
              element={<ComponentePruebaEmail />}
              allowedRoles={[2]}
            />
          }
        />
        <Route
          path="/AdminGeneral"
          element={
            <PrivateRoute
              element={<AdminGeneral />}
              allowedRoles={[1]}
            />
          }
        />
        <Route path="/Detalles/:id" element={<PrivateRoute element={<Detalles />} allowedRoles={[2]} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;