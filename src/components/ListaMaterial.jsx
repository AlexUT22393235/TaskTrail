import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalForm from './ModalForm';
import { IoArrowBack } from "react-icons/io5";

const ListaMaterial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialList, setMaterialList] = useState([]);

  useEffect(() => {
    // Obtener datos del localStorage al cargar la página
    const savedMaterials = localStorage.getItem('materialList');

    //console.log(savedMaterials)
    if (savedMaterials) {
      setMaterialList(JSON.parse(savedMaterials));
    }
  }, []);

  const handleAddMaterial = (material) => {
    // Agregar nuevo material a la lista
    setMaterialList([...materialList, material]);

    // Guardar lista actualizada en localStorage
    localStorage.setItem('materialList', JSON.stringify([...materialList, material]));
  };

  const handleFinishRegistration = () => {
    // Se asume que tu backend espera recibir un solo objeto material por petición
    // y que el endpoint '/materiales' está configurado para manejar esto.
  console.log(materialList)
    // Crear una promesa para cada material y enviarlo individualmente
    const sendMaterialPromises = materialList.map(material => {
      const materialData = {
        nombre_material: material.name,
        cantidad: material.quantity,
        precio_material: material.price
      };

      console.log(materialData)
  
      return axios.post('http://localhost:3001/materiales/', materialData);
    });
  
    // Usar Promise.all para esperar a que todas las promesas se resuelvan
    Promise.all(sendMaterialPromises)
      .then(() => {
        // Si todas las promesas se resuelven exitosamente, limpiar localStorage y actualizar el estado
        localStorage.removeItem('materialList'); // Limpiar localStorage después de enviar los datos
        setMaterialList([]); // Limpiar el estado de materialList
        Swal.fire({
          icon: 'success',
          title: 'Registro completado',
          text: 'Todos los materiales se han enviado correctamente a la base de datos',
        });
      })
      .catch(error => {
        // Manejar caso de error en alguna de las promesas
        console.error('Error al enviar los materiales:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar los datos a la base de datos',
        });
      });
  };
  
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col mb-32 mt-2">
      <h1 className="font-semibold text-5xl text-center mb-4">MATERIALES</h1>
      <div className="flex justify-between items-center mb-4 p-5">
        <button
          className="bg-blue-500 text-white p-3 hover:bg-blue-700 rounded-lg mr-4 w-48 h-16"
          onClick={openModal}
        >
          Nuevo
        </button>
        <button
          className="bg-blue-400 text-white p-3 hover:bg-blue-300 rounded-lg w-48 h-16"
          onClick={handleFinishRegistration}
        >
          Terminar registro
        </button>
      </div>
      <div className="container mx-auto p-3">
        <table className="w-full table-auto bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border bg-sky-200">Nombre</th>
              <th className="py-2 px-4 border bg-sky-200">Precio</th>
              <th className="py-2 px-4 border bg-sky-200">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {materialList.map((material, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{material.name}</td>
                <td className="py-2 px-4 border">{material.price}</td>
                <td className="py-2 px-4 border">{material.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalForm isOpen={isModalOpen} closeModal={closeModal} handleAddMaterial={handleAddMaterial} />
    </div>
  );
};

export default ListaMaterial;
