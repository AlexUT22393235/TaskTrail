import React from 'react'

function ListaMaterial() {
  return (
    <>
    <Header ></Header>
    <Link to="/Secciones">
            <IoArrowBack size="3rem"/>
            </Link>
      <h2 className="text-4xl font-bold text-center">Materiales</h2>

      <div className="flex justify-between items-center mb-4 p-5">
        <button className="p-2 bg-blue-500 text-white rounded w-[5%] hover:bg-blue-400" onClick={openModal}>Nuevo</button>
      </div>
      <div className="bg-sky-400 p-4 rounded-md">
        <div class="container mx-auto p-3">
          <table class="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                
                <th class="py-2 px-4 border bg-sky-200">Nombre</th>
                <th class="py-2 px-4 border bg-sky-200">Precio</th>

              </tr>
            </thead>



            <tbody>

              {materialList.map((material) => (

                <tr>
                  
                  <td class="py-2 px-4 border">{material.name}</td>
                  <td class="py-2 px-4 border">{material.price}</td>

                </tr>

              ))}
            </tbody>
          </table>

        </div>
      </div>
      <ModalForm
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleAddMaterial={handleAddMaterial}
        materialList={materialList}
      />

    </>

  );
};

export default ListaMaterial
