import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import validator from 'validator';

const AñadirUsuario = ({ isOpen, onClose, children }) => {

    

    const mostrarAlerta=()=>{
        Swal.fire({
            icon: 'info',
            title: 'Alerta',
            html: '<p>Seguro que quieres continuar?</p>'
        }).then((result) => {
            // Si el usuario hace clic en "Confirmar" en la alerta, cierra el modal
            if (result.isConfirmed) {
                onClose();
            }
        });
    }
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                {/* Modal content */}
                <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <form onSubmit={handleSubmit} className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                        <div className="mb-4">
                            <label htmlFor="nombreUsuario" className="block mb-2 text-sm font-bold text-gray-700">Nombre de Usuario:</label>
                            <input type="text" name="nombreUsuario" id="nombreUsuario" className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contrasenia" className="block mb-2 text-sm font-bold text-gray-700">Contraseña:</label>
                            <input type="password" name="contrasenia" id="contrasenia" className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rolId" className="block mb-2 text-sm font-bold text-gray-700">Rol ID:</label>
                            <input type="text" name="rolId" id="rolId" className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" value={rolId} onChange={(e) => setRolId(e.target.value)} />
                        </div>
                        <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="submit" className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Añadir
                            </button>
                            <button type="button" onClick={onClose} className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AñadirUsuario;
