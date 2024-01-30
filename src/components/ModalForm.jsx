import React, { useState } from 'react';

const ModalForm = ({ isOpen, closeModal, handleAddMaterial, materialList }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const handleMaterialChange = (materialId) => {
    setSelectedMaterial(materialId);
    // Puedes agregar lógica adicional para actualizar el precio según el material seleccionado
  };

  const handleAddMaterialClick = () => {
    handleAddMaterial(selectedMaterial);
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-500 bg-opacity-75">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Agregar Material</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Nombre</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedMaterial}
              onChange={(e) => handleMaterialChange(e.target.value)}
            >
              {materialList.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Precio</label>
            <span className="block">{/* Agregar el precio del material seleccionado */}</span>
          </div>
          <div className="flex justify-between">
            <button
              className="p-2 bg-blue-500 text-white rounded mr-2"
              onClick={handleAddMaterialClick}
            >
              Añadir Herramienta
            </button>
            <button className="p-2 bg-blue-500 text-white rounded" onClick={closeModal}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalForm;
