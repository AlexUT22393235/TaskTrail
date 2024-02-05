import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AñadirUsuario from '../components/AñadirUsuario';
import ActualizarUsuario from '../components/ActualizarUsuario'
import Swal from 'sweetalert2';

import HeaderAdmin from '../components/HeaderAdmin';

function Admin() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal2 = () => {
        setModalOpen2(true);
    };

    const closeModal2 = () => {
        setModalOpen2(false);
    };

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
        <>
            <HeaderAdmin></HeaderAdmin>            
            <h1 className="text-center text-4xl font-bold">Registro de Usuarios</h1>
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
                                <button className="bg-red-500 p-2 text-white hover:bg-red-400 mr-5" onClick={mostrarAlerta} >Eliminar</button>
                                <button className="bg-green-500 p-2 text-white hover:bg-green-400" onClick={openModal2}>Actualizar</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-center h-screen">
                <div className="App">

                    <AñadirUsuario isOpen={modalOpen} onClose={closeModal}>
                        <h1 className="text-2xl mb-4 text-center font-bold">Añadir Usuario</h1>
                        
                        <p className="text-center p-3 font-semibold">Nombre</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" ></input>

                        <p className="text-center p-3 font-semibold">Contraseña</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" ></input>

                        <p className="text-center p-3 font-semibold">Rol</p>
                        <select className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center">
                            <option></option>
                        </select>
                    </AñadirUsuario>

                    <ActualizarUsuario isOpen2={modalOpen2} onClose={closeModal2}>
                        <h1 className="text-2xl mb-4 text-center font-bold">Actualizar Usuario</h1>
                        
                        <p className="text-center p-3 font-semibold">Nombre</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" ></input>

                        <p className="text-center p-3 font-semibold">Contraseña</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" ></input>

                        <p className="text-center p-3 font-semibold">Rol</p>
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