import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalForm from '../components/ModalForm';
import { IoArrowBack } from "react-icons/io5";
import Header from '../components/Header';

const ListaMaterial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialList, setMaterialList] = useState([]);

  useEffect(() => {
    // Obtener datos del localStorage al cargar la página
    const savedMaterials = localStorage.getItem('materialList');
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
    // Construir un array con los datos a enviar
    const dataToSend = materialList.map(material => ({
      nombre_material: material.nombre,
      cantidad: material.cantidad,
      precio_material: material.precio
    }));
  
    
    // Enviar datos a la base de datos
    axios.post('http://localhost:3001/materiales', dataToSend)
      .then(response => {
        // Limpiar localStorage después de enviar los datos a la BD
        localStorage.removeItem('materialList');
        setMaterialList([]);
        Swal.fire({
          icon: 'success',
          title: 'Registro completado',
          text: 'Los datos se han enviado correctamente a la base de datos',
        });
      })
      .catch(error => {
        console.error('Error:', error);
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
    <>
      <Header />
      <h2 className="text-4xl font-bold text-center">Materiales</h2>
      <div className="flex justify-between items-center mb-4 p-5">
        <button className="p-2 bg-blue-500 text-white rounded w-[5%] hover:bg-blue-400" onClick={openModal}>Nuevo</button>
        <button className="p-2 bg-blue-500 text-white rounded" onClick={handleFinishRegistration}>Terminar registro</button>
      </div>
      <div className="bg-sky-400 p-4 rounded-md">
        <div className="container mx-auto p-3">
          <table className="min-w-full bg-white border border-gray-300">
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
      </div>
      <ModalForm
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleAddMaterial={handleAddMaterial}
      />
    </>
  );
};

export default ListaMaterial;
