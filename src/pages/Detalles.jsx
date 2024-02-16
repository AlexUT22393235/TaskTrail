import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Detalles = () => {
  const [trabajo, setTrabajo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrabajoDetails = async () => {
      try {
        console.log("ID de trabajo:", id);

        const response = await axios.get(`http://localhost:3001/trabajos/${id}`);
        setTrabajo(response.data);
      } catch (error) {
        console.error('Error al obtener detalles del trabajo', error);
      }
    };

    if (id) {
      fetchTrabajoDetails();
    }
  }, [id]);

  if (!trabajo) {
    return <div>Cargando detalles del trabajo...</div>;
  }

  return (
    <div>
      <h2>Detalles del Trabajo</h2>
      <p>ID: {trabajo.id_trabajo}</p>
      <p>Tipo de Trabajo: {trabajo.tipo_trabajo}</p>
      <p>Descripción: {trabajo.descripcion}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default Detalles;