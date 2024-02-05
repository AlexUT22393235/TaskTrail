import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AñadirUsuario = ({ isOpen, onClose }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [rolId, setRolId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombreUsuario || !contrasenia || !rolId) {
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        try {
            await axios.post('http://localhost:3001/usuarios', {
                nombre_usuario: nombreUsuario,
                contrasenia,
                rol_id: rolId,
            });
            Swal.fire('Éxito', 'Usuario añadido correctamente', 'success');
            onClose();
            // Opcional: Agrega aquí una llamada a una función para recargar la lista de usuarios en el componente Admin
        } catch (error) {
            console.error('Error al añadir usuario', error);
            Swal.fire('Error', 'No se pudo añadir el usuario', 'error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                {/* Modal content */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mb-4">
                            <label htmlFor="nombreUsuario" className="block text-gray-700 text-sm font-bold mb-2">Nombre de Usuario:</label>
                            <input type="text" name="nombreUsuario" id="nombreUsuario" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contrasenia" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
                            <input type="password" name="contrasenia" id="contrasenia" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rolId" className="block text-gray-700 text-sm font-bold mb-2">Rol ID:</label>
                            <input type="text" name="rolId" id="rolId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={rolId} onChange={(e) => setRolId(e.target.value)} />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Añadir
                            </button>
                            <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
