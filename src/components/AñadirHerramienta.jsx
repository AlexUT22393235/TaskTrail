import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const AnadirHerramienta = ({ isOpen, onClose, cargarMateriales }) => {
    const [nombreMaterial, setNombreMaterial] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');

    const validarCampos = (valor) => {
        // Validación para caracteres específicos
        const patronInvalido = /<|>/;
        return patronInvalido.test(valor);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombreMaterial || !precio || !cantidad) {
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        // Verificar si alguno de los campos contiene "<>" o caracteres no permitidos
        if (validarCampos(nombreMaterial) || validarCampos(precio.toString()) || validarCampos(cantidad.toString())) {
            Swal.fire('Error', 'Ingresaste caracteres invalidos.', 'error');
            return;
        }

        try {
            await axios.post('http://localhost:3001/materiales', {
                nombre_material: nombreMaterial,
                cantidad: cantidad,
                precio_material: precio
            });
            Swal.fire('Éxito', 'Material añadido correctamente', 'success');
            onClose(); // Cerrar el modal
            cargarMateriales(); // Recargar la lista de materiales
        } catch (error) {
            console.error('Error al añadir el material', error);
            Swal.fire('Error', 'No se pudo añadir el material', 'error');
        }

        // Limpiar los estados
        setNombreMaterial('');
        setCantidad('');
        setPrecio('');
    };

    if (!isOpen) return null;

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre de Material</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        value={nombreMaterial}
                                        onChange={(e) => setNombreMaterial(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                    />
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Añadir
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onClose}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AnadirHerramienta;
