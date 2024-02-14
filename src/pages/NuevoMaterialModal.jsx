import React, { useState } from 'react';

const NuevoMaterialModal = ({ isOpen, closeModal, handleAgregarNuevoMaterial }) => {
  const [nuevoMaterial, setNuevoMaterial] = useState('');
  const [costoMaterial, setCostoMaterial] = useState('');

  const handleConfirmarClick = () => {
    // Validación de campos (puedes agregar más validaciones según tus necesidades)
    if (nuevoMaterial.trim() === '' || costoMaterial.trim() === '') {
      // Puedes mostrar un mensaje de error o realizar alguna acción aquí
      return;
    }

    // Lógica para agregar el nuevo material
    handleAgregarNuevoMaterial({
      nombre: nuevoMaterial,
      costo: costoMaterial,
    });

    // Limpiar campos y cerrar el modal
    setNuevoMaterial('');
    setCostoMaterial('');
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Agregar Material Nuevo</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Nuevo Material</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={nuevoMaterial}
              onChange={(e) => setNuevoMaterial(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Costo del Material</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={costoMaterial}
              onChange={(e) => setCostoMaterial(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="p-2 bg-confirmarColor text-white rounded"
              onClick={handleConfirmarClick}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default NuevoMaterialModal;