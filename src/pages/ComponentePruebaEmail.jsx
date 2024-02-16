import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ComponentePruebaEmail = () => {
  const [destinatario, setDestinatario] = useState('');
  const [codigoVerificacion, setCodigoVerificacion] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [error, setError] = useState('');
  const [enviandoCorreo, setEnviandoCorreo] = useState(false);
  const navigate = useNavigate();

  function generarCodigoVerificacion() {
    return String(Math.floor(1000 + Math.random() * 9000));
  }

  const handleEnvioCorreo = async () => {
    try {
      if (!enviandoCorreo) {
        setEnviandoCorreo(true);
        const codigo = generarCodigoVerificacion();
        setCodigoVerificacion(codigo);

        const response = await axios.post('http://localhost:3001/email/enviar-correo', {
          destinatario,
          asunto: 'Código de verificación',
          cuerpo: `Tu código de verificación es: ${codigo}`,
        });

        console.log(response.data.mensaje);
        setMostrarModal(true);
      } else {
        console.log('El correo electrónico ya está siendo enviado.');
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico', error);
    } finally {
      setEnviandoCorreo(false);
    }
  };

  const handleSubmitCodigo = () => {
    if (codigoIngresado === codigoVerificacion) {
      navigate('/Trabajos');
    } else {
      setError('Los códigos de verificación no coinciden. Intente de nuevo.');
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[<>&/\\]/g, ''); // Elimina caracteres comunes utilizados en inyecciones de SQL y scripts maliciosos
    setDestinatario(sanitizedValue);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-200 via-blue-100 to-white">
      <div className="bg-white p-10 rounded-lg shadow-md w-96">
        <h1 className="text-3xl mb-6 text-center font-semibold text-gray-800">Código de Verificación</h1>
        <p className="text-gray-600 text-center mb-6">Por favor, ingrese su correo electrónico a continuación. {enviandoCorreo ? 'Enviando correo electrónico...' : 'Le enviaremos un código de verificación para poder iniciar sesión correctamente.'}</p>
        <div className="flex flex-col items-center space-y-4">
          <label className="w-full">
            <span className="text-gray-700">Correo electrónico:</span>
            <input type="text" value={destinatario} onChange={handleInputChange} className="block w-full mt-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 border" />
          </label>
          <button onClick={handleEnvioCorreo} disabled={enviandoCorreo} className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${enviandoCorreo && 'opacity-50 cursor-not-allowed'}`}>
            {enviandoCorreo ? 'Enviando...' : 'Enviar Código de Verificación'}
          </button>
        </div>
      </div>
      
      {mostrarModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-md w-96">
            <h2 className="text-xl mb-6 text-center font-semibold text-gray-800">Ingrese el Código de Verificación</h2>
            <input type="text" value={codigoIngresado} onChange={(e) => setCodigoIngresado(e.target.value)} className="w-full mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="flex justify-center mt-4">
              <button onClick={handleSubmitCodigo} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentePruebaEmail;
