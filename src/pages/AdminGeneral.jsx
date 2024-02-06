// src/AdminGeneral.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaUsers } from "react-icons/fa";
import HeaderAdmin from '../components/HeaderAdmin';

const AdminGeneral = () => {
  return (
    <>
      <HeaderAdmin />
      <div className="container mx-auto p-4">
        <h1 className='text-4xl font-bold text-center mb-8'>Dashboard</h1>
        <div className="flex justify-center items-center">
          <Link to="/AdminHerramientas" className="flex-shrink-0 w-64">
            <div className="w-full p-8 rounded-lg shadow-lg bg-cyan-600 hover:bg-cyan-700">
              <h2 className="text-2xl font-bold mb-4 text-center text-white">Herramientas</h2>
              <div className='flex justify-center items-center'>
                <FaTools size="3rem" className='text-white' />
              </div>
            </div>
          </Link>
          <Link to="/Admin" className="flex-shrink-0 w-64 ml-4">
            <div className="w-full p-8 rounded-lg shadow-lg bg-blue-700 hover:bg-blue-800">
              <h2 className="text-2xl font-bold mb-4 text-center text-white">Usuarios Registrados</h2>
              <div className='flex justify-center items-center'>
                <FaUsers size="3rem" className='text-white' />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AdminGeneral;