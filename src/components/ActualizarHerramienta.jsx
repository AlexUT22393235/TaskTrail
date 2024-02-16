import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalForm from '../components/ModalForm';
import { IoArrowBack } from "react-icons/io5";
import Header from '../components/Header';

const ListaMaterial = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [materialList, setMaterialList] = useState([]);

    useEffect(() => {
        // Obtener datos del localStorage al cargar la página
        const savedMaterials = localStorage.getItem('materialList');
        if (savedMaterials) {
            setMaterialList(JSON.parse(savedMaterials));
        }
    }, []);

    const handleAddMaterial = (material) => {
        // Agregar nuevo material a la lista
        setMaterialList([...materialList, material]);
        // Guardar lista actualizada en localStorage
        localStorage.setItem('materialList', JSON.stringify([...materialList, material]));
    };

    const handleFinishRegistration = () => {
        // Construir un array con los datos a enviar
        const dataToSend = materialList.map(material => ({
            nombre_material: material.nombre,
            cantidad: material.cantidad,
            precio_material: material.precio
        }));

        // Enviar cada material a la base de datos individualmente
        dataToSend.forEach(material => {
            axios.post('http://localhost:3001/materiales', material)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro completado',
                        text: 'Todos los materiales se han enviado correctamente a la base de datos',
                    }).then(() => {
                        // Limpiar localStorage y estado local después de enviar todos los datos a la BD
                        localStorage.removeItem('materialList');
                        setMaterialList([]);
                    });
                })
                .catch(error => {
                    console.error('Error al enviar material:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al enviar',
                        text: 'No se pudieron enviar todos los materiales a la base de datos',
                    });
                });
        });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Header />
            <h2 className="text-4xl font-bold text-center">Materiales</h2>
            <div className="flex justify-between items-center mb-4 p-5">
                <button className="p-2 bg-blue-500 text-white rounded w-[5%] hover:bg-blue-400" onClick={openModal}>Nuevo</button>
                <button className="p-2 bg-blue-500 text-white rounded" onClick={handleFinishRegistration}>Terminar registro</button>
            </div>
            {/* Contenido restante del componente */}
            <ModalForm
                isOpen={isModalOpen}
                closeModal={closeModal}
                handleAddMaterial={handleAddMaterial}
            />
        </>
    );
};

export default ListaMaterial;
