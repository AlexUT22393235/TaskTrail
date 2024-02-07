import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function Login() {
  const [nombre, setNombre] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!nombre || !contrasenia) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    // Verificar si hay caracteres "<>"
    if (nombre.includes('<') || nombre.includes('>')) {
      setError('Parece que hubo un error en el nombre de usuario, intenta nuevamente.');
      return;
    }

    if (contrasenia.includes('<') || contrasenia.includes('>')) {
      setError('Parece que hubo un error en la contraseña, intenta nuevamente.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', {
        nombre_usuario: nombre,
        contrasenia: contrasenia,
      });

      if (response.data.error) {
        setError('Credenciales inválidas, por favor inténtelo de nuevo.');
        console.error('Error en la consulta:', response.data.error);
      } else {
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        navigate('/ComponentePruebaEmail');
      }
    } catch (error) {
      setError('Error en la solicitud, por favor inténtelo de nuevo.');
      console.error('Error en la solicitud:', error.message);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex items-center justify-center h-screen w-2/5 bg-white p-8">
        <div className="max-w-md mx-auto border-2 rounded">
          <img src={logo} alt="Logo" className="mb-4 pt-28 pr-28 pl-28" />
          <h2 className="text-2xl text-center">INICIO SESIÓN</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="username"
              >
                USUARIO
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-2 border-2 border-gray rounded"
                placeholder="USUARIO"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                className="w-full p-2 border-2 border-gray rounded"
                placeholder="Ingrese su contraseña"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-800 text-white p-2 rounded"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>

      <div className="flex-auto w-3/5 bg-gray-300">
        <img src="https://images.unsplash.com/photo-1650429960273-8cb6ceefe98f?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagen" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}

export default Login;
