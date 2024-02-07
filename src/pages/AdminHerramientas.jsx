import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import HeaderAdmin from '../components/HeaderAdmin';
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
            <HeaderAdmin />
            <h1 className="text-center text-4xl font-bold">Registro de Herramientas</h1>
            <div className="p-2">
                <button className="w-[3%] bg-blue-950 p-4 text-white hover:bg-blue-700" onClick={openModal}>+</button>
            </div>

            {/* Tabla de trabajos */}
            <div className="container mx-auto p-3">
                <table className="w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border bg-sky-200">#</th>
                            <th className="py-2 px-4 border bg-sky-200">Nombre de materiales</th>
                            <th className="py-2 px-4 border bg-sky-200">Precio</th>
                            <th className="py-2 px-4 border bg-sky-200">Cantidades</th>
                            <th className="py-2 px-4 border bg-sky-200">Funciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiales.map((material, index) => (
                            <tr key={material.id_material_usado}>
                                <td className="py-2 px-4 border">{index + 1}</td>
                                <td className="py-2 px-4 border">{material.nombre_material}</td>
                                <td className="py-2 px-4 border">{material.precio_material}</td>
                                <td className="py-2 px-4 border">{material.cantidad}</td>
                                <td className="py-2 px-4 border">
                                    <button className="bg-red-500 p-2 text-white hover:bg-red-400 mr-5" onClick={() => handleDelete(material.id_material_usado)}>Eliminar</button>
                                    <button className="bg-green-500 p-2 text-white hover:bg-green-400" onClick={() => openModal2(material.id_material_usado)}>Actualizar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AñadirHerramienta isOpen={modalOpen} onClose={closeModal} cargarMateriales={cargarMateriales} />

            <ActualizarHerramienta isOpen2={modalOpen2} onClose={closeModal2} materialId={materialId} cargarMateriales={cargarMateriales} />
        </>
    );
}

export default AdminHerramientas;
