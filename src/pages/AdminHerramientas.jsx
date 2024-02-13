import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Header from '../components/HeaderAdmin';
import AñadirHerramienta from '../components/AñadirHerramienta';
import ActualizarHerramienta from '../components/ActualizarHerramienta';

function AdminHerramientas() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [materiales, setMateriales] = useState([]);
    const [materialId, setMaterialId] = useState(null); // Agregado para manejar el ID del material a actualizar

    useEffect(() => {
        cargarMateriales();
    }, []);

    const cargarMateriales = async () => {
        try {
            const response = await axios.get('http://localhost:3001/materiales');
            setMateriales(response.data);
        } catch (error) {
            console.error('Error al cargar herramientas', error);
            Swal.fire('Error', 'No se pudo cargar la lista de herramientas', 'error');
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal2 = (id) => { // Modificado para aceptar un ID
        setMaterialId(id); // Establece el ID del material a actualizar
        setModalOpen2(true);
    };

    const closeModal2 = () => {
        setModalOpen2(false);
    };

    const handleDelete = (idMaterial) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/materiales/${idMaterial}`)
                    .then(() => {
                        Swal.fire('Eliminado!', 'El material ha sido eliminado.', 'success');
                        cargarMateriales(); // Recarga la lista de materiales
                    })
                    .catch(error => {
                        console.error('Error al eliminar el material', error);
                        Swal.fire('Error', 'No se pudo eliminar el material', 'error');
                    });
            }
        });
    };

    return (
        <>
            <Header />
            <h1 className="text-center text-4xl font-bold">Registro de Herramientas</h1>
            <div className="p-2">
                <AñadirHerramienta isOpen={modalOpen} onClose={closeModal} cargarMateriales={cargarMateriales} />

                <ActualizarHerramienta isOpen2={modalOpen2} onClose={closeModal2} materialId={materialId} cargarMateriales={cargarMateriales} />
               {/*<button className="w-[3%] bg-blue-950 p-4 text-white hover:bg-blue-700" onClick={openModal}>+</button> */} 
            </div>

            {/* Tabla de trabajos */}
            <div className="">
                <table className="w-full p-4 mx-auto overflow-hidden rounded-lg shadow-lg max-w-7xl">
                    <thead>
                        <tr className="text-white bg-blue-500">
                            <th className="px-4 py-2 text-lg font-semibold">#</th>
                            <th className="px-4 py-2 text-lg font-semibold">Nombre de materiales</th>
                            <th className="px-4 py-2 text-lg font-semibold">Precio</th>
                            <th className="px-4 py-2 text-lg font-semibold">Cantidades</th>
                            <th className="px-4 py-2 text-lg font-semibold">Funciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiales.map((material, index) => (
                            <tr key={material.id_material_usado} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{material.nombre_material}</td>
                                <td className="py-4 px-2 border">{material.precio_material}</td>
                                <td className="py-4 px-2 border">{material.cantidad}</td>
                                <td className="py-4px-2 border">
                                    <div className="flex justify-center gap-20">
                                        <button className="px-4 py-2 text-white bg-red-500 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={() => handleDelete(material.id_material_usado)}>Eliminar</button>
                                    <button className="px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={() => openModal2(material.id_material_usado)}>Actualizar</button>
                                    </div>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    );
}

export default AdminHerramientas;
