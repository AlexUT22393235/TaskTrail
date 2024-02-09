// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Trabajos from './pages/Trabajos';
import Detalles from './pages/Detalles';
import Secciones from './pages/Secciones';
import ListaMateriales from './pages/ListaMaterial';
import Cronometro from './pages/Cronometro';
import GeneradoCodigo from './Functions/GeneradoCodigo';
import AdminHerramientas from "./pages/AdminHerramientas";
import Trabajos1 from "./pages/Trabajos1";
import CodigoVerificacion from "./pages/CodigoVerificacion";
import ComponentePrueba from "./pages/ComponentePrueba";
import ComponentePruebaEmail from "./pages/ComponentePruebaEmail";
import AdminGeneral from './pages/AdminGeneral'
import AuthChecker from './pages/PrivateRoute'; 
import 'tailwindcss/tailwind.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Admin" element={<AuthChecker element={<Admin />} />} />
        <Route path="/Trabajos" element={<AuthChecker element={<Trabajos />} />} />
        <Route path="/Detalles" element={<AuthChecker element={<Detalles />} />} />
        <Route path="/Secciones" element={<AuthChecker element={<Secciones />} />} />
        <Route path="/ListaMateriales" element={<AuthChecker element={<ListaMateriales />} />} />
        <Route path="/Cronometro" element={<AuthChecker element={<Cronometro />} />} />
        <Route path="/Codigo" element={<AuthChecker element={<GeneradoCodigo />} />} />
        <Route path="/AdminHerramientas" element={<AuthChecker element={<AdminHerramientas />} />} />
        <Route path="/Trabajos1" element={<AuthChecker element={<Trabajos1 />} />} />
        <Route path="/CodigoVerificacion" element={<AuthChecker element={<CodigoVerificacion />} />} />
        <Route path="/ComponentePrueba" element={<AuthChecker element={<ComponentePrueba />} />} />
        <Route path="/ComponentePruebaEmail" element={<AuthChecker element={<ComponentePruebaEmail />} />} />
        <Route path="/AdminGeneral" element={<AuthChecker element={<AdminGeneral />} />} />
      </Routes>
    </Router>
  );
};

export default App;
