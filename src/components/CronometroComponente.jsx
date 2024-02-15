import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function CronometroComponente() {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [cronometroActivado, setCronometroActivado] = useState(false);
  const [esperandoConfirmacion, setEsperandoConfirmacion] = useState(false);
  const [trabajoTerminado, setTrabajoTerminado] = useState(false);

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
    setTrabajoTerminado(false);
  };

  const handleParar = () => {
    if (cronometroActivado) {
      setEsperandoConfirmacion(true);
    } else {
      setCronometroActivado(false);
      setEsperandoConfirmacion(false);
    }
  };

  const handleConfirmarCambios = () => {
    setEsperandoConfirmacion(false);
    setCronometroActivado(false);

    // Guardar tiempo en el localStorage
    localStorage.setItem('tiempoTranscurrido', tiempoTranscurrido.toString());

    // Realizar la lógica para enviar a la base de datos
    handleGuardarTrabajo();

    // Limpiar localStorage después de guardar en la base de datos
    localStorage.removeItem('tipoTrabajo');
    localStorage.removeItem('tarifa');
    localStorage.removeItem('descripcion');
    localStorage.removeItem('tiempoTranscurrido');
    
    reiniciarCronometro();
    setTrabajoTerminado(true);
  };

  const handleCancelarCambios = () => {
    setEsperandoConfirmacion(false);
    setCronometroActivado(true);
  };

  const reiniciarCronometro = () => {
    setTiempoTranscurrido(0);
  };

  const handleGuardarTrabajo = async () => {
    try {
      // Obtener datos del localStorage
      const usuarioId = localStorage.getItem('usuarioId');
      const tipoTrabajoId = localStorage.getItem('tipoTrabajo');
      const tarifaTrabajoId = localStorage.getItem('tarifa');
      const descripcion = localStorage.getItem('descripcion');
      const horasTrabajo = localStorage.getItem('tiempoTranscurrido');

      // Enviar datos a la base de datos
      const response = await axios.post('http://localhost:3001/trabajos/crearTrabajo', {
        usuario_id: usuarioId,
        tipo_trabajo_id: tipoTrabajoId,
        tarifa_trabajo_id: tarifaTrabajoId,
        descripcion: descripcion,
        horas_trabajo: horasTrabajo
      });

      console.log('Trabajo guardado en la base de datos:', response.data);

      // Mostrar mensaje de éxito
      Swal.fire({
        title: 'Guardado',
        text: 'El trabajo ha sido guardado exitosamente en la base de datos',
        icon: 'success',
        showConfirmButton: true
      });
    } catch (error) {
      console.error('Error al guardar el trabajo en la base de datos:', error);

      // Mostrar mensaje de error
      Swal.fire('Error', 'No se pudo guardar el trabajo en la base de datos', 'error');
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
  
      <p className="text-center p-6 sm:p-10 text-4xl sm:text-9xl mt-2 sm:mt-2 mb-2 sm:mb-26">{formatearTiempo(tiempoTranscurrido)}</p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-24 mt-4 sm:mt-32">
        <button
          className="bg-blue-900 text-white p-3 hover:bg-blue-700 rounded-lg mb-4 sm:mb-0 w-full sm:w-48 h-16"
          onClick={handleIniciar}
          disabled={cronometroActivado || trabajoTerminado}
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
