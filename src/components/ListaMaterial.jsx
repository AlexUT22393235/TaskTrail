import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalForm from './ModalForm';
import { useNavigate } from 'react-router-dom';

const ListaMaterial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialList, setMaterialList] = useState([]);
  const [materialIds, setMaterialIds] = useState([]);
  const [ultimoIdTrabajo, setUltimoIdTrabajo] = useState(null);
  const [esperandoConfirmacion, setEsperandoConfirmacion] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const savedMaterials = localStorage.getItem('materialList');
    const savedMaterialIds = localStorage.getItem('materialIds');

    if (savedMaterials) {
      setMaterialList(JSON.parse(savedMaterials));
    }

    if (savedMaterialIds) {
      setMaterialIds(JSON.parse(savedMaterialIds));
    }

    obtenerUltimoIDTrabajo();
  }, []);

  const obtenerUltimoIDTrabajo = () => {
    axios.post('http://localhost:3001/trabajos/ultimoID', { id_usuario: userId })
      .then(response => {
        setUltimoIdTrabajo(response.data.ultimoID);
      })
      .catch(error => {
        console.error('Error al obtener el último ID de trabajo:', error);
      });
  };

  const handleAddMaterial = (material) => {
    setMaterialList([...materialList, material]);

    const materialData = {
      nombre_material: material.name,
      cantidad: material.quantity,
      precio_material: material.price
    };

    axios.post('http://localhost:3001/materiales/', materialData)
      .then(response => {
        const materialId = response.data.id;
        console.log('Material registrado con ID:', materialId);
        setMaterialIds([...materialIds, materialId]);
        localStorage.setItem('materialIds', JSON.stringify([...materialIds, materialId]));
      })
      .catch(error => {
        console.error('Error al agregar el material:', error);
      });

    localStorage.setItem('materialList', JSON.stringify([...materialList, material]));
  };

  const handleFinishRegistration = () => {
    const trabajoIdParaEnviar = ultimoIdTrabajo + 1;

    const sendMaterialPorTrabajoPromises = materialIds.map(materialId => {
      const materialPorTrabajoData = {
        material_usado_id: materialId,
        trabajo_id: trabajoIdParaEnviar // Utiliza el ID sumado
      };
  
  
      return axios.post('http://localhost:3001/materialPorTrabajo/agregarMaterialPorTrabajo', materialPorTrabajoData);
    });

    Promise.all(sendMaterialPorTrabajoPromises)
      .then(() => {
        localStorage.removeItem('materialList');
        localStorage.removeItem('materialIds');
        setMaterialList([]);
        setMaterialIds([]);
        setEsperandoConfirmacion(false);
        Swal.fire({
          icon: 'success',
          title: 'Registro completado',
          text: 'Todos los datos se han enviado correctamente a la base de datos',
        }).then(() => {
          navigate('/Trabajos');
        });
      })
      .catch(error => {
        console.error('Error al enviar los materiales por trabajo:', error);
        setEsperandoConfirmacion(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar los datos a la base de datos',
        });
      });
  };

  const handleCancelarCambios = () => {
    setEsperandoConfirmacion(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col mb-32 mt-2">
      <h1 className="font-semibold text-4xl sm:text-5xl text-center mb-4">MATERIALES</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 p-5">
        <button
          className="bg-blue-500 text-white p-3 hover:bg-blue-700 rounded-lg mb-2 sm:mb-0 sm:mr-4 sm:w-full"
          onClick={openModal}
        >
          Nuevo
        </button>
        <button
          className="bg-blue-400 text-white p-3 hover:bg-blue-300 rounded-lg sm:w-full"
          onClick={handleFinishRegistration}
        >
          Terminar registro
        </button>
      </div>
      <div className="container mx-auto p-3 overflow-x-auto">
        <table className="w-full p-4 mx-auto overflow-hidden rounded-lg shadow-lg max-w-7xl">
          <thead>
            <tr className="text-white bg-blue-500">
              <th className="px-4 py-2 text-lg font-semibold">Nombre</th>
              <th className="px-4 py-2 text-lg font-semibold">Precio</th>
              <th className="px-4 py-2 text-lg font-semibold">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {materialList.map((material, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{material.name}</td>
                <td className="py-2 px-4 border">{material.price}</td>
                <td className="py-2 px-4 border">{material.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalForm isOpen={isModalOpen} closeModal={closeModal} handleAddMaterial={handleAddMaterial} />
      {esperandoConfirmacion && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <p className="text-center mb-4">¿Desea confirmar cambios?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded"
                onClick={handleFinishRegistration}
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
    </div>
  );
};

export default ListaMaterial;
