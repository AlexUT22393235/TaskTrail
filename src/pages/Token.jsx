import React from 'react'
import { Link } from 'react-router-dom';


function Token() {
  return (
    <>
 (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[18%] bg-gray-200 border p-10 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Ingrese su token de acceso</h2>
        <form>
          <div className="mb-4">
            
            <label htmlFor="password" className="block font-bold mb-2">
              Token
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <Link to="/Admin">
          <button className='mr-4 bg-green-400 p-2 rounded-lg text-white hover:bg-green-300'>
            Obtener Token
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Ingresar
          </button>
          </Link>
        </form>
      </div>
    </div>
    </>
  )
}

export default Token