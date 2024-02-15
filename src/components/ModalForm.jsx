import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ModalForm = ({ isOpen, closeModal, handleAddMaterial }) => {
  const [materialName, setMaterialName] = useState('');
  const [materialPrice, setMaterialPrice] = useState('');
  const [materialQuantity, setMaterialQuantity] = useState('');

  useEffect(() => {
    // Reiniciar valores cuando el modal se abre
    if (isOpen) {
      setMaterialName('');
      setMaterialPrice('');
      setMaterialQuantity('');
    }
  }, [isOpen]);

  const handleNameChange = (event) => {
    setMaterialName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setMaterialPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setMaterialQuantity(event.target.value);
  };

  const handleBackdropClick = (event) => {
    // Cerrar modal al hacer clic fuera de él
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  const handleAddMaterialClick = () => {
    // Lógica para validar los campos antes de agregar el material
    // Se usa trimStart() o trimLeft() para evitar espacios al inicio
    const isNameValid = materialName.trimStart() !== '';
    const isPriceValid = materialPrice.trimStart() !== ''; // Asegúrate de que esto es adecuado para tu lógica de validación
    const isQuantityValid = materialQuantity.trim() !== ''; // La cantidad, siendo un número, probablemente no necesite esta comprobación
  
    if (!isNameValid || !isPriceValid || !isQuantityValid) {
      Swal.fire({
        icon: 'error',
        title: 'Parece que algo salió mal...',
        text: 'Por favor complete todos los campos correctamente.',
      });
      return;
    }
  
    // Lógica para validar caracteres permitidos
    // Ajusta la expresión regular si deseas permitir espacios en blanco en medio de los valores
    const isValidNameInput = /^[a-zA-Z0-9 ]*$/.test(materialName.trimStart()); // Permitir espacios en blanco en medio
    const isValidPriceInput = /^[0-9.]*$/.test(materialPrice.trimStart()); // Asumiendo que el precio puede contener dígitos y puntos
    const isValidQuantityInput = /^[0-9]*$/.test(materialQuantity); // La cantidad debe ser solo números
  
    if (!isValidNameInput || !isValidPriceInput || !isValidQuantityInput) {
      Swal.fire({
        icon: 'error',
        title: 'Parece que algo salió mal...',
        text: 'Los campos contienen caracteres no permitidos.',
      });
      return;
    }
  
    // Lógica para agregar el material
    handleAddMaterial({
      name: materialName.trimStart(), // Asegúrate de eliminar espacios al principio
      price: materialPrice.trimStart(), // Asegúrate de eliminar espacios al principio para el precio también
      quantity: materialQuantity // No se modifica, asumiendo que es un número
    });
  
    // Cerrar modal después de agregar el material
    closeModal();
  };
  

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-500 bg-opacity-75" onClick={handleBackdropClick}>
        <div className="bg-white p-6 rounded-lg w-full max-w-md" onClick={(event) => event.stopPropagation()}>
          <h2 className="text-2xl font-bold text-center mb-4">Agregar Material</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Nombre del material</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={materialName}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Precio</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={materialPrice}
              onChange={handlePriceChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Cantidad</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={materialQuantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="p-2 bg-blue-500 text-white rounded mr-2"
              onClick={handleAddMaterialClick}
            >
              Agregar Material
            </button>
            <button className="p-2 bg-blue-500 text-white rounded" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalForm;
