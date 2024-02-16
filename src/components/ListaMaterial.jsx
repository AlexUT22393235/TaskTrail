import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalForm from './ModalForm';
import { useNavigate } from 'react-router-dom';

const ListaMaterial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialList, setMaterialList] = useState([]);
  const [esperandoConfirmacion, setEsperandoConfirmacion] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('usuarioId');

  useEffect(() => {
    const savedMaterials = localStorage.getItem('materialList');

    if (savedMaterials) {
      setMaterialList(JSON.parse(savedMaterials));
    }
  }, []);

  const handleAddMaterial = (material) => {
    setMaterialList([...materialList, material]);
    localStorage.setItem('materialList', JSON.stringify([...materialList, material]));
  };

  const handleFinishRegistration = () => {
    setEsperandoConfirmacion(true);
  };

  const handleConfirmarCambios = () => {
    const sendMaterialPromises = materialList.map(material => {
      const materialData = {
        nombre_material: material.name,
        cantidad: material.quantity,
        precio_material: material.price
      };
  
      return axios.post('http://localhost:3001/materiales/', materialData);
    });

    Promise.all(sendMaterialPromises)
      .then(() => {
        localStorage.removeItem('materialList');
        setMaterialList([]);
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
        console.error('Error al enviar los materiales:', error);
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
                onClick={handleConfirmarCambios}
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