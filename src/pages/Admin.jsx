import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AñadirUsuario from '../components/AñadirUsuario';
import ActualizarUsuario from '../components/ActualizarUsuario'
import Swal from 'sweetalert2';

import HeaderAdmin from '../components/HeaderAdmin';

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
            <HeaderAdmin></HeaderAdmin>            
            <h1 className="text-4xl font-bold text-center">Registro de Usuarios</h1>
            <div className="p-2">
                <button className="w-[3%] bg-blue-950 p-4 text-white hover:bg-blue-700" onClick={openModal}>+</button>
                
            </div>
            {/*tabla de trabajos */}
            <div class="container mx-auto p-3">
                <table class="w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border bg-sky-200">#</th>
                            <th class="py-2 px-4 border bg-sky-200">Email</th>
                            <th class="py-2 px-4 border bg-sky-200">Contraseña</th>
                            <th class="py-2 px-4 border bg-sky-200">Rol</th>                            
                            <th class="py-2 px-4 border bg-sky-200">Funciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border">1</td>
                            <td class="py-2 px-4 border"></td>
                            <td class="py-2 px-4 border"></td>
                                <td class="py-2 px-4 border"></td>
                            <td class="py-2 px-4 border">
                                <button className="p-2 mr-5 text-white bg-red-500 hover:bg-red-400" onClick={mostrarAlerta} >Eliminar</button>
                                <button className="p-2 text-white bg-green-500 hover:bg-green-400" onClick={openModal2}>Actualizar</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-center h-screen">
                <div className="App">

                    <AñadirUsuario isOpen={modalOpen} onClose={closeModal}>
                        <h1 className="mb-4 text-2xl font-bold text-center">Añadir Usuario</h1>
                        
                        <p className="p-3 font-semibold text-center">Nombre</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" ></input>

                        <p className="p-3 font-semibold text-center">Contraseña</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" ></input>

                        <p className="p-3 font-semibold text-center">Rol</p>
                        <select className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center">
                            <option></option>
                        </select>
                    </AñadirUsuario>

                    <ActualizarUsuario isOpen2={modalOpen2} onClose={closeModal2}>
                        <h1 className="mb-4 text-2xl font-bold text-center">Actualizar Usuario</h1>
                        
                        <p className="p-3 font-semibold text-center">Nombre</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" ></input>

                        <p className="p-3 font-semibold text-center">Contraseña</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" ></input>

                        <p className="p-3 font-semibold text-center">Rol</p>
                        <select className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center">
                            <option></option>
                        </select>
                    </ActualizarUsuario>
                </div>
            </div>

        </>
    )
}

export default Admin