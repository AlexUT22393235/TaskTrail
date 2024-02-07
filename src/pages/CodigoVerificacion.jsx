import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function CodigoVerificacion() {
  const [codigoVerificacion, setCodigoVerificacion] = useState('');
  
  // Obtener el correo electrónico de la cookie
  const userEmail = Cookies.get('userEmail') || '';

  const handleEnviarCodigo = async () => {
    try {
      // Verificar si el correo electrónico es válido
      if (!userEmail) {
        console.error('Error: Correo electrónico no válido');
        return;
      }

      // Generar un código de verificación de 4 dígitos aleatorio
      const codigoAleatorio = Math.floor(1000 + Math.random() * 9000);
      
      // Enviar el código de verificación al correo electrónico del usuario
      const response = await axios.post('http://localhost:3001/email/enviar-correo', {
        destinatario: userEmail,
        asunto: 'Código de verificación',
        cuerpo: `Tu código de verificación es: ${codigoAleatorio}`,
      });

      console.log(response.data.mensaje);
      
      // Actualizar el estado del código de verificación
      setCodigoVerificacion(codigoAleatorio.toString());
    } catch (error) {
      console.error('Error al enviar el correo electrónico', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[18%] bg-gray-200 border p-10 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Ingrese su código de verificación</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="codigoVerificacion" className="block font-bold mb-2">
              Código de verificación
            </label>
            <input
              type="text"
              id="codigoVerificacion"
              value={codigoVerificacion}
              onChange={(e) => setCodigoVerificacion(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button 
            type="button" 
            className="mr-4 bg-green-400 p-2 rounded-lg text-white hover:bg-green-300"
            onClick={handleEnviarCodigo}
          >
            Obtener código
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CodigoVerificacion;
