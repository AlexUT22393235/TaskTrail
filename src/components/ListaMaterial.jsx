import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalForm from './ModalForm';

  const ListaMaterial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialList, setMaterialList] = useState([]);
  const userId = localStorage.getItem('usuarioId');

  // Hacer algo con el userId, por ejemplo, imprimirlo en la consola
  console.log('Id del usuario para materiales:', userId);

  // Verificar que userId tiene un valor antes de hacer la solicitud
if (userId) {
  // Configurar el objeto de datos para la solicitud
  const requestData = {
    id_usuario: userId
  };

  // Realizar la solicitud POST
  axios.post('http://localhost:3001/trabajos/ultimoID', requestData)
    .then(response => {
      // Obtener el último ID del trabajo de la respuesta
      const ultimoIdTrabajo = response.data.ultimoID;

      // Hacer algo con el últimoIdTrabajo, por ejemplo, guardarlo en una constante
      const idCapturado = ultimoIdTrabajo;

      // Puedes utilizar idCapturado en otras partes del código
      console.log('ID capturado:', idCapturado);
    })
    .catch(error => {
      // Manejar errores en la solicitud
      console.error('Error en la solicitud:', error);
    });
} else {
  // Manejar el caso donde userId no tiene un valor
  console.error('El userId no está presente en el localStorage');
}

  useEffect(() => {
    // Obtener datos del localStorage al cargar la página
    const savedMaterials = localStorage.getItem('materialList');

    //console.log(savedMaterials)
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
    // Se asume que tu backend espera recibir un solo objeto material por petición
    // y que el endpoint '/materiales' está configurado para manejar esto.
  console.log(materialList)
    // Crear una promesa para cada material y enviarlo individualmente
    const sendMaterialPromises = materialList.map(material => {
      const materialData = {
        nombre_material: material.name,
        cantidad: material.quantity,
        precio_material: material.price
      };

      console.log(materialData)
  
      return axios.post('http://localhost:3001/materiales/', materialData);
    });

    
  
    // Usar Promise.all para esperar a que todas las promesas se resuelvan
    Promise.all(sendMaterialPromises)
      .then(() => {
        // Si todas las promesas se resuelven exitosamente, limpiar localStorage y actualizar el estado
        localStorage.removeItem('materialList'); // Limpiar localStorage después de enviar los datos
        setMaterialList([]); // Limpiar el estado de materialList
        Swal.fire({
          icon: 'success',
          title: 'Registro completado',
          text: 'Todos los materiales se han enviado correctamente a la base de datos',
        });
      })
      .catch(error => {
        // Manejar caso de error en alguna de las promesas
        console.error('Error al enviar los materiales:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar los datos a la base de datos',
        });
      });
  };
  
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  



  return (
    <div className="flex flex-col mb-32 mt-2">
      <h1 className="font-semibold text-4xl sm:text-5xl text-center mb-4">MATERIALES</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 p-5">
        <button
          className="bg-blue-500 text-white p-3 hover:bg-blue-700 rounded-lg mb-2 sm:mb-0 sm:mr-4 sm:w-full"
          onClick={openModal}
        >
          Nuevo
        </button>
        <button
          className="bg-blue-400 text-white p-3 hover:bg-blue-300 rounded-lg sm:w-full"
          onClick={handleFinishRegistration}
        >
          Terminar registro
        </button>
      </div>
      <div className="container mx-auto p-3 overflow-x-auto">
        <table className="w-full p-4 mx-auto overflow-hidden rounded-lg shadow-lg max-w-7xl">
          <thead>
            <tr className="text-white bg-blue-500">
              <th className="px-4 py-2 text-lg font-semibold">Nombre</th>
              <th className="px-4 py-2 text-lg font-semibold">Precio</th>
              <th className="px-4 py-2 text-lg font-semibold">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {materialList.map((material, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{material.name}</td>
                <td className="py-2 px-4 border">{material.price}</td>
                <td className="py-2 px-4 border">{material.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalForm isOpen={isModalOpen} closeModal={closeModal} handleAddMaterial={handleAddMaterial} />
    </div>
  );
};

export default ListaMaterial;
