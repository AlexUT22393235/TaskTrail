import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Detalles = () => {
  const [trabajo, setTrabajo] = useState(null);
  const [materialesPorTrabajo, setMaterialesPorTrabajo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrabajoDetails = async () => {
      try {
        console.log("ID de trabajo:", id);

        const response = await axios.get(`http://localhost:3001/trabajos/${id}`);
        setTrabajo(response.data);

        const materialesResponse = await axios.post(`http://localhost:3001/materialPorTrabajo/ObtenerMaterialPorTrabajoPorId`, {
          trabajo_id: id
        });
        setMaterialesPorTrabajo(materialesResponse.data);
      } catch (error) {
        console.error('Error al obtener detalles del trabajo', error);
      }
    };

    if (id) {
      fetchTrabajoDetails();
    }
  }, [id]);

  const calcularPrecio = () => {
    if (trabajo) {
      let precio = 0;

      // Multiplicar las horas de trabajo por el valor de la tarifa correspondiente
      switch (trabajo.tarifa_trabajo_id) {
        case 1:
          precio = trabajo.horas_trabajo * 350;
          break;
        case 2:
          precio = trabajo.horas_trabajo * 450;
          break;
        case 3:
          precio = trabajo.horas_trabajo * 500;
          break;
        default:
          console.error('Tarifa de trabajo no válida');
      }

      return precio;
    }

    return null;
  };

  if (!trabajo) {
    return <div>Cargando detalles del trabajo...</div>;
  }

  return (
    <div>
      <h2>Detalles del Trabajo</h2>
      <p>ID: {trabajo.id_trabajo}</p>
      <p>Tipo de Trabajo: {trabajo.tipo_trabajo}</p>
      <p>Descripción: {trabajo.descripcion}</p>
      <p>HOras {trabajo.horas_trabajo}</p>     
      <p>Tarifa {trabajo.tarifa_trabajo_id}</p>
      <p>Total por horas {calcularPrecio()}</p>

      <h3>Materiales Por Trabajo</h3>
      <ul>
        {materialesPorTrabajo.map(material => (
          <li key={material.id_material_por_trabajo}>
            Material ID: {material.id_material_por_trabajo}, Material Usado ID: {material.material_usado_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Detalles;
