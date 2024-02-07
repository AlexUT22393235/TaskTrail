import React, { useEffect, useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";

function Header() {
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        // Obtenemos el usuario del localStorage al cargar el componente
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado);
            setNombreUsuario(usuario.nombre_usuario); // Asignamos el nombre del usuario al estado
        }
    }, []);

    return (
        <header className="border p-2 bg-sky-100">
            <div className="flex items-center justify-end">
                <p className="text-right font-semibold text-2xl p-3">Bienvenido, {nombreUsuario} :) 🤘🤘🤘</p>
                <FaCircleUser size="3rem" className="mr-2" />
            </div>
        </header>
    );
}

export default Header;
