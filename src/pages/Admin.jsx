import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../components/HeaderAdmin';
import AñadirUsuario from '../components/AñadirUsuario';
import ActualizarUsuario from '../components/ActualizarUsuario';

function Admin() {
    const [usuarios, setUsuarios] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:3001/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al cargar usuarios', error);
            Swal.fire('Error', 'No se pudo cargar la lista de usuarios', 'error');
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        cargarUsuarios(); // Recargar usuarios después de cerrar el modal de añadir
    };

    const openModal2 = (id) => {
        setUsuarioSeleccionadoId(id);
        setModalOpen2(true);
    };

    const closeModal2 = () => {
        setModalOpen2(false);
        cargarUsuarios(); // Recargar usuarios después de cerrar el modal de actualizar
    };

    const onUsuarioActualizado = () => {
        cargarUsuarios(); // Recarga la lista de usuarios después de una actualización
    };

    const mostrarAlerta = (id) => {
        Swal.fire({
            icon: 'info',
            title: 'Alerta',
            html: '<p>Seguro que quieres continuar?</p>',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/usuarios/${id}`)
                    .then(response => {
                        Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
                        cargarUsuarios(); // Recargar la lista de usuarios después de eliminar
                    })
                    .catch(error => {
                        console.error('Error al eliminar el usuario', error);
                        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
                    });
            }
        });
    };

    return (
        <>
            <Header></Header>
            <h1 className="text-4xl font-bold text-center">Registro de Usuarios</h1>
            <div className="p-2">
                <button className="px-4 py-2 text-white bg-blue-700 rounded-md shadow-md hover:bg-blue-800" onClick={openModal}>Añadir Usuario</button>
            </div>
            <div >
                <table className="w-full p-4 mx-auto overflow-hidden rounded-lg shadow-lg max-w-7xl">
                    <thead>
                        <tr className="text-white bg-blue-500">
                            <th className="px-4 py-2 text-lg font-semibold">#</th>
                            <th className="px-4 py-2 text-lg font-semibold">Nombre</th>
                            <th className="px-4 py-2 text-lg font-semibold">Rol</th>
                            <th className="px-4 py-2 text-lg font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={usuario.id_usuario} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{usuario.nombre_usuario}</td>
                                <td className="px-4 py-2 border">{usuario.rol_id}</td>
                                <td className="px-4 py-2 border">
                                    <div className="flex justify-center gap-20">
                                        <button className="px-4 py-2 text-white bg-red-500 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={() => mostrarAlerta(usuario.id_usuario)}>Eliminar</button>
                                        <button className="px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={() => openModal2(usuario.id_usuario)}>Actualizar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>




            </div>
            <AñadirUsuario isOpen={modalOpen} onClose={closeModal} />
            <ActualizarUsuario isOpen2={modalOpen2} onClose={closeModal2} usuarioId={usuarioSeleccionadoId} onUsuarioActualizado={onUsuarioActualizado} />
        </>
    );
}

export default Admin;