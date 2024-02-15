import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const GuardarTrabajo = () => {
  const handleGuardarTrabajo = async () => {
    try {
      // Obtener datos del localStorage
      const usuarioId = localStorage.getItem('usuarioId');
      const tipoTrabajoId = localStorage.getItem('tipoTrabajo'); // Cambiado a snake_case
      const tarifaTrabajoId = localStorage.getItem('tarifa'); // Cambiado a snake_case
      const descripcion = localStorage.getItem('descripcion');
      const horasTrabajo = localStorage.getItem('tiempoTranscurrido'); // Cambiado a snake_case

      // Enviar datos a la base de datos
      const response = await axios.post('http://localhost:3001/trabajos/crearTrabajo', {
        usuario_id: usuarioId,
        tipo_trabajo_id: tipoTrabajoId,
        tarifa_trabajo_id: tarifaTrabajoId,
        descripcion: descripcion,
        horas_trabajo: horasTrabajo // Cambiado a snake_case
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
    <div className="flex justify-center items-center mt-4">
      <button
        className="bg-blue-500 text-white p-3 hover:bg-blue-700 rounded-lg w-full sm:w-48 h-16"
        onClick={handleGuardarTrabajo}
      >
        Guardar Trabajo
      </button>
    </div>
  );
};

export default GuardarTrabajo;
