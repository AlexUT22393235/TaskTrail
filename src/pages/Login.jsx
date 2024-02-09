import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { useTrabajoPendiente } from '../context/TrabajoPendienteContexto'; // Importamos el contexto


function Login() {
    const [nombre, setNombre] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setTrabajoPendiente } = useTrabajoPendiente(); // Obtenemos la función para actualizar el contexto


    const handleLogin = async (e) => {
        e.preventDefault();

        // Verificar si los campos están vacíos
        if (!nombre || !contrasenia) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        // Validar la entrada del usuario para evitar inyección de SQL y scripts maliciosos
        const caracteresProhibidos = /<|>|\/|\\/; // Expresión regular para detectar caracteres prohibidos
        if (caracteresProhibidos.test(nombre) || caracteresProhibidos.test(contrasenia)) {
            setError('Se han detectado caracteres no permitidos en los campos. Por favor, inténtelo de nuevo.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', {
                nombre_usuario: nombre,
                contrasenia: contrasenia,
            });

            if (response.data.error) {
                setError('Credenciales inválidas, por favor inténtelo de nuevo.');
                console.error('Error en la consulta:', response.data.error);
            } else {
                const usuario = response.data; // Aquí accedemos a la respuesta del servidor directamente
                
                console.log("usuarioId",usuario.usuarioId )

                setTrabajoPendiente((prevState) => ({
    ...prevState,
    usuario_id: usuario.usuarioId // Utiliza usuario.id_usuario en lugar de usuario.id
}));
// console.log("ID del usuario:", usuario.usuarioId);

                // Verificar el rol del usuario
                if (usuario.rol === 1) {
                    navigate('/AdminGeneral');
                    
                } else {
                    navigate('/ComponentePruebaEmail'); // Cambia esto a la ruta que necesitas para el rol 2
                }
                
            }
        } catch (error) {
            setError('Error en la solicitud, por favor inténtelo de nuevo.');
            console.error('Error en la solicitud:', error.message);
        }
    };

    return (
        <div className="flex h-screen w-screen">
            <div className="flex items-center justify-center h-screen w-2/5 bg-white p-8">
                <div className="max-w-md mx-auto border-2 rounded">
                    <img src={logo} alt="Logo" className="mb-4 pt-28 pr-28 pl-28" />
                    <h2 className="text-2xl text-center">INICIO SESIÓN</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label
                                className="block text-white text-sm font-semibold mb-2"
                                htmlFor="username"
                            >
                                USUARIO
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full p-2 border-2 border-gray rounded"
                                placeholder="USUARIO"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-white text-sm font-semibold mb-2"
                                htmlFor="password"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={contrasenia}
                                onChange={(e) => setContrasenia(e.target.value)}
                                className="w-full p-2 border-2 border-gray rounded"
                                placeholder="Ingrese su contraseña"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-cyan-800 text-white p-2 rounded"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex-auto w-3/5 bg-gray-300">
                <img src="https://images.unsplash.com/photo-1650429960273-8cb6ceefe98f?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagen" className="object-cover w-full h-full" />
            </div>
        </div>
    );
}

export default Login;
