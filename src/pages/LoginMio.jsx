import React from 'react'

function Login() {
  return (
    <div className="flex h-screen">
      {/* Sección Izquierda */}
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto">
          

          {/* Formulario de Inicio de Sesión */}
          
        
        <form className="max-w-[400px] w-full mx-auto border p-8 px-8 rounded-lg">
          <h2 className="">Logo</h2>
          <div className="flex flex-col py-2">
            <label className="font-bold">Correo</label>
            <input className="rounded-lg border mt-2 p-2" type="text"></input>
          </div>
          <div className="flex flex-col py-2"> 
            <label className="font-bold">Contraseña</label>
            <input className="rounded-lg border mt-2 p-2" type="Password"></input>
          </div>
          <div>
            
          
          </div>
          <button
              type="submit"
              className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-600 hover:text-white"
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
