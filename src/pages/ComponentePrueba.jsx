import React, { useState } from 'react';
import axios from 'axios';

const ComponentePrueba = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [rol, setRol] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Verificar que el nombre de usuario y la contraseña no estén vacíos
      if (!nombreUsuario || !contrasenia) {
        setError('El usuario o la contraseña están incompletos');
        return;
      }

      const response = await axios.post('http://localhost:3001/login', {
        nombre_usuario: nombreUsuario,
        contrasenia: contrasenia,
      });

      const data = response.data;
      setRol(data.rol);
      setError(null); // Limpiar cualquier error anterior
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      setRol(null); // Limpiar el rol en caso de error
      setError('Credenciales incorrectas'); // Establecer un mensaje de error
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <label>
        Nombre de Usuario:
        <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Iniciar Sesión</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {rol !== null && !error && (
        <div>
          {rol === 1 ? <AdminComponent /> : <UserComponent />}
        </div>
      )}
    </div>
  );
};

const AdminComponent = () => {
  return <p>¡Bienvenido Administrador!</p>;
};

const UserComponent = () => {
  return <p>¡Bienvenido Usuario!</p>;
};

const NoUserComponent = () => {
  return <p>El usuario o la contraseña están incompletos</p>;
};

export default ComponentePrueba;