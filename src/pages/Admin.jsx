import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import HeaderAdmin from '../components/HeaderAdmin';
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
            <HeaderAdmin />
            <h1 className="text-center text-4xl font-bold">Registro de Usuarios</h1>
            <div className="p-2">
                <button className="bg-blue-500 p-2 text-white hover:bg-blue-700" onClick={openModal}>Añadir Usuario</button>
            </div>
            <div className="container mx-auto p-3">
                <table className="w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border bg-sky-200">#</th>
                            <th className="py-2 px-4 border bg-sky-200">Nombre</th>
                            <th className="py-2 px-4 border bg-sky-200">Rol</th>
                            <th className="py-2 px-4 border bg-sky-200">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={usuario.id_usuario}>
                                <td className="py-2 px-4 border">{index + 1}</td>
                                <td className="py-2 px-4 border">{usuario.nombre_usuario}</td>
                                <td className="py-2 px-4 border">{usuario.rol_id}</td>
                                <td className="py-2 px-4 border">
                                    <button className="bg-red-500 p-2 text-white hover:bg-red-400 mr-5" onClick={() => mostrarAlerta(usuario.id_usuario)}>Eliminar</button>
                                    <button className="bg-green-500 p-2 text-white hover:bg-green-400" onClick={() => openModal2(usuario.id_usuario)}>Actualizar</button>
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
