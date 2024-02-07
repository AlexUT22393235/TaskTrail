import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TuComponente = () => {
  const [descripcion, setDescripcion] = useState([]);

  const obtenerNombreTipoTrabajo = (tipoTrabajoId) => {
    switch (tipoTrabajoId) {
      case 1:
        return 'Reparación mecánica';
      case 2:
        return 'Reparación chapa y pintura';
      case 3:
        return 'Revisión';
      default:
        return 'Desconocido';
    }
  };

  useEffect(() => {
    // Hacer la solicitud a la API para obtener la lista de trabajos
    axios.get('http://localhost:3001/trabajos')
      .then(response => {
        // Actualizar el estado con los datos recibidos
        setDescripcion(response.data);
      })
      .catch(error => {
        console.error('Error al obtener información del trabajo', error);
      });
  }, []);

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border bg-sky-200">#</th>
          <th className="py-2 px-4 border bg-sky-200">Trabajo</th>
          <th className="py-2 px-4 border bg-sky-200">Descripcion</th>
          <th className="py-2 px-4 border bg-sky-200">Precio</th>
          <th className="py-2 px-4 border bg-sky-200">Detalles</th>
        </tr>
      </thead>
      <tbody>
        {descripcion.map((trabajo, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border">{trabajo.id_trabajo}</td>
            <td className="py-2 px-4 border">{obtenerNombreTipoTrabajo(trabajo.tipo_trabajo_id)}</td>
            <td className="py-2 px-4 border">{trabajo.descripcion}</td>
            <td className="py-2 px-4 border">{/* Agrega aquí el precio del trabajo */}</td>
            <td className="py-2 px-4 border flex justify-center items-center">
              <Link to={`/Detalles/${trabajo.id_trabajo}`}>
                <FaEye size="2rem" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TuComponente;
