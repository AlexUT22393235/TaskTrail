import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Token() {
  const [codigoVerificacion, setCodigoVerificacion] = useState('');
  const navigate = useNavigate();

  const handleGenerarCodigo = async () => {
    try {
      // Llamar a la nueva ruta para generar y enviar el código de verificación
      const response = await axios.post('http://localhost:3001/usuarios/generar-codigo', {
        nombre: 'nombre_del_usuario', // Reemplaza con el nombre de usuario del usuario actual
      });

      if (response.data.error) {
        console.error('Error al generar el código de verificación:', response.data.error);
        // Manejar el error según tus necesidades, puedes mostrar un mensaje al usuario, etc.
      } else {
        console.log('Código de verificación generado correctamente');
        // Mostrar mensaje o realizar acciones adicionales según sea necesario
      }
    } catch (error) {
      console.error('Error al generar el código de verificación:', error.message);
      // Manejar el error según tus necesidades
    }
  };

  const handleVerificarCodigo = async () => {
    try {
      // Llamar a la nueva ruta para verificar el código de verificación
      const response = await axios.post('http://localhost:3001/usuarios/verificar-codigo', {
        nombre: 'nombre_del_usuario', // Reemplaza con el nombre de usuario del usuario actual
        codigoVerificacion,
      });

      if (response.data.error) {
        console.error('Error al verificar el código de verificación:', response.data.error);
        // Manejar el error según tus necesidades, puedes mostrar un mensaje al usuario, etc.
      } else {
        console.log('Código de verificación correcto');
        // Redirigir al usuario a la página de trabajos u otras acciones según sea necesario
        navigate('/Trabajos');
      }
    } catch (error) {
      console.error('Error al verificar el código de verificación:', error.message);
      // Manejar el error según tus necesidades, puedes mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-[18%] bg-gray-200 border p-10 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Ingrese su token de acceso</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="verificationCode" className="block font-bold mb-2">
                Token
              </label>
              <input
                type="text"
                id="verificationCode"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                value={codigoVerificacion}
                onChange={(e) => setCodigoVerificacion(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleVerificarCodigo}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Ingresar
            </button>
          </form>
          <button
            type="button"
            onClick={handleGenerarCodigo}
            className="mt-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          >
            Generar Código
          </button>
        </div>
      </div>
    </>
  );
}

export default Token;
