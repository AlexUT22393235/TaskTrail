import React, { useEffect, useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Header() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const navigate = useNavigate(); // Hook para realizar redirecciones

    useEffect(() => {
        // Obtenemos el nombre del usuario del localStorage al cargar el componente
        const nombreUsuarioGuardado = localStorage.getItem('usuarioNombre');
        if (nombreUsuarioGuardado) {
            setNombreUsuario(nombreUsuarioGuardado); // Asignamos el nombre del usuario al estado
        }
    }, []);

    const handleCerrarSesion = () => {
        localStorage.removeItem('usuarioNombre');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('usuarioRol');
        
        // Redireccionar a la página de inicio de sesión (login)
        navigate('/'); // Cambia '/' por la ruta de tu página de inicio de sesión
        // Añade aquí cualquier otra lógica necesaria para cerrar sesión
    };
    

    return (
        <header className="border p-2 bg-sky-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {nombreUsuario && (
                        <>
                            <FaCircleUser size="3rem" className="mr-2" />
                            <p className="text-right font-semibold text-2xl p-3">Bienvenido {nombreUsuario} </p>
                        </>
                    )}
                </div>
                {nombreUsuario && (
                    <button onClick={handleCerrarSesion} className="bg-blue-500 text-white px-3 py-1 rounded">
                        Cerrar Sesión
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;