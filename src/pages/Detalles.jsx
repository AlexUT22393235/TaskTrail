import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

function Detalles() {
    const [detallesTrabajo, setDetallesTrabajo] = useState(null);
    const [totalHorasTrabajo, setTotalHorasTrabajo] = useState(0);
    const [totalPrecioHoras, setTotalPrecioHoras] = useState(0);
    const [totalPrecioMateriales, setTotalPrecioMateriales] = useState(0);
    const [totalGeneral, setTotalGeneral] = useState(0);

    useEffect(() => {
        const obtenerDetallesTrabajo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/materialTrabajo/1/detalles`);
                const detalles = response.data;
                setDetallesTrabajo(detalles);

                let totalHoras = 0;
                let totalPrecio = 0;
                let totalMateriales = 0;

                detalles.forEach(d => {
                    totalHoras += d.horas_trabajo;
                    totalPrecio += d.total_horas;
                    totalMateriales += d.total_materiales;
                });

                setTotalHorasTrabajo(totalHoras);
                setTotalPrecioHoras(totalPrecio);
                setTotalPrecioMateriales(totalMateriales);
                setTotalGeneral(totalPrecio + totalMateriales);
            } catch (error) {
                console.error('Error al obtener detalles del trabajo:', error);
            }
        };

        obtenerDetallesTrabajo();
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-8">
                <div className="text-center">
                    <h1 className="font-semibold text-4xl mb-4">Detalles</h1>
                </div>

                {detallesTrabajo && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="font-semibold text-2xl">Tipo de trabajo: {detallesTrabajo[0].tipo_trabajo}</p>

                            <p className="font-semibold text-2xl mt-4">Materiales:</p>
                            <ul className="list-disc ml-8">
                                {detallesTrabajo.map((detalle, index) => (
                                    <li className="text-xl" key={index}>{detalle.nombre_material}: ${detalle.precio_material}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-2xl">Horas de trabajo: {totalHorasTrabajo}</p>
                            <p className="font-semibold text-2xl mt-4">Total por horas de trabajo: ${totalPrecioHoras}</p>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 p-10 left-[80%]">
                    <p className="text-4xl font-bold">TOTAL: ${totalGeneral}</p>
                </div>

                <div className="absolute bottom-0 p-10 right-[85%]">
                    <Link to="/Secciones">
                        <button className="bg-blue-500 p-3 rounded-lg hover:bg-blue-300 text-white ">Ver Secciones</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Detalles;
