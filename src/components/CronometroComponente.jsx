import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CronometroComponente() {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [cronometroActivado, setCronometroActivado] = useState(false);
  const [esperandoConfirmacion, setEsperandoConfirmacion] = useState(false);

  useEffect(() => {
    let interval;
    if (cronometroActivado) {
      interval = setInterval(() => {
        setTiempoTranscurrido(prevTiempo => prevTiempo + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cronometroActivado]);

  const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return [horas, minutos, segundosRestantes]
      .map(valor => valor < 10 ? `0${valor}` : valor)
      .join(':');
  };

  const handleIniciar = () => {
    setCronometroActivado(true);
  };

  const handleParar = () => {
    if (cronometroActivado) {
      setEsperandoConfirmacion(true);
    } else {
      setCronometroActivado(false);
      setEsperandoConfirmacion(false);
    }
  };

  const handleConfirmarCambios = async () => {
    setEsperandoConfirmacion(false);
    setCronometroActivado(false);
    await guardarTiempoEnBaseDeDatos(tiempoTranscurrido);
  };

  const handleCancelarCambios = () => {
    setEsperandoConfirmacion(false);
    setCronometroActivado(true);
  };

  const guardarTiempoEnBaseDeDatos = async (tiempoSegundos) => {
    try {
      const response = await axios.post('http://localhost:3001/cronometro', {
        descripcion: 'Descripción del trabajo realizado',
        segundosTranscurridos:  tiempoSegundos,
        tipo_trabajo_id: 1,
        tarifa_trabajo_id: 1,
        usuario_id: 1
      });
  
      Swal.fire({
        title: 'Guardado',
        text: 'El tiempo de trabajo ha sido guardado exitosamente',
        icon: 'success',
        showConfirmButton: true // Mostrar el botón Ok
      });
    } catch (error) {
      console.error('Error al guardar el tiempo de trabajo', error);
      Swal.fire('Error', 'No se pudo guardar el tiempo de trabajo', 'error');
    }
  };

  return (
    <div className="flex flex-col mr-4">
      <h1 className="font-semibold text-4xl sm:text-5xl text-center mb-8 mt-4">CRONÓMETRO DE TRABAJO</h1>
  
      {esperandoConfirmacion && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <p className="text-center mb-4">¿Desea confirmar cambios?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded"
                onClick={handleConfirmarCambios}
              >
                Confirmar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCancelarCambios}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
  
      <p className="text-center p-6 sm:p-10 text-4xl sm:text-9xl mt-4 sm:mt-7 mb-8 sm:mb-32">{formatearTiempo(tiempoTranscurrido)}</p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-24 mt-4 sm:mt-32">
        <button
          className="bg-blue-900 text-white p-3 hover:bg-blue-700 rounded-lg mb-4 sm:mb-0 w-full sm:w-48 h-16"
          onClick={handleIniciar}
          disabled={cronometroActivado}
        >
          Iniciar Trabajo
        </button>
        <button
          className="bg-blue-400 text-white p-3 hover:bg-blue-300 rounded-lg w-full sm:w-48 h-16"
          onClick={handleParar}
          disabled={!cronometroActivado}
        >
          Terminar Trabajo
        </button>
      </div>
    </div>
  );

}

export default CronometroComponente;
