import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function Login() {
  const [nombre, setNombre] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const navigate = useNavigate();

  const handleNombreChange = (e) => {
    const value = e.target.value;
    // Validar que el nombre de usuario permita solo caracteres alfanuméricos, arrobas y puntos
    if (/^[a-zA-Z0-9@.]*$/.test(value)) {
      setNombre(value);
    }
  };
  

  const handleContraseniaChange = (e) => {
    const value = e.target.value;
    // Validar que la contraseña no contenga caracteres especiales ni espacios en blanco
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setContrasenia(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        nombre_usuario: nombre,
        contrasenia: contrasenia,
      });

      if (response.data.error) {
        console.error('Error en la consulta:', response.data.error);
        // Manejar el error según tus necesidades, puedes mostrar un mensaje al usuario, etc.
      } else {
        console.log('Inicio de sesión exitoso', response.data);
        // Guardar el usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        console.log('Redirigiendo a /Admin');
        navigate('/ComponentePruebaEmail');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      // Manejar el error según tus necesidades, puedes mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex items-center justify-center h-screen w-2/5 bg-white p-8">
        <div className="max-w-md mx-auto border-2 rounded">
          <img src={logo} alt="Logo" className="mb-4 pt-28 pr-28 pl-28" />
          <h2 className="text-2xl text-center">INICIA SESION</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
             
              <input
                type="text"
                id="username"
                name="username"
                value={nombre}
                onChange={handleNombreChange}
                className="w-full p-2 border-2 border-gray rounded"
                placeholder="Usuario"
              />
            </div>

            <div className="mb-4">
             
              <input
                type="password"
                id="password"
                name="password"
                value={contrasenia}
                onChange={handleContraseniaChange}
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
