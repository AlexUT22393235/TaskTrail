import React, { useState } from 'react';

const GeneradoCodigo = () => {
  const [cadenaGenerada, setCadenaGenerada] = useState('');

  const generarCadenaAleatoria = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nuevaCadena = '';

    for (let i = 0; i < 4; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      nuevaCadena += caracteres.charAt(indiceAleatorio);
    }

    return nuevaCadena;
  };

  const handleGenerarCadena = () => {
    const nuevaCadena = generarCadenaAleatoria();
    setCadenaGenerada(nuevaCadena);
  };

  return (
    <div>
      <button onClick={handleGenerarCadena}>Generar Cadena Aleatoria</button>
      <p>Cadena Generada: {cadenaGenerada}</p>
    </div>
  );
};

export default GeneradoCodigo;
