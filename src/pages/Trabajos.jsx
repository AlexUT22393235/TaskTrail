import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from '../components/AñadirTrabajo';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Trabajos = () => {
  const [descripcion, setDescripcion] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tiposTrabajo, setTiposTrabajo] = useState([]);
  const [tipoTrabajoSeleccionado, setTipoTrabajoSeleccionado] = useState('');
  const [descripcionTrabajo, setDescripcionTrabajo] = useState('');
  const [tarifas, setTarifas] = useState([]);
const [tarifaSeleccionada, setTarifaSeleccionada] = useState('');

console.log("Usuario ID en Trabajos:", trabajoPendiente.usuario_id);

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

  const handleTarifaChange = (event) => {
    // Setea el valor seleccionado, que debería ser el ID de la tarifa, como estado
    setTarifaSeleccionada(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcionTrabajo(event.target.value);
  };

  const capturarTrabajoPendiente = () => {
    // Almacena el trabajo pendiente en el estado
    
    closeModal(); // Cierra el modal después de capturar los datos

    console.log("Descripción:", descripcionTrabajo, "Tipo trabajo", tipoTrabajoSeleccionado, "Tarifa seleccionada", tarifaSeleccionada)
    navigate("/Secciones")
  };

  //A PROBAR HASTA QUE PUEDAN MAPEARSE LAS COSAS SEGÚN EL USUARIO
  useEffect(() => {
    if (trabajoPendiente && trabajoPendiente.usuario_id) {
      // Hacer la solicitud a la API para obtener la lista de trabajos del usuario
      axios.post('http://localhost:3001/trabajos/trabajoPorUsuario', {
        id_usuario: trabajoPendiente.usuario_id
      })
        .then(response => {
          // Actualizar el estado con los datos recibidos
          setDescripcion(response.data);
        })
        .catch(error => {
          console.error('Error al obtener información del trabajo', error);
        });
    } else {
      // Puedes agregar un mensaje de consola para indicar que el usuario no está disponible
      console.log('Usuario no disponible en trabajoPendiente');
    }
  }, [trabajoPendiente.usuario_id]);
  
  

  useEffect(() => {
    axios.get('http://localhost:3001/tipoTrabajo')
      .then(response => {
        // Verifica que la respuesta sea un array antes de actualizar el estado
        if (Array.isArray(response.data)) {
          setTiposTrabajo(response.data);
        } else {
          console.error('La respuesta no es un array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener información del trabajo', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/tarifa')
      .then(response => {
        // Verifica que la respuesta sea un array antes de actualizar el estado
        if (Array.isArray(response.data)) {
          setTarifas(response.data);
        } else {
          console.error('La respuesta no es un array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener información de la tarifa', error);
      });
  }, []);

  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-bold mt-4">Registro de trabajos</h1>
      <div className="p-2 mx-auto max-w-screen-lg">
      <button 
        className="px-4 py-2 text-white bg-blue-700 rounded-md shadow-md hover:bg-blue-800 block mx-auto mt-4 sm:mt-0 sm:ml-0 sm:w-full"
        onClick={openModal}
      >
        Añadir trabajo
      </button>
    </div>
  
      <div className="mx-auto max-w-screen-lg overflow-x-auto mt-4">
        <table className="w-full p-4 mx-auto overflow-hidden rounded-lg shadow-lg">
          <thead>
            <tr className="text-white bg-blue-500">
              <th className="px-4 py-2 text-lg font-semibold">#</th>
              <th className="px-4 py-2 text-lg font-semibold">Trabajo</th>
              <th className="px-4 py-2 text-lg font-semibold">Descripción</th>
              <th className="px-4 py-2 text-lg font-semibold">Precio</th>
              <th className="px-4 py-2 text-lg font-semibold">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {descripcion.map((trabajo, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
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
            <select className="w-full p-2 rounded-lg border text-center text-black" onChange={handleTipoTrabajoChange}>
              {tiposTrabajo.map((tipoTrabajo) => (
                <option key={tipoTrabajo.id} value={tipoTrabajo.id}>{tipoTrabajo.nombre_tipo_trabajo}</option>
              ))}
            </select>
            <p className="text-center p-3 font-semibold">Tarifa</p>
            <select className="w-full p-2 rounded-lg border text-center text-black" onChange={handleTarifaChange}>
  {tarifas.map((tarifa) => (
    <option key={tarifa.id} value={tarifa.id}>{tarifa.nombre_tarifa}</option>
  ))}
</select>
            <p className="text-center p-3 font-semibold">Descripcion</p>
            <textarea className="w-full p-2 rounded-lg border bg-gray-200" onChange={handleDescripcionChange}></textarea>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex items-center justify-center">
              <button type="button" className="bg-blue-950 p-3 rounded-lg text-white flex justify-center items-center" onClick={capturarTrabajoPendiente}>
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
