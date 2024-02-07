import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ActualizarUsuario = ({ isOpen2, onClose, usuarioId }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [rolId, setRolId] = useState('');

    // Cargar los datos del usuario cuando el modal se abre y cuando el usuarioId cambia
    useEffect(() => {
        if (usuarioId && isOpen2) {
            const cargarUsuario = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/usuarios/${usuarioId}`);
                    // Asegúrate de que tu API responda con los campos en este formato o ajusta según sea necesario
                    const { nombre_usuario, contrasenia, rol_id } = response.data;
                    setNombreUsuario(nombre_usuario || '');
                    setContrasenia(contrasenia || '');
                    setRolId(rol_id || '');
                } catch (error) {
                    console.error('Error al cargar el usuario para actualizar', error);
                    Swal.fire('Error', 'No se pudo cargar la información del usuario', 'error');
                }
            };
            cargarUsuario();
        }
    }, [usuarioId, isOpen2]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/usuarios/${usuarioId}`, {
                nombre_usuario: nombreUsuario,
                contrasenia,
                rol_id: rolId,
            });
            Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
            onClose();
            // Recargar los usuarios después de la actualización
        } catch (error) {
            console.error('Error al actualizar usuario', error);
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
        }
    };
    
    if (!isOpen2) return null;

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay */}
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                {/* Contenido del Modal */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mb-4">
                            <label htmlFor="nombreUsuario" className="block text-gray-700 text-sm font-bold mb-2">Nombre de Usuario:</label>
                            <input type="text" name="nombreUsuario" id="nombreUsuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contrasenia" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
                            <input type="password" name="contrasenia" id="contrasenia" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rolId" className="block text-gray-700 text-sm font-bold mb-2">Rol ID:</label>
                            <input type="number" name="rolId" id="rolId" value={rolId} onChange={(e) => setRolId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                        </div>
                        <div className="flex itemscenter justify-between">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Actualizar
                            </button>
                            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ActualizarUsuario;