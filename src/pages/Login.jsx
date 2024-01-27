import React from 'react'

function Login() {
  return (
    <div className="flex h-screen">
      {/* Sección Izquierda */}
      <div className="flex-1 bg-blue-500 p-8">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <img src="/path/to/logo.png" alt="Logo" className="mb-4" />

          {/* Formulario de Inicio de Sesión */}
          <form>
            <div className="mb-4">
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="username">
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border border-white rounded"
                placeholder="Ingrese su nombre de usuario"
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
                className="w-full p-2 border border-white rounded"
                placeholder="Ingrese su contraseña"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-blue-500 p-2 rounded hover:bg-blue-700 hover:text-white"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="flex-1 bg-gray-300">
        <img src="https://images.unsplash.com/photo-1650429960273-8cb6ceefe98f?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagen" className="object-cover w-full h-full" />
      </div>
    </div>
  )
}

export default Login
