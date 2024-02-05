import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

function Cronometro() {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [cronometroActivado, setCronometroActivado] = useState(false);

  useEffect(() => {
    let interval;

    if (cronometroActivado) {
      interval = setInterval(() => {
        setTiempoTranscurrido((prevTiempo) => prevTiempo + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [cronometroActivado]);

  const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    
    

    const formatoHora = (valor) => (valor < 10 ? `0${valor}` : valor);

    return `${formatoHora(horas)}:${formatoHora(minutos)}:${formatoHora(segundosRestantes)}`;
  };

  const handleIniciar = () => {
    setCronometroActivado(true);
  };

  const handleParar = () => {
    setCronometroActivado(false);
  };

  return (
    <>
      <Header />
     
      <h1 className="font-semibold text-5xl text-center">CRONÓMETRO DE TRABAJO</h1>

      <p className="text-center m-10 p-10 mb-1 text-5xl">Tiempo transcurrido:</p>
      <p className="text-center p-10 text-8xl">{formatearTiempo(tiempoTranscurrido)}</p>
      <div className="flex justify-center items-center space-x-24 mt-32">
        <button
          className="bg-blue-900 text-white p-3 hover:bg-blue-700 rounded-lg mr-10 w-48 h-16"
          onClick={handleIniciar}
          disabled={cronometroActivado}
        >
          Iniciar Trabajo
        </button>
        <button
          className="bg-blue-400 text-white p-3 hover:bg-blue-300 rounded-lg w-48 h-16"
          onClick={handleParar}
          disabled={!cronometroActivado}
        >
          Terminar Trabajo
        </button>
      </div>
    </>
  );
}

export default Cronometro;