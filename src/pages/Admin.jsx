import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa6";
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Modal from '../components/AñadirTrabajo';

function Admin() {
    const [modalOpen, setModalOpen] = useState(false);
    

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    

    return (
        <>
            <Header></Header>

            <h1 className="text-center text-4xl font-bold">Registro de trabajos de admin</h1>
            <div className="p-2">
                <button className="w-[3%] bg-blue-950 p-4 text-white hover:bg-blue-700" onClick={openModal}>+</button>

            </div>
            {/*tabla de trabajos */}
            <div class="container mx-auto p-3">
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border bg-sky-200">#</th>
                            <th class="py-2 px-4 border bg-sky-200">Trabajos</th>
                            <th class="py-2 px-4 border bg-sky-200">Descripcion</th>
                            <th class="py-2 px-4 border bg-sky-200">Precio</th>
                            <th class="py-2 px-4 border bg-sky-200">Detalles</th>
                            <th class="py-2 px-4 border bg-sky-200">Funciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border">1</td>
                            <td class="py-2 px-4 border">Reparacion</td>
                            <td class="py-2 px-4 border">Primer comnetario</td>
                            <td class="py-2 px-4 border">100$</td>
                            <Link to="/Detalles">
                                <td class="py-2 px-4 border flex justify-center items-center"><FaEye size="2rem" /></td>
                            </Link>
                            <td class="py-2 px-4 border">
                                <button className="bg-red-500 p-2 text-white hover:bg-red-400 mr-5">Eliminar</button>
                                <button className="bg-green-500 p-2 text-white hover:bg-green-400">Actualizar</button>

                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-center h-screen">
                <div className="App">

                    <Modal isOpen={modalOpen} onClose={closeModal}>
                        <h1 className="text-2xl mb-4 text-center font-bold">Añadir Trabajo</h1>
                        <p className="text-center p-3 font-semibold">Tipo Trabajo</p>
                        <select className="w-[100%] p-2 rounded-lg border text-center">
                            <option>Reparacion</option>
                            <option>Revision</option>

                        </select>
                        <p className="text-center p-3 font-semibold">Descripcion</p>
                        <textarea className="w-[100%] p-2 rounded-lg border bg-gray-200"></textarea>

                        <p className="text-center p-3 font-semibold">Precio</p>
                        <input className="w-[100%] p-2 rounded-lg border bg-gray-200 text-center" type='number'></input>
                    </Modal>
                </div>
            </div>

        </>
    )
}

export default Admin