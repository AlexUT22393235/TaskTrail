import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from '../components/AñadirTrabajo';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useTrabajoPendiente } from '../context/TrabajoPendienteContexto';

const Trabajos = () => {
  const [descripcion, setDescripcion] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tiposTrabajo, setTiposTrabajo] = useState([]);
  const [tipoTrabajoSeleccionado, setTipoTrabajoSeleccionado] = useState('');
  const [descripcionTrabajo, setDescripcionTrabajo] = useState('');
  const { trabajoPendiente, setTrabajoPendiente } = useTrabajoPendiente(); // Obtiene el estado y la función para actualizarlo desde el contexto

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();

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

  const handleTipoTrabajoChange = (event) => {

    setTipoTrabajoSeleccionado(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcionTrabajo(event.target.value);
  };

  const capturarTrabajoPendiente = () => {
    // Almacena el trabajo pendiente en el estado
    setTrabajoPendiente((prevState) => ({
      ...prevState,
      descripcion: descripcionTrabajo,
      tipo_trabajo_id: tipoTrabajoSeleccionado
      // Puedes agregar más datos aquí según sea necesario
    }));
    closeModal(); // Cierra el modal después de capturar los datos

    console.log("Descripción:", descripcionTrabajo, "Tipo trabajo", tipoTrabajoSeleccionado)
    navigate("/Secciones")
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
      <Header />
      <h1 className="text-4xl font-bold text-center">Registro de trabajos</h1>
      <div className="p-2">
        <button className="px-4 py-2 text-white bg-blue-700 rounded-md shadow-md hover:bg-blue-800" onClick={openModal}>Añadir Trabajo</button>
      </div>

      <div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-white bg-blue-500">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Trabajo</th>
              <th className="px-4 py-2 border">Descripción</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {descripcion.map((trabajo, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="px-4 py-2 border">{trabajo.id_trabajo}</td>
                <td className="px-4 py-2 border">{obtenerNombreTipoTrabajo(trabajo.tipo_trabajo_id)}</td>
                <td className="px-4 py-2 border">{trabajo.descripcion}</td>
                <td className="px-4 py-2 font-semibold text-blue-600 border">{/* Agrega aquí el precio del trabajo */}</td>
                <td className="flex items-center justify-center px-4 py-2 border">
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
          <Modal isOpen={modalOpen} onClose={closeModal} >
            <h1 className="mb-4 text-2xl font-bold text-center">Añadir Trabajo</h1>
            <p className="p-3 font-semibold text-center">Tipo Trabajo</p>
            <select className="w-[100%] p-2 rounded-lg border text-center text-black" onChange={handleTipoTrabajoChange}>
              {tiposTrabajo.map((tipoTrabajo) => (
                <option key={tipoTrabajo.id} value={tipoTrabajo.id}>{tipoTrabajo.nombre_tipo_trabajo}</option>
              ))}
            </select>
            <p className="p-3 font-semibold text-center">Descripcion</p>
            <textarea className="w-[100%] p-2 rounded-lg border bg-gray-200" onChange={handleDescripcionChange}></textarea>
            <div className="flex items-center justify-center px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button"
                className="flex items-center justify-center p-3 text-white rounded-lg bg-blue-950" onClick={capturarTrabajoPendiente}>
                Capturar trabajo
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Trabajos;
