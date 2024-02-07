import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Swal from 'sweetalert2';

function Cronometro() {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [cronometroActivado, setCronometroActivado] = useState(false);

  useEffect(() => {
    let interval;
    if (cronometroActivado) {
      interval = setInterval(() => {
        setTiempoTranscurrido(prevTiempo => prevTiempo + 1);
      }, 1000);
    } else if (!cronometroActivado && tiempoTranscurrido !== 0) {
      guardarTiempoEnBaseDeDatos(tiempoTranscurrido); // Asegura usar correctamente el nombre de la función
    }
    return () => clearInterval(interval);
  }, [cronometroActivado, tiempoTranscurrido]);

  // Completa esta función para formatear el tiempo transcurrido en un formato legible (HH:MM:SS)
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
    setCronometroActivado(false);
  };

  // Asegura que esta es la única función utilizada para guardar el tiempo en la base de datos
  const guardarTiempoEnBaseDeDatos = async (tiempoSegundos) => {
    const horasTrabajo = tiempoSegundos / 3600; // Conversión de segundos a horas
    try {
      await axios.post('http://localhost:3001/cronometro', {
        descripcion: 'Descripción del trabajo realizado', // Ajusta estos datos según necesites
        horas_trabajo: horasTrabajo,
        tipo_trabajo_id: 1, // Ajusta estos IDs según necesites
        tarifa_trabajo_id: 1,
        usuario_id: 1
      });
      Swal.fire('Guardado', 'El tiempo de trabajo ha sido guardado exitosamente', 'success');
    } catch (error) {
      console.error('Error al guardar el tiempo de trabajo', error);
      Swal.fire('Error', 'No se pudo guardar el tiempo de trabajo', 'error');
    }
  };

  return (
    <>
      <Header />
      <h1 className="font-semibold text-5xl text-center">CRONÓMETRO DE TRABAJO</h1>
      <p className="text-center m-10 p-10 mb-1 text-5xl">Tiempo transcurrido:</p>
      <p className="text-center p-10 text-8xl">{formatearTiempo(tiempoTranscurrido)}</p>
      <div className="flex justify-center items-center space-x-24 mt-32">
        <button className="bg-blue-900 text-white p-3 hover:bg-blue-700 rounded-lg mr-10 w-48 h-16" onClick={handleIniciar} disabled={cronometroActivado}>Iniciar Trabajo</button>
        <button className="bg-blue-400 text-white p-3 hover:bg-blue-300 rounded-lg w-48 h-16" onClick={handleParar} disabled={!cronometroActivado}>Terminar Trabajo</button>
      </div>
    </>
  );
}

export default Cronometro;
