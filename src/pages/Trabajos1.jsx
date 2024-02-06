import React, { useState } from 'react';

const Trabajos1 = () => {
  const [filas, setFilas] = useState([
    { columna1: 'Dato 1', columna2: 'Dato 2', columna3: 'Dato 3' },
    // Agrega más filas según tus datos
  ]);

  const agregarFila = () => {
    const nuevaFila = { columna1: 'Nuevo Dato', columna2: 'Nuevo Dato', columna3: 'Nuevo Dato' };
    setFilas([...filas, nuevaFila]);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={agregarFila}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Agregar Fila
      </button>
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="w-1/3 p-2">Columna 1</th>
            <th className="w-1/3 p-2">Columna 2</th>
            <th className="w-1/3 p-2">Columna 3</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-200'}>
              <td className="w-1/3 p-2">{fila.columna1}</td>
              <td className="w-1/3 p-2">{fila.columna2}</td>
              <td className="w-1/3 p-2">{fila.columna3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trabajos1;