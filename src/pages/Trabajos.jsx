import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from '../components/AñadirTrabajo';
import Header from '../components/Header';

const Trabajos = () => {
  const [descripcion, setDescripcion] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tiposTrabajo, setTiposTrabajo] = useState([]);

  const openModal = () => {
    setModalOpen(true);
};

const closeModal = () => {
    setModalOpen(false);
};

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

  useEffect(() => {
    // Hacer la solicitud a la API para obtener la lista de trabajos
    axios.get('http://localhost:3001/tipoTrabajo')
      .then(response => {
        // Actualizar el estado con los datos recibidos
        setTiposTrabajo(response.data);
      })
      .catch(error => {
        console.error('Error al obtener información del trabajo', error);
      });
  }, []);

  return (
    <>
      <Header></Header>
      <h1 className="text-center text-4xl font-bold">Registro de trabajos</h1>
            <div className="p-2">
                <button className="w-[3%] bg-blue-950 p-4 text-white hover:bg-blue-700" onClick={openModal}>+</button>

            </div>
    
    <div>
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

    </div>
    <div className="flex items-center justify-center h-screen">
                <div className="App">

                    <Modal isOpen={modalOpen} onClose={closeModal}>
                        <h1 className="text-2xl mb-4 text-center font-bold">Añadir Trabajo</h1>
                        <p className="text-center p-3 font-semibold">Tipo Trabajo</p>
                        <select className="w-[100%] p-2 rounded-lg border text-center text-black">
                          {tiposTrabajo.map((tipoTrabajo)=>(
                            <option >{tipoTrabajo.nombre_tipo_trabajo}</option>
                          ))}
                            
                            

                        </select>
                        <p className="text-center p-3 font-semibold">Descripcion</p>
                        <textarea className="w-[100%] p-2 rounded-lg border bg-gray-200"></textarea>

                        <p className="text-center p-3 font-semibold">Precio</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" type='number'></input>
                    </Modal>
                </div>
            </div>
    </>
    
  );
};

export default Trabajos;
