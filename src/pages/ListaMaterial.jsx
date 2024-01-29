import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import ModalForm from './ModalForm';

const ListaMaterial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialList, setMaterialList] = useState([
    { id: '1', name: 'Material 1', price: '$10.00' },
    { id: '2', name: 'Material 2', price: '$15.00' },
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
    <div className="bg-gray-200 p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <h2 className="text-lg font-bold">Materiales</h2>
        </div>
        <button className="p-2 bg-blue-500 text-white rounded" onClick={openModal}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </button>
      </div>

      <ul>
        {materialList.map((material) => (
          <li key={material.id} className="flex justify-between items-center mb-2">
            <span className="mr-10">{material.name}</span>
            <span>{material.price}</span>
          </li>
        ))}
      </ul>

      <ModalForm
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleAddMaterial={handleAddMaterial}
        materialList={materialList}
      />
    </div>
  );
};

export default ListaMaterial;
