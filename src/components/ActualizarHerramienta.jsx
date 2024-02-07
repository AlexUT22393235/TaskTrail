import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ActualizarHerramienta = ({ isOpen2, onClose, materialId, cargarMateriales }) => {
    const [nombreMaterial, setNombreMaterial] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');

    // Cargar los datos actuales del material cuando el modal se abre y cuando se provee un nuevo materialId
    useEffect(() => {
        if (isOpen2 && materialId) {
            axios.get(`http://localhost:3001/materiales/${materialId}`)
                .then(response => {
                    const { nombre_material, cantidad, precio_material } = response.data;
                    setNombreMaterial(nombre_material);
                    setCantidad(cantidad);
                    setPrecio(precio_material);
                })
                .catch(error => console.error('Error al cargar los datos del material', error));
        }
    }, [materialId, isOpen2]);

    const actualizarMaterial = () => {
        if (!nombreMaterial || !cantidad || !precio) {
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        // Asegúrate de que el endpoint y los nombres de propiedades coincidan con tu API
        axios.put(`http://localhost:3001/materiales/${materialId}`, {
            nombre_material: nombreMaterial,
            cantidad: cantidad,
            precio_material: precio
        })
        .then(() => {
            Swal.fire('Éxito', 'Material actualizado correctamente', 'success');
            cargarMateriales(); // Recargar la lista de materiales
            onClose(); // Cerrar el modal
            // Limpiar estados
            setNombreMaterial('');
            setCantidad('');
            setPrecio('');
        })
        .catch(error => {
            console.error('Error al actualizar el material', error);
            Swal.fire('Error', 'No se pudo actualizar el material', 'error');
        });
    };

    const mostrarAlerta = () => {
        Swal.fire({
            icon: 'info',
            title: 'Alerta',
            html: '<p>¿Seguro que quieres continuar?</p>',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                actualizarMaterial();
            }
        });
    };

    if (!isOpen2) return null;

    return (
        <>
            {isOpen2 && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div>
                                    <label>Nombre de Material</label>
                                    <input type="text" value={nombreMaterial} onChange={(e) => setNombreMaterial(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                                </div>
                                <div>
                                    <label>Cantidad</label>
                                    <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                                </div>
                                <div>
                                    <label>Precio</label>
                                    <input type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={mostrarAlerta} className="bg-blue-950 p-3 rounded-lg text-white">Confirmar</button>
                                <button onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActualizarHerramienta;
