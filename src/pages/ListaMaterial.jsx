import React, { useState } from 'react';
import ModalForm from '../components/ModalForm';
import NuevoMaterialModal from '../components/NuevoMaterialModal';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import Header from '../components/Header';

const ListaMaterial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialList, setMaterialList] = useState([
    { id: '1', name: 'Material 1', price: '$10.00' },
    { id: '2', name: 'Material 2', price: '$50.00' },
    { id: '3', name: 'Material 3', price: '$134.00' },
    { id: '4', name: 'Material 4', price: '$12.00' },
    { id: '5', name: 'Material 5', price: '$90.00' },
    { id: '6', name: 'Material 6', price: '$134.00' },
    { id: '7', name: 'Material 7', price: '$23.00' },
    { id: '8', name: 'Material 8', price: '$50.00' },
    { id: '9', name: 'Material 9', price: '$184.00' },
    // Agrega más materiales según sea necesario
  ]);

  const handleAddMaterial = (selectedMaterial) => {
    // Lógica para agregar el material a la lista
    const materialToAdd = materialList.find((material) => material.id === selectedMaterial);
    if (materialToAdd) {
      setMaterialList([...materialList, materialToAdd]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  
  return (
    <>
    <Header ></Header>
   
      <h2 className="text-4xl font-bold text-center">Materiales</h2>

      <div className="flex justify-between items-center mb-4 p-5">
        <button className="p-2 bg-blue-500 text-white rounded w-[5%] hover:bg-blue-400" onClick={openModal}>Nuevo</button>
      </div>
      <div className="bg-sky-400 p-4 rounded-md">
        <div class="container mx-auto p-3">
          <table class="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                
                <th class="py-2 px-4 border bg-sky-200">Nombre</th>
                <th class="py-2 px-4 border bg-sky-200">Precio</th>

              </tr>
            </thead>



            <tbody>

              {materialList.map((material) => (

                <tr>
                  
                  <td class="py-2 px-4 border">{material.name}</td>
                  <td class="py-2 px-4 border">{material.price}</td>

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
        materialList={materialList}
      />

    </>

  );
};

export default ListaMaterial;
