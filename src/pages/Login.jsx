import React from 'react'
import logo from '../assets/logo.jpeg'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex h-screen w-screen">
      {/* Sección Izquierda */}
      <div className="flex items-center justify-center h-screen w-2/5 bg-white p-8">
        <div className="max-w-md mx-auto border-2 rounded">
          {/* Logo */}
          <img src={logo} alt="Logo" className="mb-4 pt-28 pr-28 pl-28" />
          <h2 className='text-2xl text-center'>INICIO SESIÓN</h2>

          {/* Formulario de Inicio de Sesión */}
          <form>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="username">
                USUARIO
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border-2 border-gray rounded"
                placeholder="USUARIO"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border-2 border-gray rounded"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <Link to="/Trabajos">
            <button
              type="submit"
              className="w-full bg-cyan-800 text-white p-2 rounded"
            >
              Ingresar
            </button>
            </Link>
            
          </form>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="flex-auto w-3/5 bg-gray-300">
        <img src="https://images.unsplash.com/photo-1650429960273-8cb6ceefe98f?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagen" className="object-cover w-full h-full" />
      </div>
    </div>
  )
}

export default Login
